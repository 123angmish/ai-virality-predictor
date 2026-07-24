import React, { useState } from 'react';
import { Play, Pause, Film, Clock, Eye, CheckCircle, Sparkles } from 'lucide-react';

export default function VideoPreview({ timestamps = [], filename = "Uploaded_Video.mp4", videoMeta = null }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTimestamp, setActiveTimestamp] = useState(0);

  const isLocalFile = videoMeta?.isLocalFile && videoMeta?.videoUrl;
  const isEmbed = videoMeta?.embedUrl;
  const videoTitle = videoMeta?.title || filename;
  const thumbnail = videoMeta?.thumbnail;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Active Video Player
            </span>
            <h4 className="text-xs font-extrabold text-slate-900 truncate max-w-[210px]">
              {videoTitle}
            </h4>
          </div>
        </div>
        <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full ${videoMeta?.badgeColor || 'bg-slate-900 text-white'}`}>
          {videoMeta?.platform || '9:16 Vertical'}
        </span>
      </div>

      {/* Video Container Frame */}
      <div className="relative aspect-[9/16] w-full max-h-[340px] bg-slate-950 rounded-xl overflow-hidden shadow-md flex flex-col justify-between p-3 text-white border border-slate-800 mx-auto">
        
        {/* 1. YouTube IFrame Embed Player */}
        {isEmbed ? (
          <iframe
            src={videoMeta.embedUrl}
            title={videoTitle}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : isLocalFile ? (
          /* 2. HTML5 Video Player for Uploaded MP4/MOV */
          <video
            src={videoMeta.videoUrl}
            controls
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          /* 3. Real High-Res Thumbnail Poster Image */
          <>
            {thumbnail ? (
              <img
                src={thumbnail}
                alt="Video Thumbnail Poster"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                <Film className="w-12 h-12 text-slate-600" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>

            {/* Top Info Tag */}
            <div className="relative z-10 flex justify-between items-center text-xs font-semibold text-white/90">
              <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full font-mono text-[10px] border border-white/10">
                {videoMeta?.duration || "0:21s"}
              </span>
              <span className="bg-emerald-500/90 text-white px-2 py-0.5 rounded text-[10px] font-extrabold shadow-sm">
                1080p HD
              </span>
            </div>

            {/* Play Button Overlay */}
            <div className="relative z-10 text-center my-auto">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-14 h-14 bg-indigo-600/90 hover:bg-indigo-600 text-white backdrop-blur-md rounded-full flex items-center justify-center transition-all transform hover:scale-105 mx-auto border border-indigo-400 shadow-xl"
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-white" />
                ) : (
                  <Play className="w-7 h-7 fill-white ml-1" />
                )}
              </button>
            </div>
          </>
        )}

        {/* Active Timestamp Diagnostic Banner Overlay */}
        {!isEmbed && timestamps[activeTimestamp] && (
          <div className="relative z-10 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-2.5 rounded-lg text-xs flex items-center justify-between mt-auto">
            <span className="font-bold text-indigo-300 truncate max-w-[180px]">
              [{timestamps[activeTimestamp].time}] {timestamps[activeTimestamp].label}
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 font-extrabold px-2 py-0.5 rounded text-[10px] flex-shrink-0">
              {timestamps[activeTimestamp].status}
            </span>
          </div>
        )}
      </div>

      {/* Interactive Timestamp Markers */}
      <div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
          Diagnostic Timeline Markers:
        </span>
        <div className="grid grid-cols-2 gap-2">
          {timestamps.map((ts, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTimestamp(idx)}
              className={`p-2 rounded-lg text-left border transition-all text-xs flex flex-col justify-between ${
                activeTimestamp === idx
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-950 font-semibold shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-extrabold text-indigo-600">{ts.time}</span>
                <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-200 font-bold">
                  {ts.status}
                </span>
              </div>
              <span className="text-[11px] text-slate-600 font-medium mt-1 truncate">
                {ts.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
