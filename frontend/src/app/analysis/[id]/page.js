'use client';

import React, { useState, useEffect } from 'react';
import DashboardSidebar from '../../../components/layout/DashboardSidebar';
import DashboardHeader from '../../../components/layout/DashboardHeader';
import CommandPalette from '../../../components/analysis/CommandPalette';
import ScoreGauge from '../../../components/analysis/ScoreGauge';
import HookLab from '../../../components/analysis/HookLab';
import ViralityDNA from '../../../components/analysis/ViralityDNA';
import RetentionRiskMap from '../../../components/analysis/RetentionRiskMap';
import ContentDoctor from '../../../components/analysis/ContentDoctor';
import WhatIfSimulator from '../../../components/analysis/WhatIfSimulator';
import ReliabilityPanel from '../../../components/analysis/ReliabilityPanel';
import MetricsGrid from '../../../components/MetricsGrid';
import PlatformTabs from '../../../components/PlatformTabs';
import ContentAnalysisCard from '../../../components/ContentAnalysisCard';
import VideoPreview from '../../../components/VideoPreview';
import ReportExporter from '../../../components/ReportExporter';
import { getDemoAnalysis } from '../../../lib/api';
import { getStoredUser, setStoredUser } from '../../../lib/storage';

export default function AnalysisResultPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    setCurrentUser(getStoredUser());
    const data = getDemoAnalysis();
    data.videoMeta = {
      title: "How I 10x-ed My Views on YouTube Shorts in 30 Days",
      platform: "YouTube Shorts",
      duration: "0:21s",
      resolution: "1080x1920 (9:16)",
      size: "14.2 MB",
      thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop"
    };
    setAnalysisData(data);
  }, []);

  const handleNavigate = (route) => {
    window.location.href = route;
  };

  if (!analysisData) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <DashboardSidebar
        activeRoute="/analysis/1"
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onLogout={() => { setStoredUser(null); window.location.href = '/'; }}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          activeRouteTitle="Detailed Virality Audit"
          onOpenCmd={() => setIsCmdOpen(true)}
          currentUser={currentUser}
        />

        <main className="p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8 animate-fade-in">
          
          {/* Top Exporter Banner */}
          <ReportExporter analysisData={analysisData} />

          {/* Metric Cards */}
          <MetricsGrid
            features={analysisData.features}
            estimatedReach={analysisData.estimated_reach}
          />

          {/* Split Screen Layout: Left (Dial, Video, HookLab), Right (Platform Tabs, Differentiators) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column (5 Cols) */}
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

            {/* Right Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <PlatformTabs platforms={analysisData.platforms} />

              <ContentDoctor doctorData={analysisData.contentDoctor} />

              <RetentionRiskMap riskMap={analysisData.retentionRiskMap} />

              <WhatIfSimulator baseScore={analysisData.virality_score} />

              <ReliabilityPanel reliability={analysisData.reliability} />
            </div>

          </div>

          {/* In-Depth Scene Diagnostics Card */}
          <ContentAnalysisCard contentAnalysis={analysisData.contentAnalysis} />

        </main>
      </div>

      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
