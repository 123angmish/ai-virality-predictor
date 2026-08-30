"""
Machine Learning Training Pipeline for AI Virality Predictor
Trains HistGradientBoostingRegressor on the synthetic multimodal benchmark dataset.
Calculates ViralityScore (0-100), R² score, RMSE, and MAE.
"""

import os
import json
import pickle
import logging
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import HistGradientBoostingRegressor
from sklearn.metrics import r2_score, mean_squared_error, mean_absolute_error
from dataset_loader import DatasetLoader, FEATURE_COLUMNS

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("TrainModel")

MODEL_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(MODEL_DIR, "virality_model.pkl")
META_PATH = os.path.join(MODEL_DIR, "model_metadata.json")

def train_and_save_model():
    logger.info("Initializing Synthetic Benchmark Ingestion...")
    loader = DatasetLoader(target_sample_size=10000, random_seed=42)
    df, dataset_source = loader.load_dataset()

    X = df[FEATURE_COLUMNS]
    y = df["ViralityScore"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    logger.info(f"Training HistGradientBoostingRegressor model on {len(X_train)} samples...")
    model = HistGradientBoostingRegressor(
        max_iter=200,
        learning_rate=0.05,
        max_depth=7,
        random_state=42
    )
    model.fit(X_train, y_train)

    # Evaluation
    y_pred = model.predict(X_test)
    r2 = float(r2_score(y_test, y_pred))
    rmse = float(np.sqrt(mean_squared_error(y_test, y_pred)))
    mae = float(mean_absolute_error(y_test, y_pred))

    logger.info(f"Model Evaluation Results -> R² Score: {r2:.4f} | RMSE: {rmse:.4f} | MAE: {mae:.4f}")

    # Save model binary
    with open(MODEL_PATH, "wb") as f:
        pickle.dump(model, f)

    # Save model metadata
    metadata = {
        "dataset_source": dataset_source,
        "sample_size": len(df),
        "train_samples": len(X_train),
        "test_samples": len(X_test),
        "algorithm": "HistGradientBoostingRegressor",
        "parameters": {
            "max_iter": 200,
            "learning_rate": 0.05,
            "max_depth": 7,
            "random_state": 42
        },
        "r2_score": round(r2, 4),
        "rmse": round(rmse, 4),
        "mae": round(mae, 4),
        "feature_columns": FEATURE_COLUMNS,
        "target": "ViralityScore"
    }

    with open(META_PATH, "w") as f:
        json.dump(metadata, f, indent=2)

    logger.info(f"Model successfully saved to '{MODEL_PATH}'")
    logger.info(f"Metadata saved to '{META_PATH}'")
    return metadata

if __name__ == "__main__":
    train_and_save_model()