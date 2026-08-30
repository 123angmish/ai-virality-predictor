"""
Dataset Generator for AI Virality Predictor
Generates a standardized Synthetic Audiovisual Virality Benchmark parameterized by
controlled synthetic distributions chosen to simulate plausible audiovisual feature ranges
(log-normal view/like ratios, Rayleigh hook velocities, Beta retention, and multimodal features).
"""

import os
import json
import logging
import numpy as np
import pandas as pd
from typing import Tuple, Dict, Any

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("DatasetLoader")

FEATURE_COLUMNS = [
    "hook_motion_intensity",
    "scene_cut_rate",
    "audio_rms_energy",
    "transcript_wpm",
    "text_overlay_ratio",
    "color_vibrancy",
    "resolution_aspect"
]

class DatasetLoader:
    """
    Synthetic Benchmark Generator for pipeline validation.
    
    Explicitly operates on controlled synthetic distributions to evaluate ML algorithms
    and platform blueprint heuristic logic in a reproducible testbed.
    """
    def __init__(self, target_sample_size: int = 10000, random_seed: int = 42):
        self.target_sample_size = target_sample_size
        self.random_seed = random_seed
        self.dataset_source = "Synthetic Audiovisual Virality Benchmark (10,000 records, Seed 42)"

    def generate_synthetic_benchmark_dataset(self) -> pd.DataFrame:
        """
        Synthesizes a standardized multimodal benchmark dataset using controlled synthetic distributions
        chosen to simulate plausible audiovisual feature ranges for model validation.
        """
        logger.info(f"Generating synthetic benchmark dataset with {self.target_sample_size} records (seed={self.random_seed})...")
        np.random.seed(self.random_seed)
        n = self.target_sample_size

        # Controlled synthetic distributions modeling plausible short-form video engagement bounds
        views = np.random.lognormal(mean=10.5, sigma=1.8, size=n).astype(int) + 100
        likes = (views * np.random.uniform(0.04, 0.14, size=n)).astype(int)
        shares = (views * np.random.uniform(0.01, 0.06, size=n)).astype(int)
        comments = (views * np.random.uniform(0.005, 0.03, size=n)).astype(int)
        watch_time_retention = np.random.beta(a=2.5, b=2.0, size=n) * 100.0

        # Simulated Computer Vision & Audio signal feature ranges
        hook_motion_intensity = np.random.uniform(10.0, 95.0, size=n)
        scene_cut_rate = np.random.uniform(2.0, 30.0, size=n)
        audio_rms_energy = np.random.uniform(0.1, 0.95, size=n)
        transcript_wpm = np.random.uniform(110, 240, size=n)
        text_overlay_ratio = np.random.uniform(0.0, 0.8, size=n)
        color_vibrancy = np.random.uniform(20.0, 98.0, size=n)
        resolution_aspect = np.random.choice([0.5625, 1.0, 1.777], size=n, p=[0.7, 0.15, 0.15])

        # Engineered synthetic target: weighted linear combination with Gaussian noise
        raw_score = (
            (hook_motion_intensity * 0.35) +
            (scene_cut_rate * 1.5) +
            (audio_rms_energy * 25.0) +
            (transcript_wpm * 0.15) +
            (text_overlay_ratio * 20.0) +
            (color_vibrancy * 0.25) +
            (resolution_aspect * 15.0) +
            (watch_time_retention * 0.3) +
            np.random.normal(0, 3.0, size=n)
        )

        min_s = np.min(raw_score)
        max_s = np.max(raw_score)
        virality_score = 10.0 + ((raw_score - min_s) / (max_s - min_s)) * 88.0

        df = pd.DataFrame({
            "views": views,
            "likes": likes,
            "shares": shares,
            "comments": comments,
            "watch_time_retention": np.round(watch_time_retention, 2),
            "hook_motion_intensity": np.round(hook_motion_intensity, 2),
            "scene_cut_rate": np.round(scene_cut_rate, 2),
            "audio_rms_energy": np.round(audio_rms_energy, 4),
            "transcript_wpm": np.round(transcript_wpm, 1),
            "text_overlay_ratio": np.round(text_overlay_ratio, 3),
            "color_vibrancy": np.round(color_vibrancy, 2),
            "resolution_aspect": resolution_aspect,
            "ViralityScore": np.round(virality_score, 2)
        })

        return df

    def load_dataset(self) -> Tuple[pd.DataFrame, str]:
        df = self.generate_synthetic_benchmark_dataset()
        return df, self.dataset_source