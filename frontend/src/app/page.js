'use client';

import React, { useState, useEffect } from 'react';
import PublicNavbar from '../components/layout/PublicNavbar';
import Hero from '../components/marketing/Hero';
import TrustStrip from '../components/marketing/TrustStrip';
import MainAnalysisTool from '../components/marketing/MainAnalysisTool';
import HowItWorks from '../components/marketing/HowItWorks';
import FeatureGrid from '../components/marketing/FeatureGrid';
import AIExplainability from '../components/marketing/AIExplainability';
import BeforeAfterExample from '../components/marketing/BeforeAfterExample';
import UseCases from '../components/marketing/UseCases';
import Pricing from '../components/marketing/Pricing';
import FAQ from '../components/marketing/FAQ';
import Footer from '../components/layout/Footer';

import ScoreGauge from '../components/analysis/ScoreGauge';
import HookLab from '../components/analysis/HookLab';
import ViralityDNA from '../components/analysis/ViralityDNA';
import RetentionRiskMap from '../components/analysis/RetentionRiskMap';
import ContentDoctor from '../components/analysis/ContentDoctor';
import WhatIfSimulator from '../components/analysis/WhatIfSimulator';
import ReliabilityPanel from '../components/analysis/ReliabilityPanel';
import MetricsGrid from '../components/MetricsGrid';
import PlatformTabs from '../components/PlatformTabs';
import ContentAnalysisCard from '../components/ContentAnalysisCard';
import VideoPreview from '../components/VideoPreview';
import ReportExporter from '../components/ReportExporter';
import AuthModal from '../components/AuthModal';
import HistoryDrawer from '../components/HistoryDrawer';
import CommandPalette from '../components/analysis/CommandPalette';

import { analyzeVideoUrl, analyzeVideoUpload, getDemoAnalysis, fetchModelStatus } from '../lib/api';
import { getStoredUser, setStoredUser, getStoredHistory, addHistoryItem, clearStoredHistory } from '../lib/storage';

export default function MarketingHomepage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [historyList, setHistoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  // Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);

  useEffect(() => {
    setCurrentUser(getStoredUser());
    setHistoryList(getStoredHistory());
    fetchModelStatus();
  }, []);

  const handleNavigate = (route) => {
    window.location.href = route;
  };

  const handleAnalyzeUrl = async (url, options) => {
    setIsLoading(true);
    const result = await analyzeVideoUrl(url, options);
    setAnalysisData(result);
    const updated = addHistoryItem(result);
    setHistoryList(updated);
    setIsLoading(false);
  };

  const handleAnalyzeUpload = async (file, options) => {
    setIsLoading(true);
    const result = await analyzeVideoUpload(file, options);
    setAnalysisData(result);
    const updated = addHistoryItem(result);
    setHistoryList(updated);
    setIsLoading(false);
  };

  const handleSelectDemo = () => {
    const demo = getDemoAnalysis();
    setAnalysisData(demo);
  };

  const handleLoginSuccess = (user) => {
    setStoredUser(user);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setStoredUser(null);
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Translucent Marketing Navbar */}
      <PublicNavbar
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Hero Section */}
      <Hero
        onStartAnalysis={() => {
          const el = document.getElementById('analyzer');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectDemo={handleSelectDemo}
      />

      {/* Trust Strip */}
      <TrustStrip />

      {/* Main Analysis Tool Studio Workspace */}
      <MainAnalysisTool
        onAnalyzeUrl={handleAnalyzeUrl}
        onAnalyzeUpload={handleAnalyzeUpload}
        onSelectDemo={handleSelectDemo}
        isLoading={isLoading}
      />

      {/* Diagnostic Audit Output Section */}
      {analysisData && (
        <section id="results-audit" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in w-full">
          <div className="border-b border-slate-200 pb-4 text-left">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Diagnostic Analysis Results</h2>
            <p className="text-xs text-slate-500 font-medium">Complete video virality report and platform readiness audit.</p>
          </div>

          <ReportExporter analysisData={analysisData} />

          <MetricsGrid
            features={analysisData.features}
            estimatedReach={analysisData.estimated_reach}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <ScoreGauge
                score={analysisData.virality_score}
                confidence={analysisData.model_confidence}
              />

              <VideoPreview
                timestamps={analysisData.timestamps}
                filename={analysisData.filename || "Uploaded_Video.mp4"}
                videoMeta={analysisData.videoMeta}
              />

              <HookLab hookData={analysisData.hookLab} />

              <ViralityDNA dnaData={analysisData.viralityDNA} />
            </div>

            <div className="lg:col-span-7 space-y-6">
              <PlatformTabs platforms={analysisData.platforms} />

              <ContentDoctor doctorData={analysisData.contentDoctor} />

              <RetentionRiskMap riskMap={analysisData.retentionRiskMap} />

              <WhatIfSimulator baseScore={analysisData.virality_score} />

              <ReliabilityPanel reliability={analysisData.reliability} />
            </div>
          </div>

          <ContentAnalysisCard contentAnalysis={analysisData.contentAnalysis} />
        </section>
      )}

      {/* Marketing Sections */}
      <HowItWorks />
      <FeatureGrid />
      <AIExplainability />
      <BeforeAfterExample />
      <UseCases />
      <Pricing onOpenAuth={() => setIsAuthOpen(true)} />
      <FAQ />

      {/* Footer */}
      <Footer />

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
        onSelectHistoryItem={(item) => setAnalysisData(item)}
        onClearHistory={() => { clearStoredHistory(); setHistoryList([]); }}
      />

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onNavigate={handleNavigate}
      />

    </div>
  );
}
