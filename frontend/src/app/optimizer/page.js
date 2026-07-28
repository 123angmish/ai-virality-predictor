'use client';

import React, { useState, useEffect } from 'react';
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import DashboardHeader from '../../components/layout/DashboardHeader';
import CommandPalette from '../../components/analysis/CommandPalette';
import PlatformTabs from '../../components/PlatformTabs';
import { getPlatformAnalysis } from '../../lib/api';
import { getStoredUser, setStoredUser } from '../../lib/storage';
import { Sparkles, Sliders } from 'lucide-react';

export default function PlatformOptimizerPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    setCurrentUser(getStoredUser());
    setPlatforms(getPlatformAnalysis());
  }, []);

  const handleNavigate = (route) => {
    window.location.href = route;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <DashboardSidebar
        activeRoute="/optimizer"
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onLogout={() => { setStoredUser(null); window.location.href = '/'; }}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          activeRouteTitle="Platform Optimizer"
          onOpenCmd={() => setIsCmdOpen(true)}
          currentUser={currentUser}
        />

        <main className="p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8 animate-fade-in">
          
          <div className="border-b border-slate-200 pb-4 text-left">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Platform Optimizer Studio</h1>
            <p className="text-xs text-slate-500 font-medium">Generate platform-specific editing steps, hook rewrites, and post-upload revival strategies for TikTok, Shorts, Reels, X, and Facebook.</p>
          </div>

          <PlatformTabs platforms={platforms} />

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
