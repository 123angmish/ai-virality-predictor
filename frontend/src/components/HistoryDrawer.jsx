import React from 'react';
import { X, History, Trash2, ArrowUpRight, Flame, Clock } from 'lucide-react';

export default function HistoryDrawer({ isOpen, onClose, historyList = [], onSelectHistoryItem, onClearHistory }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white max-w-md w-full h-full shadow-2xl border-l border-rose-100 p-6 flex flex-col justify-between space-y-4">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between border-b border-rose-100 pb-4 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center">
                <History className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                  Analysis History
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {historyList.length} Saved Video Diagnostic Scans
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-rose-50 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* History Item List */}
          <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-180px)] pr-1">
            {historyList.length === 0 ? (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <Clock className="w-10 h-10 mx-auto text-rose-300" />
                <p className="text-sm font-bold text-slate-700">No video history saved yet</p>
                <p className="text-xs text-slate-500">Analyze any video URL or file to automatically save reports here.</p>
              </div>
            ) : (
              historyList.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onSelectHistoryItem(item);
                    onClose();
                  }}
                  className="bg-rose-50/40 border border-rose-100 hover:border-rose-300 rounded-2xl p-3.5 transition-all cursor-pointer hover:shadow-xs group flex items-center space-x-3"
                >
                  {/* Thumbnail */}
                  <div className="w-12 h-16 rounded-xl bg-slate-950 overflow-hidden flex-shrink-0 relative border border-slate-800">
                    {item.videoMeta?.thumbnail ? (
                      <img src={item.videoMeta.thumbnail} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-rose-400 font-bold text-xs">
                        9:16
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-slate-900 truncate">
                        {item.videoMeta?.title || item.filename || "Video Scan"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-[11px]">
                      <span className="bg-rose-100 text-rose-800 font-black px-2 py-0.5 rounded-full flex items-center space-x-1">
                        <Flame className="w-3 h-3 text-rose-600" />
                        <span>{item.virality_score}/100</span>
                      </span>
                      <span className="text-slate-500 font-medium">
                        {item.date || "Just Now"}
                      </span>
                    </div>
                  </div>

                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 transition-all flex-shrink-0" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Actions */}
        {historyList.length > 0 && (
          <div className="pt-3 border-t border-slate-200">
            <button
              onClick={onClearHistory}
              className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-extrabold rounded-xl border border-red-200 transition-all flex items-center justify-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Analysis History</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
