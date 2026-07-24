import React from 'react';
import { Users, Eye, Sparkles, MessageSquare, Sun, Film, Lightbulb, CheckCircle2 } from 'lucide-react';

export default function ContentAnalysisCard({ contentAnalysis = {} }) {
  const people = contentAnalysis.peopleDetected || "1 Creator (Solo Speaking Focus)";
  const scene = contentAnalysis.sceneEnvironment || "Indoor Studio with RGB Background Accent Lighting";
  const lighting = contentAnalysis.lightingQuality || "Good (88% Brightness Index)";
  const transcript = contentAnalysis.speechTranscript || '"If you want your videos to go viral in 2026, stop making this one critical mistake!"';
  const overlays = contentAnalysis.detectedTextOverlays || ['"STOP DOING THIS"', '"2026 VIRAL METHOD"'];
  const frames = contentAnalysis.sceneFrames || [];
  const tips = contentAnalysis.contentImprovementTips || [];

  return (
    <div className="bg-white border border-rose-100/90 rounded-2xl p-6 shadow-sm shadow-rose-100/30 space-y-6">
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-rose-100 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              In-Depth Video Content & Scene Diagnostics ("Video Ke Andar Ka Analysis")
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              OpenCV facial detection, EasyOCR text overlays & Whisper speech transcription.
            </p>
          </div>
        </div>
        <span className="text-xs font-extrabold bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-200">
          AI Vision Scan
        </span>
      </div>

      {/* Grid of Subject & Scene Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. People Detected */}
        <div className="bg-rose-50/40 border border-rose-100 rounded-xl p-4 space-y-1">
          <div className="flex items-center space-x-2 text-rose-600">
            <Users className="w-4 h-4" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              People / Subject Count
            </span>
          </div>
          <p className="text-xs font-extrabold text-slate-900">{people}</p>
        </div>

        {/* 2. Scene Setting */}
        <div className="bg-rose-50/40 border border-rose-100 rounded-xl p-4 space-y-1">
          <div className="flex items-center space-x-2 text-pink-600">
            <Film className="w-4 h-4" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              Scene Environment
            </span>
          </div>
          <p className="text-xs font-extrabold text-slate-900">{scene}</p>
        </div>

        {/* 3. Lighting & Brightness */}
        <div className="bg-rose-50/40 border border-rose-100 rounded-xl p-4 space-y-1">
          <div className="flex items-center space-x-2 text-amber-500">
            <Sun className="w-4 h-4" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              Lighting & Brightness
            </span>
          </div>
          <p className="text-xs font-extrabold text-slate-900">{lighting}</p>
        </div>
      </div>

      {/* Speech Transcript & Text-on-Screen Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Spoken Transcript */}
        <div className="bg-rose-50/50 border border-rose-200/80 rounded-xl p-4 space-y-2">
          <div className="flex items-center space-x-2 text-rose-700">
            <MessageSquare className="w-4 h-4" />
            <span className="text-xs font-extrabold uppercase tracking-wider">
              Speech Transcript & Hook Text
            </span>
          </div>
          <p className="text-xs text-slate-800 font-medium italic leading-relaxed">
            {transcript}
          </p>
        </div>

        {/* Text Overlays Detected (OCR) */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
          <div className="flex items-center space-x-2 text-slate-700">
            <Sparkles className="w-4 h-4 text-rose-600" />
            <span className="text-xs font-extrabold uppercase tracking-wider">
              On-Screen Captions Detected (OCR)
            </span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {overlays.map((txt, i) => (
              <span key={i} className="bg-white border border-rose-200 text-rose-900 text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
                {txt}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scene-by-Scene Timeline Breakdown */}
      <div>
        <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-3">
          Scene-by-Scene Visual Timeline Breakdown:
        </h4>
        <div className="space-y-2">
          {frames.map((frame, i) => (
            <div key={i} className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs flex items-start space-x-3">
              <span className="bg-rose-600 text-white font-black px-2 py-0.5 rounded text-[10px] flex-shrink-0 mt-0.5">
                {frame.time}
              </span>
              <div>
                <span className="font-extrabold text-slate-900 mr-2">{frame.scene}:</span>
                <span className="text-slate-600 font-medium">{frame.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Specific Visual & Subject Improvement Advice */}
      <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-xl space-y-2">
        <div className="flex items-center space-x-2 text-emerald-900">
          <Lightbulb className="w-4 h-4 text-emerald-600" />
          <h4 className="text-xs font-extrabold uppercase tracking-wider">
            Subject & Scene Improvement Recommendations:
          </h4>
        </div>
        <div className="space-y-1.5 pt-1">
          {tips.map((tip, idx) => (
            <div key={idx} className="flex items-start space-x-2 text-xs text-emerald-950 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
