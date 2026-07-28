'use client';

import React from 'react';
import { Sparkles, ArrowRight, Play, ShieldCheck, Zap, Activity, Eye, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function Hero({ onStartAnalysis, onSelectDemo }) {
  return (
    <section className="pt-32 pb-20 overflow-hidden relative">
      {/* Background Subtle Gradient Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-brand-50/70 via-indigo-50/40 to-transparent pointer-events-none -z-10 rounded-full blur-3xl opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Proposition & Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-brand-50 border border-brand-200/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-brand-700 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
              <span>AI Video Intelligence for Creators & Brands</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Know Why Your Video Will Go Viral — <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Before You Post It</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium max-w-2xl">
              Analyse hooks, visual motion pacing, audio dynamics, text overlays, and algorithm fit. Get a clear virality score and actionable recommendations in minutes.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <a
                href="#analyzer"
                onClick={onStartAnalysis}
                className="px-6 py-3.5 bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-700 hover:from-brand-700 hover:to-indigo-800 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center space-x-2 hover:scale-[1.02]"
              >
                <Zap className="w-4 h-4 text-yellow-300 fill-current" />
                <span>Analyse a Video Free</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onSelectDemo}
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-2xl border border-slate-200 shadow-subtle transition-all flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4 text-brand-600 fill-current" />
                <span>View Sample Report</span>
              </button>
            </div>

            {/* Trust Bulletins */}
            <div className="pt-4 flex items-center space-x-6 text-xs font-semibold text-slate-500">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>No credit card required</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-500" />
                <span>Secure ML processing</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Activity className="w-4 h-4 text-purple-500" />
                <span>Real-time diagnostics</span>
              </span>
            </div>
          </div>

          {/* Right Column: Interactive SaaS Product Preview */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Interactive Preview Card */}
            <div className="surface-card p-6 border-slate-200 shadow-elevated relative z-10 bg-white/95 backdrop-blur-sm space-y-5">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 overflow-hidden border border-slate-800 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=400&auto=format&fit=crop" 
                      alt="Thumbnail" 
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 text-white fill-current" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900 truncate max-w-[180px]">
                      How I 10x-ed My Views on Shorts
                    </h3>
                    <span className="text-[10px] text-slate-500 font-semibold">9:16 Vertical • 0:21s</span>
                  </div>
                </div>

                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-extrabold rounded-full border border-emerald-200 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                  <span>Viral Candidate</span>
                </span>
              </div>

              {/* Central Virality Score Gauge Visual */}
              <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div className="space-y-1">
                  <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Virality Score</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-black text-slate-900">88.5</span>
                    <span className="text-xs font-bold text-emerald-600">/ 100</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">95.4% Model Confidence</div>
                </div>

                {/* Circular Dial Progress */}
                <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-brand-600 border-r-brand-500 border-b-emerald-500 flex items-center justify-center bg-white shadow-sm font-black text-xs text-brand-600">
                  TOP 5%
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold text-slate-500">Hook Speed (0-3s)</span>
                  <div className="text-sm font-black text-slate-900">84.5 / 100</div>
                  <div className="w-full bg-slate-100 rounded-full h-1">
                    <div className="bg-brand-600 h-1 rounded-full w-[84%]"></div>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[10px] font-bold text-slate-500">Audio RMS Energy</span>
                  <div className="text-sm font-black text-slate-900">82% Peak</div>
                  <div className="w-full bg-slate-100 rounded-full h-1">
                    <div className="bg-purple-600 h-1 rounded-full w-[82%]"></div>
                  </div>
                </div>
              </div>

              {/* Recommendation Chip */}
              <div className="p-3 bg-brand-50/80 border border-brand-200/80 rounded-xl flex items-center space-x-3 text-left">
                <div className="p-1.5 bg-brand-600 text-white rounded-lg">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-extrabold text-brand-900 block">AI Quick Fix:</span>
                  <span className="text-brand-700 font-medium">Raise text caption by 40px to avoid Shorts sidebar overlap.</span>
                </div>
              </div>
            </div>

            {/* Floating Analytics Badges */}
            <div className="absolute -top-4 -left-6 bg-white border border-slate-200 shadow-lg rounded-2xl p-2.5 flex items-center space-x-2 text-xs font-extrabold text-slate-800 z-20 hidden sm:flex">
              <div className="p-1.5 bg-red-100 text-red-600 rounded-lg">
                <Eye className="w-4 h-4" />
              </div>
              <span>Est. Reach: 1.45M+</span>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white border border-slate-200 shadow-lg rounded-2xl p-2.5 flex items-center space-x-2 text-xs font-extrabold text-slate-800 z-20 hidden sm:flex">
              <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span>TikTok Ready</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
