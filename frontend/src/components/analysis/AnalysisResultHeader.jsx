'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Share2, 
  Download, 
  ChevronDown, 
  FileText, 
  FileSpreadsheet, 
  Printer, 
  Copy, 
  Check, 
  Zap, 
  GitCompare,
  Clock,
  Video
} from 'lucide-react';

export default function AnalysisResultHeader({ videoMeta, onBack, onNavigate }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const meta = videoMeta || {
    title: "How_I_10xed_My_Views.mp4",
    platform: "Instagram Reels",
    duration: "22 seconds",
    date: "Analysed today",
    resolution: "1080x1920 (9:16)"
  };

  const handleCopySummary = () => {
    const summaryText = `AI Virality Predictor Report: ${meta.title}\nVirality Score: 84.5/100 (High Viral Potential)\nEstimated Reach: 1.45M+ Views\nTop Platform Match: TikTok (92%) & Instagram Reels (85%)`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="surface-card p-6 border-slate-200 bg-white shadow-elevated space-y-4 text-left">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Left: Spec & Title */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onBack || (() => window.location.href = '/dashboard')}
              className="inline-flex items-center space-x-1 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-extrabold rounded-lg transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Analyses</span>
            </button>

            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-extrabold rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Analysis Complete</span>
            </span>

            <span className="px-2.5 py-0.5 bg-purple-50 text-purple-700 text-xs font-bold rounded-full border border-purple-200">
              {meta.platform}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
            {meta.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{meta.duration} • {meta.date}</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Video className="w-3.5 h-3.5 text-slate-400" />
              <span>{meta.resolution || "9:16 Vertical"}</span>
            </span>
          </div>
        </div>

        {/* Right Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              const el = document.getElementById('improvement-plan');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5 hover:scale-105"
          >
            <Zap className="w-3.5 h-3.5 text-yellow-300 fill-current" />
            <span>Improve Video</span>
          </button>

          <button
            onClick={() => onNavigate && onNavigate('/compare')}
            className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-all flex items-center space-x-1.5 shadow-xs"
          >
            <GitCompare className="w-3.5 h-3.5 text-slate-500" />
            <span>Compare</span>
          </button>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all flex items-center space-x-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Report</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-elevated border border-slate-200 p-2 space-y-1 z-30 animate-fade-in">
                <button
                  onClick={() => { window.print(); setDropdownOpen(false); }}
                  className="w-full p-2.5 rounded-xl hover:bg-slate-50 text-left flex items-center space-x-2.5 text-xs font-bold text-slate-800 transition-all"
                >
                  <FileText className="w-4 h-4 text-brand-600" />
                  <span>Download PDF Summary</span>
                </button>

                <button
                  onClick={() => { window.print(); setDropdownOpen(false); }}
                  className="w-full p-2.5 rounded-xl hover:bg-slate-50 text-left flex items-center space-x-2.5 text-xs font-bold text-slate-800 transition-all"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>Export CSV Data Table</span>
                </button>

                <button
                  onClick={handleCopySummary}
                  className="w-full p-2.5 rounded-xl hover:bg-slate-50 text-left flex items-center space-x-2.5 text-xs font-bold text-slate-800 transition-all"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-purple-600" />}
                  <span>{copied ? 'Summary Copied!' : 'Copy Plain Summary'}</span>
                </button>

                <button
                  onClick={() => { window.print(); setDropdownOpen(false); }}
                  className="w-full p-2.5 rounded-xl hover:bg-slate-50 text-left flex items-center space-x-2.5 text-xs font-bold text-slate-800 transition-all border-t border-slate-100"
                >
                  <Printer className="w-4 h-4 text-slate-500" />
                  <span>Print Diagnostic Report</span>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
