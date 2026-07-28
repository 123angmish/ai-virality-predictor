'use client';

import React, { useState } from 'react';
import { Activity, Eye, Volume2, AlertTriangle, Layers, Info } from 'lucide-react';

export default function AnalysisTimeline({ timestamps }) {
  const [activeLayer, setActiveLayer] = useState('all');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const points = timestamps || [
    { time: "0:01", label: "Hook Capture", score: 88, status: "optimal", detail: "Creator close-up speaking directly to camera. Optical flow motion is fast (84.5/100)." },
    { time: "0:05", label: "Core Concept", score: 79, status: "good", detail: "Kinetic yellow caption overlay appears: 'STOP DOING THIS'." },
    { time: "0:12", label: "Audio Peak / Energy Spike", score: 92, status: "viral", detail: "Bass drop sound effect with 82% RMS audio energy." },
    { time: "0:18", label: "Retention Dip Risk", score: 65, status: "warning", detail: "Static creator framing for 4s without visual cut. Insert B-roll image." },
    { time: "0:21", label: "CTA & Loop Transition", score: 85, status: "optimal", detail: "Follow / Subscribe kinetic banner transition with seamless end-to-start audio loop." }
  ];

  return (
    <div id="video-timeline" className="surface-card p-6 border-slate-200 bg-white text-left space-y-4 shadow-elevated">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-brand-50 text-brand-600 rounded-lg">
            <Activity className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-extrabold text-slate-900">Interactive Video Timeline Analysis</h3>
        </div>

        {/* Signal Layer Toggles */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveLayer('all')}
            className={`px-2.5 py-1 rounded-lg transition-all ${activeLayer === 'all' ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600'}`}
          >
            All Signals
          </button>
          <button
            onClick={() => setActiveLayer('motion')}
            className={`px-2.5 py-1 rounded-lg transition-all ${activeLayer === 'motion' ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600'}`}
          >
            Motion
          </button>
          <button
            onClick={() => setActiveLayer('audio')}
            className={`px-2.5 py-1 rounded-lg transition-all ${activeLayer === 'audio' ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600'}`}
          >
            Audio
          </button>
          <button
            onClick={() => setActiveLayer('risk')}
            className={`px-2.5 py-1 rounded-lg transition-all ${activeLayer === 'risk' ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600'}`}
          >
            Retention Risk
          </button>
        </div>
      </div>

      {/* Horizontal Interactive Timeline Graph */}
      <div className="pt-4 pb-2 relative">
        <div className="w-full bg-slate-100 h-3 rounded-full relative flex items-center justify-between px-4">
          {points.map((pt, idx) => {
            const isWarning = pt.status === 'warning';
            const isViral = pt.status === 'viral';

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
                className="relative group cursor-pointer"
              >
                {/* Timeline Marker Node */}
                <div className={`w-5 h-5 rounded-full border-2 border-white shadow-md flex items-center justify-center transition-transform group-hover:scale-125 ${
                  isWarning ? 'bg-amber-500' : isViral ? 'bg-purple-600' : 'bg-brand-600'
                }`}>
                  <span className="text-[9px] font-black text-white">{pt.time.replace('0:', '')}s</span>
                </div>

                {/* Marker Tooltip on Hover */}
                {hoveredPoint?.time === pt.time && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-slate-900 text-white rounded-2xl p-3 shadow-xl z-30 space-y-1 text-xs animate-fade-in pointer-events-none">
                    <div className="flex items-center justify-between font-extrabold border-b border-slate-800 pb-1">
                      <span className="text-brand-300">{pt.time} — {pt.label}</span>
                      <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-emerald-400">
                        Score: {pt.score}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-medium leading-relaxed">{pt.detail}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline Event Cards below Graph */}
      <div className="space-y-2 pt-2">
        {points.map((pt, idx) => (
          <div 
            key={idx} 
            className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
              pt.status === 'warning'
                ? 'bg-amber-50/50 border-amber-200 text-amber-900'
                : pt.status === 'viral'
                ? 'bg-purple-50/50 border-purple-200 text-purple-900'
                : 'bg-slate-50 border-slate-100 text-slate-800'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="font-black text-slate-900 bg-white px-2 py-1 rounded-md shadow-xs border border-slate-200">
                {pt.time}
              </span>
              <div>
                <span className="font-extrabold block">{pt.label}</span>
                <span className="text-[11px] text-slate-500 font-medium">{pt.detail}</span>
              </div>
            </div>

            <span className="font-black text-xs px-2.5 py-1 rounded-full bg-white border shadow-xs">
              {pt.score} / 100
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 font-medium pt-1">
        <Info className="w-3.5 h-3.5" />
        <span>Timeline signals extracted from OpenCV motion vectors and Librosa audio spectrogram.</span>
      </div>
    </div>
  );
}
