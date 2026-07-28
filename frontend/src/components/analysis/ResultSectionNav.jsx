'use client';

import React, { useState, useEffect } from 'react';

export default function ResultSectionNav() {
  const [activeSection, setActiveSection] = useState('overview');

  const navItems = [
    { id: 'overview', label: 'Overview', target: 'results-audit' },
    { id: 'timeline', label: 'Video Timeline', target: 'video-timeline' },
    { id: 'hook', label: 'Hook Analysis', target: 'hook-lab' },
    { id: 'platform', label: 'Platform Fit', target: 'platform-fit' },
    { id: 'doctor', label: 'Content Doctor', target: 'content-doctor' },
    { id: 'plan', label: 'Improvement Plan', target: 'improvement-plan' },
    { id: 'technical', label: 'Technical Details', target: 'technical-details' }
  ];

  const handleScrollTo = (targetId, id) => {
    setActiveSection(id);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-16 z-20 bg-white/95 backdrop-blur-md border-y border-slate-200 shadow-subtle py-2">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-1 text-xs font-bold">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.target, item.id)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                activeSection === item.id
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
