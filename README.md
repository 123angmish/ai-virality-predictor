# 🚀 AI Virality Predictor

<p align="center">

<img src="https://img.shields.io/badge/Python-3.10-blue?style=for-the-badge&logo=python">
<img src="https://img.shields.io/badge/Flask-Web_App-black?style=for-the-badge&logo=flask">
<img src="https://img.shields.io/badge/OpenCV-Computer_Vision-green?style=for-the-badge&logo=opencv">
<img src="https://img.shields.io/badge/XGBoost-Machine_Learning-orange?style=for-the-badge">
<img src="https://img.shields.io/badge/Bootstrap-5-purple?style=for-the-badge&logo=bootstrap">
<img src="https://img.shields.io/badge/SQLite-Database-blue?style=for-the-badge">

</p>

---

# 🎥 AI Virality Predictor

An AI-powered web application that predicts the viral potential of videos using **Machine Learning**, **Computer Vision**, and **OpenCV**.

The application extracts visual features, analyzes video quality, evaluates engagement-related factors, and generates an AI-based Virality Score with actionable recommendations.

---

# ✨ Features

## 🎬 Local Video Analysis

- Upload MP4, AVI, MOV and MKV videos
- OpenCV Frame Processing
- Motion Analysis
- Scene Change Detection
- Brightness Analysis
- Contrast Analysis
- Face Detection
- Emotion Detection
- Audio Energy Extraction
- Hook Score Analysis
- Thumbnail Generation
- AI Virality Prediction

---

## 🔗 YouTube URL Analysis

Analyze any public YouTube video using its URL.

Extracts:

- 📹 Title
- 👤 Channel Name
- 👁 Views
- 👍 Likes
- 💬 Comments
- 📅 Upload Date
- 📝 Description
- 🖼 Thumbnail

The extracted metadata is processed through the Machine Learning model to estimate the video's viral potential.

---

# 🤖 Machine Learning Prediction

The AI model predicts:

- ⭐ Virality Score
- 📈 Confidence Score
- 🏆 Performance Category
- 💡 Personalized Recommendations

### Performance Categories

🟢 Excellent

🟢 Very Good

🟡 Good

🟠 Average

🔴 Poor

---

# 📊 Analytics Dashboard

The dashboard provides detailed analytics including:

- Virality Score
- Motion Score
- Hook Score
- Brightness
- Contrast
- Scene Changes
- Face Count
- Emotion Score
- Audio Energy
- Color Variance
- Sharpness
- Noise Analysis
- Thumbnail Preview

---

# 📄 PDF Report

Generate professional PDF reports containing:

- Complete Analysis
- Feature Summary
- AI Prediction
- Recommendations
- Visual Graphs
- Performance Overview

---

# 📚 Analysis History

All previous analyses are stored in an SQLite database, allowing users to revisit historical predictions.

---

# ⚖️ Compare Videos

Compare two analyses side-by-side to evaluate differences in viral potential and extracted features.

---

# 🛠 Technology Stack

## Backend

- Python
- Flask

## Machine Learning

- XGBoost
- Scikit-Learn
- NumPy
- Pandas

## Computer Vision

- OpenCV
- DeepFace
- RetinaFace

## Frontend

- HTML5
- CSS3
- JavaScript
- Bootstrap 5

## Database

- SQLite

## Deployment

- Render

---

# 📂 Project Structure

```text
AI-Virality-Predictor
│
├── app.py
├── routes.py
├── config.py
├── requirements.txt
├── README.md
│
├── models/
├── services/
├── utils/
├── templates/
├── static/
│   ├── css/
│   ├── js/
│   └── images/
│
├── trained_model/
├── thumbnails/
├── graphs/
├── uploads/
├── reports/
└── history.db
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/AI-Virality-Predictor.git
```

## Navigate into Project

```bash
cd AI-Virality-Predictor
```

## Create Virtual Environment

```bash
python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### macOS/Linux

```bash
source venv/bin/activate
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

## Run the Application

```bash
python app.py
```

Open your browser and visit:

```
http://127.0.0.1:5000
```

---

# 🧠 AI Prediction Pipeline

```text
            Video
              │
              ▼
      Feature Extraction
              │
              ▼
      OpenCV Processing
              │
              ▼
   Machine Learning Model
          (XGBoost)
              │
              ▼
      Virality Prediction
              │
              ▼
    AI Recommendations
              │
              ▼
 Interactive Dashboard
```

---

# 🎯 Prediction Factors

The Machine Learning model evaluates multiple features, including:

- Video Duration
- Resolution
- FPS
- Motion Score
- Brightness
- Contrast
- Color Variance
- Scene Changes
- Face Count
- Emotion Score
- Audio Energy
- Hook Score
- Sharpness
- Noise Level

---

# 📸 Application Modules

- 🏠 Home Page
- 📤 Upload Video
- 🔗 YouTube Analysis
- 📊 Analytics Dashboard
- 📄 PDF Report
- 📚 History
- ⚖️ Compare Videos

---

# ⚠️ Note

The application has been successfully developed and tested in a local environment.

While deployed on cloud platforms (such as Render), **YouTube URL analysis may occasionally fail** because YouTube employs anti-bot protection that can block automated metadata extraction. This behavior is outside the application's control.

The following modules continue to function normally:

- ✅ Local Video Analysis
- ✅ AI Prediction
- ✅ Computer Vision Pipeline
- ✅ Dashboard
- ✅ PDF Reports
- ✅ History
- ✅ Comparison Module

---

# 🚀 Future Enhancements

- Instagram Reels Analysis
- TikTok Support
- Facebook Video Analysis
- X (Twitter) Video Analysis
- Thumbnail Quality Optimizer
- AI Caption Generator
- Trending Topic Detection
- Real-time Viral Forecasting

---

# 👩‍💻 Author

## Angel Mishra

**Electronics & Communication Engineering (ECE)**

Python • Flask • Machine Learning • Computer Vision • OpenCV • XGBoost

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

It helps support future development and encourages further improvements.

---

# 📜 License

This project is intended for educational and research purposes.
