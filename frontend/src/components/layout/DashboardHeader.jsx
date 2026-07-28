'use client';

import React from 'react';
import { Search, Command, Bell, HelpCircle, Sparkles, ChevronRight, User } from 'lucide-react';

export default function DashboardHeader({ activeRouteTitle = 'Overview', onOpenCmd, currentUser }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-subtle">
      
      {/* Left: Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
        <span>SaaS App</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-extrabold">{activeRouteTitle}</span>
      </div>

      {/* Center: Global Search Bar */}
      <div className="hidden md:flex items-center max-w-md w-full mx-4">
        <div 
          onClick={onOpenCmd}
          className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl py-2 px-3 flex items-center justify-between text-xs text-slate-400 cursor-pointer transition-all"
        >
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-slate-400" />
            <span>Search videos, reports, platforms...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-500 border border-slate-200">
            <Command className="w-3 h-3" /> K
          </kbd>
        </div>
      </div>

      {/* Right: Actions & User Avatar */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onOpenCmd}
          className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all relative"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-600 rounded-full"></span>
        </button>

        <a
          href="#faq"
          className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
          title="Help & Support"
        >
          <HelpCircle className="w-4 h-4" />
        </a>

        <div className="h-6 w-px bg-slate-200 mx-1"></div>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center border border-slate-700 shadow-sm">
            {currentUser?.name ? currentUser.name[0].toUpperCase() : 'A'}
          </div>
          <span className="hidden sm:inline-block text-xs font-extrabold text-slate-900">
            {currentUser?.name || 'Alex Creator'}
          </span>
        </div>
      </div>
    </header>
  );
}
