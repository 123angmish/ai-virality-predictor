import React, { useState } from 'react';
import { X, Lock, Mail, User, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name: name || (email ? email.split('@')[0] : 'Creator'),
      email: email || 'creator@virality.ai',
      isPro: true
    };
    onLoginSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-rose-200 rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-rose-50 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 bg-rose-100 text-rose-600 border border-rose-200 rounded-2xl flex items-center justify-center mx-auto shadow-sm mb-2">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            {isSignUp ? 'Create Creator Account' : 'Welcome Back'}
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Access unlimited Virality Predictions, History & Exportable Reports
          </p>
        </div>

        {/* Toggle Sign In / Sign Up */}
        <div className="flex bg-rose-50 p-1 rounded-2xl border border-rose-200 text-xs font-bold">
          <button
            onClick={() => setIsSignUp(false)}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              !isSignUp ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              isSignUp ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3">
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
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 text-xs font-medium outline-none"
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
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 text-xs font-medium outline-none"
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
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 text-xs font-medium outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 mt-2"
          >
            <span>{isSignUp ? 'Register & Get Started' : 'Sign In to Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Note */}
        <div className="text-center pt-2 border-t border-slate-100">
          <span className="text-[11px] text-slate-500 flex items-center justify-center space-x-1 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />
            <span>Secure Creator Authentication & Encrypted Storage</span>
          </span>
        </div>
      </div>
    </div>
  );
}
