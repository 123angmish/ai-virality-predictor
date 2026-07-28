'use client';

import React, { useState, useEffect } from 'react';
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import DashboardHeader from '../../components/layout/DashboardHeader';
import CommandPalette from '../../components/analysis/CommandPalette';
import { getStoredUser, setStoredUser } from '../../lib/storage';
import { GitCompare, Trophy, Flame, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CompareVideosPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isCmdOpen, setIsCmdOpen] = useState(false);

  useEffect(() => {
    setCurrentUser(getStoredUser());
  }, []);

  const handleNavigate = (route) => {
    window.location.href = route;
  };

  const videos = [
    {
      title: "Draft A: 10x Views Hook",
      platform: "YouTube Shorts",
      score: 88.5,
      hookSpeed: 84.5,
      motionScore: 82,
      audioRMS: 82,
      pacing: 88,
      winner: true,
      thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=400&auto=format&fit=crop"
    },
    {
      title: "Draft B: Standard Talking Head",
      platform: "TikTok",
      score: 72.0,
      hookSpeed: 64.0,
      motionScore: 68,
      audioRMS: 70,
      pacing: 65,
      winner: false,
      thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <DashboardSidebar
        activeRoute="/compare"
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onLogout={() => { setStoredUser(null); window.location.href = '/'; }}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          activeRouteTitle="Compare Videos Workspace"
          onOpenCmd={() => setIsCmdOpen(true)}
          currentUser={currentUser}
        />

        <main className="p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8 animate-fade-in">
          
          <div className="border-b border-slate-200 pb-4 text-left">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Multi-Video Comparison Workspace</h1>
            <p className="text-xs text-slate-500 font-medium">Compare up to 4 video variations side-by-side to identify the winning hook and pacing structure.</p>
          </div>

          {/* Side-by-Side Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((vid, idx) => (
              <div 
                key={idx}
                className={`surface-card p-6 border-slate-200 bg-white text-left space-y-4 relative ${
                  vid.winner ? 'ring-2 ring-emerald-500 shadow-elevated' : ''
                }`}
              >
                {vid.winner && (
                  <div className="absolute -top-3 left-6 bg-emerald-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full flex items-center space-x-1 shadow-xs">
                    <Trophy className="w-3 h-3" />
                    <span>AI Recommended Winner</span>
                  </div>
                )}

                <div className="flex items-center space-x-3 pt-2">
                  <div className="w-12 h-16 rounded-xl bg-slate-950 overflow-hidden relative border border-slate-800 flex-shrink-0">
                    <img src={vid.thumbnail} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">{vid.title}</h3>
                    <span className="text-xs text-slate-500 font-semibold">{vid.platform}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600">Virality Score</span>
                  <span className="text-2xl font-black text-slate-900">{vid.score} / 100</span>
                </div>

                <div className="space-y-2 text-xs font-semibold text-slate-700">
                  <div className="flex justify-between">
                    <span>Hook Speed (0-3s)</span>
                    <span className="font-extrabold">{vid.hookSpeed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Motion Vector Score</span>
                    <span className="font-extrabold">{vid.motionScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Audio RMS Energy</span>
                    <span className="font-extrabold">{vid.audioRMS}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pacing Index</span>
                    <span className="font-extrabold">{vid.pacing}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* AI Winning Verdict */}
          <div className="surface-card p-6 border-emerald-200 bg-emerald-50/40 text-left space-y-2">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-black text-slate-900">AI Winning Verdict: Draft A</h3>
            </div>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              <strong>Draft A</strong> outperforms Draft B by <strong>+16.5 points</strong> primarily due to a <strong>+20.5 higher 0-3s Hook Speed score</strong> and faster scene cut pacing. We recommend publishing Draft A to YouTube Shorts and TikTok.
            </p>
          </div>

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
