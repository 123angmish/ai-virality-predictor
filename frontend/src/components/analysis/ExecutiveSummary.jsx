'use client';

import React from 'react';
import { Flame, Sparkles, TrendingUp, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function ExecutiveSummary({ viralityScore = 84.5, confidence = 95.4 }) {
  return (
    <div className="surface-card p-6 sm:p-8 border-slate-200 bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 text-white shadow-elevated space-y-6 text-left relative overflow-hidden">
      
      {/* Background Decorative Mesh Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Section (4 Cols): Large Score Dial */}
        <div className="lg:col-span-4 flex flex-col items-center sm:items-start space-y-3 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
          <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-brand-100">
            <Flame className="w-4 h-4 text-yellow-300 fill-current" />
            <span>Virality Score Dial</span>
          </div>

          <div className="flex items-baseline space-x-3">
            <span className="text-5xl sm:text-6xl font-black text-white leading-none">{viralityScore}</span>
            <span className="text-sm font-extrabold text-brand-200">/ 100</span>
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-400/20 border border-emerald-300/40 text-emerald-200 font-extrabold text-xs rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>High Viral Potential (Top 15%)</span>
          </div>

          <div className="text-[11px] text-slate-200 font-medium">
            Model Confidence Index: <strong>{confidence}%</strong>
          </div>
        </div>

        {/* Middle Section (5 Cols): AI Summary Paragraph */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-brand-200 block">AI Executive Summary</span>
          <p className="text-sm text-slate-100 font-medium leading-relaxed">
            "Your video features a strong opening hook, high platform format compatibility, and clean kinetic text overlays. The biggest performance risk occurs between <strong>seconds 14 and 18</strong>, where visual motion drops slightly."
          </p>

          <div className="pt-1 flex items-center space-x-4 text-xs font-semibold text-brand-100">
            <span className="flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>3 Verified Strengths</span>
            </span>
            <span className="flex items-center space-x-1">
              <AlertTriangle className="w-4 h-4 text-amber-300" />
              <span>2 High-Priority Fixes</span>
            </span>
          </div>
        </div>

        {/* Right Section (3 Cols): Best Match & CTA */}
        <div className="lg:col-span-3 space-y-4 flex flex-col justify-between h-full border-t lg:border-t-0 lg:border-l border-white/20 pt-4 lg:pt-0 lg:pl-6">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-200 block">Best Match Platform</span>
            <div className="text-lg font-black text-white">TikTok & Shorts</div>
            <div className="text-xs text-brand-100 font-medium">92% & 88% Readiness</div>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('improvement-plan');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full py-3 bg-white text-slate-900 hover:bg-slate-50 font-extrabold text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2 hover:scale-[1.02]"
          >
            <span>View Improvement Plan</span>
            <ArrowRight className="w-4 h-4 text-brand-600" />
          </button>
        </div>

      </div>
    </div>
  );
}
