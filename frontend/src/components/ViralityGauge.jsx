import React from 'react';
import { Flame, ShieldCheck, TrendingUp } from 'lucide-react';

export default function ViralityGauge({ score = 84.5, confidence = "94.2%" }) {
  // Score styling logic
  let colorClass = "text-emerald-600";
  let bgGradient = "from-emerald-500 to-teal-600";
  let strokeColor = "#10B981";
  let tierLabel = "High Virality Potential";

  if (score < 40) {
    colorClass = "text-red-600";
    bgGradient = "from-red-500 to-amber-600";
    strokeColor = "#EF4444";
    tierLabel = "Low Virality Potential";
  } else if (score < 70) {
    colorClass = "text-amber-600";
    bgGradient = "from-amber-500 to-yellow-500";
    strokeColor = "#F59E0B";
    tierLabel = "Moderate Virality Potential";
  }

  // Semi-circle SVG calculations
  const radius = 80;
  const circumference = Math.PI * radius; // half circle
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <Flame className={`w-5 h-5 ${colorClass}`} />
          <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Virality Score Dial
          </span>
        </div>
        <div className="flex items-center space-x-1 text-xs bg-slate-100 px-2.5 py-1 rounded-full text-slate-600 font-semibold border border-slate-200">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
          <span>Confidence: {confidence}</span>
        </div>
      </div>

      {/* Semi-Circle SVG Gauge */}
      <div className="relative w-56 h-32 flex items-end justify-center my-2">
        <svg className="w-56 h-32 overflow-visible" viewBox="0 0 200 110">
          {/* Background Track */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="18"
            strokeLinecap="round"
          />
          {/* Active Score Path */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={strokeColor}
            strokeWidth="18"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Score Readout */}
        <div className="absolute text-center bottom-2">
          <span className={`text-4xl sm:text-5xl font-black ${colorClass} tracking-tight`}>
            {score}
          </span>
          <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">
            out of 100
          </span>
        </div>
      </div>

      {/* Tier Label */}
      <div className="mt-2 text-center">
        <span className={`inline-block px-3 py-1 text-xs font-extrabold rounded-full bg-slate-100 ${colorClass} border border-slate-200`}>
          {tierLabel}
        </span>
      </div>
    </div>
  );
}
