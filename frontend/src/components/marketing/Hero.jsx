'use client';

import React from 'react';
import { Sparkles, ArrowRight, Play, ShieldCheck, Zap, Activity, CheckCircle2 } from 'lucide-react';

export default function Hero({ onStartAnalysis, onSelectDemo }) {
  return (
    <section className="pt-32 pb-16 overflow-hidden relative">
      {/* Background Subtle Gradient Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-brand-50/70 via-indigo-50/40 to-transparent pointer-events-none -z-10 rounded-full blur-3xl opacity-80" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-brand-50 border border-brand-200/80 px-4 py-1.5 rounded-full text-xs font-bold text-brand-700 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
          <span>AI Video Intelligence for Creators & Brands</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
          Know Why Your Video Will Go Viral — <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Before You Post It</span>
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium max-w-2xl mx-auto">
          Analyse hooks, visual motion pacing, audio dynamics, text overlays, and algorithm fit. Get a clear virality score and actionable recommendations in minutes.
        </p>

        {/* CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <a
            href="#analyzer"
            onClick={onStartAnalysis}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-700 hover:from-brand-700 hover:to-indigo-800 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center space-x-2 hover:scale-[1.02]"
          >
            <Zap className="w-4 h-4 text-yellow-300 fill-current" />
            <span>Analyse a Video Free</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={onSelectDemo}
            className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-2xl border border-slate-200 shadow-subtle transition-all flex items-center justify-center space-x-2"
          >
            <Play className="w-4 h-4 text-brand-600 fill-current" />
            <span>View Sample Report</span>
          </button>
        </div>

        {/* Trust Bulletins */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500">
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
    </section>
  );
}
