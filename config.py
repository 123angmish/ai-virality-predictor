import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key-13840134-ai-virality')
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    
    UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
    THUMBNAIL_FOLDER = os.path.join(BASE_DIR, 'static', 'thumbnails')
    REPORT_FOLDER = os.path.join(BASE_DIR, 'reports')
    GRAPHS_FOLDER = os.path.join(BASE_DIR, 'graphs')
    TRAINED_MODEL_FOLDER = os.path.join(BASE_DIR, 'trained_model')
    DATABASE_PATH = os.path.join(BASE_DIR, 'history.db')
    
    # Max file size: 500 MB
    MAX_CONTENT_LENGTH = 500 * 1024 * 1024
    ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov', 'mkv'}

# Ensure necessary directories exist
for folder in [Config.UPLOAD_FOLDER, Config.THUMBNAIL_FOLDER, Config.REPORT_FOLDER, Config.GRAPHS_FOLDER, Config.TRAINED_MODEL_FOLDER]:
    os.makedirs(folder, exist_ok=True)
