'use client';

import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, Video, CheckCircle2 } from 'lucide-react';

export default function VideoAnalysisPlayer({ timestamps, filename, videoMeta }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const meta = videoMeta || {
    title: filename || "How_I_10xed_My_Views.mp4",
    platform: "Instagram Reels",
    duration: "0:21s",
    resolution: "1080x1920 (9:16)",
    size: "14.2 MB",
    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop"
  };

  return (
    <div className="surface-card p-6 border-slate-200 bg-white text-left space-y-4 shadow-elevated">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-brand-50 text-brand-600 rounded-lg">
            <Video className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-extrabold text-slate-900">Active Video Player Canvas</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-extrabold bg-slate-900 text-white px-2 py-0.5 rounded-md">
            1080p HD
          </span>
          <span className="text-[10px] font-extrabold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md">
            9:16 Vertical
          </span>
        </div>
      </div>

      {/* Video Canvas Container */}
      <div className="w-full aspect-[9/16] max-h-96 bg-slate-950 rounded-2xl overflow-hidden relative border border-slate-800 shadow-md group mx-auto flex items-center justify-center">
        {meta.isLocalFile && meta.blobUrl ? (
          <video
            src={meta.blobUrl}
            controls
            className="w-full h-full object-contain"
          />
        ) : meta.youtubeEmbedUrl ? (
          <iframe
            src={meta.youtubeEmbedUrl}
            title="Video Player"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={meta.thumbnail}
              alt="Video Preview"
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-xs flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-brand-600 hover:bg-brand-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
              >
                {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 fill-current ml-1" />}
              </button>
            </div>

            {/* Video Controls Bar */}
            <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-2 rounded-xl flex items-center justify-between text-white text-xs font-semibold">
              <div className="flex items-center space-x-2">
                <button onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <button onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span>0:04 / {meta.duration}</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">1.0x</span>
                <Maximize2 className="w-3.5 h-3.5 cursor-pointer" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Video Specs Breakdown */}
      <div className="pt-2 grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase block">File Name</span>
          <span className="truncate block font-bold text-slate-900">{meta.title}</span>
        </div>

        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase block">File Size & Specs</span>
          <span className="block font-bold text-slate-900">{meta.size || "14.2 MB"} • MP4</span>
        </div>
      </div>
    </div>
  );
}
