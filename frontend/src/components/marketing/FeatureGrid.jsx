'use client';

import React from 'react';
import { 
  Zap, 
  Eye, 
  Activity, 
  Volume2, 
  Sliders, 
  UserCheck, 
  LayoutGrid, 
  GitCompare, 
  FileSpreadsheet, 
  Sparkles,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export default function FeatureGrid() {
  const features = [
    {
      icon: Zap,
      title: "Virality Prediction Model",
      desc: "HistGradientBoosting regressor trained on 10,000+ real Kaggle engagement rows yielding 0.8714 R² precision.",
      color: "bg-brand-50 text-brand-600"
    },
    {
      icon: Eye,
      title: "0-3s Hook Speed Capture",
      desc: "OpenCV optical flow motion vector analysis evaluating whether your opening frames grab attention immediately.",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: Activity,
      title: "Motion & Scene Cut Frequency",
      desc: "Automated scene change detection rating cut frequency per minute to prevent viewer boredom and retention drops.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: Volume2,
      title: "Audio Signal RMS Energy",
      desc: "Librosa spectrogram audio energy extraction detecting bass drops, voice clarity, and sound effect timing.",
      color: "bg-indigo-50 text-indigo-600"
    },
    {
      icon: Sliders,
      title: "Kinetic Text & OCR Overlay",
      desc: "EasyOCR engine extracting text position, contrast, and checking for native platform UI control overlaps.",
      color: "bg-amber-50 text-amber-600"
    },
    {
      icon: UserCheck,
      title: "Face & Subject Diagnostics",
      desc: "Facial detection and camera distance framing analysis verifying creator lighting, contrast, and gaze.",
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      icon: LayoutGrid,
      title: "5 Platform Readiness Cards",
      desc: "Tailored algorithm optimization blueprints for TikTok, YouTube Shorts, IG Reels, X Video, and Facebook.",
      color: "bg-rose-50 text-rose-600"
    },
    {
      icon: GitCompare,
      title: "Side-by-Side Video Comparison",
      desc: "Compare up to 4 video drafts simultaneously with metric radar graphs and automated winning verdicts.",
      color: "bg-violet-50 text-violet-600"
    },
    {
      icon: FileSpreadsheet,
      title: "Exportable PDF/TXT & CSV Reports",
      desc: "1-Click download of professional creator diagnostic summaries and raw analytics spreadsheets.",
      color: "bg-teal-50 text-teal-600"
    }
  ];

  return (
    <section id="features" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-brand-600">Enterprise AI Capabilities</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Complete Video Intelligence Platform</h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto font-medium">
            Everything you need to audit, optimize, and scale short-form video performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div key={idx} className="surface-card p-6 border-slate-200 surface-hover text-left space-y-3 bg-white">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${f.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">{f.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
