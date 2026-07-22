import yt_dlp
import math
from datetime import datetime

class YouTubeExtractor:
    @staticmethod
    def extract_metadata(url):
        """
        Uses yt-dlp to extract video metadata from a YouTube URL.
        Includes robust error handling and fallbacks.
        """
        ydl_opts = {
            'quiet': True,
            'no_warnings': True,
            'skip_download': True,
            'extract_flat': False,
            'youtube_include_dash_manifest': False,
        }
        
        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=False)
                
            if not info:
                raise ValueError("Could not extract video metadata from the URL.")
                
            # Extract basic fields with fallbacks
            title = info.get('title', 'Unknown YouTube Video')
            uploader = info.get('uploader', 'Unknown Creator')
            views = int(info.get('view_count') or 0)
            likes = int(info.get('like_count') or 0)
            comments = int(info.get('comment_count') or 0)
            duration = float(info.get('duration') or 0.0)
            thumbnail = info.get('thumbnail', '')
            description = info.get('description', '')
            
            # Formatting upload date
            upload_date_str = info.get('upload_date', '')
            upload_date = 'Unknown'
            if upload_date_str:
                try:
                    upload_date = datetime.strptime(upload_date_str, '%Y%m%d').strftime('%B %d, %Y')
                except Exception:
                    upload_date = upload_date_str

            # 1. Engagement Rate: ((Likes + Comments) / Views) * 100
            engagement_rate = 0.0
            if views > 0:
                engagement_rate = ((likes + comments) / views) * 100
            engagement_rate = round(engagement_rate, 2)
            
            # 2. Popularity Score: Logarithmic views score scaled to 0-100
            # 10M views is considered 100.
            popularity_score = 0.0
            if views > 0:
                popularity_score = (math.log10(views) / 7.0) * 100
            popularity_score = round(max(5.0, min(100.0, popularity_score)), 1)
            
            # 3. Performance Score: Blends absolute engagement and view numbers
            # Standard engagement benchmark is ~4%.
            perf_factor = min(1.0, engagement_rate / 4.0)
            pop_factor = popularity_score / 100.0
            performance_score = (perf_factor * 60.0) + (pop_factor * 40.0)
            performance_score = round(max(5.0, min(100.0, performance_score)), 1)
            
            # 4. Virality Probability: Higher engagement rate + views velocity increases this
            # Shorter videos with high engagement are highly virality-prone
            virality_prob = 10.0
            if engagement_rate > 8.0:
                virality_prob += 40.0
            elif engagement_rate > 4.0:
                virality_prob += 25.0
            else:
                virality_prob += (engagement_rate * 5.0)
                
            if duration > 0 and duration < 60: # Shorts style has higher virality potential
                virality_prob += 20.0
            elif duration > 0 and duration < 180:
                virality_prob += 10.0
                
            if views > 1000000:
                virality_prob += 15.0
            elif views > 100000:
                virality_prob += 10.0
                
            # Add small random fluctuation to simulate ML model inference variety
            virality_prob = round(max(0.0, min(100.0, virality_prob)), 1)
            
            # Create feature dictionary matching XGBoost expected input
            feature_dict = {
                'duration': duration,
                'fps': 30.0, # Default / placeholder for URL analysis
                'width': 1920.0, # Default
                'height': 1080.0, # Default
                'brightness': 120.0, # Benchmark average
                'contrast': 80.0, # Benchmark average
                'motion_score': 5.0, # Benchmark
                'scene_change_score': 0.1,
                'color_variance': 2000.0,
                'average_saturation': 110.0,
                'sharpness': 400.0,
                'noise_score': 5.0,
                'face_count': 1.0,
                'smile_count': 0.0,
                'emotion_score': 50.0,
                'hook_score': min(100.0, max(10.0, engagement_rate * 10.0)),
                'audio_energy': 70.0
            }
            
            return {
                'success': True,
                'title': title,
                'uploader': uploader,
                'views': views,
                'likes': likes,
                'comments': comments,
                'upload_date': upload_date,
                'duration': duration,
                'thumbnail': thumbnail,
                'description': description[:300] + "..." if len(description) > 300 else description,
                'metrics': {
                    'engagement_rate': engagement_rate,
                    'popularity_score': popularity_score,
                    'performance_score': performance_score,
                    'virality_probability': virality_prob
                },
                'features': feature_dict
            }
            
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
