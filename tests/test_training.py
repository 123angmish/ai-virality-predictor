import pytest
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))
from dataset_loader import DatasetLoader, FEATURE_COLUMNS
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_squared_error

def test_model_training_convergence():
    loader = DatasetLoader(target_sample_size=1000, random_seed=42)
    df, _ = loader.load_dataset()
    
    X = df[FEATURE_COLUMNS]
    y = df["ViralityScore"]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    model = LinearRegression()
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    
    r2 = r2_score(y_test, y_pred)
    assert r2 > 0.80  # Linear regression explains target variance cleanly