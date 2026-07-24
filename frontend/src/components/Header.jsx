import React from 'react';
import { Sparkles, History, User, LogOut } from 'lucide-react';

export default function Header({ currentUser, onOpenAuth, onOpenHistory, historyCount = 0, onLogout }) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-rose-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between py-3">
        
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center shadow-md shadow-rose-200">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">
                AI Virality Predictor
              </h1>
              <span className="bg-rose-50 text-rose-600 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-rose-200 uppercase tracking-wider">
                PRO 2026
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Multi-Platform Video Virality Diagnostic & Optimization Engine
            </p>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center space-x-3">
          
          {/* Analysis History Button */}
          <button
            onClick={onOpenHistory}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-rose-50/60 hover:bg-rose-100/70 text-rose-700 text-xs font-extrabold rounded-xl border border-rose-200/80 transition-all shadow-2xs"
          >
            <History className="w-4 h-4 text-rose-600" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="bg-rose-600 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                {historyCount}
              </span>
            )}
          </button>

          {/* User Profile or Login */}
          {currentUser ? (
            <div className="flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3.5 py-1.5 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-rose-600 text-white font-black text-xs flex items-center justify-center">
                {currentUser.name ? currentUser.name[0].toUpperCase() : 'C'}
              </div>
              <span className="text-xs font-extrabold text-slate-800 hidden md:inline truncate max-w-[100px]">
                {currentUser.name}
              </span>
              <button
                onClick={onLogout}
                title="Sign Out"
                className="text-rose-400 hover:text-rose-700 transition-all ml-1"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center space-x-1.5 px-4.5 py-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-xs font-extrabold rounded-xl shadow-sm shadow-rose-200 transition-all transform hover:-translate-y-0.5"
            >
              <User className="w-4 h-4" />
              <span>Login / Sign Up</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
