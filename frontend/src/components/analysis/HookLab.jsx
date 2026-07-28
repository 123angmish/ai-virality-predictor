'use client';

import React from 'react';
import { Zap, Sparkles, Copy, Check, Eye } from 'lucide-react';

export default function HookLab({ hookData }) {
  const [copiedIdx, setCopiedIdx] = React.useState(-1);

  const data = hookData || {
    hookPeriod: "0-3 Seconds",
    curiosityScore: 88,
    clarityScore: 92,
    emotionalPull: "High Curiosity",
    hookAssessment: "Strong visual hook with immediate creator face framing and direct camera gaze.",
    alternativeHooks: [
      "\"99% of creators fail at short-form content because of this single 3-second mistake...\"",
      "\"I tested 50 short-form video hooks in 30 days — here is the #1 winner...\"",
      "\"Stop scrolling if your views are stuck under 1,000 views...\""
    ]
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(-1), 2000);
  };

  return (
    <div className="surface-card p-6 border-slate-200 bg-white text-left space-y-4 shadow-elevated">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-brand-50 text-brand-600 rounded-lg">
            <Zap className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-extrabold text-slate-900">Hook Lab (First 3 Seconds)</h3>
        </div>
        <span className="text-[10px] font-bold bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full border border-brand-200">
          {data.hookPeriod}
        </span>
      </div>

      {/* Scores Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase">Curiosity</span>
          <div className="text-sm font-black text-slate-900">{data.curiosityScore} / 100</div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase">Clarity</span>
          <div className="text-sm font-black text-slate-900">{data.clarityScore} / 100</div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase">Pull</span>
          <div className="text-sm font-black text-emerald-600">{data.emotionalPull}</div>
        </div>
      </div>

      <p className="text-xs text-slate-600 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
        💡 <strong>Visual Hook Assessment:</strong> {data.hookAssessment}
      </p>

      {/* 3 AI Alternative Hooks */}
      <div className="space-y-2 pt-1">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
          3 Recommended Alternative Hook Openings:
        </span>
        
        {data.alternativeHooks.map((alt, idx) => (
          <div key={idx} className="p-3 bg-brand-50/40 border border-brand-100 rounded-xl flex items-center justify-between space-x-3 group">
            <span className="text-xs text-slate-800 font-bold leading-snug">{alt}</span>
            <button
              onClick={() => handleCopy(alt, idx)}
              className="p-1.5 rounded-lg text-brand-600 hover:bg-white transition-all flex-shrink-0"
              title="Copy Hook Text"
            >
              {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
