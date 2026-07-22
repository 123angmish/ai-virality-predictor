# AI Virality Predictor

An AI-powered web application that analyzes and predicts the viral potential of videos. Built with **Flask**, **OpenCV**, **XGBoost**, and **Chart.js**, it extracts visual features, facial markers, and pacing signatures to score content and generate suggestions.

## Features

- **Double Analysis Modes**:
  1. **Upload Video**: Process local footage files (MP4, AVI, MOV, MKV up to 500MB).
  2. **Analyze YouTube URL**: Scrape views, likes, comments, and calculate engagement ratios using `yt-dlp`.
- **OpenCV Computer Vision Extraction**:
  - Motion energy and frame subtraction.
  - Average brightness and standard contrast distribution.
  - Video duration, FPS, and dimensional resolutions.
  - Edge detection variance for image sharpness quality.
  - Digital high-frequency noise levels estimation.
  - Facial presence auditing and smile frequencies using Haar Cascade classifiers.
  - Hook score analysis (visual stimulus in the first 3 seconds).
  - Dominant color palettes extraction.
- **XGBoost Machine Learning Classifier**:
  - Multi-feature regression model predicting virality index scores (0-100).
  - Automatic synthetic data training fallback if no pre-trained weights are present.
- **Auditing Suggestions Engine**: Generates prioritize recommendations (e.g. improve lighting, adjust pacing cuts, stabilize shaky camera feed).
- **Interactive Dashboards**:
  - Circular SVG gauges.
  - Chart.js Radar and comparative Bar graphs.
  - **Comparison Dashboard**: Select two historical runs to compare side-by-side.
  - **Report Exporting**: Generate and download professional PDF summary reports via `ReportLab`.
- **Premium Glassmorphic UI**: Vibrant gradient overlays, dark and light toggles, hover animations, responsive layouts.

---

## Folder Structure

```text
AI-Virality-Predictor/
├── app.py                      # Flask Application factory entrypoint
├── config.py                   # Configuration parameters and folder creator
├── requirements.txt            # Python dependencies lists
├── routes.py                   # Blueprint HTTP routes and API endpoints
├── models/
│   ├── database.py             # SQLite schema initialization and DB operations
│   └── predictor.py            # XGBoost ML class, training, and prediction
├── services/
│   ├── video_processor.py      # OpenCV video frame auditing and face cascades
│   ├── youtube_extractor.py    # yt-dlp metadata scraping and engagement calculations
│   ├── recommendation_engine.py# Benchmark auditing and suggestions logic
│   └── report_generator.py     # ReportLab PDF building blocks
├── utils/
│   └── helpers.py              # Magic bytes mime validations and security filename sanitization
├── templates/
│   ├── base.html               # Main layout layout (navbar, footer, theme script)
│   ├── index.html              # Landing page with YouTube input and recent history
│   ├── upload.html             # Drag and drop upload and animated checklists
│   ├── result.html             # Diagnostic score results and ChartJS canvases
│   ├── history.html            # Searchable historical logs table
│   └── compare.html            # Side-by-side video reports compare dashboard
└── static/
    ├── css/
    │   └── style.css           # Theme custom properties, glass cards, and layouts
    └── js/
        ├── main.js             # Global theme cookie storage and sharing triggers
        ├── upload.js           # AJAX chunk upload progress listener
        └── result_charts.js    # ChartJS radar and proximity bar configs
```

---

## Installation & Setup

1. **Clone or navigate to the project directory**:
   ```bash
   cd AI-Virality-Predictor
   ```

2. **Install requirements**:
   Ensure you have Python 3.8+ installed. Install the Python library requirements:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Flask application**:
   ```bash
   python app.py
   ```
   *The database schema will automatically initialize and train the default XGBoost model on startup.*

4. **Access the application**:
   Open [http://127.0.0.1:5000/](http://127.0.0.1:5000/) in your web browser.

---

## Deployment & Production Tips

- **WSGI Production Server**: When deploying, wrap Flask in a WSGI container like `gunicorn`:
  ```bash
  gunicorn "app:create_app()" -b 0.0.0.0:8000 --workers 4
  ```
- **FFmpeg Integration**: The application automatically extracts audio metrics using FFmpeg if it's installed on the host system. Install FFmpeg to enable accurate vocal analysis:
  - macOS: `brew install ffmpeg`
  - Linux: `sudo apt install ffmpeg`

---

## Future Scope

- Direct API connectors for Instagram Reels, TikTok, Facebook Watch, and X (Twitter) videos.
- Deep Learning face detection models (like MTCNN or RetinaFace) and ResNet emotion embeddings for deeper expressions audits.
- Multi-lingual transcription and title semantic analysis using NLP models.
