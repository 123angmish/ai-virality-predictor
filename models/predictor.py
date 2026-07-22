import os
import json
import numpy as np
import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from config import Config

# Expected feature names for our model
FEATURE_COLUMNS = [
    'duration', 'fps', 'width', 'height', 'brightness', 'contrast',
    'motion_score', 'scene_change_score', 'color_variance',
    'average_saturation', 'sharpness', 'noise_score', 'face_count',
    'smile_count', 'emotion_score', 'hook_score', 'audio_energy'
]

class ViralityPredictor:
    def __init__(self):
        self.model_path = os.path.join(Config.TRAINED_MODEL_FOLDER, 'virality_model.json')
        self.model = None
        self._load_or_train_model()

    def _generate_synthetic_data(self, n_samples=1000):
        """
        Generate a synthetic dataset to train the default model.
        This represents realistic video features correlated to virality scores.
        """
        np.random.seed(42)
        
        # Features
        duration = np.random.uniform(5, 120, n_samples) # 5s to 2 mins
        fps = np.random.choice([24, 30, 60], n_samples)
        width = np.random.choice([1280, 1920, 1080], n_samples) # mix of landscape/portrait
        height = np.random.choice([720, 1080, 1920], n_samples)
        
        brightness = np.random.uniform(50, 200, n_samples) # 0-255
        contrast = np.random.uniform(30, 150, n_samples)
        motion_score = np.random.uniform(0.1, 15.0, n_samples)
        scene_change_score = np.random.uniform(0.01, 0.5, n_samples)
        color_variance = np.random.uniform(500, 5000, n_samples)
        average_saturation = np.random.uniform(30, 200, n_samples)
        sharpness = np.random.uniform(50, 1000, n_samples)
        noise_score = np.random.uniform(1.0, 50.0, n_samples)
        
        face_count = np.random.choice([0, 1, 2, 3, 5], n_samples, p=[0.4, 0.4, 0.1, 0.08, 0.02])
        smile_count = np.random.choice([0, 1, 2], n_samples, p=[0.6, 0.3, 0.1])
        emotion_score = np.random.uniform(0, 100, n_samples)
        
        # Hook score: brightness / motion in first 3s
        hook_score = np.random.uniform(10, 100, n_samples)
        audio_energy = np.random.uniform(20, 95, n_samples)
        
        df = pd.DataFrame({
            'duration': duration, 'fps': fps, 'width': width, 'height': height,
            'brightness': brightness, 'contrast': contrast, 'motion_score': motion_score,
            'scene_change_score': scene_change_score, 'color_variance': color_variance,
            'average_saturation': average_saturation, 'sharpness': sharpness,
            'noise_score': noise_score, 'face_count': face_count, 'smile_count': smile_count,
            'emotion_score': emotion_score, 'hook_score': hook_score, 'audio_energy': audio_energy
        })
        
        # Synthesize target variable: Virality Score (0-100)
        # Viral videos tend to:
        # - have high hook_score (> 70)
        # - have higher motion_score (but not chaotic)
        # - have high sharpness, good brightness (100-160), decent contrast
        # - have face_count >= 1 with smiles
        # - be shorter (e.g. 15-60s for TikTok/Shorts format)
        
        target = (
            df['hook_score'] * 0.35 +
            df['audio_energy'] * 0.15 +
            np.where((df['duration'] >= 10) & (df['duration'] <= 45), 20, 5) +
            np.where((df['brightness'] >= 90) & (df['brightness'] <= 160), 10, 0) +
            df['motion_score'] * 0.8 +
            np.where(df['face_count'] > 0, 10, 0) +
            df['smile_count'] * 5 +
            np.random.normal(0, 5, n_samples) # noise
        )
        
        # Normalize target to 0-100 range
        target = np.clip((target - target.min()) / (target.max() - target.min()) * 100, 5, 98)
        df['virality'] = target
        
        return df

    def _load_or_train_model(self):
        """
        Loads the XGBoost model from file, or trains a dummy/synthetic model if not found.
        """
        self.model = xgb.XGBRegressor(
            n_estimators=100,
            max_depth=5,
            learning_rate=0.08,
            random_state=42
        )
        
        if os.path.exists(self.model_path):
            try:
                self.model.load_model(self.model_path)
                return
            except Exception as e:
                # If error loading, we will re-train
                pass
                
        # Train model with synthetic data
        df = self._generate_synthetic_data()
        X = df[FEATURE_COLUMNS]
        y = df['virality']
        
        self.model.fit(X, y)
        self.model.save_model(self.model_path)

    def predict(self, feature_dict):
        """
        Predict the virality score and calculate confidence & performance class.
        
        Args:
            feature_dict (dict): Dictionary containing the extracted features.
            
        Returns:
            dict: {
                'virality_score': float,
                'confidence': float,
                'performance_class': str
            }
        """
        # Formulate input vector
        input_data = {}
        for col in FEATURE_COLUMNS:
            input_data[col] = [float(feature_dict.get(col, 0))]
            
        df_input = pd.DataFrame(input_data)
        
        # Predict virality score
        pred_score = float(self.model.predict(df_input)[0])
        pred_score = max(0.0, min(100.0, pred_score))
        
        # Calculate confidence:
        # Based on features standard bounds. If features are within standard range, confidence is high.
        # If duration is extreme or inputs are 0, confidence is lower.
        confidence = 95.0
        if feature_dict.get('width', 0) < 320 or feature_dict.get('height', 0) < 240:
            confidence -= 15.0
        if feature_dict.get('fps', 0) < 15:
            confidence -= 10.0
        if feature_dict.get('duration', 0) > 300: # model trained on short vids
            confidence -= 15.0
        if feature_dict.get('noise_score', 0) > 35:
            confidence -= 8.0
            
        confidence = max(50.0, min(99.0, confidence))
        
        # Determine performance class
        if pred_score >= 80:
            performance_class = "Excellent"
        elif pred_score >= 60:
            performance_class = "Good"
        elif pred_score >= 40:
            performance_class = "Average"
        else:
            performance_class = "Poor"
            
        return {
            'virality_score': round(pred_score, 1),
            'confidence': round(confidence, 1),
            'performance_class': performance_class
        }

    def get_feature_importances(self):
        """
        Get the relative feature importance scores.
        """
        importances = self.model.feature_importances_
        importance_dict = {}
        for col, imp in zip(FEATURE_COLUMNS, importances):
            importance_dict[col] = float(imp)
        return importance_dict
