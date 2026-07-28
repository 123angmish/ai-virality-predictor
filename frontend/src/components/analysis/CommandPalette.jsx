'use client';

import React, { useState, useEffect } from 'react';
import { Search, Command, X, LayoutDashboard, PlusCircle, Video, History, GitCompare, Sparkles, FileText, Settings } from 'lucide-react';

export default function CommandPalette({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { title: "Go to Dashboard Overview", route: "/dashboard", icon: LayoutDashboard },
    { title: "Start New Video Analysis", route: "/analysis/new", icon: PlusCircle },
    { title: "View Video Library", route: "/library", icon: Video },
    { title: "View Analysis History", route: "/history", icon: History },
    { title: "Compare Videos Workspace", route: "/compare", icon: GitCompare },
    { title: "Platform Optimizer", route: "/optimizer", icon: Sparkles },
    { title: "Diagnostic Reports", route: "/reports", icon: FileText },
    { title: "Settings & Profile", route: "/settings", icon: Settings },
  ];

  const filtered = actions.filter(a => a.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-slate-950/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full overflow-hidden shadow-elevated space-y-2 p-4">
        
        {/* Search Bar */}
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search route..."
            className="w-full text-sm font-bold text-slate-900 outline-none bg-transparent"
            autoFocus
          />
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action List */}
        <div className="space-y-1 max-h-64 overflow-y-auto pt-1">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-400 font-medium">No matching commands found.</div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    onNavigate(item.route);
                    onClose();
                  }}
                  className="w-full p-2.5 rounded-xl hover:bg-brand-50 text-left flex items-center justify-between text-xs font-bold text-slate-800 hover:text-brand-700 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-brand-600" />
                    <span>{item.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold group-hover:text-brand-600">{item.route}</span>
                </button>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
