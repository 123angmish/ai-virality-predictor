# 🚀 AI Virality Predictor & Multi-Platform Optimizer

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel%20Production-10B981?style=for-the-badge&logo=vercel)](https://ai-virality-predictor.vercel.app/)
[![API Docs](https://img.shields.io/badge/FastAPI%20Docs-Render%20Cloud-0284C7?style=for-the-badge&logo=fastapi)](https://ai-virality-predictor.onrender.com/docs)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![OpenCV](https://img.shields.io/badge/OpenCV-Computer%20Vision-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white)](https://opencv.org/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-HistGradientBoosting-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)

> **Topics & Tags**: `machine-learning` • `computer-vision` • `fastapi` • `nextjs` • `python` • `opencv` • `librosa` • `virality-predictor` • `video-intelligence` • `social-media-ai` • `youtube-shorts` • `tiktok-algorithm` • `instagram-reels` • `scikit-learn` • `tailwind-css`

---

## 📌 Overview

**AI Virality Predictor & Multi-Platform Optimizer** is an end-to-end, production-grade AI SaaS application that predicts the viral potential of short-form videos before publishing.

It combines **Computer Vision (OpenCV)** for optical motion & scene cut pacing, **Audio Signal Processing (Librosa)** for acoustic energy peaks, and **Machine Learning (`HistGradientBoostingRegressor`)** trained on 10,000+ real engagement video rows ($R^2 = 0.8714$, $RMSE = 7.7471$) to generate actionable optimization plans for **YouTube Shorts**, **TikTok**, **Instagram Reels**, **X (Twitter)**, and **Facebook Reels**.

---

## 🌐 Live Cloud Deployments

| Component | URL | Status |
| :--- | :--- | :--- |
| **Frontend Application (Next.js)** | [https://ai-virality-predictor.vercel.app/](https://ai-virality-predictor.vercel.app/) | 🟢 Live on Vercel |
| **Diagnostic Report Engine** | [https://ai-virality-predictor.vercel.app/analysis/1](https://ai-virality-predictor.vercel.app/analysis/1) | 🟢 Live on Vercel |
| **Team Workspace** | [https://ai-virality-predictor.vercel.app/team](https://ai-virality-predictor.vercel.app/team) | 🟢 Live on Vercel |
| **Platform Optimizer** | [https://ai-virality-predictor.vercel.app/optimizer](https://ai-virality-predictor.vercel.app/optimizer) | 🟢 Live on Vercel |
| **Backend API Docs (Swagger)** | [https://ai-virality-predictor.onrender.com/docs](https://ai-virality-predictor.onrender.com/docs) | 🟢 Live on Render |

---

## ✨ Key Features & Capabilities

### 🧠 1. Multimodal AI & Feature Extraction Engine (`/backend`)
- **0–3s Hook Optical Flow**: Measures instantaneous motion flow to stop viewer scrolling.
- **Scene Cut Frequency**: Calculates cuts-per-minute pacing via frame difference thresholds (`cv2.absdiff`).
- **Audio RMS Energy & Bass Drops**: Analyzes acoustic energy transitions using Librosa.
- **Speech Tempo & WPM**: Analyzes spoken speech pace (160–180 WPM target for optimal retention).
- **Text Overlay Ratio**: Calculates on-screen caption density for sound-off mobile scrolling.
- **Color Vibrancy & 9:16 Aspect**: Evaluates color grading warmth and vertical video resolution.

### 📝 2. Full AI Video Summarization & Scene Detection
- **Executive Video Narrative & Core Thesis**: Automatically detects video subject matter and core arguments.
- **Key Takeaways & Hashtags**: Generates 3 actionable summary bullets and niche tags.
- **Timestamped Scene Breakdown**: Frame-by-frame scene transitions with optical motion level badges (`High 82%`, `Medium 65%`).

### 🎯 3. Multi-Platform Algorithm Fit Matrix
- **TikTok**: Prioritizes opening hook velocity, rapid scene cuts (>20/min), and kinetic captions.
- **YouTube Shorts**: Prioritizes speech tempo (>160 WPM), high color vibrancy, and seamless loop transitions.
- **Instagram Reels**: Prioritizes studio lighting aesthetics and audio RMS peak synchronization.
- **Twitter / X & Facebook Reels**: Prioritizes burnt-in subtitle coverage for muted feed autoplay.

### 👥 4. Team Workspace & Collaboration (`/team`)
- **Member Management**: Invite editors and growth managers with role-based access control (Admin, Analyst, Viewer).
- **Shared Campaign Folders**: Multi-platform video projects with aggregate virality benchmarks.
- **Live Audit Feed**: Real-time activity timeline tracking scans and report exports.

### 🔒 5. Authentication, Per-User History & Privacy (`/auth` & `/settings`)
- **Per-User Isolated History**: Each registered account only sees its own saved video diagnostics (`virality_history_{user_email}`).
- **Password Strength Meter & Encryption**: Real client session tokens and credential management.
- **Data Privacy Controls**: Data retention selector (30 days to indefinite) and benchmark opt-out.

---

## 📁 Repository Structure

```
ai_virality_predictor/
├── backend/
│   ├── dataset_loader.py          # Kaggle & HuggingFace Real Dataset Ingestor
│   ├── train_model.py             # HistGradientBoosting ML Training Pipeline
│   ├── vision_audio_extractor.py  # OpenCV, Librosa & OCR Multimodal Extractor
│   ├── main.py                    # FastAPI Web Application & Prediction Endpoints
│   ├── virality_model.pkl         # Trained Model Binary (R² = 0.8714)
│   ├── model_metadata.json        # Evaluation Metrics & Feature Metadata
│   ├── requirements.txt           # Python Dependencies
│   └── render.yaml                # Render Cloud Deployment Blueprint
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.js            # Hero Studio & Quick Scan
│   │   │   ├── dashboard/         # Main Creator Dashboard
│   │   │   ├── analysis/[id]/     # Full Diagnostic Audit & Video Summary
│   │   │   ├── team/              # Collaborative Team Workspace
│   │   │   ├── optimizer/         # Multi-Platform Blueprint Studio
│   │   │   ├── compare/           # Side-by-Side Video A/B Comparison
│   │   │   ├── history/           # Per-User Isolated History
│   │   │   ├── auth/              # Secured Login & Signup
│   │   │   └── settings/          # Account & Privacy Controls
│   │   ├── components/
│   │   │   ├── analysis/          # Diagnostic Cards, Hook Lab & Summary
│   │   │   └── layout/            # Navigation & Sidebar Layouts
│   │   └── lib/
│   │       ├── api.js             # Client API Service & Data Enrichment
│   │       └── storage.js         # Isolated Per-User Local Persistence
│   ├── package.json               # Next.js 14, Tailwind CSS, Lucide Icons
│   └── vercel.json                # Vercel Deployment Configuration
└── README.md                      # Comprehensive Documentation
```

---

## ⚡ Quick Start (Run Locally)

### 1. Start Backend Server
```bash
cd backend
pip install -r requirements.txt
python train_model.py
python -m uvicorn main:app --reload --port 8000
```
API runs at **`http://127.0.0.1:8000`** (Docs at `/docs`).

### 2. Start Frontend App
```bash
cd frontend
npm install
npm run dev
```
Open your browser at **`http://localhost:3000`**.

---

## 📄 License
This project is licensed under the MIT License.
