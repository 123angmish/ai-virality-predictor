'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  PlusCircle, 
  FolderKanban, 
  History, 
  GitCompare, 
  Sparkles, 
  FileText, 
  Users, 
  Settings, 
  Zap, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Video
} from 'lucide-react';

export default function DashboardSidebar({ activeRoute = '/dashboard', onNavigate, currentUser, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { label: 'Overview', route: '/dashboard', icon: LayoutDashboard },
    { label: 'New Analysis', route: '/analysis/new', icon: PlusCircle, highlight: true },
    { label: 'Video Library', route: '/library', icon: Video },
    { label: 'Analysis History', route: '/history', icon: History },
    { label: 'Compare Videos', route: '/compare', icon: GitCompare },
    { label: 'Platform Optimizer', route: '/optimizer', icon: Sparkles },
    { label: 'Reports', route: '/reports', icon: FileText },
    { label: 'Team Workspace', route: '/team', icon: Users, badge: 'Pro' },
    { label: 'Settings', route: '/settings', icon: Settings },
  ];

  return (
    <aside className={`bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col justify-between transition-all duration-300 z-40 ${
      collapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Top Header */}
      <div>
        <div className="h-16 px-4 border-b border-slate-100 flex items-center justify-between">
          {!collapsed && (
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center font-black shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-base font-black text-slate-900 tracking-tight">
                AI Virality<span className="text-brand-500">.</span>
              </span>
            </Link>
          )}

          {collapsed && (
            <div className="w-8 h-8 mx-auto rounded-xl bg-brand-600 text-white flex items-center justify-center font-black">
              <Sparkles className="w-4 h-4" />
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeRoute === item.route;

            return (
              <button
                key={item.route}
                onClick={() => onNavigate(item.route)}
                className={`w-full flex items-center ${collapsed ? 'justify-center px-0' : 'justify-between px-3'} py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 border border-brand-200/80 shadow-xs'
                    : item.highlight
                    ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white hover:from-brand-700 hover:to-indigo-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : item.highlight ? 'text-white' : 'text-slate-400'}`} />
                  {!collapsed && <span>{item.label}</span>}
                </div>

                {!collapsed && item.badge && (
                  <span className="text-[10px] font-extrabold bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-md">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Section */}
      <div className="p-3 border-t border-slate-100 space-y-3">
        {/* Usage Meter (Expanded mode) */}
        {!collapsed && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-slate-600">Monthly Usage</span>
              <span className="text-brand-600 font-extrabold">14 / 50 Scans</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div className="bg-brand-600 h-1.5 rounded-full w-[28%]"></div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
              <span>Pro Plan Active</span>
              <button onClick={() => onNavigate('/settings')} className="text-brand-600 font-bold hover:underline">
                Upgrade
              </button>
            </div>
          </div>
        )}

        {/* User Profile Bar */}
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} p-1.5 rounded-xl bg-slate-50/80 border border-slate-100`}>
          {!collapsed && (
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-black text-xs flex items-center justify-center border border-brand-200 flex-shrink-0">
                {currentUser?.name ? currentUser.name[0].toUpperCase() : 'C'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {currentUser?.name || 'Alex Creator'}
                </p>
                <p className="text-[10px] text-slate-500 truncate">
                  {currentUser?.email || 'creator@virality.ai'}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={onLogout}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
