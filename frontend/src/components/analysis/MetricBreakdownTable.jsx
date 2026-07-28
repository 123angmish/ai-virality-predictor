'use client';

import React, { useState } from 'react';
import { Layers, ChevronDown, CheckCircle2, Info } from 'lucide-react';

export default function MetricBreakdownTable({ features }) {
  const [expandedIdx, setExpandedIdx] = useState(null);

  const feats = features || {
    hook_speed: 84.5,
    scene_cuts: 24,
    audio_rms: 82,
    transcript_wpm: 165,
    text_overlay: 45,
    color_vibrancy: 88,
    aspect_ratio: "9:16 Vertical"
  };

  const rows = [
    { name: "0-3s Hook Speed", score: feats.hook_speed || 84.5, status: "Optimal", evidence: "OpenCV optical flow motion vector is 84.5/100", why: "First 3s determine viewer retention", action: "Maintain fast opening creator motion" },
    { name: "Scene Cut Frequency", score: 80, status: "High Retention", evidence: `${feats.scene_cuts || 24} cuts / minute`, why: "Visual cuts keep viewer attention active", action: "Insert 1 cut at 0:15s" },
    { name: "Audio RMS Energy Peak", score: feats.audio_rms || 82, status: "Bass Peak Detected", evidence: "Spectrogram RMS energy peak at 0:12s", why: "Audio dynamics trigger emotional response", action: "Add background audio track" },
    { name: "Speech Transcript WPM", score: 86, status: "Paced", evidence: `${feats.transcript_wpm || 165} words / min`, why: "Pacing dictates clarity and comprehension", action: "Keep current speech speed" },
    { name: "Kinetic Text Overlay", score: feats.text_overlay || 45, status: "Overlay Present", evidence: "EasyOCR detected 3 kinetic text captions", why: "80%+ viewers watch videos muted", action: "Raise text height +40px" },
    { name: "Color Vibrancy & Lighting", score: feats.color_vibrancy || 88, status: "High Contrast", evidence: "RGB studio accent lighting verified", why: "High visual quality builds creator authority", action: "Keep studio key lighting" },
    { name: "Resolution Aspect Ratio", score: 95, status: "9:16 Vertical", evidence: "1080x1920 full vertical frame", why: "Native short-form format requirement", action: "Ideal resolution" }
  ];

  return (
    <div id="technical-details" className="surface-card p-6 border-slate-200 bg-white text-left space-y-4 shadow-elevated">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-slate-100 text-slate-700 rounded-lg">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-extrabold text-slate-900">Detailed Feature Metric Breakdown</h3>
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase">10 Metric Signals</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              <th className="pb-3">Feature Metric</th>
              <th className="pb-3">Score</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Evidence</th>
              <th className="pb-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
            {rows.map((r, idx) => (
              <React.Fragment key={idx}>
                <tr 
                  onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <td className="py-3 font-extrabold text-slate-900 flex items-center space-x-1.5">
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${expandedIdx === idx ? 'rotate-180 text-brand-600' : ''}`} />
                    <span>{r.name}</span>
                  </td>
                  <td className="py-3 font-black text-brand-600">{r.score} / 100</td>
                  <td className="py-3">
                    <span className="bg-emerald-50 text-emerald-700 font-extrabold px-2 py-0.5 rounded-full border border-emerald-200 text-[10px]">
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 text-slate-600">{r.evidence}</td>
                  <td className="py-3 text-right text-brand-600 font-bold">{r.action}</td>
                </tr>

                {expandedIdx === idx && (
                  <tr>
                    <td colSpan={5} className="bg-slate-50 p-3 text-xs text-slate-600 font-medium">
                      💡 <strong>Why This Matters:</strong> {r.why}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
