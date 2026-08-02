'use client';

import React, { useState } from 'react';
import { Sparkles, Trophy, CheckCircle2, AlertTriangle, ChevronDown, Clock, ShieldCheck, Zap, Layers, RefreshCw } from 'lucide-react';

export default function PlatformFitComparison({ platforms }) {
  const [expandedId, setExpandedId] = useState('tiktok');

  const list = Array.isArray(platforms) && platforms.length > 0 ? platforms : [
    {
      id: "tiktok",
      name: "TikTok",
      score: 94,
      fit: "Viral Ready (Best Match)",
      color: "bg-slate-900 text-white",
      border: "border-slate-300",
      strengths: ["Optical flow motion speed in 0-3s hook matches FYP velocity threshold", "Ideal 1080x1920 9:16 vertical resolution aspect"],
      gaps: ["Audio background track missing trending TikTok commercial sound overlay", "Kinetic text captions require yellow word-by-word highlighting"],
      actions: [
        "Overlay top 10 trending commercial audio track at 15% volume level",
        "Use bold kinetic captions with yellow highlight for key value phrases",
        "Include 3 hyper-relevant niche hashtags in the first line of post caption"
      ],
      revival: [
        "Peak Posting Window: 6:00 PM – 9:00 PM local viewer time",
        "If views stall under 5,000, reply to top 3 comments with video replies within 1 hour"
      ]
    },
    {
      id: "shorts",
      name: "YouTube Shorts",
      score: 92,
      fit: "Optimal Fit",
      color: "bg-red-600 text-white",
      border: "border-red-200",
      strengths: ["High vocal clarity transcript WPM (165 words/min)", "Bass drop audio energy peak at 0:12s"],
      gaps: ["Intro hook needs a faster visual cut within 1.8 seconds", "Caption height overlaps with Shorts right-side engagement buttons"],
      actions: [
        "Trim 0.4s of silence at the very opening audio start",
        "Raise text overlay by 40px to stay clear of right-side engagement sidebar",
        "Add a prominent subscribe sound effect at 0:18s CTA transition"
      ],
      revival: [
        "Peak Posting Window: 2:00 PM – 5:00 PM local viewer time",
        "If views plateau under 5k, change title to start with a bold question and pin a top comment"
      ]
    },
    {
      id: "reels",
      name: "Instagram Reels",
      score: 90,
      fit: "Strong Candidate",
      color: "bg-gradient-to-r from-purple-600 to-pink-500 text-white",
      border: "border-pink-200",
      strengths: ["RGB studio lighting contrast (88% brightness)", "Clear creator face framing and direct gaze"],
      gaps: ["Cover frame lacks strong visual aesthetic typography", "Caption copy requires clear line breaks for mobile reading"],
      actions: [
        "Add a 1080x1920 custom cover frame with large bold title typography",
        "Use Instagram original audio tagging for algorithm discovery",
        "Format caption with bullet points and clear CTA link in bio"
      ],
      revival: [
        "Peak Posting Window: 11:00 AM – 1:00 PM local viewer time",
        "Share Reel directly to main grid and Instagram Story with interactive Poll sticker within 5 mins"
      ]
    },
    {
      id: "facebook",
      name: "Facebook Reels",
      score: 86,
      fit: "High Conversion",
      color: "bg-blue-600 text-white",
      border: "border-blue-200",
      strengths: ["Clear educational speech transcript", "High color vibrancy and contrast"],
      gaps: ["Audience demographic prefers longer context intro (+2 seconds)", "CTA should emphasize Sharing over Subscribing"],
      actions: [
        "Add a 2-second setup intro card for broader demographic appeal",
        "Change CTA text to 'Share this with a creator who needs it'",
        "Post directly via Meta Business Suite with custom thumbnail"
      ],
      revival: [
        "Peak Posting Window: 1:00 PM – 4:00 PM local viewer time",
        "Share into 3 relevant Facebook Groups in your content category and pin to top of Page"
      ]
    },
    {
      id: "x",
      name: "X (Twitter) Video",
      score: 84,
      fit: "Good Potential",
      color: "bg-slate-800 text-white",
      border: "border-slate-400",
      strengths: ["Concise 22s duration suitable for timeline autoplay", "Kinetic text overlay present"],
      gaps: ["Requires explicit open graph hook text in main tweet", "Requires 100% burnt-in captions for muted autoplay"],
      actions: [
        "Ensure 100% of spoken words have high-contrast burnt-in captions",
        "Write a 2-line punchy post text introducing the core value takeaway",
        "Tag relevant industry creators in post copy"
      ],
      revival: [
        "Peak Posting Window: 8:00 AM – 10:00 AM local viewer time",
        "Quote tweet post after 12 hours with a key quote graphic into topical X Communities"
      ]
    }
  ];

  const bestMatch = list[0] || {};
  const selectedPlatform = list.find(p => p.id === expandedId) || list[0];

  return (
    <div id="platform-fit" className="surface-card p-6 sm:p-8 border-slate-200 bg-white text-left space-y-6 shadow-elevated">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900">Platform Fit & Readiness Comparison</h3>
        </div>
        <span className="text-[10px] font-extrabold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
          5 Platforms Analyzed
        </span>
      </div>

      {/* Best Match Highlight Banner */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-yellow-300" />
            <span className="text-xs font-black uppercase tracking-wider text-yellow-300">Best Platform Match</span>
          </div>
          <h4 className="text-2xl font-black text-white">{bestMatch.name || "TikTok"}</h4>
          <p className="text-xs text-slate-300 font-medium">
            Strongest overall algorithm readiness score ({bestMatch.score || 94}% Compatibility).
          </p>
        </div>

        <button
          onClick={() => setExpandedId(bestMatch.id || 'tiktok')}
          className="px-5 py-3 bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs rounded-xl shadow-xs transition-all hover:scale-105"
        >
          Open Platform Editing Plan
        </button>
      </div>

      {/* Platform Comparison Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {list.map((p) => {
          const isExpanded = expandedId === p.id;
          const issueText = p.issue || (Array.isArray(p.gaps) ? p.gaps[0] : "Optimization recommended");

          return (
            <div
              key={p.id}
              onClick={() => setExpandedId(isExpanded ? null : p.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer text-left space-y-3 ${
                isExpanded ? 'border-brand-500 bg-brand-50/30 ring-2 ring-brand-100' : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-md ${p.color || 'bg-slate-900 text-white'}`}>
                  {p.name}
                </span>
                <span className="text-sm font-black text-slate-900">{p.score}%</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-extrabold text-slate-800 block truncate">{p.fit}</span>
                <span className="text-[10px] text-amber-600 font-semibold block truncate">⚠️ {issueText}</span>
              </div>

              <button className="text-[11px] font-extrabold text-brand-600 hover:underline flex items-center space-x-1 pt-1">
                <span>{isExpanded ? 'Hide Full Plan' : 'Open Full Plan'}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </button>
            </div>
          );
        })}
      </div>

      {/* DETAILED EXPANDABLE PLATFORM BLUEPRINT DRAWER */}
      {expandedId && selectedPlatform && (
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-6 animate-fade-in text-left">
          
          {/* Drawer Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div className="flex items-center space-x-2">
              <span className={`text-xs font-black px-3 py-1 rounded-lg ${selectedPlatform.color}`}>
                {selectedPlatform.name}
              </span>
              <h4 className="text-sm font-black uppercase text-slate-900 tracking-wider">
                Comprehensive Platform Editing & Algorithm Plan
              </h4>
            </div>
            <span className="text-sm font-black text-brand-600">
              Compatibility Score: {selectedPlatform.score}%
            </span>
          </div>

          {/* 4-Part Detailed Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Verified Strengths */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-black text-emerald-700 uppercase tracking-wider flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Algorithm Strengths</span>
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                {Array.isArray(selectedPlatform.strengths) && selectedPlatform.strengths.map((str, sIdx) => (
                  <li key={sIdx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Algorithm Risks & Gaps */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-black text-amber-700 uppercase tracking-wider flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Detected Algorithm Risks & Gaps</span>
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                {(Array.isArray(selectedPlatform.gaps) ? selectedPlatform.gaps : [selectedPlatform.issue]).map((gap, gIdx) => (
                  <li key={gIdx} className="flex items-start space-x-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Actionable Editing Blueprint */}
            <div className="p-4 bg-brand-50/50 rounded-xl border border-brand-200 space-y-2">
              <span className="text-xs font-black text-brand-900 uppercase tracking-wider flex items-center space-x-1.5">
                <Zap className="w-4 h-4 text-brand-600 fill-current" />
                <span>Required Editing Blueprint</span>
              </span>
              <ul className="space-y-2 text-xs font-bold text-slate-800">
                {Array.isArray(selectedPlatform.actions) && selectedPlatform.actions.map((act, aIdx) => (
                  <li key={aIdx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Revival & Peak Strategy */}
            <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-200 space-y-2">
              <span className="text-xs font-black text-purple-900 uppercase tracking-wider flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-purple-600" />
                <span>Peak Schedule & Revival Strategy</span>
              </span>
              <ul className="space-y-2 text-xs font-semibold text-purple-950">
                {(Array.isArray(selectedPlatform.revival) ? selectedPlatform.revival : [
                  "Peak Posting Window: 6:00 PM – 9:00 PM",
                  "If views plateau under 5k, reply to top comments with video replies"
                ]).map((rev, rIdx) => (
                  <li key={rIdx} className="flex items-start space-x-2">
                    <RefreshCw className="w-3.5 h-3.5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>{rev}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
