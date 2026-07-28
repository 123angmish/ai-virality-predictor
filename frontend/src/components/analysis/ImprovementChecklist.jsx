'use client';

import React, { useState } from 'react';
import { CheckSquare, Square, Download, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ImprovementChecklist() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Raise kinetic text overlay by 40px clear of platform UI controls", category: "Fix Before Publishing", done: true, priority: "High" },
    { id: 2, text: "Insert a 0.8s zoom cut or B-roll image at 0:15s to break visual monotony", category: "Fix Before Publishing", done: true, priority: "High" },
    { id: 3, text: "Trim 0.4s of silence at the opening audio start", category: "Recommended", done: false, priority: "Medium" },
    { id: 4, text: "Overlay top 10 trending background audio track at 15% volume", category: "Recommended", done: false, priority: "Medium" },
    { id: 5, text: "Add a subscribe/follow sound effect at 0:18s CTA transition", category: "Optional", done: false, priority: "Low" },
    { id: 6, text: "Format caption copy with bullet points and clear CTA link in bio", category: "Optional", done: false, priority: "Low" }
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const completedCount = tasks.filter(t => t.done).length;

  return (
    <div id="improvement-plan" className="surface-card p-6 sm:p-8 border-slate-200 bg-white text-left space-y-6 shadow-elevated">
      
      {/* Header & Progress Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-brand-50 text-brand-600 rounded-lg">
              <CheckSquare className="w-4 h-4" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">AI Video Improvement Plan</h3>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Complete these recommended editing steps before publishing your video.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <span className="text-xs font-black text-slate-900">{completedCount} of {tasks.length} Completed</span>
            <div className="w-32 bg-slate-100 rounded-full h-1.5 overflow-hidden mt-1">
              <div 
                className="bg-brand-600 h-1.5 rounded-full transition-all" 
                style={{ width: `${(completedCount / tasks.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-extrabold rounded-xl transition-all flex items-center space-x-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Checklist</span>
          </button>
        </div>
      </div>

      {/* Task Groups */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between space-x-3 ${
              task.done ? 'bg-emerald-50/40 border-emerald-200 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-3">
              <button className="text-slate-400 hover:text-brand-600 transition-colors">
                {task.done ? <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" /> : <Square className="w-5 h-5" />}
              </button>
              <span className={`text-xs font-bold ${task.done ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                {task.text}
              </span>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0">
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                task.priority === 'High' ? 'bg-red-100 text-red-700' : task.priority === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'
              }`}>
                {task.priority} Priority
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
