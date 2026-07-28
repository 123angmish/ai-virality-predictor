'use client';

import React, { useState, useEffect } from 'react';
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import DashboardHeader from '../../components/layout/DashboardHeader';
import CommandPalette from '../../components/analysis/CommandPalette';
import { getStoredUser, setStoredUser, getStoredHistory } from '../../lib/storage';
import { Video, Folder, Plus, Search, ArrowUpRight } from 'lucide-react';

export default function LibraryPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setCurrentUser(getStoredUser());
    setItems(getStoredHistory());
  }, []);

  const handleNavigate = (route) => {
    window.location.href = route;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <DashboardSidebar
        activeRoute="/library"
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onLogout={() => { setStoredUser(null); window.location.href = '/'; }}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          activeRouteTitle="Video Library"
          onOpenCmd={() => setIsCmdOpen(true)}
          currentUser={currentUser}
        />

        <main className="p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-6 animate-fade-in">
          
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Video Asset Library</h1>
              <p className="text-xs text-slate-500 font-medium">Manage uploaded video files, URL clips, and saved creator collections.</p>
            </div>

            <button
              onClick={() => handleNavigate('/analysis/new')}
              className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Video</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {items.length === 0 ? (
              <div className="col-span-3 surface-card p-12 text-center text-slate-400 space-y-2">
                <Video className="w-10 h-10 mx-auto text-slate-300" />
                <h3 className="text-sm font-extrabold text-slate-700">No Video Assets Saved Yet</h3>
                <p className="text-xs text-slate-500">Analysed videos will automatically appear in your library collection.</p>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleNavigate('/analysis/1')}
                  className="surface-card p-4 hover:border-brand-300 transition-all cursor-pointer space-y-3 group text-left"
                >
                  <div className="w-full h-40 bg-slate-950 rounded-xl overflow-hidden relative border border-slate-800">
                    <img 
                      src={item.videoMeta?.thumbnail || "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=400&auto=format&fit=crop"} 
                      alt="" 
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform" 
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      0:21s
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-extrabold text-slate-900 truncate">
                      {item.videoMeta?.title || item.filename || "Video Clip"}
                    </h4>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-brand-600 font-bold">Virality Score: {item.virality_score || 84.5}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-600" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </main>
      </div>

      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
