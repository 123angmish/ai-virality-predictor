'use client';

import React, { useState } from 'react';
import DashboardSidebar from '../../../components/layout/DashboardSidebar';
import DashboardHeader from '../../../components/layout/DashboardHeader';
import CommandPalette from '../../../components/analysis/CommandPalette';
import MainAnalysisTool from '../../../components/marketing/MainAnalysisTool';
import { getStoredUser, setStoredUser, addHistoryItem } from '../../../lib/storage';
import { analyzeVideoUrl, analyzeVideoUpload, getDemoAnalysis } from '../../../lib/api';

export default function NewAnalysisWizardPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    setCurrentUser(getStoredUser());
  }, []);

  const handleNavigate = (route) => {
    window.location.href = route;
  };

  const handleAnalyzeUrl = async (url, options) => {
    setIsLoading(true);
    const result = await analyzeVideoUrl(url, options);
    addHistoryItem(result);
    setIsLoading(false);
    window.location.href = '/analysis/1';
  };

  const handleAnalyzeUpload = async (file, options) => {
    setIsLoading(true);
    const result = await analyzeVideoUpload(file, options);
    addHistoryItem(result);
    setIsLoading(false);
    window.location.href = '/analysis/1';
  };

  const handleSelectDemo = () => {
    const demo = getDemoAnalysis();
    addHistoryItem(demo);
    window.location.href = '/analysis/1';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <DashboardSidebar
        activeRoute="/analysis/new"
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onLogout={() => { setStoredUser(null); window.location.href = '/'; }}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          activeRouteTitle="New Video Analysis Wizard"
          onOpenCmd={() => setIsCmdOpen(true)}
          currentUser={currentUser}
        />

        <main className="p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8 animate-fade-in">
          <MainAnalysisTool
            onAnalyzeUrl={handleAnalyzeUrl}
            onAnalyzeUpload={handleAnalyzeUpload}
            onSelectDemo={handleSelectDemo}
            isLoading={isLoading}
          />
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
