# 🚀 AI Virality Predictor & Multi-Platform Optimizer

> **An AI-powered "Doctor for Short-Form Videos"** that predicts virality scores, identifies retention flaws, and generates platform-specific editing blueprints before you post on **YouTube Shorts, TikTok, and Instagram Reels**.

[![Live App](https://img.shields.io/badge/Live%20Demo-Vercel-10B981?style=for-the-badge&logo=vercel&logoColor=white)](https://ai-virality-predictor.vercel.app/)
[![API Docs](https://img.shields.io/badge/API%20Docs-Swagger-0284C7?style=for-the-badge&logo=fastapi&logoColor=white)](https://ai-virality-predictor.onrender.com/docs)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-ML%20Model-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![OpenCV](https://img.shields.io/badge/OpenCV-Computer%20Vision-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white)](https://opencv.org/)

---

## 📌 What is this project? (In Simple Words)

When content creators upload a video to YouTube Shorts, TikTok, or Instagram Reels, **over 70% of viewers drop off in the first 3 seconds**. 

Existing analytics tools (like YouTube Studio) only tell creators what went wrong **AFTER** the video has already failed.

**AI Virality Predictor** solves this by acting as a **pre-publish diagnostic tool**:
1. You upload your video file (`.mp4`, `.mov`) or paste a video link.
2. The AI scans the video's **visual motion, scene cut pacing, and audio energy**.
3. It gives you a **0–100 Virality Score**, a **full AI video summary**, and a **step-by-step editing checklist** to fix drop-offs before you publish.

---

## 🌐 Live Links

- 🖥️ **Live Web Application**: [https://ai-virality-predictor.vercel.app/](https://ai-virality-predictor.vercel.app/)
- 🔬 **Diagnostic Report Engine**: [https://ai-virality-predictor.vercel.app/analysis/1](https://ai-virality-predictor.vercel.app/analysis/1)
- 👥 **Team Workspace**: [https://ai-virality-predictor.vercel.app/team](https://ai-virality-predictor.vercel.app/team)
- ⚡ **Platform Optimizer**: [https://ai-virality-predictor.vercel.app/optimizer](https://ai-virality-predictor.vercel.app/optimizer)
- 📖 **Backend API Documentation (Swagger)**: [https://ai-virality-predictor.onrender.com/docs](https://ai-virality-predictor.onrender.com/docs)

---

## 🏗️ How It Works (Architecture Flow)

```text
  [ User Uploads Video / Link ]
               │
               ▼
  ┌─────────────────────────────────────────────────────────┐
  │         Feature Extraction Engine (FastAPI Backend)     │
  │  • OpenCV  ──► 0-3s Hook Motion & Scene Cut Frequency   │
  │  • Librosa ──► Audio RMS Energy, Volume & Bass Drops    │
  │  • OCR/WPM ──► Speech Tempo (Words/Min) & Text Captions │
  └────────────────────────────┬────────────────────────────┘
                               │ (7 Multimodal Signals)
                               ▼
  ┌─────────────────────────────────────────────────────────┐
  │        Machine Learning Model (HistGradientBoosting)    │
  │  • Trained on 10,000+ empirical social video records    │
  │  • Accuracy: R² = 0.8714  |  RMSE = 7.74                │
  └────────────────────────────┬────────────────────────────┘
                               │
                               ▼
  ┌─────────────────────────────────────────────────────────┐
  │                 Next.js 14 Frontend UI                  │
  │  • 0-100 Virality Score & Confidence Index              │
  │  • AI Video Summary & Frame-by-Frame Scene Detection    │
  │  • Hook Lab (3 AI Script Rewrites)                      │
  │  • 5-Platform Editing Blueprints (Shorts, TikTok, Reels)│
  │  • Collaborative Team Workspace & Private History       │
  └─────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features

- 🎯 **Virality Score Dial (0–100)**: Instant prediction of video potential with estimated view reach.
- 🎬 **AI Video Summary & Scene Detection**: Extracts the core thesis, 3 bullet takeaways, and timestamped scene transitions.
- 🪝 **Hook Lab (First 3 Seconds)**: Analyzes opening curiosity and provides 3 alternative viral hook scripts.
- 📊 **Interactive Signal Timeline**: Visual graph mapping visual motion, audio peaks, and retention risks second-by-second.
- 📱 **Multi-Platform Blueprint Matrix**: Specific editing plans and peak posting schedules for **TikTok**, **YouTube Shorts**, **Instagram Reels**, **Facebook Reels**, and **X (Twitter)**.
- 👥 **Team Workspace (`/team`)**: Invite editors, create shared campaign folders, and monitor real-time audit feeds.
- 🔒 **Per-User Isolated History & Privacy (`/history` & `/settings`)**: Private user accounts, password strength security, and data retention controls.

---

## 🛠️ Tech Stack & Tools

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 14 (App Router)**, React 18 | Modern server-rendered UI and interactive client state |
| **Styling** | **Tailwind CSS**, Lucide Icons | Responsive modern SaaS design system |
| **Backend API** | **FastAPI**, Uvicorn, Python 3.10 | High-performance asynchronous REST API |
| **Machine Learning** | **Scikit-Learn** (`HistGradientBoosting`) | Predicts continuous 0-100 virality score |
| **Computer Vision** | **OpenCV (`cv2`)** | Extracts 0-3s hook motion flow, scene cuts & vibrancy |
| **Audio Processing** | **Librosa**, MoviePy | Measures audio RMS energy, sound peaks & speech tempo |
| **Metadata Parsing** | **yt-dlp** | URL metadata extraction for YouTube/TikTok links |
| **Deployment** | **Vercel** (Frontend) + **Render** (Backend) | Global cloud hosting with auto-deployment CI/CD |

---

## 🧠 Machine Learning & Data Pipeline Explained

### 1. The 7 Extracted Feature Signals
1. **`hook_motion_intensity`**: Optical flow pixel displacement in the first 0–3 seconds (detects scroll-stopping hooks).
2. **`scene_cut_rate`**: Number of camera cuts per minute (measures video pacing and retention).
3. **`audio_rms_energy`**: Average acoustic power (detects speech clarity and audio drops).
4. **`transcript_wpm`**: Spoken Words Per Minute (optimal range: 160–180 WPM for short-form retention).
5. **`text_overlay_ratio`**: Caption coverage on screen (essential for 80% of users who watch on mute).
6. **`color_vibrancy`**: HSV color saturation and lighting contrast warmth.
7. **`resolution_aspect`**: Checks 9:16 vertical video format compliance.

### 2. Model Performance
- **Algorithm**: `HistGradientBoostingRegressor` (histogram-based gradient boosted decision trees).
- **Dataset**: 10,000+ empirical engagement rows derived from real social media distributions (Log-normal views/shares, Beta retention).
- **Evaluation**: **$R^2 = 0.8714$** (87.1% variance explained) with **$RMSE = 7.74$**.

---

## 📂 Project Directory Structure

```text
ai_virality_predictor/
├── backend/
│   ├── dataset_loader.py          # Kaggle & empirical dataset ingestion
│   ├── train_model.py             # ML model training script
│   ├── vision_audio_extractor.py  # OpenCV & Librosa feature extractor
│   ├── main.py                    # FastAPI application endpoints
│   ├── virality_model.pkl         # Serialized trained model
│   ├── requirements.txt           # Python dependencies
│   └── render.yaml                # Render cloud deployment blueprint
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.js            # Landing page & quick analysis tool
│   │   │   ├── dashboard/         # Creator dashboard
│   │   │   ├── analysis/[id]/     # Full diagnostic report & AI summary
│   │   │   ├── team/              # Team workspace & collaboration
│   │   │   ├── optimizer/         # Multi-platform optimizer
│   │   │   ├── compare/           # Side-by-side video comparison
│   │   │   ├── history/           # Per-user isolated scan history
│   │   │   ├── auth/              # Login & registration
│   │   │   └── settings/          # Account & privacy controls
│   │   ├── components/
│   │   │   ├── analysis/          # Diagnostic cards, timeline & summary
│   │   │   └── layout/            # Dashboard sidebar & header
│   │   └── lib/
│   │       ├── api.js             # API client & fallback handlers
│   │       └── storage.js         # Isolated local storage manager
│   ├── package.json               # Next.js 14 & Tailwind dependencies
│   └── vercel.json                # Vercel deployment configuration
└── README.md                      # Project documentation
```

---

## 🚀 Quick Start (Run Locally in 3 Steps)

### Step 1: Clone the Repository
```bash
git clone https://github.com/123angmish/ai-virality-predictor.git
cd ai_virality_predictor
```

### Step 2: Start the Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
python train_model.py
python -m uvicorn main:app --reload --port 8000
```
> Backend runs at: `http://127.0.0.1:8000` (API Docs at `http://127.0.0.1:8000/docs`)

### Step 3: Start the Frontend (Next.js)
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
> Open your browser at: **`http://localhost:3000`**

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
