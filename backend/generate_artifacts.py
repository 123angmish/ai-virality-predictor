"""
Artifact Generation Pipeline for AI Virality Predictor
Generates Permutation Feature Importance and Publication-Ready Visualizations:
1. predicted_vs_actual.png
2. residual_distribution.png
3. feature_importance.png
4. model_comparison.png
"""

import os
import json
import logging
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import HistGradientBoostingRegressor
from sklearn.inspection import permutation_importance
from sklearn.metrics import r2_score, mean_squared_error, mean_absolute_error
from dataset_loader import DatasetLoader, FEATURE_COLUMNS
from compare_models import evaluate_models

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("GenerateArtifacts")

ARTIFACTS_DIR = os.path.join(os.path.dirname(__file__), "artifacts")
os.makedirs(ARTIFACTS_DIR, exist_ok=True)

def generate_all_artifacts():
    # 1. Run model comparison
    comparison_data = evaluate_models()

    # 2. Train selected model
    loader = DatasetLoader(target_sample_size=10000, random_seed=42)
    df, _ = loader.load_dataset()

    X = df[FEATURE_COLUMNS]
    y = df["ViralityScore"]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = HistGradientBoostingRegressor(max_iter=200, max_depth=7, learning_rate=0.05, random_state=42)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    residuals = y_test - y_pred

    # 3. Permutation Feature Importance
    logger.info("Computing Permutation Feature Importance...")
    perm_importance = permutation_importance(model, X_test, y_test, n_repeats=10, random_state=42, n_jobs=-1)
    
    sorted_idx = perm_importance.importances_mean.argsort()[::-1]
    feature_ranking = []
    for idx in sorted_idx:
        feature_ranking.append({
            "feature": FEATURE_COLUMNS[idx],
            "importance_mean": round(float(perm_importance.importances_mean[idx]), 4),
            "importance_std": round(float(perm_importance.importances_std[idx]), 4)
        })

    with open(os.path.join(ARTIFACTS_DIR, "permutation_importance.json"), "w") as f:
        json.dump(feature_ranking, f, indent=2)

    # Plot 1: Feature Importance
    plt.figure(figsize=(9, 5))
    top_features = [f["feature"] for f in feature_ranking]
    top_means = [f["importance_mean"] for f in feature_ranking]
    top_stds = [f["importance_std"] for f in feature_ranking]
    colors = plt.cm.viridis(np.linspace(0.4, 0.85, len(top_features)))
    
    plt.barh(top_features[::-1], top_means[::-1], xerr=top_stds[::-1], color=colors, capsize=4)
    plt.xlabel("Permutation Importance (Mean Decrease in R² Score)", fontsize=11, fontweight="bold")
    plt.title("Permutation Feature Importance — HistGradientBoosting", fontsize=13, fontweight="bold", pad=12)
    plt.grid(axis="x", linestyle="--", alpha=0.6)
    plt.tight_layout()
    plt.savefig(os.path.join(ARTIFACTS_DIR, "feature_importance.png"), dpi=200)
    plt.close()

    # Plot 2: Predicted vs Actual
    plt.figure(figsize=(7, 7))
    plt.scatter(y_test, y_pred, alpha=0.25, color="#2563EB", edgecolors="none", s=18)
    min_val = min(y_test.min(), y_pred.min())
    max_val = max(y_test.max(), y_pred.max())
    plt.plot([min_val, max_val], [min_val, max_val], color="#DC2626", linestyle="--", linewidth=2, label="Perfect Fit (y = x)")
    r2 = r2_score(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    plt.xlabel("Actual Virality Score (Benchmark)", fontsize=11, fontweight="bold")
    plt.ylabel("Predicted Virality Score", fontsize=11, fontweight="bold")
    plt.title(f"Predicted vs Actual Virality Score\n(R² = {r2:.4f}, RMSE = {rmse:.4f})", fontsize=13, fontweight="bold", pad=12)
    plt.legend(loc="upper left")
    plt.grid(True, linestyle="--", alpha=0.5)
    plt.tight_layout()
    plt.savefig(os.path.join(ARTIFACTS_DIR, "predicted_vs_actual.png"), dpi=200)
    plt.close()

    # Plot 3: Residual Distribution
    plt.figure(figsize=(8, 5))
    plt.hist(residuals, bins=40, color="#059669", edgecolor="black", alpha=0.75, density=True)
    plt.axvline(0, color="#DC2626", linestyle="--", linewidth=1.5, label="Zero Error Mean")
    plt.xlabel("Residual Error (Actual - Predicted)", fontsize=11, fontweight="bold")
    plt.ylabel("Density", fontsize=11, fontweight="bold")
    plt.title(f"Residual Error Distribution (MAE = {mean_absolute_error(y_test, y_pred):.2f})", fontsize=13, fontweight="bold", pad=12)
    plt.legend()
    plt.grid(True, linestyle="--", alpha=0.5)
    plt.tight_layout()
    plt.savefig(os.path.join(ARTIFACTS_DIR, "residual_distribution.png"), dpi=200)
    plt.close()

    # Plot 4: Model Comparison
    models_res = comparison_data["results"]
    m_names = [m["model"] for m in models_res]
    m_r2 = [m["r2_score"] for m in models_res]
    m_rmse = [m["rmse"] for m in models_res]

    fig, ax1 = plt.subplots(figsize=(10, 5))
    x = np.arange(len(m_names))
    width = 0.35

    rects1 = ax1.bar(x - width/2, m_r2, width, label="R² Score (Higher is Better)", color="#3B82F6")
    ax2 = ax1.twinx()
    rects2 = ax2.bar(x + width/2, m_rmse, width, label="RMSE (Lower is Better)", color="#F97316")

    ax1.set_ylabel("R² Score", color="#1E40AF", fontweight="bold", fontsize=11)
    ax2.set_ylabel("RMSE Error", color="#C2410C", fontweight="bold", fontsize=11)
    ax1.set_xticks(x)
    ax1.set_xticklabels(m_names, rotation=15, ha="right", fontsize=9, fontweight="bold")
    plt.title("Model Benchmark Comparison on Multimodal Virality Dataset", fontsize=13, fontweight="bold", pad=12)
    
    # Combined legend
    lines1, labels1 = ax1.get_legend_handles_labels()
    lines2, labels2 = ax2.get_legend_handles_labels()
    ax1.legend(lines1 + lines2, labels1 + labels2, loc="upper left")

    plt.tight_layout()
    plt.savefig(os.path.join(ARTIFACTS_DIR, "model_comparison.png"), dpi=200)
    plt.close()

    logger.info("All visual and JSON artifacts successfully generated in 'backend/artifacts/'.")

if __name__ == "__main__":
    generate_all_artifacts()