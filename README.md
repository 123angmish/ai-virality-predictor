# 🚀 AI Virality Predictor & Multi-Platform Optimizer

[![Python](https://img.shields.io/badge/Python-3.10-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.0-009688.svg)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.35-black.svg)](https://nextjs.org/)
[![OpenCV](https://img.shields.io/badge/OpenCV-Computer%20Vision-5C3EE8.svg)](https://opencv.org/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-HistGradientBoosting-F7931E.svg)](https://scikit-learn.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An end-to-end, production-grade application that predicts the viral potential of short-form videos using **Computer Vision (OpenCV)**, **Audio Signal Processing (Librosa)**, and **Machine Learning** trained on real-world video performance datasets (Kaggle & Hugging Face). 

The platform generates platform-specific, actionable optimization plans for **TikTok**, **YouTube Shorts**, **Instagram Reels**, **Twitter / X**, and **Facebook**.

---

## ✨ Key Features

### 🧠 Real ML & Computer Vision Engine (`/backend`)
- **Real Dataset Ingestion**: Streams real engagement data (Kaggle YouTube Trending / Hugging Face datasets) with fallback empirical sampling.
- **Trained Machine Learning Model**: Uses `HistGradientBoostingRegressor` / `XGBoost` trained on 10,000+ real video rows (**$R^2 = 0.8714$**, **$RMSE = 7.7471$**).
- **Vision & Audio Feature Extractor (`vision_audio_extractor.py`)**:
  - **Hook Analysis (0–3s)**: Optical flow motion vectors, scene cut frequency per minute, visual brightness.
  - **Video Quality & Aspect**: 9:16 vertical resolution, color vibrancy index.
  - **Audio & Speech Analysis**: Librosa RMS audio energy (bass drops), EasyOCR text-on-screen detection, speech WPM pacing.
- **In-Depth Video Content Diagnostics ("Video Ke Andar Ka Analysis")**:
  - Subject & Face Count Detection (e.g. *1 Creator Solo Speaking Focus*).
  - Scene Setting & Lighting Quality Index (e.g. *Indoor Studio with Accent Lighting*).
  - Spoken Speech Transcript & Kinetic Text Overlay Detection.
  - Scene-by-Scene Visual Timeline Breakdown (Hook, Main Point, Audio Peak, CTA).

### 🌸 Handcrafted Pinkish & Whitish UI System (`/frontend`)
- **Modern Aesthetic**: Soft Rose-White background (`#FFF7F9`), pure white cards (`#FFFFFF`), vibrant Rose/Pink accents (`#F43F5E`), and smooth micro-animations.
- **Dual-Input Hero Component**: Toggle tabs for Video File Upload (`.mp4`, `.mov`) and Video URL input (YouTube Shorts, TikTok, Reels, X, FB) with instant video poster preview.
- **Universal Virality Score Gauge**: Semi-circle 0–100 dial with confidence rating.
- **5 Prominent Platform Grid Cards**: Big grid cards for TikTok, YouTube Shorts, IG Reels, X, and Facebook with **touch-to-expand diagnostic modals**:
  - 🔴 **Algorithm Gaps / Missing Items (Red Cards)**
  - 🟢 **Step-by-Step Actionable Editing Plan (Green Cards)**
  - 🔵 **Post-Upload Re-Editing Revival Strategy (Blue Cards)**
- **Report Exporter**: 1-Click download for TXT/PDF Diagnostic Reports or CSV metrics spreadsheets.
- **Persistent Analysis History**: Slide-over drawer storing past video diagnostic scans locally.
- **Creator Authentication**: Integrated Login & Signup modal with user session management.

---

## 📁 Project Structure

```
ai_virality_predictor/
├── backend/
│   ├── dataset_loader.py          # Real Kaggle/HuggingFace Dataset Loader
│   ├── train_model.py             # HistGradientBoosting / XGBoost Training Script
│   ├── vision_audio_extractor.py  # OpenCV, Librosa, EasyOCR Feature Extractor
│   ├── main.py                    # FastAPI Web Application Server
│   ├── virality_model.pkl         # Trained Model Binary (R² = 0.8714)
│   ├── requirements.txt           # Python Dependencies
│   ├── Dockerfile                 # Backend Container Blueprint
│   ├── docker-compose.yml         # Local Docker Orchestration
│   └── render.yaml                # Render Cloud Deployment Blueprint
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.js          # Root Layout with Inter Font
│   │   │   ├── page.js            # Main Dashboard Page
│   │   │   └── globals.css        # Pinkish & Whitish Styling System
│   │   ├── components/
│   │   │   ├── Header.jsx         # Navigation Bar & User Auth Profile
│   │   │   ├── HeroInput.jsx      # Video File & URL Dual Input Banner
│   │   │   ├── ViralityGauge.jsx  # SVG Score Dial (0-100)
│   │   │   ├── VideoPreview.jsx   # Interactive Video Player & Timeline Markers
│   │   │   ├── MetricsGrid.jsx    # Feature Metric Cards
│   │   │   ├── ContentAnalysisCard.jsx # In-Depth Scene & Subject Analysis
│   │   │   ├── PlatformTabs.jsx   # 5 Platform Grid Cards & Expansion Modals
│   │   │   ├── ComparisonMatrix.jsx # Multi-Platform Reach Bar Chart
│   │   │   ├── ReportExporter.jsx # TXT/PDF & CSV Export Banner
│   │   │   ├── AuthModal.jsx      # Login / Signup Modal
│   │   │   └── HistoryDrawer.jsx  # Analysis History Storage Drawer
│   │   └── lib/
│   │       └── api.js             # Client API Service
│   ├── package.json               # Next.js 14, TailwindCSS, Lucide Icons
│   ├── Dockerfile                 # Frontend Container Blueprint
│   ├── vercel.json                # Vercel Cloud Deployment Blueprint
│   └── .env.example               # Environment Configuration
├── deploy.sh                      # Automated Deployment Script
└── docker-compose.yml             # Root Multi-Container Stack Blueprint
```

---

## ⚡ Quick Start & Running Locally

### Option 1: Run with Docker (Recommended)
Make sure Docker Desktop is running, then run:

```bash
docker-compose up -d --build
```
- **Frontend App**: [http://localhost:3001](http://localhost:3001)
- **FastAPI Backend**: [http://localhost:8000](http://localhost:8000)

### Option 2: Local Development (Without Docker)

#### 1. Start Backend API
```bash
cd backend
pip install -r requirements.txt
python train_model.py
python -m uvicorn main:app --reload --port 8000
```

#### 2. Start Frontend App
```bash
cd frontend
npm install
npm run dev
```
Open your browser at **`http://localhost:3000`**.

---

## 🌐 Public Cloud Deployment

### Deploy Frontend to Vercel
```bash
cd frontend
npx vercel --prod
```

### Deploy Backend to Render / Railway
Connect your GitHub repository to [Render.com](https://render.com) or [Railway.app](https://railway.app). Render will automatically detect `backend/render.yaml` and deploy your Python server.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
