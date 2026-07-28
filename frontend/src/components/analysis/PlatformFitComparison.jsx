'use client';

import React, { useState } from 'react';
import { Sparkles, Trophy, CheckCircle2, AlertTriangle, ArrowRight, ChevronDown, Video } from 'lucide-react';

export default function PlatformFitComparison({ platforms }) {
  const [expandedId, setExpandedId] = useState('tiktok');

  const list = platforms || [
    {
      id: "tiktok",
      name: "TikTok",
      score: 92,
      fit: "Viral Ready (Best Match)",
      color: "bg-slate-900 text-white",
      border: "border-slate-300",
      strengths: ["High optical motion in 0-3s hook", "Ideal 9:16 vertical resolution aspect"],
      issue: "Missing trending background sound overlay",
      actions: [
        "Overlay top 10 trending commercial audio track at 15% volume",
        "Use bold word-by-word kinetic captions with yellow highlighting",
        "Include 3 hyper-relevant niche hashtags in first line of caption"
      ]
    },
    {
      id: "shorts",
      name: "YouTube Shorts",
      score: 88,
      fit: "Optimal Fit",
      color: "bg-red-600 text-white",
      border: "border-red-200",
      strengths: ["High vocal clarity transcript WPM", "Bass drop audio energy peak at 0:12s"],
      issue: "Caption height overlaps with Shorts like/comment sidebar",
      actions: [
        "Trim 0.4s of silence at the very beginning of the audio track",
        "Raise text overlay by 40px to stay clear of bottom engagement buttons",
        "Add a prominent subscribe sound effect at 0:18s"
      ]
    },
    {
      id: "reels",
      name: "Instagram Reels",
      score: 86,
      fit: "Strong Candidate",
      color: "bg-gradient-to-r from-purple-600 to-pink-500 text-white",
      border: "border-pink-200",
      strengths: ["RGB studio lighting contrast", "Clear creator face framing"],
      issue: "Cover frame lacks strong visual aesthetic typography",
      actions: [
        "Add a 1080x1920 custom cover frame with large bold title text",
        "Use Instagram original audio tagging",
        "Format caption with bullet points and clear CTA link in bio"
      ]
    },
    {
      id: "facebook",
      name: "Facebook Reels",
      score: 82,
      fit: "High Conversion",
      color: "bg-blue-600 text-white",
      border: "border-blue-200",
      strengths: ["Clear educational speech transcript", "High color vibrancy"],
      issue: "Audience prefers longer context intro (+2 seconds)",
      actions: [
        "Add a 2-second setup intro card for broader demographic appeal",
        "Change CTA to 'Share this with a creator who needs it'",
        "Post directly via Meta Business Suite with custom thumbnail"
      ]
    },
    {
      id: "x",
      name: "X (Twitter) Video",
      score: 79,
      fit: "Good Potential",
      color: "bg-slate-800 text-white",
      border: "border-slate-400",
      strengths: ["Concise 22s duration", "Kinetic text overlay present"],
      issue: "Requires burnt-in captions for muted autoplay",
      actions: [
        "Ensure 100% of spoken words have high-contrast burnt-in captions",
        "Write a 2-line punchy main post text introducing the core value takeaway",
        "Tag relevant industry creators in post copy"
      ]
    }
  ];

  const bestMatch = list[0];

  return (
    <div id="platform-fit" className="surface-card p-6 border-slate-200 bg-white text-left space-y-6 shadow-elevated">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-extrabold text-slate-900">Platform Fit & Readiness Comparison</h3>
        </div>
        <span className="text-[10px] font-extrabold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
          5 Platforms Analyzed
        </span>
      </div>

      {/* Best Match Highlight Banner */}
      <div className="p-5 bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-yellow-300" />
            <span className="text-xs font-black uppercase tracking-wider text-yellow-300">Best Platform Match</span>
          </div>
          <h4 className="text-xl font-black">{bestMatch.name}</h4>
          <p className="text-xs text-slate-300 font-medium">
            Strongest overall algorithm readiness score ({bestMatch.score}% Compatibility).
          </p>
        </div>

        <button
          onClick={() => setExpandedId(bestMatch.id)}
          className="px-4 py-2.5 bg-white text-slate-900 font-extrabold text-xs rounded-xl shadow-xs transition-all hover:bg-slate-100"
        >
          Open Platform Editing Plan
        </button>
      </div>

      {/* Platform Comparison Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {list.map((p) => {
          const isExpanded = expandedId === p.id;
          return (
            <div
              key={p.id}
              onClick={() => setExpandedId(isExpanded ? null : p.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer text-left space-y-3 ${
                isExpanded ? 'border-brand-500 bg-brand-50/30 ring-2 ring-brand-100' : 'border-slate-200 bg-slate-50/50 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${p.color}`}>
                  {p.name}
                </span>
                <span className="text-xs font-black text-slate-900">{p.score}%</span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-extrabold text-slate-800 block truncate">{p.fit}</span>
                <span className="text-[10px] text-red-600 font-semibold block truncate">⚠️ {p.issue}</span>
              </div>

              <button className="text-[11px] font-extrabold text-brand-600 hover:underline flex items-center space-x-1 pt-1">
                <span>{isExpanded ? 'Hide Plan' : 'Open Plan'}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Expandable Platform Action Drawer */}
      {expandedId && (
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">
              Actionable Editing Blueprint: {list.find(p => p.id === expandedId)?.name}
            </h4>
            <span className="text-xs font-bold text-brand-600">
              Score: {list.find(p => p.id === expandedId)?.score}%
            </span>
          </div>

          <ul className="space-y-2 text-xs font-semibold text-slate-800">
            {list.find(p => p.id === expandedId)?.actions.map((act, aIdx) => (
              <li key={aIdx} className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}
