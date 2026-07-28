'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Video, ArrowRight, Menu, X, ChevronDown, BarChart2, Zap, Shield, HelpCircle, Layers } from 'lucide-react';

export default function PublicNavbar({ currentUser, onOpenAuth, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-subtle py-3 border-b border-slate-200' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left: Brand Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-brand-500/20 group-hover:scale-105 transition-all">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-slate-900 tracking-tight leading-none group-hover:text-brand-600 transition-colors">
                  AI Virality<span className="text-brand-500">.</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mt-0.5">
                  Video Intelligence 2026
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              
              {/* Product Dropdown */}
              <div className="relative" onMouseEnter={() => setProductDropdownOpen(true)} onMouseLeave={() => setProductDropdownOpen(false)}>
                <button className="flex items-center space-x-1 px-3 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100/60 transition-all">
                  <span>Product</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {productDropdownOpen && (
                  <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-elevated border border-slate-200 p-2 space-y-1 animate-fade-in">
                    <a href="#analyzer" className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-slate-50 transition-all">
                      <div className="p-2 bg-brand-50 text-brand-600 rounded-lg mt-0.5">
                        <Video className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Virality Analyzer</div>
                        <div className="text-[11px] text-slate-500">AI Hook & Motion Diagnostics</div>
                      </div>
                    </a>

                    <a href="#features" className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-slate-50 transition-all">
                      <div className="p-2 bg-purple-50 text-purple-600 rounded-lg mt-0.5">
                        <BarChart2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Platform Optimizer</div>
                        <div className="text-[11px] text-slate-500">TikTok, Shorts, Reels & X</div>
                      </div>
                    </a>

                    <a href="#explainability" className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-slate-50 transition-all">
                      <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg mt-0.5">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">AI Explainability</div>
                        <div className="text-[11px] text-slate-500">Reasoning & Measured Signals</div>
                      </div>
                    </a>
                  </div>
                )}
              </div>

              <a href="#how-it-works" className="px-3 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100/60 transition-all">
                How It Works
              </a>
              <a href="#features" className="px-3 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100/60 transition-all">
                Features
              </a>
              <a href="#use-cases" className="px-3 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100/60 transition-all">
                Use Cases
              </a>
              <a href="#pricing" className="px-3 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100/60 transition-all">
                Pricing
              </a>
              <a href="#faq" className="px-3 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100/60 transition-all">
                FAQ
              </a>
            </div>
          </div>

          {/* Right: Auth & Dashboard CTA */}
          <div className="hidden md:flex items-center space-x-3">
            {currentUser ? (
              <button
                onClick={() => onNavigate('/dashboard')}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center space-x-2"
              >
                <Layers className="w-4 h-4 text-brand-400" />
                <span>Go to Dashboard</span>
              </button>
            ) : (
              <>
                <button
                  onClick={onOpenAuth}
                  className="px-4 py-2 text-xs font-extrabold text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 rounded-xl transition-all"
                >
                  Log In
                </button>
                <a
                  href="#analyzer"
                  className="px-4 py-2.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-brand-500/20 transition-all flex items-center space-x-1.5 hover:scale-[1.02]"
                >
                  <Zap className="w-3.5 h-3.5 fill-current text-yellow-300" />
                  <span>Start Free Analysis</span>
                </a>
              </>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-all"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
          <a
            href="#analyzer"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-slate-800 border-b border-slate-100"
          >
            Analyse Video
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-600"
          >
            How It Works
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-600"
          >
            Features
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-600"
          >
            Pricing
          </a>

          <div className="pt-2 flex flex-col space-y-2">
            {currentUser ? (
              <button
                onClick={() => { setMobileMenuOpen(false); onNavigate('/dashboard'); }}
                className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                  className="w-full py-2.5 text-xs font-bold text-slate-700 bg-slate-100 rounded-xl"
                >
                  Log In
                </button>
                <a
                  href="#analyzer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center bg-brand-600 text-white font-extrabold text-xs rounded-xl"
                >
                  Start Free Analysis
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
