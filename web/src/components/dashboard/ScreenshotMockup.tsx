'use client';

import React from 'react';
import { ScreenshotItem, getActivityDensityStatus } from '@/lib/demo-data';
import { useLanguage } from '@/context/LanguageContext';
import { AlertTriangle, Play, Volume2, ShieldAlert } from 'lucide-react';

interface Props {
  screenshot: ScreenshotItem;
  className?: string;
  showWatermark?: boolean;
}

export default function ScreenshotMockup({ screenshot, className = '', showWatermark = true }: Props) {
  const { t } = useLanguage();
  const { 
    isBlurred, 
    activeApp, 
    windowTitle, 
    timestamp, 
    employeeName,
    activityDensityPercent = 85,
    hasMediaFlag = false,
    isEvasionFlagged = false,
    evasionReason
  } = screenshot;

  const densityStatus = getActivityDensityStatus(activityDensityPercent);

  // Render authentic app-specific mockup based on activeApp
  const renderAppContent = () => {
    // Check if it's YouTube / Media Streaming
    if (hasMediaFlag || windowTitle.toLowerCase().includes('youtube') || activeApp === 'Google Chrome') {
      return (
        <div className="bg-[#0f0f0f] text-slate-200 font-sans text-xs h-full flex flex-col select-none">
          {/* Chrome Tab & URL Bar */}
          <div className="bg-[#1f1f1f] px-3 py-1.5 flex items-center justify-between text-[11px] border-b border-white/10">
            <div className="flex items-center gap-2 max-w-[280px] truncate">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block flex-shrink-0"></span>
              <span className="text-slate-200 font-medium truncate">YouTube - {windowTitle.replace('Google Chrome - YouTube', '').trim() || 'Streaming Video'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1">
                <Play className="w-2.5 h-2.5 fill-red-400" />
                <span>Media Active</span>
              </span>
            </div>
          </div>

          {/* YouTube Video Player Simulation */}
          <div className="flex-1 bg-black p-3 flex flex-col justify-between relative overflow-hidden">
            {/* Background Video Simulation Canvas */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950/40 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center animate-pulse">
                <Play className="w-10 h-10 text-red-500 fill-red-500 ml-1" />
              </div>
            </div>

            {/* Video Overlay Top Badge */}
            <div className="relative z-10 flex items-center justify-between text-[10px] text-white/90">
              <span className="bg-black/80 px-2 py-0.5 rounded backdrop-blur">
                🔴 LIVE / STREAMING VIDEO
              </span>
              <span className="bg-red-600/90 text-white font-bold px-2 py-0.5 rounded text-[9px] flex items-center gap-1">
                <Volume2 className="w-3 h-3" />
                AUDIO DETECTED
              </span>
            </div>

            {/* Video Player Controls Bar */}
            <div className="relative z-10 bg-gradient-to-t from-black via-black/80 to-transparent p-2 rounded-lg space-y-1">
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-red-600 rounded-full w-2/3"></div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-300">
                <div className="flex items-center gap-2">
                  <Play className="w-3 h-3 fill-white" />
                  <span>14:22 / 48:10</span>
                </div>
                <span className="text-red-400 font-medium">1080p60 HD</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    switch (activeApp) {
      case 'Visual Studio Code':
        return (
          <div className="bg-[#121622] text-slate-200 font-mono text-xs h-full flex flex-col select-none">
            <div className="bg-[#0b0f19] text-slate-400 px-3 py-1 flex items-center justify-between text-[10px] border-b border-cyan-500/15">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-semibold">PY</span>
                <span className="text-slate-300 font-medium">agent_heartbeat.py</span>
                <span className="text-amber-400">● Modified</span>
              </div>
              <span className="text-slate-400">UTF-8 | LF | Python 3.12.0</span>
            </div>
            <div className="flex-1 p-3 overflow-hidden leading-relaxed space-y-1 bg-[#0d121f]">
              <div className="text-slate-400"># Windows Telemetry & Idle Detection Client</div>
              <div><span className="text-cyan-400">import</span> <span className="text-indigo-300">time, ctypes, requests</span></div>
              <div><span className="text-cyan-400">from</span> <span className="text-indigo-300">datetime</span> <span className="text-cyan-400">import</span> datetime</div>
              <div className="text-slate-600">-----------------------------------------</div>
              <div><span className="text-cyan-400">def</span> <span className="text-amber-300">get_last_input_time</span>():</div>
              <div className="pl-4 text-slate-300">struct = LASTINPUTINFO()</div>
              <div className="pl-4 text-slate-300">ctypes.windll.user32.GetLastInputInfo(ctypes.byref(struct))</div>
              <div className="pl-4"><span className="text-cyan-400">return</span> (ctypes.windll.kernel32.GetTickCount() - struct.dwTime) / <span className="text-emerald-300">1000.0</span></div>
              <div className="text-cyan-400 pt-1">def <span className="text-amber-300">push_heartbeat</span>(status=<span className="text-emerald-300">&quot;ACTIVE&quot;</span>):</div>
              <div className="pl-4 text-emerald-400">payload = &#123;&quot;emp_id&quot;: &quot;EMP-101&quot;, &quot;density&quot;: {activityDensityPercent}, &quot;status&quot;: status&#125;</div>
              <div className="pl-4 text-cyan-300">requests.post(&quot;https://api.apexwork.internal/v1/heartbeat&quot;, json=payload)</div>
            </div>
          </div>
        );

      case 'Figma':
        return (
          <div className="bg-[#181c28] text-slate-300 font-sans text-xs h-full flex flex-col select-none">
            <div className="bg-[#0d111d] px-3 py-1.5 flex items-center justify-between text-[11px] border-b border-white/10">
              <span className="font-medium text-slate-100">ApexWork - Executive Dashboard v2.4</span>
              <div className="flex gap-2">
                <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded text-[10px]">100% Zoom</span>
                <span className="bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded text-[10px]">Auto-Layout</span>
              </div>
            </div>
            <div className="flex-1 bg-[#0a0d16] p-4 flex items-center justify-center">
              <div className="w-5/6 h-4/5 bg-slate-900/90 rounded-lg border border-cyan-500/30 p-3 shadow-xl flex flex-col gap-2">
                <div className="h-4 bg-slate-800 rounded w-1/3"></div>
                <div className="grid grid-cols-3 gap-2 my-1">
                  <div className="h-10 bg-cyan-950/60 rounded border border-cyan-500/30 p-1.5 flex flex-col justify-between">
                    <div className="h-1.5 w-8 bg-cyan-400/60 rounded"></div>
                    <div className="h-3 w-12 bg-white/80 rounded"></div>
                  </div>
                  <div className="h-10 bg-emerald-950/60 rounded border border-emerald-500/30 p-1.5 flex flex-col justify-between">
                    <div className="h-1.5 w-8 bg-emerald-400/60 rounded"></div>
                    <div className="h-3 w-12 bg-white/80 rounded"></div>
                  </div>
                  <div className="h-10 bg-amber-950/60 rounded border border-amber-500/30 p-1.5 flex flex-col justify-between">
                    <div className="h-1.5 w-8 bg-amber-400/60 rounded"></div>
                    <div className="h-3 w-12 bg-white/80 rounded"></div>
                  </div>
                </div>
                <div className="flex-1 bg-slate-800/60 rounded border border-white/5 p-2 flex items-center justify-center">
                  <span className="text-[10px] text-cyan-300 font-mono">[Vector Artboard Canvas: Shift Timetable]</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Microsoft Excel':
        return (
          <div className="bg-[#0d4a27] text-white font-sans text-xs h-full flex flex-col select-none">
            <div className="bg-[#08351b] px-3 py-1 text-[11px] font-semibold flex justify-between items-center">
              <span className="truncate">Payroll_Reconciliation_Sept2026.xlsx [Confidential]</span>
              <div className="flex items-center gap-1.5">
                {activityDensityPercent < 30 && (
                  <span className="bg-rose-500/30 text-rose-200 border border-rose-400/40 px-1.5 py-0.2 rounded text-[9px] font-bold animate-pulse">
                    Ghost Inactivity ({activityDensityPercent}%)
                  </span>
                )}
                <span className="bg-amber-400/20 text-amber-200 px-1.5 rounded text-[10px]">Financial Privacy Blur</span>
              </div>
            </div>
            <div className="flex-1 bg-slate-900 text-slate-100 overflow-hidden text-[10px]">
              <div className="grid grid-cols-4 bg-slate-800/80 border-b border-slate-700 font-semibold p-1 text-slate-300">
                <div>ID</div>
                <div>Employee</div>
                <div>Hours (Sep)</div>
                <div>Status</div>
              </div>
              <div className="divide-y divide-slate-800 p-1 font-mono">
                <div className="grid grid-cols-4 py-1 text-slate-300">
                  <div>EMP-101</div>
                  <div>H. Borhan</div>
                  <div>168.5</div>
                  <span className="text-emerald-400 font-bold">Verified</span>
                </div>
                <div className="grid grid-cols-4 py-1 text-slate-300">
                  <div>EMP-102</div>
                  <div>T. Ahmed</div>
                  <div>162.0</div>
                  <span className="text-emerald-400 font-bold">Verified</span>
                </div>
                <div className="grid grid-cols-4 py-1 text-slate-300">
                  <div>EMP-103</div>
                  <div>N. Jahan</div>
                  <div>159.2</div>
                  <span className="text-emerald-400 font-bold">Verified</span>
                </div>
                <div className="grid grid-cols-4 py-1 text-slate-300">
                  <div>EMP-106</div>
                  <div>R. Islam</div>
                  <div>174.0</div>
                  <span className="text-emerald-400 font-bold">Verified</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Windows Terminal':
        return (
          <div className="bg-[#050811] text-emerald-400 font-mono text-xs h-full p-3 flex flex-col justify-between select-none">
            <div className="space-y-1 text-[10px]">
              <div className="text-slate-400">Microsoft Windows [Version 10.0.26100.3476]</div>
              <div className="text-slate-400">(c) Microsoft Corporation. All rights reserved.</div>
              <div className="pt-2 text-white">PS D:\apexwork-prod&gt; docker-compose ps</div>
              <div className="text-slate-300">NAME &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; IMAGE &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; COMMAND &nbsp; &nbsp; &nbsp; &nbsp; SERVICE &nbsp; &nbsp; &nbsp; &nbsp; STATUS</div>
              <div className="text-cyan-400">web-portal &nbsp; &nbsp; apex-web:v2 &nbsp; &nbsp; &quot;npm start&quot; &nbsp; &nbsp; &nbsp;web &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Up 4 hours</div>
              <div className="text-cyan-400">auth-broker &nbsp; &nbsp;apex-auth:v1 &nbsp; &nbsp;&quot;./broker&quot; &nbsp; &nbsp; &nbsp; auth &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Up 4 hours</div>
              <div className="text-cyan-400">vault-s3 &nbsp; &nbsp; &nbsp;minio/minio &nbsp; &nbsp; &quot;minio server&quot; &nbsp; storage &nbsp; &nbsp; &nbsp; &nbsp; Up 4 hours</div>
              <div className="pt-2 text-white">PS D:\apexwork-prod&gt; <span className="animate-pulse text-cyan-400">_</span></div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-[#0a0f1d] text-slate-100 font-sans text-xs h-full flex flex-col p-3 select-none">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
              <span className="font-semibold text-cyan-400">{activeApp}</span>
              <span className="text-[10px] text-slate-400">Desktop Work Session</span>
            </div>
            <div className="flex-1 bg-slate-900/60 rounded p-3 flex flex-col justify-center items-center text-center">
              <div className="text-slate-200 font-medium">{windowTitle}</div>
              <div className="text-[10px] text-slate-400 mt-2">Active Task Workspace: {screenshot.department}</div>
            </div>
          </div>
        );
    }
  };

  const isEvasion = isEvasionFlagged || hasMediaFlag || activityDensityPercent < 30;
  const isGhost = activityDensityPercent < 30;
  const displayEvasionReason = evasionReason || (hasMediaFlag
    ? t('antievation.flagged_media', '⚠️ Media / Non-Work Window Flagged')
    : isGhost
      ? 'Ghost Inactivity / Low Interaction (<30%) — Suspicious fake presence'
      : t('antievation.flagged_media', '⚠️ Media / Non-Work Window Flagged'));

  return (
    <div className={`relative rounded-xl overflow-hidden border ${isEvasion ? 'border-rose-500/40 shadow-rose-950/30' : 'border-cyan-500/20 shadow-cyan-950/20'} shadow-xl bg-[#070a12] flex flex-col ${className}`}>
      {/* Operating System Window Header */}
      <div className="bg-[#0a0f1d]/95 backdrop-blur px-3 py-1.5 flex items-center justify-between border-b border-slate-800/80 text-xs">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block flex-shrink-0"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block flex-shrink-0"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block flex-shrink-0"></span>
          <span className="ml-2 text-[11px] text-slate-300 font-medium truncate max-w-[180px] sm:max-w-xs">
            {windowTitle}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] flex-shrink-0">
          {/* Activity Density Meter Pill */}
          <span className={`px-2 py-0.5 rounded-full font-mono font-semibold border flex items-center gap-1 ${densityStatus.badgeClass}`}>
            <span className="text-[11px]">⚡</span>
            <span>{activityDensityPercent}%</span>
          </span>

          {/* Media Flag Warning Badge */}
          {hasMediaFlag && (
            <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 px-1.5 py-0.5 rounded font-semibold flex items-center gap-1">
              <AlertTriangle className="w-2.5 h-2.5 text-rose-400" />
              <span>Media</span>
            </span>
          )}

          {/* Ghost Inactivity Warning Badge */}
          {isGhost && (
            <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 px-1.5 py-0.5 rounded font-semibold flex items-center gap-1 animate-pulse">
              <AlertTriangle className="w-2.5 h-2.5 text-rose-400" />
              <span>Ghost</span>
            </span>
          )}

          {/* Privacy Blur Pill */}
          {isBlurred && (
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded font-medium">
              {t('mockup.privacy_masked', 'Privacy Masked')}
            </span>
          )}
        </div>
      </div>

      {/* Screen Content Container with Blur Filter if applicable */}
      <div className="relative flex-1 min-h-[160px] overflow-hidden">
        <div className={`w-full h-full ${isBlurred ? 'filter blur-md scale-[1.03] opacity-60' : ''}`}>
          {renderAppContent()}
        </div>

        {/* Evasion Alert Banner Overlay if flagged (visible regardless of blur, at z-20 on top) */}
        {isEvasion && (
          <div className="absolute top-2 left-2 right-2 z-20 bg-rose-950/90 backdrop-blur-md border border-rose-500/50 rounded-lg px-2.5 py-1.5 text-rose-200 flex items-center justify-between text-[10px] shadow-lg shadow-rose-950/40">
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
              <span className="font-semibold truncate max-w-[240px]">{displayEvasionReason}</span>
            </div>
            <span className="font-mono text-rose-300 font-bold ml-2 flex-shrink-0">DENSITY: {activityDensityPercent}%</span>
          </div>
        )}

        {/* Blur overlay badge if blurred */}
        {isBlurred && (
          <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/50 text-center p-3 ${isEvasion ? 'pt-8' : ''}`}>
            <span className="text-xl mb-1">🛡️</span>
            <span className="text-xs font-semibold text-amber-200">{t('mockup.financial_masked_title', 'Financial / Sensitive App Masked')}</span>
            <span className="text-[10px] text-slate-300 max-w-xs mt-0.5">
              {t('mockup.financial_masked_desc', 'Privacy Policy #3 enforced: Window containing sensitive data auto-blurred.')}
            </span>
          </div>
        )}

        {/* Security Watermark & Audit Stamp with Anti-Evasion Tag */}
        {showWatermark && (
          <div className="absolute bottom-2 right-2 z-20 bg-black/85 backdrop-blur-sm text-[9px] text-slate-300 px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-2 pointer-events-none shadow-md">
            <span className="text-cyan-400 font-mono font-bold">{t('mockup.audited_badge', 'AUDITED')}</span>
            <span>{employeeName}</span>
            <span className="text-slate-400 font-mono">{timestamp}</span>
            <span className="text-emerald-400 font-mono">⚡ {activityDensityPercent}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
