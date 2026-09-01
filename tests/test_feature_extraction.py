import pytest
import numpy as np
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))
from vision_audio_extractor import FeatureExtractor

def test_feature_extractor_fallback():
    extractor = FeatureExtractor()
    features = extractor.extract_from_file("non_existent_demo.mp4")
    
    assert isinstance(features, dict)
    assert "hook_motion_intensity" in features
    assert "scene_cut_rate" in features
    assert "audio_rms_energy" in features
    assert features["hook_motion_intensity"] > 0