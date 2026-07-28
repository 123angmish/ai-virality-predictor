'use client';

import React from 'react';
import { Stethoscope, AlertTriangle, CheckCircle2, Pill } from 'lucide-react';

export default function ContentDoctor({ doctorData }) {
  const doc = doctorData || {
    symptoms: ["Slight visual drop between 0:14s and 0:18s", "Minor lower-third caption UI overlap"],
    rootCauses: ["Static creator framing without scene transition for 4 seconds", "Standard lower-third placement"],
    priorityFixes: [
      "Insert a fast 0.8s zoom cut or B-roll image at 0:15s",
      "Move text overlays up by 40px"
    ],
    prescription: "Executing these 2 edits is predicted to increase completion rate by +18.4%."
  };

  return (
    <div className="surface-card p-6 border-slate-200 bg-white text-left space-y-4 shadow-elevated">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-rose-50 text-rose-600 rounded-lg">
            <Stethoscope className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-extrabold text-slate-900">Content Doctor Diagnosis</h3>
        </div>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          High Recovery Potential
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Symptoms */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block flex items-center space-x-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>Detected Symptoms</span>
          </span>
          <ul className="space-y-1 text-xs text-slate-700 font-medium">
            {doc.symptoms.map((s, idx) => (
              <li key={idx}>• {s}</li>
            ))}
          </ul>
        </div>

        {/* Priority Fixes */}
        <div className="p-3.5 bg-brand-50/50 rounded-xl border border-brand-100 space-y-2">
          <span className="text-[10px] font-extrabold text-brand-700 uppercase tracking-wider block flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
            <span>Priority Fixes</span>
          </span>
          <ul className="space-y-1 text-xs text-slate-800 font-bold">
            {doc.priorityFixes.map((f, idx) => (
              <li key={idx}>✓ {f}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Doctor Prescription */}
      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-bold flex items-center space-x-2">
        <Pill className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        <span><strong>Doctor's Prescription:</strong> {doc.prescription}</span>
      </div>
    </div>
  );
}
