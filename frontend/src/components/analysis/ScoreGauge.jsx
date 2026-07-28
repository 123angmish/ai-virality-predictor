'use client';

import React from 'react';
import { Award, ShieldCheck, Flame, TrendingUp } from 'lucide-react';

export default function ScoreGauge({ score = 84.5, confidence = 95.4 }) {
  const getTier = (s) => {
    if (s >= 85) return { label: 'Viral Candidate (Top 5%)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (s >= 70) return { label: 'High Potential (Top 15%)', color: 'text-brand-700 bg-brand-50 border-brand-200' };
    if (s >= 50) return { label: 'Average Engagement', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { label: 'Needs Optimization', color: 'text-red-700 bg-red-50 border-red-200' };
  };

  const tier = getTier(score);

  return (
    <div className="surface-card p-6 border-slate-200 bg-white text-center space-y-4 shadow-elevated">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
          <Flame className="w-4 h-4 text-brand-600" />
          <span>Virality Score Dial</span>
        </span>
        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
          {confidence}% Confidence
        </span>
      </div>

      <div className="py-2 flex flex-col items-center justify-center space-y-2">
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Outer Ring */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#E6E8F0"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#635BFF"
              strokeWidth="10"
              strokeDasharray={251.2}
              strokeDashoffset={251.2 - (251.2 * score) / 100}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-black text-slate-900 leading-none">{score}</span>
            <span className="text-[10px] font-bold text-slate-400">OUT OF 100</span>
          </div>
        </div>

        <div className={`px-3 py-1 rounded-full text-xs font-extrabold border ${tier.color}`}>
          {tier.label}
        </div>
      </div>

      <p className="text-xs text-slate-500 font-medium">
        Calculated via HistGradientBoosting Regressor ($R^2 = 0.8714$) trained on 10,000+ real engagement rows.
      </p>
    </div>
  );
}
