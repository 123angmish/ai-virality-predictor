'use client';

import React from 'react';
import { Flame, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function ExecutiveSummary({ viralityScore = 84.5, confidence = 95.4 }) {
  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white shadow-2xl space-y-6 text-left relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/25 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Section (4 Cols): Score Dial */}
        <div className="lg:col-span-4 flex flex-col items-center sm:items-start space-y-3 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
          <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-yellow-300">
            <Flame className="w-4 h-4 fill-current text-yellow-300" />
            <span>Virality Score Dial</span>
          </div>

          <div className="flex items-baseline space-x-3">
            <span className="text-5xl sm:text-6xl font-black text-white leading-none">{viralityScore}</span>
            <span className="text-sm font-extrabold text-slate-300">/ 100</span>
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-extrabold text-xs rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>High Viral Potential (Top 15%)</span>
          </div>

          <div className="text-[11px] text-slate-300 font-medium">
            Model Confidence Index: <strong className="text-white font-extrabold">{confidence}%</strong>
          </div>
        </div>

        {/* Middle Section (5 Cols): Executive Summary Text */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-brand-300 block">AI Executive Summary</span>
          <p className="text-sm text-slate-100 font-semibold leading-relaxed">
            "Your video features a strong opening hook, high platform format compatibility, and clean kinetic text overlays. The biggest performance risk occurs between <strong className="text-yellow-300 font-extrabold">seconds 14 and 18</strong>, where visual motion drops slightly."
          </p>

          <div className="pt-1 flex items-center space-x-4 text-xs font-bold text-slate-200">
            <span className="flex items-center space-x-1.5 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>3 Verified Strengths</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-full text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>2 High-Priority Fixes</span>
            </span>
          </div>
        </div>

        {/* Right Section (3 Cols): Best Match & CTA */}
        <div className="lg:col-span-3 space-y-4 flex flex-col justify-between h-full border-t lg:border-t-0 lg:border-l border-white/20 pt-4 lg:pt-0 lg:pl-6">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300 block">Best Match Platform</span>
            <div className="text-xl font-black text-white">TikTok & Shorts</div>
            <div className="text-xs text-brand-300 font-bold">92% & 88% Readiness</div>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('improvement-plan');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-2 hover:scale-[1.02] cursor-pointer"
          >
            <span>View Improvement Plan</span>
            <ArrowRight className="w-4 h-4 text-brand-600" />
          </button>
        </div>

      </div>
    </div>
  );
}
