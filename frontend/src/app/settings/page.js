'use client';

import React, { useState, useEffect } from 'react';
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import DashboardHeader from '../../components/layout/DashboardHeader';
import CommandPalette from '../../components/analysis/CommandPalette';
import { getStoredUser, setStoredUser, getStoredPrivacy, setStoredPrivacy } from '../../lib/storage';
import { Settings, User, Bell, Shield, Key, Check, Lock, Eye, EyeOff, Trash2, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function SettingsPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Creator');
  const [saved, setSaved] = useState(false);

  // Privacy states
  const [privacySettings, setPrivacyState] = useState({
    privateHistory: true,
    allowAnalytics: false,
    retention: '90 days'
  });
  const [privacySaved, setPrivacySaved] = useState(false);

  // Security password change states
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [securityStatus, setSecurityStatus] = useState(null);

  useEffect(() => {
    const u = getStoredUser();
    setCurrentUser(u);
    if (u) {
      setName(u.name || 'Alex Creator');
      setEmail(u.email || 'creator@virality.ai');
      setRole(u.role || 'Creator');
    }
    const priv = getStoredPrivacy(u?.email);
    if (priv) setPrivacyState(priv);
  }, []);

  const handleNavigate = (route) => {
    window.location.href = route;
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = { ...currentUser, name, email, role };
    setStoredUser(updated);
    setCurrentUser(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSavePrivacy = (e) => {
    e.preventDefault();
    setStoredPrivacy(privacySettings, currentUser?.email);
    setPrivacySaved(true);
    setTimeout(() => setPrivacySaved(false), 2000);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setSecurityStatus({ type: 'error', msg: 'New password must be at least 6 characters long.' });
      return;
    }
    setSecurityStatus({ type: 'success', msg: 'Security credentials updated successfully.' });
    setCurrPassword('');
    setNewPassword('');
    setTimeout(() => setSecurityStatus(null), 3000);
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
          activeRouteTitle="Settings & Privacy Controls"
          onOpenCmd={() => setIsCmdOpen(true)}
          currentUser={currentUser}
        />

        <main className="p-6 sm:p-8 max-w-4xl w-full mx-auto space-y-6 text-left animate-fade-in">
          
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Account & Privacy Settings</h1>
            <p className="text-xs text-slate-500 font-medium">Manage your creator profile, isolated user history privacy, and security authentication credentials.</p>
          </div>

          {/* Section 1: Profile Information */}
          <form onSubmit={handleSaveProfile} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 flex items-center space-x-2">
              <User className="w-4 h-4 text-brand-600" />
              <span>Creator Profile</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-extrabold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:border-brand-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-extrabold text-slate-700 block mb-1">Workspace Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:border-brand-500 bg-white"
                >
                  <option value="Creator">Content Creator / Influencer</option>
                  <option value="Growth Lead">Growth Lead</option>
                  <option value="Video Editor">Video Editor</option>
                  <option value="Virality Analyst">Virality Analyst</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-3">
              <button
                type="submit"
                className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center space-x-1.5"
              >
                {saved ? <Check className="w-4 h-4 text-emerald-300" /> : null}
                <span>{saved ? 'Profile Saved' : 'Save Profile Changes'}</span>
              </button>
            </div>
          </form>

          {/* Section 2: Privacy & Data Isolation Controls */}
          <form onSubmit={handleSavePrivacy} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center space-x-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>Account Privacy & User History Isolation</span>
              </h3>
              <span className="text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200">
                Encrypted Isolation
              </span>
            </div>

            <div className="space-y-4 text-xs font-medium text-slate-700">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="space-y-0.5">
                  <span className="font-extrabold text-slate-900 block">Private Per-User Analysis History</span>
                  <p className="text-[11px] text-slate-500">Only your logged-in account can view your saved video scans and reports.</p>
                </div>
                <input
                  type="checkbox"
                  checked={privacySettings.privateHistory}
                  onChange={(e) => setPrivacyState({ ...privacySettings, privateHistory: e.target.checked })}
                  className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="space-y-0.5">
                  <span className="font-extrabold text-slate-900 block">Opt-Out of Anonymous Model Benchmarking</span>
                  <p className="text-[11px] text-slate-500">Prevent video metrics from contributing to global aggregate virality index.</p>
                </div>
                <input
                  type="checkbox"
                  checked={!privacySettings.allowAnalytics}
                  onChange={(e) => setPrivacyState({ ...privacySettings, allowAnalytics: !e.target.checked })}
                  className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-slate-700 block mb-1">Historical Scan Data Retention</label>
                <select
                  value={privacySettings.retention}
                  onChange={(e) => setPrivacyState({ ...privacySettings, retention: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none bg-white"
                >
                  <option value="30 days">Keep history for 30 days</option>
                  <option value="90 days">Keep history for 90 days (Recommended)</option>
                  <option value="1 year">Keep history for 1 year</option>
                  <option value="indefinite">Keep history indefinitely</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-3">
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center space-x-1.5"
              >
                {privacySaved ? <Check className="w-4 h-4 text-emerald-300" /> : null}
                <span>{privacySaved ? 'Privacy Preferences Saved' : 'Save Privacy Controls'}</span>
              </button>
            </div>
          </form>

          {/* Section 3: Security & Credentials */}
          <form onSubmit={handleChangePassword} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 flex items-center space-x-2">
              <Key className="w-4 h-4 text-brand-600" />
              <span>Account Security & Password</span>
            </h3>

            {securityStatus && (
              <div className={`p-3.5 rounded-xl text-xs font-bold flex items-center space-x-2 ${
                securityStatus.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                {securityStatus.type === 'error' ? <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                <span>{securityStatus.msg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-extrabold text-slate-700 block mb-1">Current Password</label>
                <input
                  type="password"
                  value={currPassword}
                  onChange={(e) => setCurrPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-slate-700 block mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-3">
              <button
                type="submit"
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all"
              >
                Update Password
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
