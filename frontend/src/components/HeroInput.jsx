import React, { useState } from 'react';
import { Upload, Link2, Sparkles, Youtube, Video, Instagram, ArrowRight, CheckCircle2, RefreshCw, Film, Clock, FileVideo } from 'lucide-react';

export default function HeroInput({ onAnalyzeUrl, onAnalyzeUpload, isLoading, activeVideoMeta, onResetVideo }) {
  const [activeTab, setActiveTab] = useState('url');
  const [urlInput, setUrlInput] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const sampleUrls = [
    { label: 'TikTok Short', url: 'https://www.tiktok.com/@creator/video/7300000000000' },
    { label: 'YouTube Short', url: 'https://youtube.com/shorts/dQw4w9WgXcQ' },
    { label: 'IG Reel', url: 'https://instagram.com/reels/C123456789/' }
  ];

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    onAnalyzeUrl(urlInput);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onAnalyzeUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onAnalyzeUpload(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white border border-rose-100 rounded-3xl p-6 sm:p-8 shadow-sm shadow-rose-100/40 transition-all">
      
      {/* ACTIVE LOADED VIDEO BANNER */}
      {activeVideoMeta ? (
        <div className="bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-rose-900/60 space-y-4">
          <div className="flex items-center justify-between border-b border-rose-900/60 pb-3">
            <div className="flex items-center space-x-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4 text-rose-400" />
                <span>Video Successfully Loaded & Extracted</span>
              </span>
            </div>
            <button
              onClick={onResetVideo}
              className="text-xs bg-rose-900/60 hover:bg-rose-900 text-rose-200 hover:text-white px-3 py-1.5 rounded-xl border border-rose-700 font-semibold transition-all flex items-center space-x-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Analyze Another Video</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5">
            <div className="relative w-28 h-40 sm:w-32 sm:h-44 bg-slate-950 rounded-xl overflow-hidden flex-shrink-0 border border-rose-800/80 shadow-inner flex items-center justify-center">
              {activeVideoMeta.thumbnail ? (
                <img
                  src={activeVideoMeta.thumbnail}
                  alt="Video Thumbnail"
                  className="w-full h-full object-cover object-center"
                />
              ) : activeVideoMeta.videoUrl ? (
                <video src={activeVideoMeta.videoUrl} className="w-full h-full object-cover" muted />
              ) : (
                <div className="text-center p-2 text-rose-300">
                  <FileVideo className="w-8 h-8 mx-auto mb-1 text-rose-400" />
                  <span className="text-[10px] font-bold">1080p HD</span>
                </div>
              )}
              <span className={`absolute top-2 left-2 text-[10px] font-extrabold px-2 py-0.5 rounded shadow ${activeVideoMeta.badgeColor || 'bg-rose-600 text-white'}`}>
                {activeVideoMeta.platform || 'Video'}
              </span>
            </div>

            <div className="flex-1 space-y-2 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
                {activeVideoMeta.title || "Uploaded Short Video"}
              </h3>
              <p className="text-xs text-rose-200/80 font-medium">
                Extracted via OpenCV Motion Pipeline & Librosa Spectrogram Audio Analysis
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                <span className="bg-slate-900/90 border border-rose-900/80 text-rose-100 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center space-x-1">
                  <Film className="w-3.5 h-3.5 text-rose-400" />
                  <span>{activeVideoMeta.resolution || "1080x1920 (9:16)"}</span>
                </span>
                <span className="bg-slate-900/90 border border-rose-900/80 text-rose-100 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-rose-400" />
                  <span>{activeVideoMeta.duration || "0:21s"}</span>
                </span>
                <span className="bg-slate-900/90 border border-rose-900/80 text-rose-100 text-xs font-semibold px-2.5 py-1 rounded-full">
                  Size: {activeVideoMeta.size || "14.2 MB"}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center max-w-2xl mx-auto mb-6 space-y-1.5">
            <span className="text-xs font-black text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full uppercase tracking-wider">
              ✨ Multi-Platform AI Optimizer
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Predict Video Virality & Actionable Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Paste any video URL or drop an MP4 file to run OpenCV visual motion flow & XGBoost virality prediction.
            </p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex p-1 bg-rose-50/80 rounded-2xl border border-rose-200/80">
              <button
                onClick={() => setActiveTab('url')}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                  activeTab === 'url'
                    ? 'bg-white text-rose-600 shadow-sm border border-rose-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Link2 className="w-4 h-4 text-rose-500" />
                <span>Analyze Video URL</span>
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                  activeTab === 'upload'
                    ? 'bg-white text-rose-600 shadow-sm border border-rose-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Upload className="w-4 h-4 text-rose-500" />
                <span>Upload Video File</span>
              </button>
            </div>
          </div>

          {/* URL Form */}
          {activeTab === 'url' && (
            <form onSubmit={handleUrlSubmit} className="max-w-3xl mx-auto space-y-4">
              <div className="relative flex items-center">
                <div className="absolute left-4 flex items-center space-x-2 text-slate-400">
                  <Youtube className="w-4 h-4 text-red-500" />
                  <Video className="w-4 h-4 text-slate-800" />
                  <Instagram className="w-4 h-4 text-pink-500" />
                </div>
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Paste video link from YouTube Shorts, TikTok, Instagram Reels, X, or Facebook..."
                  className="w-full pl-28 pr-36 py-4 rounded-2xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 text-xs font-medium text-slate-900 placeholder-slate-400 outline-none transition-all shadow-xs"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-2 px-5 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 disabled:opacity-50 text-white text-xs font-extrabold rounded-xl flex items-center space-x-2 shadow-sm transition-all transform hover:-translate-y-0.5"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Analyze Virality</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                <span className="text-xs font-bold text-slate-500">Quick Presets:</span>
                {sampleUrls.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setUrlInput(sample.url);
                      onAnalyzeUrl(sample.url);
                    }}
                    className="text-xs bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold px-3.5 py-1 rounded-full border border-rose-200 transition-all flex items-center space-x-1"
                  >
                    <span>{sample.label}</span>
                    <ArrowRight className="w-3 h-3 ml-0.5 opacity-70" />
                  </button>
                ))}
              </div>
            </form>
          )}

          {/* File Upload Dropzone */}
          {activeTab === 'upload' && (
            <div className="max-w-3xl mx-auto">
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleFileDrop}
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                  dragActive
                    ? 'border-rose-500 bg-rose-50/60'
                    : 'border-rose-200 hover:border-rose-400 bg-rose-50/30'
                }`}
              >
                <input
                  type="file"
                  accept="video/mp4,video/quicktime,video/x-matroska"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload-input"
                />
                <label htmlFor="file-upload-input" className="cursor-pointer">
                  <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <Upload className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">
                    Drag & Drop Video File (.MP4 or .MOV)
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Supports up to 200MB • OpenCV motion detection & audio signal extraction
                  </p>
                  <span className="inline-block mt-4 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold rounded-xl shadow-sm transition-all">
                    Browse & Upload Video
                  </span>
                </label>
              </div>
            </div>
          )}
        </>
      )}

      {/* Scanner Progress Bar */}
      {isLoading && (
        <div className="mt-6 bg-slate-950 text-white rounded-2xl p-5 border border-rose-900/60 space-y-3 shadow-lg">
          <div className="flex items-center justify-between text-xs font-bold text-rose-400">
            <span className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping"></div>
              <span>Running OpenCV Computer Vision & Audio Feature Extractor...</span>
            </span>
            <span>Analyzing...</span>
          </div>
          <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 animate-pulse w-full rounded-full"></div>
          </div>
          <div className="grid grid-cols-3 text-[11px] text-slate-400 pt-1 text-center font-mono">
            <span>[1/3] OpenCV Motion Flow</span>
            <span>[2/3] Librosa Audio Peak</span>
            <span>[3/3] XGBoost Virality Model</span>
          </div>
        </div>
      )}
    </div>
  );
}
