import pytest
import pickle
import os
import sys
import numpy as np
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))
from dataset_loader import FEATURE_COLUMNS

def test_saved_model_inference():
    model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend", "virality_model.pkl"))
    assert os.path.exists(model_path)
    
    with open(model_path, "rb") as f:
        model = pickle.load(f)
        
    sample_input = np.array([[65.0, 18.0, 0.65, 165.0, 0.45, 75.0, 0.5625]])
    prediction = model.predict(sample_input)
    
    assert len(prediction) == 1
    assert 0.0 <= prediction[0] <= 100.0