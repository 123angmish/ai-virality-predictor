import pytest
from fastapi.testclient import TestClient
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))
from main import app

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "online"

def test_model_status_endpoint():
    response = client.get("/api/v1/model-status")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ready"
    assert "features" in data
    assert len(data["features"]) == 7

def test_analyze_url_endpoint():
    payload = {"url": "https://www.youtube.com/shorts/demo123"}
    response = client.post("/api/v1/analyze-url", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "virality_score" in data
    assert 0.0 <= data["virality_score"] <= 100.0
    assert "platform_blueprints" in data
    assert "tiktok" in data["platform_blueprints"]