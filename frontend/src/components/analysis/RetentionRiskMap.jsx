'use client';

import React from 'react';
import { AlertCircle, Activity, Info } from 'lucide-react';

export default function RetentionRiskMap({ riskMap }) {
  const map = Array.isArray(riskMap) && riskMap.length > 0 ? riskMap : [
    { startSec: 0, endSec: 3, level: "High Attention", color: "bg-emerald-500", text: "Optimal 88% Retention" },
    { startSec: 3, endSec: 8, level: "Neutral", color: "bg-brand-500", text: "Steady Pacing" },
    { startSec: 8, endSec: 14, level: "High Attention", color: "bg-emerald-500", text: "Audio Peak & Kinetic Text" },
    { startSec: 14, endSec: 18, level: "Retention Risk", color: "bg-amber-500", text: "Visual Monotony Warning" },
    { startSec: 18, endSec: 22, level: "CTA Loop", color: "bg-indigo-500", text: "Seamless End-to-Start Loop" }
  ];

  return (
    <div className="surface-card p-6 border-slate-200 bg-white text-left space-y-4 shadow-elevated">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">
            <Activity className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-extrabold text-slate-900">Retention Risk Heatmap</h3>
        </div>
        <span className="text-[10px] font-bold text-slate-400">Predicted Content Signals</span>
      </div>

      <div className="space-y-2">
        {map.map((item, idx) => (
          <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between space-x-3 text-xs">
            <div className="flex items-center space-x-2.5">
              <span className={`w-2.5 h-2.5 rounded-full ${item.color || 'bg-brand-500'}`}></span>
              <span className="font-extrabold text-slate-900">{item.startSec}s – {item.endSec}s</span>
              <span className="text-slate-500 font-medium">({item.level || 'Neutral'})</span>
            </div>
            <span className="text-slate-700 font-bold">{item.text}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 font-medium pt-1">
        <Info className="w-3.5 h-3.5" />
        <span>Predicted retention risk based on optical motion flow and audio signal drops.</span>
      </div>
    </div>
  );
}
