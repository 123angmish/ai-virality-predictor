'use client';

import React from 'react';
import { Video, Youtube, Play, MessageSquare, Share2, Info } from 'lucide-react';

export default function TrustStrip() {
  const platforms = [
    { name: "YouTube Shorts", color: "text-red-600 bg-red-50 border-red-200" },
    { name: "Instagram Reels", color: "text-purple-600 bg-purple-50 border-purple-200" },
    { name: "TikTok", color: "text-slate-900 bg-slate-100 border-slate-300" },
    { name: "Facebook Video", color: "text-blue-600 bg-blue-50 border-blue-200" },
    { name: "X (Twitter) Video", color: "text-slate-800 bg-slate-50 border-slate-200" },
    { name: "Uploaded MP4 / MOV", color: "text-brand-600 bg-brand-50 border-brand-200" }
  ];

  return (
    <section className="py-8 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
        
        <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
          Built for Creators & Content Teams Across All Major Short-Form Platforms
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          {platforms.map((p, idx) => (
            <div 
              key={idx} 
              className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center space-x-2 shadow-xs transition-transform hover:scale-105 ${p.color}`}
            >
              <Video className="w-4 h-4" />
              <span>{p.name}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-400 pt-1 font-medium">
          <Info className="w-3.5 h-3.5" />
          <span>Platform availability & deep URL analytics depend on public API and media processing support.</span>
        </div>
      </div>
    </section>
  );
}
