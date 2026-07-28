'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "How is the Virality Score calculated?",
      a: "The Virality Score (0-100) is calculated using a HistGradientBoosting Regressor trained on 10,000+ real Kaggle/HuggingFace short-form video engagement rows. The model factors in OpenCV optical motion vectors (0-3s hook), Librosa spectrogram audio RMS energy, EasyOCR text overlays, scene cut frequency per minute, and vertical resolution aspect ratios."
    },
    {
      q: "Does a high virality score guarantee views?",
      a: "No AI platform can guarantee organic algorithmic views due to external factors like posting timing, audience targeting, and real-time social trends. Our score evaluates content quality, hook retention, and algorithm format readiness."
    },
    {
      q: "Which short-form platforms are supported?",
      a: "We support YouTube Shorts, TikTok, Instagram Reels, Facebook Reels, and X (Twitter) Video, as well as raw MP4/MOV file uploads."
    },
    {
      q: "Are my uploaded video files private and secure?",
      a: "Yes. All uploaded files are processed transiently in memory for OpenCV and Librosa signal extraction and are automatically purged from temporary buffers."
    },
    {
      q: "What video formats and file limits are supported?",
      a: "We support MP4, MOV, and WebM video formats up to 100MB per file upload."
    },
    {
      q: "Can I compare multiple video drafts side-by-side?",
      a: "Yes! The Compare Videos workspace allows you to load 2 to 4 video audits side-by-side with metric radar charts and automated winning verdicts."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-brand-600">Got Questions?</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <div key={idx} className="surface-card border-slate-200 overflow-hidden text-left transition-all">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="w-full p-5 flex items-center justify-between font-extrabold text-sm text-slate-900 hover:text-brand-600 transition-colors"
              >
                <span>{item.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openIdx === idx ? 'rotate-180 text-brand-600' : ''}`} />
              </button>

              {openIdx === idx && (
                <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed font-medium border-t border-slate-100 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
