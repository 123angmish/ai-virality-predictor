import React from 'react';
import { Zap, Scissors, Volume2, Users } from 'lucide-react';

export default function MetricsGrid({ features = {}, estimatedReach = "1.2M+ views" }) {
  const hookSpeed = features.hook_motion_intensity || 82.5;
  const cutsPerMin = features.scene_cut_rate || 24.0;
  const audioRms = features.audio_rms_energy ? (features.audio_rms_energy * 100).toFixed(0) : "81";

  const metrics = [
    {
      title: "Hook Speed (0-3s)",
      value: `${hookSpeed}/100`,
      desc: hookSpeed > 70 ? "Optimal motion capture" : "Too slow (add zoom/motion)",
      icon: Zap,
      color: "text-amber-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200"
    },
    {
      title: "Visual Scene Cuts",
      value: `${cutsPerMin} / min`,
      desc: cutsPerMin > 20 ? "High retention pacing" : "Add visual B-roll cuts",
      icon: Scissors,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200"
    },
    {
      title: "Audio RMS Energy",
      value: `${audioRms}% Peak`,
      desc: "Librosa bass drop detected",
      icon: Volume2,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200"
    },
    {
      title: "Estimated Reach",
      value: estimatedReach,
      desc: "Predicted 30-day view volume",
      icon: Users,
      color: "text-slate-800",
      bgColor: "bg-slate-100",
      borderColor: "border-slate-200"
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div
            key={idx}
            className="bg-white border border-rose-100/80 rounded-2xl p-4 shadow-sm hover:border-rose-300 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                {m.title}
              </span>
              <div className={`w-8 h-8 rounded-xl ${m.bgColor} ${m.borderColor} border flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${m.color}`} />
              </div>
            </div>
            <div>
              <span className="text-xl font-black text-slate-900 tracking-tight block">
                {m.value}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {m.desc}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
