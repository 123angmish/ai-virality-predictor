'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-12 mt-20 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center font-black shadow-md shadow-brand-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tight">
                AI Virality<span className="text-brand-500">.</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              The premier 2026 AI video intelligence & multi-platform optimization SaaS. Predict hook retention, visual motion, audio dynamics, and algorithm fit before posting.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 w-fit">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Real Kaggle ML & OpenCV Vision Pipeline Active</span>
            </div>
          </div>

          {/* Col 2: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">Product</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#analyzer" className="hover:text-brand-600 transition-colors">Virality Analyzer</a></li>
              <li><a href="#features" className="hover:text-brand-600 transition-colors">Platform Optimizer</a></li>
              <li><a href="#explainability" className="hover:text-brand-600 transition-colors">AI Explainability</a></li>
              <li><a href="#pricing" className="hover:text-brand-600 transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">Resources</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#how-it-works" className="hover:text-brand-600 transition-colors">Documentation</a></li>
              <li><a href="#use-cases" className="hover:text-brand-600 transition-colors">Creator Guides</a></li>
              <li><a href="#faq" className="hover:text-brand-600 transition-colors">API Status</a></li>
              <li><a href="#faq" className="hover:text-brand-600 transition-colors">Help Centre</a></li>
            </ul>
          </div>

          {/* Col 4: Legal & System */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">Company</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#privacy" className="hover:text-brand-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-brand-600 transition-colors">Terms of Service</a></li>
              <li><a href="#security" className="hover:text-brand-600 transition-colors">Security & Trust</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 space-y-4 md:space-y-0">
          <p>© 2026 AI Virality Predictor Inc. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span>Powered by OpenCV, Librosa, Whisper & Scikit-Learn</span>
            <span>•</span>
            <span className="text-slate-400">Platform availability depends on public API support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
