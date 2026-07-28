'use client';

import React, { useState } from 'react';
import { User, Users, Briefcase, Video, Building2 } from 'lucide-react';

export default function UseCases() {
  const [activeTab, setActiveTab] = useState('creators');

  const cases = {
    creators: {
      title: "For Solo Creators & Influencers",
      desc: "Stop guessing why one video hits 1M views and the next gets stuck at 200 views. Get exact 0-3s hook guidance and editing steps before hitting publish.",
      bullets: ["Maximize YouTube Shorts & TikTok algorithm push", "Identify silent drop-off points in pacing", "Generate 3 alternative opening hook scripts"]
    },
    agencies: {
      title: "For Marketing Agencies & Content Teams",
      desc: "Audit client videos at scale, generate white-labeled diagnostic reports, and standardize short-form video production across teams.",
      bullets: ["Export PDF/CSV diagnostic reports for clients", "Side-by-side comparison of 4 video variations", "Platform-specific posting guidelines for TikTok, Reels, Shorts"]
    },
    brands: {
      title: "For Brand Marketing & E-Commerce",
      desc: "Ensure promotional short-form videos capture immediate attention and convert views into engagement without feeling like boring ads.",
      bullets: ["Audit product demo hook motion", "Ensure brand captions remain visible on all screen sizes", "Benchmark promotional videos against category standards"]
    }
  };

  const current = cases[activeTab];

  return (
    <section id="use-cases" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-purple-600">Tailored Workflows</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Designed for Modern Content Teams</h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center">
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold w-full max-w-md">
            <button
              onClick={() => setActiveTab('creators')}
              className={`flex-1 py-2.5 rounded-xl transition-all ${
                activeTab === 'creators' ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Creators & Influencers
            </button>
            <button
              onClick={() => setActiveTab('agencies')}
              className={`flex-1 py-2.5 rounded-xl transition-all ${
                activeTab === 'agencies' ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Agencies
            </button>
            <button
              onClick={() => setActiveTab('brands')}
              className={`flex-1 py-2.5 rounded-xl transition-all ${
                activeTab === 'brands' ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Brand Teams
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="surface-card p-8 border-slate-200 bg-slate-50/50 max-w-4xl mx-auto text-left space-y-4">
          <h3 className="text-xl font-extrabold text-slate-900">{current.title}</h3>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">{current.desc}</p>
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {current.bullets.map((b, idx) => (
              <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-800 shadow-xs">
                ✓ {b}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
