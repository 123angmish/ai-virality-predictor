'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Mail, Lock, User, CheckCircle2 } from 'lucide-react';
import { setStoredUser } from '../../lib/storage';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name: name || (email ? email.split('@')[0] : 'Creator'),
      email: email || 'creator@virality.ai',
      isPro: true
    };
    setStoredUser(user);
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      
      {/* Left Column: Product Value & Preview */}
      <div className="md:w-1/2 bg-gradient-to-br from-brand-900 via-indigo-900 to-slate-900 p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
        <div className="space-y-6 relative z-10 text-left">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-500 text-white flex items-center justify-center font-black shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tight">AI Virality Predictor</span>
          </div>

          <div className="space-y-3 pt-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-300">Creator Intelligence 2026</span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Unlock Unlimited Video Virality Diagnostics
            </h1>
            <p className="text-sm text-slate-300 font-medium max-w-md">
              Predict hook retention, visual motion, audio RMS energy, and algorithm readiness before publishing.
            </p>
          </div>

          <div className="space-y-3 pt-4 text-xs font-semibold text-slate-200">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>5 Platform Readiness Blueprints (Shorts, TikTok, Reels, FB, X)</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Hook Lab 0-3s Assessment & 3 Script Rewrites</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Export PDF/TXT & CSV Spreadsheets</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400 pt-8 relative z-10 text-left">
          © 2026 AI Virality Predictor. All rights reserved.
        </p>
      </div>

      {/* Right Column: Clean Auth Form */}
      <div className="md:w-1/2 p-8 sm:p-16 flex items-center justify-center bg-white">
        <div className="max-w-md w-full space-y-6 text-left">
          
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">
              {isSignUp ? 'Create Creator Account' : 'Welcome Back'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Access your saved video library, history, and diagnostic reports.
            </p>
          </div>

          {/* Toggle Tab */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2.5 rounded-lg transition-all ${
                !isSignUp ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2.5 rounded-lg transition-all ${
                isSignUp ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="text-xs font-extrabold text-slate-700 block mb-1">Full Name</label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-slate-400 absolute left-3" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Creator"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 text-xs font-medium outline-none"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-extrabold text-slate-700 block mb-1">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="creator@domain.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 text-xs font-medium outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-700 block mb-1">Password</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 text-xs font-medium outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>{isSignUp ? 'Register Account' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>
      </div>

    </div>
  );
}
