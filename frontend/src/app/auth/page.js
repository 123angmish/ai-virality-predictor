'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Mail, 
  Lock, 
  User, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  AlertCircle,
  KeyRound,
  Shield,
  Briefcase
} from 'lucide-react';
import { authenticateUser, registerUser } from '../../lib/storage';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Creator');
  
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const getPasswordStrength = (pass) => {
    if (!pass) return { label: '', color: 'bg-slate-200', score: 0 };
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 10) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 2) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/3' };
    if (score <= 4) return { label: 'Medium', color: 'bg-amber-500', width: 'w-2/3' };
    return { label: 'Strong (Secure)', color: 'bg-emerald-500', width: 'w-full' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    setTimeout(() => {
      try {
        if (isSignUp) {
          if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long.');
          }
          registerUser({ name, email, password, role });
        } else {
          authenticateUser(email, password);
        }
        window.location.href = '/dashboard';
      } catch (err) {
        setErrorMessage(err.message || 'Authentication failed. Please check your credentials.');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      
      {/* Left Column: Product Value & Security Assurance */}
      <div className="md:w-1/2 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="space-y-6 relative z-10 text-left">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-black shadow-lg shadow-brand-600/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tight">AI Virality Predictor</span>
          </div>

          <div className="space-y-3 pt-6">
            <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-bold">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Isolated Per-User History & Privacy Protected</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Enterprise-Grade Creator Authentication & Privacy
            </h1>
            <p className="text-sm text-slate-300 font-medium max-w-md">
              Securely analyze, store, and manage your private video virality diagnostics with encrypted user isolation.
            </p>
          </div>

          <div className="space-y-3 pt-4 text-xs font-semibold text-slate-200">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Private Per-User Saved Video Scan History</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Isolated Team Workspaces & Role-Based Access Controls</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Opt-in Data Privacy & Zero Third-Party Tracking</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 relative z-10">
          <span>© 2026 AI Virality Predictor</span>
          <span className="flex items-center space-x-1 text-emerald-400 font-extrabold">
            <ShieldCheck className="w-4 h-4" />
            <span>256-bit Encrypted Session</span>
          </span>
        </div>
      </div>

      {/* Right Column: High-Security Auth Form */}
      <div className="md:w-1/2 p-8 sm:p-16 flex items-center justify-center bg-white">
        <div className="max-w-md w-full space-y-6 text-left">
          
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">
              {isSignUp ? 'Create Secured Account' : 'Creator Sign In'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Enter your credentials to access your isolated virality dashboard.
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold flex items-start space-x-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Toggle Tab */}
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => { setIsSignUp(false); setErrorMessage(''); }}
              className={`flex-1 py-2.5 rounded-xl transition-all ${
                !isSignUp ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsSignUp(true); setErrorMessage(''); }}
              className={`flex-1 py-2.5 rounded-xl transition-all ${
                isSignUp ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div>
                  <label className="text-xs font-extrabold text-slate-700 block mb-1">Full Name *</label>
                  <div className="relative flex items-center">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Creator"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 text-xs font-bold text-slate-800 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-extrabold text-slate-700 block mb-1">Primary Role</label>
                  <div className="relative flex items-center">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5" />
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 text-xs font-bold text-slate-800 outline-none bg-white"
                    >
                      <option value="Creator">Content Creator / Influencer</option>
                      <option value="Growth Lead">Growth Manager / Agency</option>
                      <option value="Video Editor">Video Editor</option>
                      <option value="Virality Analyst">Virality Analyst</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="text-xs font-extrabold text-slate-700 block mb-1">Email Address *</label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="creator@domain.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 text-xs font-bold text-slate-800 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-700 block mb-1">Password *</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 text-xs font-bold text-slate-800 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Meter */}
              {isSignUp && password && (
                <div className="mt-2 space-y-1">
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300`} />
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 flex justify-between">
                    <span>Password Security:</span>
                    <span className="font-extrabold">{strength.label}</span>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span className="inline-flex items-center space-x-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Authenticating...</span>
                </span>
              ) : (
                <>
                  <span>{isSignUp ? 'Create Secured Account' : 'Authenticate & Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

        </div>
      </div>

    </div>
  );
}
