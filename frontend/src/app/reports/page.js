'use client';

import React, { useState, useEffect } from 'react';
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import DashboardHeader from '../../components/layout/DashboardHeader';
import CommandPalette from '../../components/analysis/CommandPalette';
import ReportExporter from '../../components/ReportExporter';
import { getStoredUser, setStoredUser } from '../../lib/storage';
import { getDemoAnalysis } from '../../lib/api';
import { FileText, Download, Share2 } from 'lucide-react';

export default function ReportsPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [demoData, setDemoData] = useState(null);

  useEffect(() => {
    setCurrentUser(getStoredUser());
    setDemoData(getDemoAnalysis());
  }, []);

  const handleNavigate = (route) => {
    window.location.href = route;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <DashboardSidebar
        activeRoute="/reports"
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onLogout={() => { setStoredUser(null); window.location.href = '/'; }}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          activeRouteTitle="Diagnostic Reports"
          onOpenCmd={() => setIsCmdOpen(true)}
          currentUser={currentUser}
        />

        <main className="p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8 animate-fade-in">
          
          <div className="border-b border-slate-200 pb-4 text-left">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Diagnostic Reports & Exports</h1>
            <p className="text-xs text-slate-500 font-medium">Export executive PDF summaries, plain-text diagnostic guides, or CSV feature spreadsheets.</p>
          </div>

          {demoData && <ReportExporter analysisData={demoData} />}

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
