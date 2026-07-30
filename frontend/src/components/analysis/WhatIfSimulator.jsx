'use client';

import React, { useState } from 'react';
import { Sliders, Sparkles, TrendingUp } from 'lucide-react';

export default function WhatIfSimulator({ baseScore = 84.5 }) {
  const [shortenIntro, setShortenIntro] = useState(true);
  const [addCaptions, setAddCaptions] = useState(true);
  const [boostAudio, setBoostAudio] = useState(false);
  const [addBroll, setAddBroll] = useState(true);

  const numericBase = typeof baseScore === 'number' ? baseScore : parseFloat(baseScore) || 84.5;

  // Calculate simulated score adjustment
  let simScore = numericBase;
  if (shortenIntro) simScore += 4.5;
  if (addCaptions) simScore += 3.0;
  if (boostAudio) simScore += 2.5;
  if (addBroll) simScore += 3.5;
  simScore = Math.min(99.0, Number(simScore.toFixed(1)));

  return (
    <div id="what-if-simulator" className="surface-card p-6 border-slate-200 bg-white text-left space-y-4 shadow-elevated">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
            <Sliders className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-extrabold text-slate-900">What-If Improvement Simulator</h3>
        </div>
        <span className="text-[10px] font-bold text-slate-400">Directional Simulation</span>
      </div>

      <p className="text-xs text-slate-500 font-medium">
        Toggle planned edits to simulate expected score improvement before exporting final render:
      </p>

      <div className="space-y-2.5">
        <label className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer text-xs font-bold text-slate-800">
          <span>Shorten opening intro by 1.2 seconds</span>
          <input
            type="checkbox"
            checked={shortenIntro}
            onChange={(e) => setShortenIntro(e.target.checked)}
            className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
          />
        </label>

        <label className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer text-xs font-bold text-slate-800">
          <span>Add kinetic word captions with yellow highlight</span>
          <input
            type="checkbox"
            checked={addCaptions}
            onChange={(e) => setAddCaptions(e.target.checked)}
            className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
          />
        </label>

        <label className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer text-xs font-bold text-slate-800">
          <span>Boost audio RMS background track (+15%)</span>
          <input
            type="checkbox"
            checked={boostAudio}
            onChange={(e) => setBoostAudio(e.target.checked)}
            className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
          />
        </label>

        <label className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer text-xs font-bold text-slate-800">
          <span>Insert B-roll visual cut at 0:15s</span>
          <input
            type="checkbox"
            checked={addBroll}
            onChange={(e) => setAddBroll(e.target.checked)}
            className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
          />
        </label>
      </div>

      <div className="p-3.5 bg-brand-50 border border-brand-200 rounded-xl flex items-center justify-between">
        <div>
          <span className="text-[10px] font-extrabold text-brand-700 uppercase block">Simulated Score</span>
          <span className="text-xl font-black text-brand-900">{simScore} / 100</span>
        </div>

        <div className="text-right">
          <span className="text-xs font-extrabold text-emerald-700 flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{(simScore - numericBase).toFixed(1)} Points</span>
          </span>
          <span className="text-[10px] text-slate-500 font-medium">Estimated effect only</span>
        </div>
      </div>
    </div>
  );
}
