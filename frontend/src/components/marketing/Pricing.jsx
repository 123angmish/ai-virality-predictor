'use client';

import React from 'react';
import { Check, Sparkles, Zap } from 'lucide-react';

export default function Pricing({ onOpenAuth }) {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      desc: "Ideal for trying out basic virality predictions.",
      features: [
        "3 Video Audits / month",
        "Basic Virality Score (0-100)",
        "0-3s Hook Speed Analysis",
        "Standard Platform Guidance",
        "Community Support"
      ],
      cta: "Start Free Analysis",
      highlight: false
    },
    {
      name: "Creator Pro",
      price: "$29",
      period: "per month",
      desc: "For serious creators & influencers looking to scale reach.",
      features: [
        "50 Video Audits / month",
        "Full OpenCV Vision & Audio RMS Spectrum",
        "5 Platform Readiness Cards (Shorts, TikTok, Reels, FB, X)",
        "Hook Lab & 3 Alternative Hook Scripts",
        "Export PDF/TXT & CSV Reports",
        "Analysis History Drawer (30 Days)"
      ],
      cta: "Start 7-Day Free Trial",
      highlight: true
    },
    {
      name: "Agency & Team",
      price: "$99",
      period: "per month",
      desc: "For agencies & brand teams managing multiple channels.",
      features: [
        "Unlimited Video Audits",
        "Multi-Video Comparison Workspace (up to 4 videos)",
        "Virality DNA & Retention Risk Maps",
        "What-If Simulator & Content Doctor Prescriptions",
        "Team Workspace (5 Members)",
        "Priority API Support"
      ],
      cta: "Contact Sales",
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-brand-600">Transparent Pricing</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Simple Plans for Every Creator & Team</h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto font-medium">
            Start with free video audits and upgrade as your content channel scales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div 
              key={idx}
              className={`surface-card p-8 text-left flex flex-col justify-between relative transition-all ${
                plan.highlight 
                  ? 'border-2 border-brand-500 shadow-elevated bg-white ring-4 ring-brand-100 scale-105 z-10' 
                  : 'border-slate-200 bg-white'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-xs flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Most Popular for Creators</span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900">{plan.name}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">{plan.desc}</p>
                </div>

                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                  <span className="text-xs font-bold text-slate-500">/ {plan.period}</span>
                </div>

                <div className="space-y-3 pt-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block">Included Features:</span>
                  <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                    {plan.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={onOpenAuth}
                  className={`w-full py-3 rounded-xl font-extrabold text-xs transition-all ${
                    plan.highlight
                      ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
