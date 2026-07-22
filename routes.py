import os
from flask import Blueprint, render_template, request, jsonify, redirect, url_for, send_file
from werkzeug.utils import secure_filename

from config import Config
from utils.helpers import get_safe_filename, validate_mime_type
from models.database import save_analysis, get_analysis_by_id, get_all_analyses, delete_analysis
from models.predictor import ViralityPredictor
from services.video_processor import VideoProcessor
from services.youtube_extractor import YouTubeExtractor
from services.recommendation_engine import RecommendationEngine
from services.report_generator import ReportGenerator

# Define Blueprint
main_bp = Blueprint('main', __name__)

# Initialize Predictor and VideoProcessor
predictor = ViralityPredictor()
video_processor = VideoProcessor()

@main_bp.route('/')
def index():
    """
    Landing Page showing marketing content and recent history.
    """
    recent = get_all_analyses(limit=6)
    return render_template('index.html', recent=recent)

@main_bp.route('/upload', methods=['GET', 'POST'])
def upload():
    """
    Handles file uploading and processing.
    """
    if request.method == 'GET':
        return render_template('upload.html')
        
    # POST handling (AJAX file upload)
    if 'video' not in request.files:
        return jsonify({'success': False, 'error': 'No video file provided.'}), 400
        
    file = request.files['video']
    if file.filename == '':
        return jsonify({'success': False, 'error': 'No video file selected.'}), 400
        
    try:
        # 1. Sanitize and save uploaded file
        safe_filename = get_safe_filename(file.filename)
        save_path = os.path.join(Config.UPLOAD_FOLDER, safe_filename)
        file.save(save_path)
        
        # 2. Security validation: extension and mime type
        if not validate_mime_type(save_path):
            if os.path.exists(save_path):
                os.remove(save_path)
            return jsonify({'success': False, 'error': 'Invalid or corrupted video format.'}), 400
            
        # 3. OpenCV Feature Extraction
        features = video_processor.extract_features(save_path)
        
        # 4. Predict using ML Model
        prediction = predictor.predict(features)
        
        # 5. Recommendation Engine
        recommendations = RecommendationEngine.generate_recommendations(features, 'upload')
        
        # 6. Database save
        analysis_id = save_analysis(
            analysis_type='upload',
            title=file.filename,
            duration=features['duration'],
            virality_score=prediction['virality_score'],
            confidence=prediction['confidence'],
            performance_class=prediction['performance_class'],
            features=features,
            recommendations=recommendations,
            thumbnail_path=features['thumbnail_path']
        )
        
        # Clean up local video file to save disk space
        if os.path.exists(save_path):
            os.remove(save_path)
            
        return jsonify({
            'success': True,
            'redirect_url': url_for('main.result', analysis_id=analysis_id)
        })
        
    except Exception as e:
        # Fallback cleanup in case of processing crash
        if 'save_path' in locals() and os.path.exists(save_path):
            os.remove(save_path)
        return jsonify({'success': False, 'error': f"Processing failed: {str(e)}"}), 500

@main_bp.route('/analyze-url', methods=['POST'])
def analyze_url():
    """
    Extracts YouTube URL metadata, calculates metrics, runs ML prediction and saves.
    """
    data = request.get_json() or {}
    url = data.get('url', '').strip()
    
    if not url:
        return jsonify({'success': False, 'error': 'Please enter a valid YouTube URL.'}), 400
        
    # Check if URL looks like youtube
    if 'youtube.com' not in url.lower() and 'youtu.be' not in url.lower():
        return jsonify({'success': False, 'error': 'Currently only YouTube URLs are supported.'}), 400
        
    try:
        # 1. Scraping and engagement calculations via yt-dlp
        yt_data = YouTubeExtractor.extract_metadata(url)
        if not yt_data['success']:
            return jsonify({'success': False, 'error': yt_data['error']}), 400
            
        # 2. Run Virality Predictor using extracted feature approximations
        prediction = predictor.predict(yt_data['features'])
        
        # Override values from actual YouTube statistics for more realistic URL predictions
        prediction['virality_score'] = yt_data['metrics']['virality_probability']
        
        # Re-evaluate performance class
        score = prediction['virality_score']
        if score >= 80:
            prediction['performance_class'] = "Excellent"
        elif score >= 60:
            prediction['performance_class'] = "Good"
        elif score >= 40:
            prediction['performance_class'] = "Average"
        else:
            prediction['performance_class'] = "Poor"
            
        # 3. Create Recommendations
        recommendations = RecommendationEngine.generate_recommendations(yt_data['features'], 'youtube', yt_data)
        
        # 4. Save to Database
        analysis_id = save_analysis(
            analysis_type='youtube',
            title=yt_data['title'],
            duration=yt_data['duration'],
            virality_score=prediction['virality_score'],
            confidence=prediction['confidence'],
            performance_class=prediction['performance_class'],
            features=yt_data['features'],
            recommendations=recommendations,
            thumbnail_path=yt_data['thumbnail'],
            metadata=yt_data
        )
        
        return jsonify({
            'success': True,
            'redirect_url': url_for('main.result', analysis_id=analysis_id)
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': f"Failed to analyze URL: {str(e)}"}), 500

@main_bp.route('/result/<int:analysis_id>')
def result(analysis_id):
    """
    Display results dashboard for a given analysis.
    """
    analysis = get_analysis_by_id(analysis_id)
    if not analysis:
        return render_template('base.html', error="Analysis record not found.")
        
    return render_template('result.html', analysis=analysis)

@main_bp.route('/report/<int:analysis_id>')
def download_report(analysis_id):
    """
    Generates and downloads the PDF report.
    """
    analysis = get_analysis_by_id(analysis_id)
    if not analysis:
        return "Record not found", 404
        
    try:
        pdf_path = ReportGenerator.generate_pdf(analysis)
        return send_file(pdf_path, as_attachment=True, download_name=f"Virality_Report_{analysis_id}.pdf")
    except Exception as e:
        return f"Could not generate PDF: {str(e)}", 500

@main_bp.route('/history')
def history():
    """
    Show history logs of all predictions.
    """
    analyses = get_all_analyses()
    return render_template('history.html', analyses=analyses)

@main_bp.route('/delete/<int:analysis_id>', methods=['POST'])
def delete_item(analysis_id):
    """
    Deletes an analysis item.
    """
    delete_analysis(analysis_id)
    return redirect(url_for('main.history'))

@main_bp.route('/compare')
def compare():
    """
    Side-by-side video analysis comparison page.
    """
    analyses = get_all_analyses()
    return render_template('compare.html', analyses=analyses)

@main_bp.route('/compare-data')
def compare_data():
    """
    JSON API returning features of two selected analyses for comparison.
    """
    id1 = request.args.get('id1', type=int)
    id2 = request.args.get('id2', type=int)
    
    if not id1 or not id2:
        return jsonify({'success': False, 'error': 'Two analyses must be selected.'}), 400
        
    a1 = get_analysis_by_id(id1)
    a2 = get_analysis_by_id(id2)
    
    if not a1 or not a2:
        return jsonify({'success': False, 'error': 'One or both analyses could not be found.'}), 404
        
    return jsonify({
        'success': True,
        'analysis1': a1,
        'analysis2': a2
    })
