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

import AnalysisResultHeader from '../components/analysis/AnalysisResultHeader';
import ExecutiveSummary from '../components/analysis/ExecutiveSummary';
import MetricSummaryCard from '../components/analysis/MetricSummaryCard';
import ResultSectionNav from '../components/analysis/ResultSectionNav';
import VideoAnalysisPlayer from '../components/analysis/VideoAnalysisPlayer';
import AnalysisTimeline from '../components/analysis/AnalysisTimeline';
import RetentionRiskMap from '../components/analysis/RetentionRiskMap';
import HookLab from '../components/analysis/HookLab';
import PlatformFitComparison from '../components/analysis/PlatformFitComparison';
import ContentDoctor from '../components/analysis/ContentDoctor';
import ViralityDNAChart from '../components/analysis/ViralityDNA';
import WhatIfSimulator from '../components/analysis/WhatIfSimulator';
import ImprovementChecklist from '../components/analysis/ImprovementChecklist';
import DataReliabilityPanel from '../components/analysis/ReliabilityPanel';
import MetricBreakdownTable from '../components/analysis/MetricBreakdownTable';
import ResultFooter from '../components/analysis/ResultFooter';

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
    addHistoryItem(result);
    setIsLoading(false);
    window.location.href = '/analysis/1';
  };

  const handleAnalyzeUpload = async (file, options) => {
    setIsLoading(true);
    const result = await analyzeVideoUpload(file, options);
    setAnalysisData(result);
    addHistoryItem(result);
    setIsLoading(false);
    window.location.href = '/analysis/1';
  };

  const handleSelectDemo = () => {
    const demo = getDemoAnalysis();
    setAnalysisData(demo);
    addHistoryItem(demo);
    window.location.href = '/analysis/1';
  };

  const handleLoginSuccess = (user) => {
    setStoredUser(user);
    setCurrentUser(user);
  };

  return (
    <div className="min-h-screen bg-[#F6F7FB] flex flex-col font-sans">
      
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
        <section id="results-audit" className="py-12 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in w-full">
          
          <AnalysisResultHeader
            videoMeta={analysisData.videoMeta}
            onBack={() => setAnalysisData(null)}
            onNavigate={handleNavigate}
          />

          <ExecutiveSummary
            viralityScore={analysisData.virality_score}
            confidence={analysisData.model_confidence}
          />

          <MetricSummaryCard
            features={analysisData.features}
            estimatedReach={analysisData.estimated_reach}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <VideoAnalysisPlayer
                timestamps={analysisData.timestamps}
                filename={analysisData.filename}
                videoMeta={analysisData.videoMeta}
              />
            </div>

            <div className="lg:col-span-7">
              <AnalysisTimeline timestamps={analysisData.timestamps} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <HookLab hookData={analysisData.hookLab} />
            </div>

            <div className="lg:col-span-5">
              <RetentionRiskMap riskMap={analysisData.retentionRiskMap} />
            </div>
          </div>

          <PlatformFitComparison platforms={analysisData.platforms} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <ContentDoctor doctorData={analysisData.contentDoctor} />
            </div>

            <div className="lg:col-span-5">
              <ViralityDNAChart dnaData={analysisData.viralityDNA} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <WhatIfSimulator baseScore={analysisData.virality_score} />
            </div>

            <div className="lg:col-span-7">
              <ImprovementChecklist />
            </div>
          </div>

          <DataReliabilityPanel reliability={analysisData.reliability} />

          <MetricBreakdownTable features={analysisData.features} />

          <ResultFooter onNavigate={handleNavigate} />
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

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        historyList={historyList}
        onSelectHistoryItem={(item) => setAnalysisData(item)}
        onClearHistory={() => { clearStoredHistory(); setHistoryList([]); }}
      />

      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onNavigate={handleNavigate}
      />

    </div>
  );
}
