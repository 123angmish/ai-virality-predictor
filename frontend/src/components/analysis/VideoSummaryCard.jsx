'use client';

import React, { useState } from 'react';
import { FileText, Clapperboard, Sparkles, CheckCircle2, Tag, Layers, ChevronDown, ChevronUp } from 'lucide-react';

export default function VideoSummaryCard({ summaryData }) {
  const [showFullSummary, setShowFullSummary] = useState(false);

  if (!summaryData) return null;

  const { overview, core_thesis, key_topics = [], takeaways = [], scene_detection = [] } = summaryData;

  return (
    <div id="video-summary" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-brand-50 border border-brand-100 text-brand-600 rounded-2xl shadow-xs">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center space-x-2">
              <span>Full Video AI Summary & Scene Detection</span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                AI Vision + Audio
              </span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">Automatic transcript extraction, core thesis detection, and frame-by-frame scene breakdown.</p>
          </div>
        </div>

        {/* Topic Tags */}
        <div className="flex flex-wrap gap-1.5">
          {key_topics.map((topic, idx) => (
            <span key={idx} className="inline-flex items-center space-x-1 text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
              <Tag className="w-3 h-3 text-brand-500" />
              <span>{topic}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Grid Section: Overview & Key Takeaways */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left (7 Cols): Narrative Overview & Thesis */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-brand-600 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>Executive Video Narrative</span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
              "{overview}"
            </p>

            {core_thesis && (
              <div className="pt-2 border-t border-slate-200/60">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">Core Thesis / Main Takeaway:</span>
                <p className="text-xs font-bold text-indigo-900 mt-0.5">{core_thesis}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right (5 Cols): 3 Key Bullet Takeaways */}
        <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-5 space-y-3 shadow-sm border border-indigo-800">
          <div className="text-xs font-black uppercase tracking-wider text-yellow-300 flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-yellow-300" />
            <span>Key Video Highlights</span>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-200 font-medium">
            {takeaways.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Scene Detection Breakdown Timeline */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clapperboard className="w-4 h-4 text-brand-600" />
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">Detected Scene Transitions & Motion Profile</h4>
          </div>
          
          <button
            onClick={() => setShowFullSummary(!showFullSummary)}
            className="text-xs font-extrabold text-brand-600 hover:text-brand-700 flex items-center space-x-1"
          >
            <span>{showFullSummary ? 'Collapse Scene Details' : 'Expand All Scenes'}</span>
            {showFullSummary ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {scene_detection.map((scene, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 hover:border-brand-300 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-white bg-slate-900 px-2 py-0.5 rounded-md">
                  {scene.timestamp}
                </span>
                <span className="text-[10px] font-extrabold text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded-md border border-brand-100">
                  {scene.motion_level}
                </span>
              </div>
              <p className="text-xs font-extrabold text-slate-800 leading-snug">{scene.scene}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
