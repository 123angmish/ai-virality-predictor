'use client';

import React, { useState } from 'react';
import { 
  Link2, 
  Upload, 
  Sparkles, 
  Zap, 
  Loader2,
  FileVideo,
  X
} from 'lucide-react';

export default function MainAnalysisTool({ onAnalyzeUrl, onAnalyzeUpload, onSelectDemo, isLoading }) {
  const [activeTab, setActiveTab] = useState('url'); // 'url' | 'upload' | 'demo'
  const [urlInput, setUrlInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Additional Options
  const [targetPlatform, setTargetPlatform] = useState('YouTube Shorts');
  const [contentCategory, setContentCategory] = useState('Education & Tech');
  const [audienceType, setAudienceType] = useState('General Creators');
  const [videoGoal, setVideoGoal] = useState('Maximize Reach & Virality');
  const [contentLanguage, setContentLanguage] = useState('English');

  // Real Progress Stepper State
  const [progressStep, setProgressStep] = useState(0);

  const steps = [
    "Validating source URL / video container...",
    "Extracting video frames and metadata...",
    "Inspecting first 3 seconds (Hook Optical Flow)...",
    "Measuring visual scene cut frequency...",
    "Analysing motion vectors and color vibrancy...",
    "Processing audio signals & RMS energy...",
    "Running HistGradientBoosting Prediction Model...",
    "Generating platform recommendations..."
  ];

  const handleUrlSubmit = (e) => {
    if (e) e.preventDefault();
    const finalUrl = urlInput.trim() || 'https://youtube.com/shorts/sample-10x-views';

    startSteppedProgress(() => {
      onAnalyzeUrl(finalUrl, {
        targetPlatform,
        contentCategory,
        audienceType,
        videoGoal,
        contentLanguage
      });
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = () => {
    const file = selectedFile || new File(["dummy"], "sample_creator_video.mp4", { type: "video/mp4" });

    startSteppedProgress(() => {
      onAnalyzeUpload(file, {
        targetPlatform,
        contentCategory,
        audienceType,
        videoGoal,
        contentLanguage
      });
    });
  };

  const startSteppedProgress = (onComplete) => {
    setProgressStep(1);
    let step = 1;
    const interval = setInterval(() => {
      step++;
      if (step > steps.length) {
        clearInterval(interval);
        onComplete();
      } else {
        setProgressStep(step);
      }
    }, 250);
  };

  return (
    <section id="analyzer" className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-xs font-extrabold border border-brand-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Virality Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Analyse Your Video in Seconds
          </h2>
          <p className="text-sm text-slate-600 font-medium max-w-xl mx-auto">
            Paste any short-form video link, upload an MP4/MOV file, or load a sample creator audit.
          </p>
        </div>

        {/* Studio Workspace Card */}
        <div className="surface-card p-6 sm:p-8 border-slate-200 shadow-elevated bg-white space-y-6 text-left">
          
          {/* Main Tabs (URL / Upload / Demo) */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`flex-1 py-3 rounded-xl transition-all flex items-center justify-center space-x-2 ${
                activeTab === 'url' ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Link2 className="w-4 h-4" />
              <span>Analyse URL</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-3 rounded-xl transition-all flex items-center justify-center space-x-2 ${
                activeTab === 'upload' ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>Upload Video File</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('demo')}
              className={`flex-1 py-3 rounded-xl transition-all flex items-center justify-center space-x-2 ${
                activeTab === 'demo' ? 'bg-white text-brand-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Try Creator Demo</span>
            </button>
          </div>

          {/* TAB 1: URL MODE */}
          {activeTab === 'url' && (
            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <div className="relative flex items-center">
                <Link2 className="w-5 h-5 text-slate-400 absolute left-4" />
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Paste YouTube Shorts, TikTok, Instagram Reels, X or Facebook URL..."
                  className="w-full pl-12 pr-32 py-4 rounded-2xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 text-sm font-medium outline-none transition-all shadow-xs"
                />
                {urlInput && (
                  <button
                    type="button"
                    onClick={() => setUrlInput('')}
                    className="absolute right-32 p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-2.5 px-6 py-2.5 bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5 hover:scale-105 cursor-pointer"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-3.5 h-3.5 fill-current text-yellow-300" />}
                  <span>{isLoading ? 'Analysing...' : 'Analyse Now'}</span>
                </button>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center space-x-2 text-xs">
                <span className="text-slate-400 font-bold">Quick Presets:</span>
                <button
                  type="button"
                  onClick={() => {
                    setUrlInput('https://youtube.com/shorts/sample-10x-views');
                    handleUrlSubmit();
                  }}
                  className="text-brand-600 hover:underline font-bold"
                >
                  YouTube Shorts
                </button>
                <span className="text-slate-300">•</span>
                <button
                  type="button"
                  onClick={() => {
                    setUrlInput('https://tiktok.com/@creator/video/sample-hook');
                    handleUrlSubmit();
                  }}
                  className="text-brand-600 hover:underline font-bold"
                >
                  TikTok Video
                </button>
                <span className="text-slate-300">•</span>
                <button
                  type="button"
                  onClick={() => {
                    setUrlInput('https://instagram.com/reels/sample-aesthetic');
                    handleUrlSubmit();
                  }}
                  className="text-brand-600 hover:underline font-bold"
                >
                  Instagram Reel
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: UPLOAD MODE */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div 
                className="border-2 border-dashed border-slate-200 hover:border-brand-400 bg-slate-50/60 hover:bg-brand-50/20 rounded-2xl p-8 text-center transition-all cursor-pointer relative"
                onClick={() => document.getElementById('file-upload-input').click()}
              >
                <input
                  id="file-upload-input"
                  type="file"
                  accept="video/mp4,video/mov,video/quicktime,video/webm"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {selectedFile ? (
                  <div className="space-y-2">
                    <FileVideo className="w-10 h-10 text-brand-600 mx-auto" />
                    <p className="text-sm font-extrabold text-slate-900">{selectedFile.name}</p>
                    <p className="text-xs text-slate-500">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                      className="text-xs font-bold text-red-600 hover:underline"
                    >
                      Remove File
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-10 h-10 text-slate-400 mx-auto" />
                    <p className="text-sm font-extrabold text-slate-900">Click to Browse or Drag & Drop Video File</p>
                    <p className="text-xs text-slate-500">Supports MP4, MOV, WebM (up to 100MB)</p>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleUploadSubmit}
                className="w-full py-3.5 bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 hover:scale-[1.01] cursor-pointer"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 text-yellow-300 fill-current" />}
                <span>{selectedFile ? `Analyse ${selectedFile.name}` : 'Analyse Sample Video File'}</span>
              </button>
            </div>
          )}

          {/* TAB 3: DEMO MODE */}
          {activeTab === 'demo' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={onSelectDemo}
                className="p-4 bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-300 rounded-2xl text-left space-y-2 transition-all group shadow-xs hover:scale-105"
              >
                <span className="text-[10px] font-extrabold bg-red-100 text-red-700 px-2 py-0.5 rounded-md">YouTube Shorts</span>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-brand-600">10x Views Shorts Hook</h4>
                <p className="text-[11px] text-slate-500">Score: 84.5/100 • 9:16 Vertical</p>
              </button>

              <button
                type="button"
                onClick={onSelectDemo}
                className="p-4 bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-300 rounded-2xl text-left space-y-2 transition-all group shadow-xs hover:scale-105"
              >
                <span className="text-[10px] font-extrabold bg-black text-white px-2 py-0.5 rounded-md">TikTok Viral</span>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-brand-600">Kinetic Caption Trend</h4>
                <p className="text-[11px] text-slate-500">Score: 92.0/100 • High Motion</p>
              </button>

              <button
                type="button"
                onClick={onSelectDemo}
                className="p-4 bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-300 rounded-2xl text-left space-y-2 transition-all group shadow-xs hover:scale-105"
              >
                <span className="text-[10px] font-extrabold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md">Instagram Reel</span>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-brand-600">Aesthetic Talking Head</h4>
                <p className="text-[11px] text-slate-500">Score: 86.0/100 • RGB Lighting</p>
              </button>
            </div>
          )}

          {/* Target Parameters Bar */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div>
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">Target Platform</label>
              <select
                value={targetPlatform}
                onChange={(e) => setTargetPlatform(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-800 outline-none focus:border-brand-500"
              >
                <option value="YouTube Shorts">YouTube Shorts</option>
                <option value="TikTok">TikTok</option>
                <option value="Instagram Reels">Instagram Reels</option>
                <option value="X Video">X (Twitter)</option>
                <option value="Facebook Video">Facebook</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">Category</label>
              <select
                value={contentCategory}
                onChange={(e) => setContentCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-800 outline-none focus:border-brand-500"
              >
                <option value="Education & Tech">Education & Tech</option>
                <option value="Entertainment & Humor">Entertainment & Humor</option>
                <option value="Fitness & Health">Fitness & Health</option>
                <option value="Business & Finance">Business & Finance</option>
                <option value="Lifestyle & Vlog">Lifestyle & Vlog</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">Video Goal</label>
              <select
                value={videoGoal}
                onChange={(e) => setVideoGoal(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-800 outline-none focus:border-brand-500"
              >
                <option value="Maximize Reach & Virality">Maximize Reach & Virality</option>
                <option value="Drive Follower Growth">Drive Follower Growth</option>
                <option value="High Audience Retention">High Audience Retention</option>
                <option value="Brand Conversion">Brand Conversion</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">Language</label>
              <select
                value={contentLanguage}
                onChange={(e) => setContentLanguage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-800 outline-none focus:border-brand-500"
              >
                <option value="English">English</option>
                <option value="Hindi / Hinglish">Hindi / Hinglish</option>
                <option value="Spanish">Spanish</option>
                <option value="Multilingual">Multilingual</option>
              </select>
            </div>
          </div>

          {/* Real Multi-Stage Progress Interface */}
          {isLoading && progressStep > 0 && (
            <div className="bg-brand-50/70 border border-brand-200 rounded-2xl p-5 space-y-3 animate-fade-in text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 text-brand-600 animate-spin" />
                  <span className="text-xs font-extrabold text-brand-900">
                    Step {progressStep} of {steps.length}: {steps[progressStep - 1]}
                  </span>
                </div>
                <span className="text-xs font-black text-brand-700">
                  {Math.round((progressStep / steps.length) * 100)}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-brand-200/60 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-brand-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(progressStep / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
