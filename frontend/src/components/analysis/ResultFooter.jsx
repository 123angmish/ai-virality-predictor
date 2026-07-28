'use client';

import React from 'react';
import { Download, PlusCircle, GitCompare, LayoutDashboard, ShieldCheck } from 'lucide-react';

export default function ResultFooter({ onNavigate }) {
  return (
    <div className="surface-card p-6 border-slate-200 bg-white text-left space-y-4 shadow-elevated">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-brand-600" />
            <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">
              Diagnostic Audit Report #VIR-{Date.now().toString().slice(-6)}
            </h4>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            Model Version: <strong>HistGradientBoosting v2.4 (R² = 0.8714)</strong> • Generated for Creator Account
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-slate-900 text-white font-extrabold text-xs rounded-xl shadow-xs hover:bg-slate-800 transition-all flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Report</span>
          </button>

          <button
            onClick={() => onNavigate && onNavigate('/analysis/new')}
            className="px-4 py-2 bg-brand-600 text-white font-extrabold text-xs rounded-xl shadow-xs hover:bg-brand-700 transition-all flex items-center space-x-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Start New Analysis</span>
          </button>

          <button
            onClick={() => onNavigate && onNavigate('/dashboard')}
            className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition-all flex items-center space-x-1.5"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Return to Dashboard</span>
          </button>
        </div>
      </div>

      <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
        <strong>Virality Prediction Disclaimer:</strong> Virality scores and estimated reach are generated using empirical computer vision and audio signal processing models trained on historical video performance data. Organic algorithmic views depend on platform algorithms, audience targeting, and real-time social trends.
      </p>
    </div>
  );
}
