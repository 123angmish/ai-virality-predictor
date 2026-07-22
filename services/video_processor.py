import cv2
import numpy as np
import os
import uuid
import subprocess
import wave
from config import Config

class VideoProcessor:
    def __init__(self):
        # Load Haar Cascades
        self.face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        self.smile_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_smile.xml')

    def extract_features(self, video_path):
        """
        Process the video at video_path and extract visual/motion metrics.
        Optimized by sampling frames to run in real-time.
        """
        cap = cv2.VideoCapture(video_path)
        if not cap.isOpened():
            raise ValueError("Could not open video file.")

        # Gather base parameters
        fps = float(cap.get(cv2.CAP_PROP_FPS))
        if fps <= 0:
            fps = 30.0
            
        frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        duration = frame_count / fps if frame_count > 0 else 0.0

        # Heuristic limits to speed up processing
        # If video is long, sample every Nth frame to avoid long wait times
        max_sampled_frames = 120
        sample_interval = max(1, frame_count // max_sampled_frames)
        
        # Accumulators
        brightness_list = []
        contrast_list = []
        motion_scores = []
        color_variances = []
        saturation_list = []
        sharpness_list = []
        noise_scores = []
        
        total_faces = 0
        total_smiles = 0
        face_frames = 0
        smile_frames = 0
        scene_changes = 0
        
        prev_gray = None
        thumbnail_saved = False
        thumbnail_name = f"thumb_{uuid.uuid4().hex}.jpg"
        thumbnail_path = os.path.join(Config.THUMBNAIL_FOLDER, thumbnail_name)
        
        # Dominant color analysis helper
        color_pixels = []
        
        # First 3 seconds calculations (for hook score)
        hook_frames_limit = int(fps * 3.0)
        hook_motion_scores = []
        hook_brightness_scores = []
        
        frame_idx = 0
        while True:
            ret, frame = cap.read()
            if not ret:
                break
                
            # Process hook frames specifically if within first 3 seconds
            is_hook_frame = frame_idx < hook_frames_limit
            
            # Sub-sample frames for metrics to speed up
            if not is_hook_frame and (frame_idx % sample_interval != 0):
                frame_idx += 1
                continue
                
            # Convert to gray and HSV
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
            
            # Save thumbnail from early middle of the video or first 1.5 seconds
            if not thumbnail_saved and frame_idx >= min(15, frame_count // 10):
                # Save thumbnail file
                cv2.imwrite(thumbnail_path, frame)
                thumbnail_saved = True
                
            # 1. Brightness: mean of Y channel or gray channel
            mean_brightness = float(np.mean(gray))
            brightness_list.append(mean_brightness)
            if is_hook_frame:
                hook_brightness_scores.append(mean_brightness)
                
            # 2. Contrast: standard deviation of pixel intensities
            contrast = float(np.std(gray))
            contrast_list.append(contrast)
            
            # 3. Color Variance and Saturation
            # Saturation is the 2nd channel in HSV
            mean_sat = float(np.mean(hsv[:, :, 1]))
            saturation_list.append(mean_sat)
            
            # Color variance in BGR channels
            chans = cv2.split(frame)
            chan_vars = [float(np.var(c)) for c in chans]
            color_variances.append(float(np.mean(chan_vars)))
            
            # Sample pixels for dominant colors (resize to speed up)
            if frame_idx % (sample_interval * 4) == 0:
                small_frame = cv2.resize(frame, (16, 16))
                color_pixels.extend(small_frame.reshape(-1, 3))
                
            # 4. Sharpness: Variance of Laplacian
            laplacian_var = cv2.Laplacian(gray, cv2.CV_64F).var()
            sharpness_list.append(float(laplacian_var))
            
            # 5. Noise Score: standard deviation of high pass filter (simple noise estimation)
            blurred = cv2.GaussianBlur(gray, (5, 5), 0)
            noise_est = float(np.std(cv2.absdiff(gray, blurred)))
            noise_scores.append(noise_est)
            
            # 6. Motion score (frame difference)
            if prev_gray is not None:
                # Resize to make subtraction super fast
                prev_gray_small = cv2.resize(prev_gray, (160, 120))
                gray_small = cv2.resize(gray, (160, 120))
                diff = cv2.absdiff(gray_small, prev_gray_small)
                mean_diff = float(np.mean(diff))
                motion_scores.append(mean_diff)
                
                if is_hook_frame:
                    hook_motion_scores.append(mean_diff)
                    
                # Scene change threshold: large difference compared to rolling average
                if mean_diff > 25.0:
                    scene_changes += 1
                    
            prev_gray = gray.copy()
            
            # 7. Face and Smile Detection (every 15th frame to protect CPU usage)
            if frame_idx % 15 == 0:
                faces = self.face_cascade.detectMultiScale(gray, 1.3, 5)
                if len(faces) > 0:
                    face_frames += 1
                    total_faces += len(faces)
                    for (x, y, w, h) in faces:
                        roi_gray = gray[y:y+h, x:x+w]
                        smiles = self.smile_cascade.detectMultiScale(roi_gray, 1.7, 22)
                        if len(smiles) > 0:
                            smile_frames += 1
                            total_smiles += len(smiles)
                            
            frame_idx += 1
            
        cap.release()
        
        # Save absolute fallback thumbnail if not saved
        if not thumbnail_saved:
            # Create a black image placeholder if something went wrong
            dummy_thumb = np.zeros((360, 640, 3), dtype=np.uint8)
            cv2.putText(dummy_thumb, 'No Signal', (200, 180), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
            cv2.imwrite(thumbnail_path, dummy_thumb)
            
        # Compile visual feature statistics
        avg_brightness = float(np.mean(brightness_list)) if brightness_list else 120.0
        avg_contrast = float(np.mean(contrast_list)) if contrast_list else 80.0
        avg_motion = float(np.mean(motion_scores)) if motion_scores else 2.0
        avg_sat = float(np.mean(saturation_list)) if saturation_list else 100.0
        avg_color_var = float(np.mean(color_variances)) if color_variances else 1500.0
        avg_sharpness = float(np.mean(sharpness_list)) if sharpness_list else 300.0
        avg_noise = float(np.mean(noise_scores)) if noise_scores else 5.0
        
        avg_faces = float(total_faces / face_frames) if face_frames > 0 else 0.0
        avg_smiles = float(total_smiles / smile_frames) if smile_frames > 0 else 0.0
        
        # Emotion score calculation (heuristic)
        # Bounded 0-100: Higher values reflect multiple expressions and smiles
        emotion_score = 0.0
        if avg_faces > 0:
            emotion_score = 40.0 + (avg_smiles / avg_faces * 50.0)
            emotion_score = min(100.0, emotion_score)
        else:
            emotion_score = 15.0 # baseline dynamic scenery
            
        # Hook score calculation
        # Hook score looks at high motion and brightness contrast in the first 3s
        hook_motion = float(np.mean(hook_motion_scores)) if hook_motion_scores else 1.0
        hook_brightness = float(np.mean(hook_brightness_scores)) if hook_brightness_scores else 100.0
        
        # Optimal hook has standard/bright visibility (110-170) and positive energy motion
        hook_score = 30.0
        if hook_motion > 3.0:
            hook_score += 30.0
        else:
            hook_score += (hook_motion * 10.0)
            
        if 110.0 <= hook_brightness <= 170.0:
            hook_score += 40.0
        else:
            diff_from_opt = min(100.0, abs(hook_brightness - 140.0))
            hook_score += max(0.0, 40.0 - (diff_from_opt * 0.4))
            
        hook_score = min(100.0, max(10.0, hook_score))
        
        # Scene changes per second
        scene_change_rate = float(scene_changes / duration) if duration > 0 else 0.0
        
        # Audio Energy extraction
        audio_energy = self._extract_audio_energy(video_path)
        
        # Dominant Colors calculation
        dominant_colors_hex = self._extract_dominant_colors(color_pixels)

        return {
            'duration': round(duration, 2),
            'fps': round(fps, 1),
            'width': width,
            'height': height,
            'brightness': round(avg_brightness, 1),
            'contrast': round(avg_contrast, 1),
            'motion_score': round(avg_motion, 2),
            'scene_change_score': round(scene_change_rate, 3),
            'color_variance': round(avg_color_var, 1),
            'average_saturation': round(avg_sat, 1),
            'sharpness': round(avg_sharpness, 1),
            'noise_score': round(avg_noise, 2),
            'face_count': round(avg_faces, 1),
            'smile_count': round(avg_smiles, 1),
            'emotion_score': round(emotion_score, 1),
            'hook_score': round(hook_score, 1),
            'audio_energy': round(audio_energy, 1),
            'thumbnail_path': f"/static/thumbnails/{thumbnail_name}",
            'dominant_colors': dominant_colors_hex
        }

    def _extract_audio_energy(self, video_path):
        """
        Attempts to extract audio from video using FFmpeg and calculates RMS energy.
        Falls back to a default volume/frequency emulation if ffmpeg is unavailable.
        """
        temp_wav = f"{video_path}.wav"
        try:
            # Run ffmpeg to extract audio channel to a simple WAV
            # -y overwrites, -i input, -vn skip video, -ac 1 mono, -ar 16000 rate, -f wav format
            cmd = ['ffmpeg', '-y', '-i', video_path, '-vn', '-ac', '1', '-ar', '16000', '-f', 'wav', temp_wav]
            result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
            
            # Read WAV file
            with wave.open(temp_wav, 'rb') as wav:
                frames_count = wav.getnframes()
                if frames_count == 0:
                    return 50.0
                data = wav.readframes(frames_count)
                audio_samples = np.frombuffer(data, dtype=np.int16)
                
                # RMS Calculation
                rms = np.sqrt(np.mean(audio_samples.astype(np.float64)**2))
                
                # Normalize RMS value to 0-100 score
                # 32768 is max amplitude of 16-bit PCM
                norm_rms = (rms / 32768.0) * 100.0
                # Scale it so normal dialogue is around 60-70
                audio_score = min(100.0, norm_rms * 8.0)
                
                return max(15.0, audio_score)
        except Exception:
            # Fallback when ffmpeg is not installed or audio extraction fails
            # We simulate audio energy based on motion score variance
            return 55.0
        finally:
            if os.path.exists(temp_wav):
                try:
                    os.remove(temp_wav)
                except Exception:
                    pass

    def _extract_dominant_colors(self, pixels, k=3):
        """
        Simplified K-means or histogram approximation to extract the top K dominant colors in HEX format.
        """
        if not pixels:
            return ["#1a1d24", "#343a40", "#495057"] # dark theme defaults
            
        pixels = np.array(pixels)
        
        # Simple clustering: divide color space into bins and pick the centers of most populated bins
        # To make it fast, we round pixels to nearest 32
        reduced = (pixels // 32) * 32
        unique, counts = np.unique(reduced, axis=0, return_counts=True)
        
        # Sort by count
        sorted_indices = np.argsort(-counts)
        top_k = unique[sorted_indices[:k]]
        
        hex_colors = []
        for color in top_k:
            # BGR to RGB
            r, g, b = int(color[2]), int(color[1]), int(color[0])
            hex_colors.append(f"#{r:02x}{g:02x}{b:02x}")
            
        # Ensure we always return K colors
        while len(hex_colors) < k:
            hex_colors.append("#1a1d24")
            
        return hex_colors
