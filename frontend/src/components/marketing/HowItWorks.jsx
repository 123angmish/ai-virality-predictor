'use client';

import React from 'react';
import { UploadCloud, Cpu, Gauge, Rocket } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: UploadCloud,
      title: "Add Your Video",
      desc: "Upload your raw MP4/MOV file or paste a video URL from YouTube Shorts, TikTok, or Instagram Reels.",
      color: "bg-brand-50 text-brand-600 border-brand-200"
    },
    {
      num: "02",
      icon: Cpu,
      title: "AI Inspects Content",
      desc: "OpenCV measures 0-3s hook optical motion, scene cuts, EasyOCR kinetic text, and Librosa audio RMS energy.",
      color: "bg-purple-50 text-purple-600 border-purple-200"
    },
    {
      num: "03",
      icon: Gauge,
      title: "Receive Diagnostic Score",
      desc: "Trained HistGradientBoosting model calculates a 0-100 Virality Score correlated with 10,000+ real engagement rows.",
      color: "bg-emerald-50 text-emerald-600 border-emerald-200"
    },
    {
      num: "04",
      icon: Rocket,
      title: "Improve Before Publishing",
      desc: "Get platform-specific editing steps, hook rewrites, caption fixes, and retention drop risk maps.",
      color: "bg-indigo-50 text-indigo-600 border-indigo-200"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-brand-600">Simple 4-Step Process</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">How AI Virality Intelligence Works</h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto font-medium">
            From raw video file to a complete algorithm audit in under 60 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="surface-card p-6 border-slate-200 surface-hover text-left space-y-4 relative">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-xs ${step.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-slate-200">{step.num}</span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-extrabold text-slate-900">{step.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
