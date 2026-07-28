'use client';

import React, { useState, useEffect } from 'react';
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import DashboardHeader from '../../components/layout/DashboardHeader';
import CommandPalette from '../../components/analysis/CommandPalette';
import { getStoredUser, setStoredUser } from '../../lib/storage';
import { Settings, User, Bell, Shield, Key, Check } from 'lucide-react';

export default function SettingsPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const u = getStoredUser();
    setCurrentUser(u);
    if (u) {
      setName(u.name || 'Alex Creator');
      setEmail(u.email || 'creator@virality.ai');
    }
  }, []);

  const handleNavigate = (route) => {
    window.location.href = route;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updated = { ...currentUser, name, email };
    setStoredUser(updated);
    setCurrentUser(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <DashboardSidebar
        activeRoute="/settings"
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onLogout={() => { setStoredUser(null); window.location.href = '/'; }}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          activeRouteTitle="Settings & Preferences"
          onOpenCmd={() => setIsCmdOpen(true)}
          currentUser={currentUser}
        />

        <main className="p-6 sm:p-8 max-w-4xl w-full mx-auto space-y-6 text-left animate-fade-in">
          
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Account & Workspace Settings</h1>
            <p className="text-xs text-slate-500 font-medium">Manage your creator profile, platform preferences, and API integrations.</p>
          </div>

          <form onSubmit={handleSave} className="surface-card p-6 border-slate-200 bg-white space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center space-x-2">
              <User className="w-4 h-4 text-brand-600" />
              <span>Profile Information</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-3">
              <button
                type="submit"
                className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center space-x-1.5"
              >
                {saved ? <Check className="w-4 h-4 text-emerald-300" /> : null}
                <span>{saved ? 'Changes Saved' : 'Save Changes'}</span>
              </button>
            </div>
          </form>

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
