'use client';

import React, { useState, useEffect } from 'react';
import DashboardSidebar from '../../../components/layout/DashboardSidebar';
import DashboardHeader from '../../../components/layout/DashboardHeader';
import CommandPalette from '../../../components/analysis/CommandPalette';

import AnalysisResultHeader from '../../../components/analysis/AnalysisResultHeader';
import ExecutiveSummary from '../../../components/analysis/ExecutiveSummary';
import VideoSummaryCard from '../../../components/analysis/VideoSummaryCard';
import MetricSummaryCard from '../../../components/analysis/MetricSummaryCard';
import ResultSectionNav from '../../../components/analysis/ResultSectionNav';
import VideoAnalysisPlayer from '../../../components/analysis/VideoAnalysisPlayer';
import AnalysisTimeline from '../../../components/analysis/AnalysisTimeline';
import RetentionRiskMap from '../../../components/analysis/RetentionRiskMap';
import HookLab from '../../../components/analysis/HookLab';
import PlatformFitComparison from '../../../components/analysis/PlatformFitComparison';
import ContentDoctor from '../../../components/analysis/ContentDoctor';
import ViralityDNAChart from '../../../components/analysis/ViralityDNA';
import WhatIfSimulator from '../../../components/analysis/WhatIfSimulator';
import ImprovementChecklist from '../../../components/analysis/ImprovementChecklist';
import DataReliabilityPanel from '../../../components/analysis/ReliabilityPanel';
import MetricBreakdownTable from '../../../components/analysis/MetricBreakdownTable';
import ResultFooter from '../../../components/analysis/ResultFooter';

import { getDemoAnalysis } from '../../../lib/api';
import { getStoredUser, setStoredUser, getLatestAnalysis } from '../../../lib/storage';

export default function AnalysisResultPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    setCurrentUser(getStoredUser());
    const latest = getLatestAnalysis();
    const data = latest || getDemoAnalysis();
    if (!data.videoMeta) {
      data.videoMeta = {
        title: data.filename || "How_I_10xed_My_Views.mp4",
        platform: "Instagram Reels",
        duration: "22 seconds",
        date: "Analysed today",
        resolution: "1080x1920 (9:16)",
        size: "14.2 MB",
        thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop"
      };
    }
    setAnalysisData(data);
  }, []);

  const handleNavigate = (route) => {
    window.location.href = route;
  };

  if (!analysisData) return null;

  return (
    <div className="min-h-screen bg-[#F6F7FB] flex">
      {/* SaaS Sidebar */}
      <DashboardSidebar
        activeRoute="/analysis/1"
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onLogout={() => { setStoredUser(null); window.location.href = '/'; }}
      />

      {/* Main SaaS Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          activeRouteTitle="Diagnostic Virality Audit"
          onOpenCmd={() => setIsCmdOpen(true)}
          currentUser={currentUser}
        />

        {/* Sticky Section Nav */}
        <ResultSectionNav />

        {/* Content Container (Max-Width 1360px) */}
        <main className="p-6 sm:p-8 max-w-[1360px] w-full mx-auto space-y-8 animate-fade-in">
          
          {/* Section 1: Header */}
          <AnalysisResultHeader
            videoMeta={analysisData.videoMeta}
            onBack={() => handleNavigate('/dashboard')}
            onNavigate={handleNavigate}
          />

          {/* Section 2: Executive Summary Hero */}
          <ExecutiveSummary
            viralityScore={analysisData.virality_score}
            confidence={analysisData.model_confidence}
          />

          {/* Section 2.5: AI Video Summary & Key Scene Detection */}
          <VideoSummaryCard
            summaryData={analysisData.video_summary}
          />

          {/* Section 3: 4 Key Metric Cards */}
          <MetricSummaryCard
            features={analysisData.features}
            estimatedReach={analysisData.estimated_reach}
          />

          {/* Section 5: Balanced Two-Column Grid (Video Player & Interactive Timeline) */}
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

          {/* Section 6 & 7: Retention Risk Map & Hook Lab */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <HookLab hookData={analysisData.hookLab} />
            </div>

            <div className="lg:col-span-5">
              <RetentionRiskMap riskMap={analysisData.retentionRiskMap} />
            </div>
          </div>

          {/* Section 8: Platform Fit Comparison */}
          <PlatformFitComparison platforms={analysisData.platforms} />

          {/* Section 9 & 10: Content Doctor & Virality DNA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <ContentDoctor doctorData={analysisData.contentDoctor} />
            </div>

            <div className="lg:col-span-5">
              <ViralityDNAChart dnaData={analysisData.viralityDNA} />
            </div>
          </div>

          {/* Section 11 & 12: What-If Simulator & AI Improvement Plan */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <WhatIfSimulator baseScore={analysisData.virality_score} />
            </div>

            <div className="lg:col-span-7">
              <ImprovementChecklist />
            </div>
          </div>

          {/* Section 13 & 14: Data Reliability & Detailed Score Breakdown */}
          <div className="space-y-8">
            <DataReliabilityPanel reliability={analysisData.reliability} />

            <MetricBreakdownTable features={analysisData.features} />
          </div>

          {/* Section 15: Report Footer */}
          <ResultFooter onNavigate={handleNavigate} />

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
