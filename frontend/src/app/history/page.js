'use client';

import React, { useState, useEffect } from 'react';
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import DashboardHeader from '../../components/layout/DashboardHeader';
import CommandPalette from '../../components/analysis/CommandPalette';
import { getStoredHistory, clearStoredHistory, getStoredUser, setStoredUser } from '../../lib/storage';
import { History, Search, Trash2, ArrowUpRight, Flame, Clock } from 'lucide-react';

export default function HistoryPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const user = getStoredUser();
    setCurrentUser(user);
    setHistoryList(getStoredHistory(user?.email));
  }, []);

  const handleNavigate = (route) => {
    window.location.href = route;
  };

  const handleClear = () => {
    clearStoredHistory(currentUser?.email);
    setHistoryList([]);
  };

  const filtered = historyList.filter(item => 
    (item.videoMeta?.title || item.filename || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <DashboardSidebar
        activeRoute="/history"
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onLogout={() => { setStoredUser(null); window.location.href = '/'; }}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          activeRouteTitle="Analysis History"
          onOpenCmd={() => setIsCmdOpen(true)}
          currentUser={currentUser}
        />

        <main className="p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-6 animate-fade-in">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Analysis History</h1>
              <p className="text-xs text-slate-500 font-medium">View and review all saved video virality diagnostic scans.</p>
            </div>

            {historyList.length > 0 && (
              <button
                onClick={handleClear}
                className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-extrabold rounded-xl border border-red-200 transition-all flex items-center space-x-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear History</span>
              </button>
            )}
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search history by video title or filename..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:border-brand-500 bg-white"
            />
          </div>

          {/* List */}
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="surface-card p-12 text-center text-slate-400 space-y-3">
                <Clock className="w-10 h-10 mx-auto text-slate-300" />
                <h3 className="text-sm font-extrabold text-slate-700">No saved analysis history found</h3>
                <p className="text-xs text-slate-500">Analyze any video URL or file to automatically save reports here.</p>
              </div>
            ) : (
              filtered.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleNavigate('/analysis/1')}
                  className="surface-card p-4 hover:border-brand-300 transition-all cursor-pointer flex items-center justify-between space-x-4 group"
                >
                  <div className="flex items-center space-x-4 min-w-0">
                    <div className="w-12 h-16 rounded-xl bg-slate-950 overflow-hidden flex-shrink-0 relative border border-slate-800">
                      {item.videoMeta?.thumbnail ? (
                        <img src={item.videoMeta.thumbnail} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-brand-400 font-bold text-xs">9:16</div>
                      )}
                    </div>

                    <div className="min-w-0 space-y-1 text-left">
                      <h4 className="text-sm font-extrabold text-slate-900 truncate">
                        {item.videoMeta?.title || item.filename || "Video Diagnostic Scan"}
                      </h4>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="bg-brand-100 text-brand-800 font-black px-2 py-0.5 rounded-full flex items-center space-x-1">
                          <Flame className="w-3 h-3 text-brand-600" />
                          <span>{item.virality_score || 84.5}/100</span>
                        </span>
                        <span className="text-slate-500 font-medium">{item.date || "Just Now"}</span>
                      </div>
                    </div>
                  </div>

                  <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-brand-600 transition-all flex-shrink-0" />
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
