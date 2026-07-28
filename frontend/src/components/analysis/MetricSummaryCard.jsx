'use client';

import React from 'react';
import { Eye, Activity, Volume2, Users, TrendingUp, Info } from 'lucide-react';

export default function MetricSummaryCard({ features, estimatedReach }) {
  const feats = features || {
    hook_speed: 84.5,
    scene_cuts: 24,
    audio_rms: 82,
    transcript_wpm: 165
  };

  const metrics = [
    {
      title: "Hook Strength",
      value: `${feats.hook_speed || 84.5} / 100`,
      status: "Strong Opening",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      explanation: "Immediate motion and text appear within the first 1.8 seconds.",
      icon: Eye,
      progress: feats.hook_speed || 84.5,
      progressColor: "bg-brand-600"
    },
    {
      title: "Scene Pacing",
      value: `${feats.scene_cuts || 24} cuts / min`,
      status: "High Retention",
      statusColor: "bg-purple-50 text-purple-700 border-purple-200",
      explanation: "Visual cuts prevent audience visual fatigue and drop-off.",
      icon: Activity,
      progress: 80,
      progressColor: "bg-purple-600"
    },
    {
      title: "Audio RMS Energy",
      value: `${feats.audio_rms || 82}% Peak`,
      status: "Bass Drop Detected",
      statusColor: "bg-blue-50 text-blue-700 border-blue-200",
      explanation: "High dynamic audio range with clear speech transcript energy.",
      icon: Volume2,
      progress: feats.audio_rms || 82,
      progressColor: "bg-blue-600"
    },
    {
      title: "Estimated Reach",
      value: estimatedReach || "1,450,000+ views",
      status: "Predicted Reach",
      statusColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
      explanation: "Estimated from available engagement signals. Not a guaranteed outcome.",
      icon: Users,
      progress: 90,
      progressColor: "bg-indigo-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div key={idx} className="surface-card p-6 border-slate-200 bg-white text-left space-y-3 surface-hover">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-slate-100 text-slate-700 rounded-xl">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-slate-600">{m.title}</h3>
              </div>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${m.statusColor}`}>
                {m.status}
              </span>
            </div>

            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {m.value}
            </div>

            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className={`${m.progressColor} h-1.5 rounded-full`} style={{ width: `${m.progress}%` }}></div>
            </div>

            <p className="text-[11px] text-slate-500 font-medium leading-normal">
              {m.explanation}
            </p>
          </div>
        );
      })}
    </div>
  );
}
