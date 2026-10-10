'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  subtext?: string;
  hasPulse?: boolean;
  pulseColor?: string;
  badge?: string;
  progress?: number;
  progressBarColor?: string;
  accentColor?: 'cyan' | 'emerald' | 'amber' | 'rose' | 'indigo';
}

export default function StatCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  subtext,
  hasPulse = false,
  pulseColor = 'bg-cyan-400',
  badge,
  progress,
  progressBarColor,
  accentColor = 'cyan'
}: StatCardProps) {
  const getChangeBadgeStyle = () => {
    switch (changeType) {
      case 'positive':
        return 'text-emerald-300 bg-emerald-500/15 border-emerald-500/30';
      case 'negative':
        return 'text-rose-300 bg-rose-500/15 border-rose-500/30';
      default:
        return 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20';
    }
  };

  const getAccentBorder = () => {
    switch (accentColor) {
      case 'amber':
        return 'border-amber-500/20 hover:border-amber-400/40 shadow-[0_0_20px_rgba(245,158,11,0.08)]';
      case 'emerald':
        return 'border-emerald-500/20 hover:border-emerald-400/40 shadow-[0_0_20px_rgba(16,185,129,0.08)]';
      case 'rose':
        return 'border-rose-500/25 hover:border-rose-400/40 shadow-[0_0_20px_rgba(244,63,94,0.10)]';
      default:
        return 'border-cyan-500/20 hover:border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.08)]';
    }
  };

  const getIconStyle = () => {
    switch (accentColor) {
      case 'amber':
        return 'border-amber-500/30 text-amber-400';
      case 'emerald':
        return 'border-emerald-500/30 text-emerald-400';
      case 'rose':
        return 'border-rose-500/35 text-rose-400';
      default:
        return 'border-cyan-500/25 text-cyan-400';
    }
  };

  const getBadgeStyle = () => {
    switch (accentColor) {
      case 'amber':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'emerald':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'rose':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/35';
      default:
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
    }
  };

  return (
    <div className={`relative bg-[#0a0f1d]/85 backdrop-blur-xl border ${getAccentBorder()} rounded-2xl p-5 transition-all shadow-xl group hover:-translate-y-0.5`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {title}
            </span>
            {hasPulse && (
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${pulseColor} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${pulseColor}`}></span>
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {value}
            </span>
            {badge && (
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium border ${getBadgeStyle()}`}>
                {badge}
              </span>
            )}
          </div>
        </div>
        <div className={`p-2.5 rounded-xl bg-[#070a12] border ${getIconStyle()} group-hover:scale-110 transition-transform shadow-inner`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {progress !== undefined && (
        <div className="mt-3.5 space-y-1">
          <div className="w-full bg-[#070a12] h-2 rounded-full overflow-hidden border border-white/5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                progressBarColor || 'bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400'
              }`}
              style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
            />
          </div>
        </div>
      )}

      {(change || subtext) && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          {change && (
            <span className={`px-2 py-0.5 rounded-md font-medium border text-[11px] ${getChangeBadgeStyle()}`}>
              {change}
            </span>
          )}
          {subtext && (
            <span className="text-slate-400 ml-auto text-[11px]">
              {subtext}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
