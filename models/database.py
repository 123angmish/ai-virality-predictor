import sqlite3
import json
import os
from config import Config

def get_db_connection():
    """
    Establish a connection to the SQLite database.
    """
    conn = sqlite3.connect(Config.DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """
    Initialize SQLite database and create necessary tables if they don't exist.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Create the analyses table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS analyses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,          -- 'upload' or 'youtube'
            title TEXT NOT NULL,
            duration REAL,
            virality_score REAL NOT NULL,
            confidence REAL NOT NULL,
            performance_class TEXT NOT NULL,
            features TEXT,               -- JSON serialized dict
            recommendations TEXT,        -- JSON serialized list
            thumbnail_path TEXT,         -- Path or URL of the thumbnail
            metadata TEXT,               -- JSON serialized dict for YouTube info, etc.
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()

def save_analysis(analysis_type, title, duration, virality_score, confidence, performance_class, features, recommendations, thumbnail_path, metadata=None):
    """
    Save analysis results to the database.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    
    features_json = json.dumps(features)
    recs_json = json.dumps(recommendations)
    metadata_json = json.dumps(metadata) if metadata else '{}'
    
    cursor.execute('''
        INSERT INTO analyses (type, title, duration, virality_score, confidence, performance_class, features, recommendations, thumbnail_path, metadata)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (analysis_type, title, duration, virality_score, confidence, performance_class, features_json, recs_json, thumbnail_path, metadata_json))
    
    inserted_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return inserted_id

def get_analysis_by_id(analysis_id):
    """
    Retrieve a specific analysis by its ID.
    """
    conn = get_db_connection()
    row = conn.execute('SELECT * FROM analyses WHERE id = ?', (analysis_id,)).fetchone()
    conn.close()
    
    if row:
        data = dict(row)
        data['features'] = json.loads(data['features']) if data['features'] else {}
        data['recommendations'] = json.loads(data['recommendations']) if data['recommendations'] else []
        data['metadata'] = json.loads(data['metadata']) if data['metadata'] else {}
        return data
    return None

def get_all_analyses(limit=50):
    """
    Retrieve a list of recent analyses.
    """
    conn = get_db_connection()
    rows = conn.execute('SELECT * FROM analyses ORDER BY created_at DESC LIMIT ?', (limit,)).fetchall()
    conn.close()
    
    results = []
    for row in rows:
        data = dict(row)
        data['features'] = json.loads(data['features']) if data['features'] else {}
        data['recommendations'] = json.loads(data['recommendations']) if data['recommendations'] else []
        data['metadata'] = json.loads(data['metadata']) if data['metadata'] else {}
        results.append(data)
    return results

def delete_analysis(analysis_id):
    """
    Delete an analysis from history.
    """
    conn = get_db_connection()
    conn.execute('DELETE FROM analyses WHERE id = ?', (analysis_id,))
    conn.commit()
    conn.close()
