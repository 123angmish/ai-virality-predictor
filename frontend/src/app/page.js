'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import HeroInput from '../components/HeroInput';
import ViralityGauge from '../components/ViralityGauge';
import VideoPreview from '../components/VideoPreview';
import MetricsGrid from '../components/MetricsGrid';
import ContentAnalysisCard from '../components/ContentAnalysisCard';
import PlatformTabs from '../components/PlatformTabs';
import ComparisonMatrix from '../components/ComparisonMatrix';
import ReportExporter from '../components/ReportExporter';
import AuthModal from '../components/AuthModal';
import HistoryDrawer from '../components/HistoryDrawer';
import { fetchModelStatus, analyzeVideoUrl, analyzeVideoUpload, getDemoAnalysis } from '../lib/api';

export default function DashboardPage() {
  const [statusInfo, setStatusInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [activeVideoMeta, setActiveVideoMeta] = useState(null);

  // Auth State
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // History State
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    // Load saved user & history from localStorage
    try {
      const savedUser = localStorage.getItem('virality_user');
      if (savedUser) setCurrentUser(JSON.parse(savedUser));

      const savedHistory = localStorage.getItem('virality_history');
      if (savedHistory) setHistoryList(JSON.parse(savedHistory));
    } catch (e) {}

    // Fetch backend status
    fetchModelStatus().then((info) => setStatusInfo(info));

    // Initial Demo State
    const demo = getDemoAnalysis();
    demo.videoMeta = {
      title: "How I 10x-ed My Views on YouTube Shorts in 30 Days",
      platform: "YouTube Shorts",
      badgeColor: "bg-red-600 text-white",
      duration: "0:21s",
      resolution: "1080x1920 (9:16)",
      size: "14.2 MB",
      thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop",
      isLocalFile: false
    };
    demo.contentAnalysis = {
      peopleDetected: "1 Creator (Solo Speaking Focus)",
      faceCount: 1,
      sceneEnvironment: "Indoor Studio with RGB Background Accent Lighting",
      lightingQuality: "Good (88% Brightness Index)",
      speechTranscript: '"If you want your videos to go viral in 2026, stop making this one critical mistake! Here is the exact 3-step hook framework..."',
      detectedTextOverlays: ['"STOP DOING THIS"', '"2026 VIRAL METHOD"', '"STEP #1"'],
      sceneFrames: [
        { time: "0:01", scene: "Opening Hook", detail: "Creator close-up speaking directly to camera. Optical flow motion is fast (82.5/100)." },
        { time: "0:05", scene: "Main Point", detail: "Kinetic yellow caption overlay appears: 'STOP DOING THIS'." },
        { time: "0:12", scene: "Audio Peak", detail: "Bass drop sound effect with 81% RMS audio energy." },
        { time: "0:18", scene: "Call to Action", detail: "Subscribe / Follow banner transition." }
      ],
      contentImprovementTips: [
        "Add a secondary subject/prop or visual B-roll cut at 0:04 to break up visual monotony.",
        "Increase studio key-light brightness on creator face by +10% to boost visual contrast.",
        "Position kinetic caption overlays 40px higher to avoid overlapping platform UI."
      ]
    };
    setAnalysisData(demo);
    setActiveVideoMeta(demo.videoMeta);
  }, []);

  const saveToHistory = (data) => {
    try {
      const newItem = {
        ...data,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      const updated = [newItem, ...historyList.slice(0, 15)];
      setHistoryList(updated);
      localStorage.setItem('virality_history', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleAnalyzeUrl = async (url) => {
    setIsLoading(true);
    const result = await analyzeVideoUrl(url);
    setAnalysisData(result);
    setActiveVideoMeta(result.videoMeta);
    saveToHistory(result);
    setIsLoading(false);
  };

  const handleAnalyzeUpload = async (file) => {
    setIsLoading(true);
    const result = await analyzeVideoUpload(file);
    setAnalysisData(result);
    setActiveVideoMeta(result.videoMeta);
    saveToHistory(result);
    setIsLoading(false);
  };

  const handleResetVideo = () => {
    setActiveVideoMeta(null);
    setAnalysisData(null);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('virality_user', JSON.stringify(user));
    } catch (e) {}
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('virality_user');
    } catch (e) {}
  };

  const handleClearHistory = () => {
    setHistoryList([]);
    try {
      localStorage.removeItem('virality_history');
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation Header */}
      <Header
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={historyList.length}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Dual Input & Active Video Banner Hero */}
        <HeroInput
          onAnalyzeUrl={handleAnalyzeUrl}
          onAnalyzeUpload={handleAnalyzeUpload}
          isLoading={isLoading}
          activeVideoMeta={activeVideoMeta}
          onResetVideo={handleResetVideo}
        />

        {/* Diagnostic Results Dashboard */}
        {analysisData && (
          <div className="space-y-8 animate-fade-in">
            {/* Top Report Export Bar */}
            <ReportExporter analysisData={analysisData} />

            {/* Top Metric Cards */}
            <MetricsGrid
              features={analysisData.features}
              estimatedReach={analysisData.estimated_reach}
            />

            {/* Split Screen Layout: Left Column (Preview & Dial), Right Column (Platform Tabs) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                <ViralityGauge
                  score={analysisData.virality_score}
                  confidence={analysisData.model_confidence}
                />
                <VideoPreview
                  timestamps={analysisData.timestamps}
                  filename={analysisData.filename || "Uploaded_Video.mp4"}
                  videoMeta={activeVideoMeta}
                />
              </div>

              {/* Right Column (7 Cols) */}
              <div className="lg:col-span-7">
                <PlatformTabs platforms={analysisData.platforms} />
              </div>
            </div>

            {/* In-Depth Video Content & Scene Diagnostics Card ("Video Ke Andar Ka Analysis") */}
            <ContentAnalysisCard contentAnalysis={analysisData.contentAnalysis} />

            {/* Multi-Platform Engagement Comparison Matrix */}
            <ComparisonMatrix platforms={analysisData.platforms} />
          </div>
        )}
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        historyList={historyList}
        onSelectHistoryItem={(item) => {
          setAnalysisData(item);
          setActiveVideoMeta(item.videoMeta);
        }}
        onClearHistory={handleClearHistory}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 font-medium">
          <p>
            AI Virality Predictor & Multi-Platform Optimizer © 2026 • Powered by OpenCV, Librosa, Whisper, Scikit-Learn & Real Datasets.
          </p>
        </div>
      </footer>
    </div>
  );
}
