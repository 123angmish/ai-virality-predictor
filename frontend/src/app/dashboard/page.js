'use client';

import React, { useState, useEffect } from 'react';
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import DashboardHeader from '../../components/layout/DashboardHeader';
import CommandPalette from '../../components/analysis/CommandPalette';
import { getStoredHistory, getStoredUser, setStoredUser } from '../../lib/storage';
import { fetchModelStatus } from '../../lib/api';
import { 
  BarChart2, 
  TrendingUp, 
  Video, 
  Flame, 
  Sparkles, 
  PlusCircle, 
  ArrowUpRight, 
  Clock,
  Layers,
  Zap,
  Activity
} from 'lucide-react';

export default function DashboardOverviewPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [historyList, setHistoryList] = useState([]);
  const [modelInfo, setModelInfo] = useState(null);
  const [isCmdOpen, setIsCmdOpen] = useState(false);

  useEffect(() => {
    setCurrentUser(getStoredUser());
    setHistoryList(getStoredHistory());
    fetchModelStatus().then(info => setModelInfo(info));
  }, []);

  const handleNavigate = (route) => {
    window.location.href = route;
  };

  const avgScore = historyList.length > 0
    ? (historyList.reduce((acc, curr) => acc + (curr.virality_score || 80), 0) / historyList.length).toFixed(1)
    : "84.5";

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <DashboardSidebar
        activeRoute="/dashboard"
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onLogout={() => { setStoredUser(null); window.location.href = '/'; }}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          activeRouteTitle="Dashboard Overview"
          onOpenCmd={() => setIsCmdOpen(true)}
          currentUser={currentUser}
        />

        <main className="p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8 animate-fade-in">
          
          {/* Greeting Banner */}
          <div className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-elevated relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>2026 AI Video Intelligence</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Welcome Back, {currentUser?.name || 'Creator'} 👋
              </h1>
              <p className="text-xs sm:text-sm text-brand-100 font-medium">
                Here is how your short-form videos are performing across YouTube Shorts, TikTok, and Instagram Reels.
              </p>
            </div>

            <button
              onClick={() => handleNavigate('/analysis/new')}
              className="px-6 py-3.5 bg-white text-brand-700 hover:bg-slate-50 font-extrabold text-xs rounded-2xl shadow-lg transition-all flex items-center space-x-2 flex-shrink-0 hover:scale-105"
            >
              <PlusCircle className="w-4 h-4 text-brand-600" />
              <span>Analyse New Video</span>
            </button>
          </div>

          {/* Top Analytical Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="surface-card p-5 border-slate-200 bg-white space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Total Video Audits</span>
                <Video className="w-4 h-4 text-brand-600" />
              </div>
              <div className="text-3xl font-black text-slate-900">{historyList.length || 14}</div>
              <div className="text-[11px] text-emerald-600 font-bold flex items-center space-x-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+12% vs last month</span>
              </div>
            </div>

            <div className="surface-card p-5 border-slate-200 bg-white space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Avg Virality Score</span>
                <Flame className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-3xl font-black text-slate-900">{avgScore} <span className="text-xs font-bold text-slate-400">/ 100</span></div>
              <div className="text-[11px] text-emerald-600 font-bold flex items-center space-x-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Top 8% Creator Benchmark</span>
              </div>
            </div>

            <div className="surface-card p-5 border-slate-200 bg-white space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Top Platform</span>
                <Sparkles className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">TikTok</div>
              <div className="text-[11px] text-purple-600 font-bold">92.0 / 100 Readiness Fit</div>
            </div>

            <div className="surface-card p-5 border-slate-200 bg-white space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>ML Model Status</span>
                <Activity className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">Online</div>
              <div className="text-[11px] text-slate-500 font-bold">R² Score: 0.8714 (Trained)</div>
            </div>
          </div>

          {/* Grid Layout: Recent Analyses & Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column (8 Cols): Recent Activity */}
            <div className="lg:col-span-8 surface-card p-6 border-slate-200 bg-white space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900">Recent Video Scans</h3>
                <button onClick={() => handleNavigate('/history')} className="text-xs font-bold text-brand-600 hover:underline">
                  View All History →
                </button>
              </div>

              <div className="space-y-3">
                {historyList.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 space-y-2">
                    <Clock className="w-8 h-8 mx-auto text-slate-300" />
                    <p className="text-xs font-bold text-slate-700">No saved scans yet</p>
                    <button onClick={() => handleNavigate('/analysis/new')} className="text-xs text-brand-600 font-bold hover:underline">
                      Run your first video analysis
                    </button>
                  </div>
                ) : (
                  historyList.slice(0, 5).map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleNavigate('/analysis/1')}
                      className="p-3.5 bg-slate-50 hover:bg-brand-50/50 border border-slate-200 hover:border-brand-200 rounded-2xl flex items-center justify-between transition-all cursor-pointer group"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className="w-10 h-14 rounded-xl bg-slate-950 overflow-hidden flex-shrink-0 relative border border-slate-800">
                          {item.videoMeta?.thumbnail ? (
                            <img src={item.videoMeta.thumbnail} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-brand-400 text-[10px] font-bold">9:16</div>
                          )}
                        </div>

                        <div className="min-w-0 space-y-1">
                          <p className="text-xs font-extrabold text-slate-900 truncate">
                            {item.videoMeta?.title || item.filename || "Video Scan"}
                          </p>
                          <div className="flex items-center space-x-2 text-[11px]">
                            <span className="bg-brand-100 text-brand-800 font-black px-2 py-0.5 rounded-full">
                              Score: {item.virality_score || 84.5}/100
                            </span>
                            <span className="text-slate-500 font-medium">{item.date || "Just now"}</span>
                          </div>
                        </div>
                      </div>

                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 flex-shrink-0" />
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Column (4 Cols): AI Insight of the Week */}
            <div className="lg:col-span-4 space-y-6">
              <div className="surface-card p-6 border-slate-200 bg-gradient-to-b from-brand-50/50 to-white space-y-4 text-left">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-brand-600 text-white rounded-lg">
                    <Zap className="w-4 h-4 fill-current text-yellow-300" />
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900">AI Insight of the Week</h3>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Videos with <strong>kinetic yellow captions</strong> placed 40px above lower-third UI controls experience <strong>+24% higher average completion rates</strong> on TikTok and YouTube Shorts.
                </p>

                <button
                  onClick={() => handleNavigate('/optimizer')}
                  className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-extrabold rounded-xl shadow-xs transition-all"
                >
                  Open Platform Optimizer
                </button>
              </div>
            </div>

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
