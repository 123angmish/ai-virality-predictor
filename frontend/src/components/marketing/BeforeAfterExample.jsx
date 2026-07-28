'use client';

import React from 'react';
import { ArrowRight, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';

export default function BeforeAfterExample() {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-brand-600">Case Study</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Real Creator Optimization Transformation</h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto font-medium">
            Illustrative example of how applying AI Virality recommendations transforms video performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* BEFORE CARD */}
          <div className="surface-card p-6 border-red-200 bg-red-50/20 text-left space-y-4">
            <div className="flex items-center justify-between border-b border-red-100 pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-red-700 flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>BEFORE Optimization</span>
              </span>
              <span className="text-xs font-black text-red-700 bg-red-100 px-2.5 py-1 rounded-full">
                Score: 54 / 100
              </span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
              <li className="flex items-start space-x-2">
                <span className="text-red-500 font-bold">•</span>
                <span><strong>Slow Opening:</strong> Creator takes 4.2 seconds of talking before stating main hook topic.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 font-bold">•</span>
                <span><strong>Monotonous Framing:</strong> Single camera angle without scene cuts or B-roll for 18 seconds.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 font-bold">•</span>
                <span><strong>UI Caption Overlap:</strong> Standard lower-third text blocked by YouTube Shorts controls.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 font-bold">•</span>
                <span><strong>Low Audio RMS:</strong> Quiet vocal track without background sound effects or music.</span>
              </li>
            </ul>

            <div className="p-3 bg-red-100/60 rounded-xl text-xs text-red-900 font-bold">
              Est. Views: 1,500 – 5,000 views (Plateaus early)
            </div>
          </div>

          {/* AFTER CARD */}
          <div className="surface-card p-6 border-emerald-200 bg-emerald-50/20 text-left space-y-4 relative shadow-elevated">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>AFTER AI Recommendations</span>
              </span>
              <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                Score: 88.5 / 100
              </span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Instant Visual Hook:</strong> High motion zoom-in at 0:01s with question overlay.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Dynamic Pacing:</strong> Added 2 fast visual B-roll cuts and kinetic yellow word captions.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Optimized Placement:</strong> Raised caption height +40px clear of all platform UI buttons.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span><strong>Enhanced Audio:</strong> Added trending background sound effect at 15% audio volume.</span>
              </li>
            </ul>

            <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-black flex items-center justify-between">
              <span>Predicted 30-Day Reach:</span>
              <span className="text-sm font-black text-emerald-700">1.45M+ Views (+280% Increase)</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
