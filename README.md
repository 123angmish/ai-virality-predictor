# 🚀 AI Virality Predictor & Multi-Platform Optimizer

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![OpenCV](https://img.shields.io/badge/OpenCV-Computer%20Vision-5C3EE8?style=flat-square&logo=opencv&logoColor=white)](https://opencv.org/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-HistGradientBoosting-F7931E?style=flat-square&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

> **AI Virality Predictor** is a video intelligence and social media optimization platform that predicts the retention and viral engagement potential of short-form videos (YouTube Shorts, TikTok, Instagram Reels) using Computer Vision, Audio Signal Processing, and Machine Learning.

---

## 🔄 Project Evolution

An initial **Flask-based prototype** was developed during research work at **NIT Kurukshetra** to experiment with video feature extraction, optical motion tracking, and machine learning inference. The project was subsequently redesigned and expanded into a modular full-stack application featuring a **FastAPI backend** and a **Next.js 14 frontend** with multi-platform optimization tools and diagnostic reporting.

---

## 🏗️ System Architecture & Multimodal Pipeline

```mermaid
graph TD
    Video[Input Video .mp4 / .mov] --> Extractor[Multimodal Feature Extractor]
    
    subgraph CV ["1. Computer Vision (OpenCV)"]
        Extractor --> Hook["0-3s Hook Optical Flow Intensity"]
        Extractor --> Cuts["Scene Cut Frequency / Pace"]
        Extractor --> Color["Color Warmth & Vibrancy"]
        Extractor --> Aspect["Vertical Aspect Ratio (9:16)"]
    end
    
    subgraph AUDIO ["2. Audio Signal Processing (Librosa)"]
        Extractor --> RMS["Audio RMS Energy & Bass Peaks"]
        Extractor --> Speech["Speech Tempo (WPM Estimation)"]
    end
    
    subgraph ML ["3. Machine Learning (Scikit-Learn)"]
        Hook --> Model["HistGradientBoostingRegressor"]
        Cuts --> Model
        Color --> Model
        Aspect --> Model
        RMS --> Model
        Speech --> Model
        Model --> Score["Predicted ViralityScore (0-100)"]
    end
    
    subgraph RULES ["4. Platform Blueprint Engine"]
        Score --> TikTok["TikTok Optimization Plan"]
        Score --> Shorts["YouTube Shorts Blueprint"]
        Score --> Reels["Instagram Reels Plan"]
    end
```

---

## 🌟 Key Engineering Capabilities

### 1. Multimodal Feature Extraction
- **0–3s Hook Motion Flow**: Uses OpenCV optical flow to measure pixel motion velocity during the crucial first 3 seconds to quantify viewer drop-off resistance.
- **Scene Cut Detection**: Measures transitions and cuts-per-minute via frame-difference absolute thresholding (`cv2.absdiff`).
- **Audio RMS Energy Dynamics**: Calculates acoustic power transitions and peak energy bursts using Librosa.
- **Speech Tempo Analysis**: Evaluates spoken pace (target: 160–180 WPM) to evaluate pacing and script engagement.
- **Text & Caption Density**: Analyzes on-screen text distribution for sound-off mobile browsing.

### 2. Machine Learning Predictive Model
- **Algorithm**: `HistGradientBoostingRegressor` (Scikit-Learn).
- **Target**: `ViralityScore` (Continuous $0 - 100$ scale).
- **Dataset Formulation**: Trained on an empirical benchmark distribution of 10,000 synthesized video records parameterized by published social video distribution statistics (log-normal view/like distributions, optical motion, and audio energy correlations).
- **Model Evaluation (80/20 Train-Test Split)**:
  - **$R^2$ Score**: `0.8714`
  - **RMSE**: `7.7471`

### 3. Multi-Platform Blueprint Matrix (Heuristics)
- **TikTok**: Prioritizes opening hook velocity, rapid scene pacing (>20 cuts/min), and kinetic captions.
- **YouTube Shorts**: Prioritizes speech tempo (>160 WPM), high color vibrancy, and seamless loop design.
- **Instagram Reels**: Prioritizes aesthetic color grading and audio RMS peak synchronization.

### 4. Workspace & Data Isolation
- **Client-Side Session Management**: Per-user workspace and scan history partitioned in client-side storage (`localStorage`), allowing creators to save, compare, and export diagnostic audits.

---

## 📁 Repository Structure

```text
ai-virality-predictor/
├── backend/
│   ├── dataset_loader.py          # Empirical benchmark dataset generator
│   ├── train_model.py             # HistGradientBoosting ML training pipeline
│   ├── vision_audio_extractor.py  # OpenCV & Librosa feature extractor
│   ├── main.py                    # FastAPI application & prediction endpoints
│   ├── virality_model.pkl         # Trained model binary
│   ├── model_metadata.json        # Evaluation metrics & feature metadata
│   ├── requirements.txt           # Python backend dependencies
│   └── Dockerfile                 # Backend containerization
├── frontend/
│   ├── src/
│   │   ├── app/                   # Next.js 14 App Router pages
│   │   │   ├── page.js            # Studio scanner
│   │   │   ├── dashboard/         # Analytics overview
│   │   │   ├── analysis/[id]/     # Deep-dive report
│   │   │   ├── optimizer/         # Multi-platform blueprints
│   │   │   └── compare/           # A/B video comparison
│   │   ├── components/            # UI components & diagnostic widgets
│   │   └── lib/                   # API clients & storage helpers
│   ├── package.json               # Next.js & Tailwind dependencies
│   └── next.config.js
└── README.md
```

---

## ⚡ Quick Start (Local Setup)

### 1. Backend Server (FastAPI)
```bash
cd backend

# Create virtual environment
python -m venv venv

# Windows
venv\Scripts\activate
# Linux/macOS
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# (Optional) Re-train model
python train_model.py

# Start FastAPI server
uvicorn main:app --reload --port 8000
```
> FastAPI Docs: `http://127.0.0.1:8000/docs`

### 2. Frontend Application (Next.js)
```bash
cd frontend

# Install packages
npm install

# Start Next.js development server
npm run dev
```
> Web Application: `http://localhost:3000`

---

## 🎯 Technical Interview Discussion Points

1. **Why use `HistGradientBoostingRegressor` over traditional linear regression?**
   - Video virality relationships are non-linear (e.g., very high scene cut frequency past a threshold becomes disorienting and harms retention). Gradient boosted decision trees model non-linear feature interactions and non-monotonic relationships without requiring manual polynomial transformations.
2. **How does the feature extraction pipeline handle audio and video synchronization?**
   - Video frames and audio streams are processed in parallel: OpenCV extracts spatial and motion metadata from sampled frames, while Librosa loads the extracted audio track into the frequency domain for RMS energy and spectral tempo computation.

---

## 📄 License
This project is licensed under the **MIT License**.