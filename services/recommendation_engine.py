class RecommendationEngine:
    @staticmethod
    def generate_recommendations(features, analysis_type='upload', metadata=None):
        """
        Evaluate video features and return actionable recommendations.
        """
        recs = []
        
        # 1. Hook Score (First 3 seconds)
        hook_score = features.get('hook_score', 50.0)
        if hook_score < 70:
            recs.append({
                'category': 'Hook & Retention',
                'title': 'Improve hook in first 3 seconds',
                'description': 'The initial 3 seconds lack motion or strong lighting contrast. Use text overlays, instant actions, or changes in camera angles to arrest user attention and prevent scrolls.',
                'severity': 'high'
            })
            
        # 2. Brightness
        brightness = features.get('brightness', 120.0)
        if brightness < 90:
            recs.append({
                'category': 'Visuals',
                'title': 'Increase scene brightness',
                'description': f'Your average brightness is low ({round(brightness, 1)}). Use additional studio lights, record near windows, or apply a brightness curve in post-processing.',
                'severity': 'medium'
            })
        elif brightness > 170:
            recs.append({
                'category': 'Visuals',
                'title': 'Reduce overexposure',
                'description': f'The lighting is extremely bright ({round(brightness, 1)}). Lower your camera exposure or diffuse strong light sources to avoid burning details.',
                'severity': 'low'
            })
            
        # 3. Motion & Camera Stability
        motion = features.get('motion_score', 3.0)
        if motion < 1.5:
            recs.append({
                'category': 'Production',
                'title': 'Introduce motion or overlays',
                'description': 'The scene is highly static. Integrate subtle camera panning, zoom-ins, slide-in graphics, or speaker hand gestures to keep the video visually stimulating.',
                'severity': 'medium'
            })
        elif motion > 12.0:
            recs.append({
                'category': 'Production',
                'title': 'Stabilize camera movement',
                'description': 'There is too much erratic camera shake or rapid action. Use a tripod or software stabilizers to make the content easier to follow.',
                'severity': 'medium'
            })
            
        # 4. Pacing / Cuts
        scene_change = features.get('scene_change_score', 0.1)
        if scene_change < 0.05:
            recs.append({
                'category': 'Pacing',
                'title': 'Increase cut frequency',
                'description': 'The average shot lasts too long. Try cutting to b-rolls, changing perspectives, or inserting visual resets every 4-6 seconds to maintain pacing.',
                'severity': 'high'
            })
        elif scene_change > 0.4:
            recs.append({
                'category': 'Pacing',
                'title': 'Slow down edits / cuts',
                'description': 'The cuts are extremely rapid. This can overwhelm viewers. Merge shorter cuts and let critical points rest on screen slightly longer.',
                'severity': 'low'
            })
            
        # 5. Face/Emotion presence
        faces = features.get('face_count', 0.0)
        emotion = features.get('emotion_score', 50.0)
        if faces == 0:
            recs.append({
                'category': 'Engagement',
                'title': 'Add human presence',
                'description': 'No human faces were detected. Videos with presenters or facecam overlays drive up to 40% higher direct connection and follow-through.',
                'severity': 'medium'
            })
        elif emotion < 40:
            recs.append({
                'category': 'Engagement',
                'title': 'Increase emotional expressions',
                'description': 'Faces are present, but expressiveness or smiling is low. Presenters should display more energy, expressive smiles, and emotional dynamics to match the narrative.',
                'severity': 'low'
            })
            
        # 6. Audio levels
        audio = features.get('audio_energy', 50.0)
        if audio < 45:
            recs.append({
                'category': 'Audio',
                'title': 'Boost voice volume & clarity',
                'description': f'Your audio energy is weak ({round(audio, 1)}). Boost your audio gain, remove background hum, or record closer to the microphone.',
                'severity': 'high'
            })
        elif audio > 85:
            recs.append({
                'category': 'Audio',
                'title': 'Apply audio limiter',
                'description': f'Audio levels are clipping or peaking too high ({round(audio, 1)}). Reduce master gain or apply a limiter filter to avoid auditory discomfort.',
                'severity': 'medium'
            })
            
        # 7. Sharpness and Noise
        sharpness = features.get('sharpness', 300.0)
        noise = features.get('noise_score', 5.0)
        if sharpness < 120:
            recs.append({
                'category': 'Quality',
                'title': 'Improve focus & resolution',
                'description': 'Your video sharpness is low. Clean your lens, optimize autofocus settings, or export in at least 1080p resolution.',
                'severity': 'medium'
            })
        if noise > 18:
            recs.append({
                'category': 'Quality',
                'title': 'Reduce digital grain',
                'description': f'High image noise detected ({round(noise, 1)}). Increase light levels to lower camera ISO, or use noise reduction in video editing suites.',
                'severity': 'low'
            })

        # 8. YouTube Specific analytics
        if analysis_type == 'youtube' and metadata:
            metrics = metadata.get('metrics', {})
            er = metrics.get('engagement_rate', 0.0)
            views = metadata.get('views', 0)
            
            if er < 3.0:
                recs.append({
                    'category': 'Analytics',
                    'title': 'Add clear CTAs (Call-to-Action)',
                    'description': f'The engagement rate ({er}%) is below optimal. Place on-screen indicators and verbal cues prompting viewers to "Like" or "Comment" within the first half.',
                    'severity': 'high'
                })
            if views > 10000 and er < 1.5:
                recs.append({
                    'category': 'Analytics',
                    'title': 'Improve video title description alignment',
                    'description': 'The video has solid traffic but low engagement. Ensure that expectations raised by the title and thumbnail are fully met within the video content.',
                    'severity': 'medium'
                })

        # Default fallback recommendation if everything is perfect
        if not recs:
            recs.append({
                'category': 'General',
                'title': 'Optimized for Virality',
                'description': 'Your video scores high across our core benchmarks. Focus on trend-jacking and cross-platform syndication to maximize outreach.',
                'severity': 'low'
            })
            
        return recs
