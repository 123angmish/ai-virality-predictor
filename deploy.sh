#!/bin/bash
# ==============================================================================
# Automated Production Deployment Script
# AI Virality Predictor & Multi-Platform Optimizer
# ==============================================================================

set -e

echo "🚀 Starting Production Build & Verification Pipeline..."

# 1. Backend ML Model Training & Dependency Check
echo "--------------------------------------------------------"
echo "📦 Step 1: Ingesting Real Datasets & Training ML Model..."
cd backend
python train_model.py
echo "✅ Machine Learning Model Trained & Saved (virality_model.pkl)."

# 2. Build Backend Docker Container
echo "--------------------------------------------------------"
echo "🐳 Step 2: Building Backend Docker Container..."
docker build -t ai-virality-predictor-backend:latest .
echo "✅ Docker image built successfully."

# 3. Launch Docker Compose Stack (Optional Local Containerization)
echo "--------------------------------------------------------"
echo "🔄 Step 3: Launching Docker Compose Stack..."
docker-compose up -d
echo "✅ Backend Service live at http://localhost:8000"

# 4. Build Frontend Next.js Application
echo "--------------------------------------------------------"
echo "⚡ Step 4: Building Next.js Frontend Application..."
cd ../frontend
npm install
npm run build
echo "✅ Frontend Production Build Completed."

echo "--------------------------------------------------------"
echo "🎉 DEPLOYMENT READY!"
echo " - Backend live API: http://localhost:8000"
echo " - Render Cloud Deployment: render.yaml blueprint ready"
echo " - Vercel Frontend Deployment: vercel.json blueprint ready"
echo "========================================================"
