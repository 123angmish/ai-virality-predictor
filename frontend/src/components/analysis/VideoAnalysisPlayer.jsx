'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Video, Sparkles, Film } from 'lucide-react';
import { getActiveBlobUrl } from '../../lib/api';

export default function VideoAnalysisPlayer({ timestamps, filename, videoMeta }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeBlob, setActiveBlob] = useState(null);

  useEffect(() => {
    const b = getActiveBlobUrl();
    if (b) setActiveBlob(b);
  }, []);

  const meta = videoMeta || {};
  const title = meta.title || filename || "Uploaded Creator Video.mp4";
  const platform = meta.platform || "YouTube Shorts";
  const duration = meta.duration || "0:22s";
  const size = meta.size || "14.2 MB";
  const videoSrc = meta.blobUrl || activeBlob;

  return (
    <div id="video-player" className="surface-card p-6 border-slate-200 bg-white text-left space-y-4 shadow-elevated">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-brand-50 text-brand-600 rounded-lg">
            <Video className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-extrabold text-slate-900">Active Video Canvas Preview</h3>
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
        {videoSrc ? (
          <video
            src={videoSrc}
            controls
            autoPlay
            muted={isMuted}
            className="w-full h-full object-contain bg-black"
          />
        ) : meta.youtubeEmbedUrl ? (
          <iframe
            src={meta.youtubeEmbedUrl}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 p-6 flex flex-col items-center justify-between text-center relative overflow-hidden">
            <div className="w-full flex items-center justify-between text-white/70 text-[10px] font-bold">
              <span className="bg-white/10 px-2 py-0.5 rounded-md">{platform}</span>
              <span>{duration}</span>
            </div>

            <div className="space-y-3 relative z-10 my-auto">
              <div className="w-16 h-16 rounded-full bg-brand-600/30 border border-brand-400/50 flex items-center justify-center mx-auto shadow-lg">
                <Film className="w-8 h-8 text-brand-300" />
              </div>
              <div className="space-y-1 max-w-xs">
                <h4 className="text-sm font-black text-white truncate">{title}</h4>
                <p className="text-[11px] text-brand-200 font-medium">Vision & Audio Frames Processed</p>
              </div>
            </div>

            {/* Video Controls Bar */}
            <div className="w-full bg-slate-950/80 backdrop-blur-md px-3 py-2 rounded-xl flex items-center justify-between text-white text-xs font-semibold">
              <div className="flex items-center space-x-2">
                <button onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <button onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span>0:04 / {duration}</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">1.0x</span>
                <Maximize2 className="w-3.5 h-3.5 cursor-pointer" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Specs Breakdown */}
      <div className="pt-2 grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase block">File Name</span>
          <span className="truncate block font-bold text-slate-900" title={title}>{title}</span>
        </div>

        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Target Platform & Size</span>
          <span className="block font-bold text-slate-900">{platform} • {size}</span>
        </div>
      </div>
    </div>
  );
}
