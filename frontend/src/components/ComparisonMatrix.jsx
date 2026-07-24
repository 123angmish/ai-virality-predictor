import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

export default function ComparisonMatrix({ platforms = {} }) {
  const list = [
    { key: 'tiktok', label: 'TikTok', color: 'bg-slate-900', barColor: 'from-cyan-400 to-blue-500', val: platforms.tiktok?.match_percentage || 92.4 },
    { key: 'youtube_shorts', label: 'YouTube Shorts', color: 'bg-red-600', barColor: 'from-red-500 to-rose-600', val: platforms.youtube_shorts?.match_percentage || 88.0 },
    { key: 'instagram_reels', label: 'Instagram Reels', color: 'bg-pink-600', barColor: 'from-pink-500 to-purple-600', val: platforms.instagram_reels?.match_percentage || 86.5 },
    { key: 'facebook', label: 'Facebook', color: 'bg-blue-600', barColor: 'from-blue-600 to-indigo-600', val: platforms.facebook?.match_percentage || 81.0 },
    { key: 'twitter_x', label: 'Twitter / X', color: 'bg-slate-700', barColor: 'from-slate-600 to-slate-800', val: platforms.twitter_x?.match_percentage || 79.2 },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
            Multi-Platform Engagement Comparison Matrix
          </h3>
        </div>
        <span className="text-xs text-slate-500 font-semibold bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
          Side-by-Side Algorithm Match
        </span>
      </div>

      <div className="space-y-3.5 pt-2">
        {list.map((item) => (
          <div key={item.key} className="space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span className="flex items-center space-x-2">
                <span className={`w-2.5 h-2.5 rounded-full ${item.color}`}></span>
                <span>{item.label}</span>
              </span>
              <span className="font-extrabold text-slate-900">{item.val}%</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${item.barColor} transition-all duration-1000 ease-out`}
                style={{ width: `${item.val}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
