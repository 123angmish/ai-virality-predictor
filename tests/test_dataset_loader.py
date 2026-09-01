import pytest
import numpy as np
import pandas as pd
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))
from dataset_loader import DatasetLoader, FEATURE_COLUMNS

def test_dataset_loader_shape_and_columns():
    loader = DatasetLoader(target_sample_size=500, random_seed=42)
    df, source = loader.load_dataset()
    
    assert len(df) == 500
    assert "ViralityScore" in df.columns
    for col in FEATURE_COLUMNS:
        assert col in df.columns
        assert not df[col].isnull().any()
    assert "Synthetic" in source

def test_dataset_loader_deterministic():
    loader1 = DatasetLoader(target_sample_size=100, random_seed=42)
    df1, _ = loader1.load_dataset()
    
    loader2 = DatasetLoader(target_sample_size=100, random_seed=42)
    df2, _ = loader2.load_dataset()
    
    pd.testing.assert_frame_equal(df1, df2)

def test_target_score_boundaries():
    loader = DatasetLoader(target_sample_size=1000, random_seed=42)
    df, _ = loader.load_dataset()
    
    assert df["ViralityScore"].min() >= 0.0
    assert df["ViralityScore"].max() <= 100.0