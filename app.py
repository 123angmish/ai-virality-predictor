import os
from flask import Flask
from config import Config
from models.database import init_db
from routes import main_bp

def create_app():
    """
    Application factory pattern to configure and initialize the Flask app.
    """
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize SQLite Database
    init_db()
    
    # Register blueprints
    app.register_blueprint(main_bp)
    
    # Custom template filters
    @app.template_filter('format_number')
    def format_number(val):
        try:
            return f"{int(val):,}"
        except (ValueError, TypeError):
            return val
            
    @app.template_filter('round_value')
    def round_value(val, decimals=1):
        try:
            return round(float(val), decimals)
        except (ValueError, TypeError):
            return val
            
    return app

if __name__ == '__main__':
    app = create_app()
    # Runs locally on port 5000
    app.run(host='0.0.0.0', port=5000, debug=True)
