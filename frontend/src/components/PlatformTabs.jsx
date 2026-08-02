'use client';

import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, RefreshCw, Sparkles, X, ChevronRight, Layers } from 'lucide-react';

export default function PlatformTabs({ platforms }) {
  const platformKeys = [
    { key: 'tiktok', label: 'TikTok', icon: '🎵', badgeBg: 'bg-slate-900', textColor: 'text-cyan-400', borderColor: 'border-cyan-500/40' },
    { key: 'shorts', label: 'YouTube Shorts', icon: '▶️', badgeBg: 'bg-red-600', textColor: 'text-white', borderColor: 'border-red-400' },
    { key: 'reels', label: 'Instagram Reels', icon: '📸', badgeBg: 'bg-pink-600', textColor: 'text-white', borderColor: 'border-pink-400' },
    { key: 'facebook', label: 'Facebook Reels', icon: '👍', badgeBg: 'bg-blue-600', textColor: 'text-white', borderColor: 'border-blue-400' },
    { key: 'x', label: 'Twitter / X', icon: '𝕏', badgeBg: 'bg-slate-800', textColor: 'text-white', borderColor: 'border-slate-600' }
  ];

  const [activeModalKey, setActiveModalKey] = useState(null);

  // Helper to extract platform item whether platforms is an Array or Object
  const getPlatformItem = (key) => {
    if (!platforms) return null;
    if (Array.isArray(platforms)) {
      return platforms.find(p => p.id === key || p.name?.toLowerCase().includes(key));
    }
    return platforms[key];
  };

  const selectedPlatformData = activeModalKey ? getPlatformItem(activeModalKey) : null;
  const selectedMeta = activeModalKey ? platformKeys.find(p => p.key === activeModalKey) : null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 text-left">
      
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              Multi-Platform Virality Diagnostic Cards
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Touch / Click any platform card below to expand its full step-by-step editing plan.
            </p>
          </div>
        </div>
        <span className="text-xs font-extrabold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
          5 Platforms Analyzed
        </span>
      </div>

      {/* 5 BIG PROMINENT PLATFORM CARDS GRID (NO HORIZONTAL SCROLL) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {platformKeys.map((p) => {
          const pData = getPlatformItem(p.key) || {};
          const score = pData.score || pData.match_percentage || 85.0;

          return (
            <div
              key={p.key}
              onClick={() => setActiveModalKey(p.key)}
              className="bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-400 rounded-2xl p-4 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md group flex flex-col justify-between space-y-3"
            >
              {/* Card Header: Icon & Badge */}
              <div className="flex items-center justify-between">
                <span className={`w-9 h-9 rounded-xl ${p.badgeBg} text-white flex items-center justify-center text-base shadow-sm`}>
                  {p.icon}
                </span>
                <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full border ${
                  score > 85 ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-amber-100 text-amber-800 border-amber-300'
                }`}>
                  {score > 85 ? 'High Virality' : 'Fix Needed'}
                </span>
              </div>

              {/* Big Score Readout */}
              <div>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight block">
                  {score}%
                </span>
                <h4 className="text-xs font-bold text-slate-800 mt-0.5">
                  {p.label} Match
                </h4>
              </div>

              {/* Touch / Click CTA Button */}
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs font-extrabold text-emerald-700 group-hover:text-emerald-800">
                <span>View Full Plan</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          );
        })}
      </div>

      {/* EXPANDED DIAGNOSTIC MODAL (When a card is touched/clicked) */}
      {activeModalKey && selectedPlatformData && selectedMeta && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center space-x-3">
                <span className={`w-11 h-11 rounded-xl ${selectedMeta.badgeBg} text-white flex items-center justify-center text-xl shadow-md`}>
                  {selectedMeta.icon}
                </span>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">
                      {selectedMeta.label} Diagnostic Plan
                    </h3>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-300">
                      {selectedPlatformData.score || selectedPlatformData.match_percentage || 85}% Match
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Platform-specific algorithm match analysis & actionable editing fixes.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModalKey(null)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 1. Gaps / What's Missing (Red Cards) */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-extrabold text-slate-900">
                  Algorithm Gaps & What's Missing (Red Flags)
                </h4>
              </div>
              <div className="space-y-2">
                {(selectedPlatformData.gaps || [selectedPlatformData.issue || 'Optimization recommended']).map((gap, idx) => (
                  <div
                    key={idx}
                    className="bg-red-50/70 border border-red-200 rounded-xl p-3.5 text-xs text-red-950 font-medium flex items-start space-x-2.5 text-left"
                  >
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-1 flex-shrink-0"></span>
                    <span>{gap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Actionable Optimization Plan (Green Cards) */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-extrabold text-slate-900">
                  Actionable Editing Optimization Plan
                </h4>
              </div>
              <div className="space-y-2">
                {(selectedPlatformData.actions || selectedPlatformData.action_plan || []).map((action, idx) => (
                  <div
                    key={idx}
                    className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5 text-xs text-emerald-950 font-medium flex items-start space-x-2.5 text-left"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-extrabold text-[10px] flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Post-Upload Re-Editing Strategy (Blue Cards) */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-extrabold text-slate-900">
                  Post-Upload Re-Editing Strategy (Revive Stalled Views)
                </h4>
              </div>
              <div className="space-y-2">
                {(selectedPlatformData.revival || selectedPlatformData.re_editing_strategy || [
                  "Peak Posting Window: 6:00 PM – 9:00 PM",
                  "Reply to top 3 comments with video replies within 1 hour"
                ]).map((strat, idx) => (
                  <div
                    key={idx}
                    className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-950 font-medium flex items-start space-x-2.5 text-left"
                  >
                    <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{strat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Close Modal CTA */}
            <div className="pt-2 border-t border-slate-100 text-right">
              <button
                onClick={() => setActiveModalKey(null)}
                className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all shadow-sm"
              >
                Close Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
