'use client';

import React from 'react';
import { Dna, Sparkles } from 'lucide-react';

export default function ViralityDNA({ dnaData }) {
  const dna = dnaData || {};

  const metrics = [
    { label: "Hook DNA", value: dna.hookDNA || 88, color: "bg-brand-600" },
    { label: "Motion DNA", value: dna.motionDNA || 82, color: "bg-purple-600" },
    { label: "Audio DNA", value: dna.audioDNA || 84, color: "bg-blue-600" },
    { label: "Emotion DNA", value: dna.emotionDNA || 79, color: "bg-pink-600" },
    { label: "Pacing DNA", value: dna.pacingDNA || 86, color: "bg-indigo-600" },
    { label: "Platform DNA", value: dna.platformDNA || 90, color: "bg-emerald-600" }
  ];

  return (
    <div className="surface-card p-6 border-slate-200 bg-white text-left space-y-4 shadow-elevated">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg">
            <Dna className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-extrabold text-slate-900">Virality DNA Profile</h3>
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Node Signature</span>
      </div>

      <div className="space-y-3">
        {metrics.map((m, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700">{m.label}</span>
              <span className="text-slate-900 font-extrabold">{m.value} / 100</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className={`${m.color} h-1.5 rounded-full`} style={{ width: `${m.value}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
