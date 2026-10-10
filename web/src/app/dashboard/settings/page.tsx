'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Clock, 
  Trash2, 
  Save, 
  Bell, 
  CheckCircle2, 
  EyeOff,
  AlertTriangle,
  RotateCcw,
  Check,
  Archive,
  FolderArchive,
  Zap,
  Radio,
  Sliders
} from 'lucide-react';
import Modal from '@/components/dashboard/Modal';
import { useLanguage } from '@/context/LanguageContext';
import { SYSTEM_SETTINGS, SCREENSHOTS, ScreenshotItem } from '@/lib/demo-data';

export default function PolicySettingsPage() {
  const { t } = useLanguage();
  const [idleTimeout, setIdleTimeout] = useState<number>(SYSTEM_SETTINGS.idleTimeoutMinutes);
  const [screenshotInterval, setScreenshotInterval] = useState<number>(SYSTEM_SETTINGS.screenshotIntervalMinutes);
  const [retentionDays, setRetentionDays] = useState<number>(SYSTEM_SETTINGS.retentionDays);
  const [signedUrlExpiry, setSignedUrlExpiry] = useState<number>(SYSTEM_SETTINGS.signedUrlExpiryMinutes);
  const [gracePeriod, setGracePeriod] = useState<number>(SYSTEM_SETTINGS.autoLaunchGracePeriodMinutes);
  const [blurFinancial, setBlurFinancial] = useState<boolean>(SYSTEM_SETTINGS.blurFinancialApps);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(SYSTEM_SETTINGS.desktopNotificationsEnabled);
  
  // Anti-Evasion & Fake Work Protection System Settings
  const [randomIntervalMin, setRandomIntervalMin] = useState<number>(SYSTEM_SETTINGS.randomizedMinMinutes ?? 8);
  const [randomIntervalMax, setRandomIntervalMax] = useState<number>(SYSTEM_SETTINGS.randomizedMaxMinutes ?? 18);
  const [densityThreshold, setDensityThreshold] = useState<number>(SYSTEM_SETTINGS.activityDensityThresholdPercent ?? 30);
  const [mediaDetectionEnabled, setMediaDetectionEnabled] = useState<boolean>(SYSTEM_SETTINGS.mediaWindowInterception ?? true);

  // Discretionary Retention Policy State (Quote 4)
  const [retentionMode, setRetentionMode] = useState<'manual_discretionary' | 'auto_purge'>('manual_discretionary');
  const [manualArchiveEnabled, setManualArchiveEnabled] = useState<boolean>(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Modals for discretionary actions
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [isPurgeModalOpen, setIsPurgeModalOpen] = useState(false);

  // Hydrate settings from localStorage on client load
  useEffect(() => {
    try {
      const saved = localStorage.getItem('apexwork_system_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        setTimeout(() => {
          if (parsed.idleTimeout) setIdleTimeout(parsed.idleTimeout);
          if (parsed.screenshotInterval) setScreenshotInterval(parsed.screenshotInterval);
          if (parsed.retentionDays) setRetentionDays(parsed.retentionDays);
          if (parsed.signedUrlExpiry) setSignedUrlExpiry(parsed.signedUrlExpiry);
          if (parsed.gracePeriod) setGracePeriod(parsed.gracePeriod);
          if (parsed.blurFinancial !== undefined) setBlurFinancial(parsed.blurFinancial);
          if (parsed.notificationsEnabled !== undefined) setNotificationsEnabled(parsed.notificationsEnabled);
          if (parsed.retentionMode) setRetentionMode(parsed.retentionMode);
          if (parsed.manualArchiveEnabled !== undefined) setManualArchiveEnabled(parsed.manualArchiveEnabled);
          if (parsed.randomIntervalMin) setRandomIntervalMin(parsed.randomIntervalMin);
          if (parsed.randomIntervalMax) setRandomIntervalMax(parsed.randomIntervalMax);
          if (parsed.densityThreshold) setDensityThreshold(parsed.densityThreshold);
          if (parsed.mediaDetectionEnabled !== undefined) setMediaDetectionEnabled(parsed.mediaDetectionEnabled);
        }, 0);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const config = {
      idleTimeout,
      screenshotInterval,
      retentionDays,
      signedUrlExpiry,
      gracePeriod,
      blurFinancial,
      notificationsEnabled,
      retentionMode,
      manualArchiveEnabled,
      randomIntervalMin,
      randomIntervalMax,
      densityThreshold,
      mediaDetectionEnabled
    };
    try {
      localStorage.setItem('apexwork_system_settings', JSON.stringify(config));
    } catch {
      // Ignore
    }
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3500);
  };

  const handleReset = () => {
    setIdleTimeout(SYSTEM_SETTINGS.idleTimeoutMinutes);
    setScreenshotInterval(SYSTEM_SETTINGS.screenshotIntervalMinutes);
    setRetentionDays(SYSTEM_SETTINGS.retentionDays);
    setSignedUrlExpiry(SYSTEM_SETTINGS.signedUrlExpiryMinutes);
    setGracePeriod(SYSTEM_SETTINGS.autoLaunchGracePeriodMinutes);
    setBlurFinancial(SYSTEM_SETTINGS.blurFinancialApps);
    setNotificationsEnabled(SYSTEM_SETTINGS.desktopNotificationsEnabled);
    setRandomIntervalMin(SYSTEM_SETTINGS.randomizedMinMinutes ?? 8);
    setRandomIntervalMax(SYSTEM_SETTINGS.randomizedMaxMinutes ?? 18);
    setDensityThreshold(SYSTEM_SETTINGS.activityDensityThresholdPercent ?? 30);
    setMediaDetectionEnabled(SYSTEM_SETTINGS.mediaWindowInterception ?? true);
    setRetentionMode('manual_discretionary');
    setManualArchiveEnabled(true);
    try {
      localStorage.removeItem('apexwork_system_settings');
    } catch {
      // Ignore
    }
    setActionNotice('Reset all policies to factory benchmark settings.');
    setTimeout(() => setActionNotice(null), 3500);
  };

  // Discretionary manual action: Move older captures into archive
  const handleExecuteArchiveSelected = () => {
    try {
      const raw = localStorage.getItem('apexwork_audited_screenshots');
      const list: ScreenshotItem[] = raw ? JSON.parse(raw) : SCREENSHOTS;
      // Mark first half of active items as archived
      let count = 0;
      const updated = list.map(item => {
        if (!item.isArchived && count < 2) {
          count++;
          return { ...item, isArchived: true, archivedAt: new Date().toISOString().split('T')[0] };
        }
        return item;
      });
      localStorage.setItem('apexwork_audited_screenshots', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
      try {
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'apexwork_audited_screenshots',
          newValue: JSON.stringify(updated)
        }));
      } catch {}
      setIsArchiveModalOpen(false);
      setActionNotice(`Archived ${count} record(s) to Discretionary Vault.`);
      setTimeout(() => setActionNotice(null), 3500);
    } catch {
      // Ignore
    }
  };

  // Discretionary manual action: Permanently delete all archived items
  const handleExecutePermanentDelete = () => {
    try {
      const raw = localStorage.getItem('apexwork_audited_screenshots');
      const list: ScreenshotItem[] = raw ? JSON.parse(raw) : SCREENSHOTS;
      const archivedCount = list.filter(item => item.isArchived).length;
      // Delete archived items only, preserving active
      const updated = list.filter(item => !item.isArchived);
      localStorage.setItem('apexwork_audited_screenshots', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
      try {
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'apexwork_audited_screenshots',
          newValue: JSON.stringify(updated)
        }));
      } catch {}
      setIsPurgeModalOpen(false);
      setActionNotice(`Permanently deleted ${archivedCount} archived record(s) per manual administrative discretion.`);
      setTimeout(() => setActionNotice(null), 3500);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header - Obsidian Midnight Luxe */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/20 p-6 sm:p-8 shadow-2xl shadow-cyan-950/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 shadow-sm shadow-cyan-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                {t('settings.governance_badge', 'Governance & Compliance Guardrails')}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/25">
                {t('settings.discretionary_mode_badge', 'Manual Discretionary Mode')}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                {t('antievation.title', 'Anti-Evasion Enabled')}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {t('settings.title', 'Policy Configuration & Discretionary Data Governance')}
            </h1>
            <p className="text-sm text-slate-300/80 mt-1 max-w-2xl leading-relaxed">
              {t('settings.subtitle', 'Fine-tune idle detection thresholds, screenshot intervals, auto-launch grace periods, and discretionary manual archiving policies.')}
            </p>
          </div>

          {saveSuccess && (
            <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 shadow-lg animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="font-semibold">{t('settings.saved_toast', 'Policy parameters deployed & persisted in browser storage!')}</span>
            </div>
          )}
        </div>
      </div>

      {actionNotice && (
        <div className="p-4 bg-cyan-950/60 border border-cyan-500/40 rounded-2xl text-cyan-200 text-xs flex items-center gap-2 shadow-lg animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span className="font-semibold">{actionNotice}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Anti-Evasion & Fake Work Protection System Configuration */}
        <div className="bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
          <div className="border-b border-cyan-500/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Zap className="w-4 h-4" />
                </span>
                <span>{t('antievation.title', 'Multi-Layer Anti-Evasion & Fake Work Protection Engine')}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {t('antievation.subtitle', 'Prevents phone-scrolling evasion, YouTube video backgrounding, and predictable interval timing abuse.')}
              </p>
            </div>
            <span className="text-[11px] font-mono px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-xl border border-cyan-500/25">
              4-PILLAR ARCHITECTURE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Randomized Unpredictable Interval Range */}
            <div className="space-y-3 bg-[#070a12]/90 p-5 rounded-2xl border border-cyan-500/15">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{t('Randomized Interval', 'Randomized Shutter Timing Window')}</span>
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Min & Max bounds for unpredictable capture intervals
                  </p>
                </div>
                <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/30">
                  {randomIntervalMin}m — {randomIntervalMax}m
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-[10px] text-slate-400 font-mono">Min Bound ({randomIntervalMin}m)</label>
                  <input
                    type="range"
                    min="5"
                    max="12"
                    step="1"
                    value={randomIntervalMin}
                    onChange={(e) => setRandomIntervalMin(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-mono">Max Bound ({randomIntervalMax}m)</label>
                  <input
                    type="range"
                    min="14"
                    max="25"
                    step="1"
                    value={randomIntervalMax}
                    onChange={(e) => setRandomIntervalMax(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>
              </div>
              <p className="text-[10px] text-slate-500 italic">
                Employees cannot predict the shutter time (e.g. 10:04, 10:19, 10:27 AM), stopping deceptive switching behavior.
              </p>
            </div>

            {/* Activity Density Threshold Slider */}
            <div className="space-y-3 bg-[#070a12]/90 p-5 rounded-2xl border border-cyan-500/15">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t('antievation.density_threshold', 'Ghost Activity Density Cutoff')}</span>
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Captures below this keystroke/mouse density are flagged as Ghost
                  </p>
                </div>
                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
                  &lt;{densityThreshold}%
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="45"
                step="5"
                value={densityThreshold}
                onChange={(e) => setDensityThreshold(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>15% (Relaxed)</span>
                <span>30% (Standard Benchmark)</span>
                <span>45% (Strict)</span>
              </div>
            </div>
          </div>

          {/* Media Window Interception Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#070a12]/90 border border-cyan-500/15">
            <div className="space-y-0.5 max-w-xl">
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Foreground Media & Video Streaming Window Detection</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Detects if YouTube, Netflix, or media streams are playing in foreground while work windows are minimized. Flags captures with crimson warning tags.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={mediaDetectionEnabled}
                onChange={(e) => setMediaDetectionEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>
        </div>

        {/* Discretionary / Manual Archive & Delete Policy (Quote 4) */}
        <div className="bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
          <div className="border-b border-cyan-500/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <FolderArchive className="w-4 h-4" />
                </span>
                <span>{t('Discretionary / Manual Archive & Delete Policy', 'Discretionary / Manual Archive & Delete Policy')}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {t('settings.preservation_desc', 'Data preservation is managed under strict administrative discretion rather than blind automated destruction.')}
              </p>
            </div>
            <span className="text-[11px] font-mono px-3 py-1 bg-amber-500/10 text-amber-300 rounded-xl border border-amber-500/25">
              {t('settings.badge_discretionary_gov', 'DISCRETIONARY GOVERNANCE')}
            </span>
          </div>

          {/* Mandatory Discretionary Explanation Banner (Quote 4) */}
          <div className="p-4 bg-gradient-to-r from-amber-950/30 via-[#070a12] to-cyan-950/30 rounded-2xl border border-amber-500/30 text-xs flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-amber-200 text-xs uppercase tracking-wider">
                {t('settings.retention_notice_heading', 'Permanent Retention Notice')}
              </span>
              <p className="text-slate-200 text-xs leading-relaxed font-semibold">
                {t('Data is NOT automatically destroyed', 'Data is NOT automatically destroyed; administrators and managers retain discretionary control to manually Archive or Permanently Delete records according to company review.')}
              </p>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                {t('settings.preservation_vault_desc', 'Workstation screenshots, activity telemetry, and shift milestone records are safely preserved in the compliance vault. Deletion or archival only occurs when explicitly initiated by an authorized administrator.')}
              </p>
            </div>
          </div>

          {/* Mode Toggles & Discretionary Action Triggers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mode Option 1: Manual Archive Mode (Discretionary) */}
            <div 
              onClick={() => { setRetentionMode('manual_discretionary'); setManualArchiveEnabled(true); }}
              className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                retentionMode === 'manual_discretionary'
                  ? 'bg-[#070a12] border-amber-500/50 shadow-md shadow-amber-500/10 ring-1 ring-amber-500/30'
                  : 'bg-[#070a12]/60 border-cyan-500/15 hover:border-cyan-500/35'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Archive className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-white text-xs">{t('settings.manual_archive_mode', 'Manual Archive Mode (Discretionary)')}</span>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  retentionMode === 'manual_discretionary' ? 'border-amber-400 bg-amber-400' : 'border-slate-600'
                }`}>
                  {retentionMode === 'manual_discretionary' && <Check className="w-3 h-3 text-slate-950 font-bold" />}
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {t('settings.manual_archive_desc', 'Recommended standard: Automated destruction disabled. Audited files remain in active storage until team managers explicitly trigger archive or deletion.')}
              </p>
              <div className="flex items-center gap-2 pt-1 text-[10px] text-emerald-400 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t('settings.zero_risk_loss', 'Zero Risk of Unintended Data Loss')}</span>
              </div>
            </div>

            {/* Mode Option 2: Automated Purge Policy (Alternative) */}
            <div 
              onClick={() => setRetentionMode('auto_purge')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                retentionMode === 'auto_purge'
                  ? 'bg-[#070a12] border-cyan-500/50 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                  : 'bg-[#070a12]/60 border-cyan-500/15 hover:border-cyan-500/35'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold text-white text-xs">{t('settings.scheduled_purge_mode', 'Scheduled Cloud Purge Window')}</span>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  retentionMode === 'auto_purge' ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'
                }`}>
                  {retentionMode === 'auto_purge' && <Check className="w-3 h-3 text-slate-950 font-bold" />}
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {t('settings.scheduled_purge_desc', 'Applies automated object expiration only after a designated time interval (e.g. 30–90 days) for organizations with statutory data purging mandates.')}
              </p>
              <div className="flex items-center gap-2 pt-1 text-[10px] text-slate-400 font-mono">
                <span>{t('settings.window_label', 'Window:')} {retentionDays} {t('settings.days', 'Days')}</span>
              </div>
            </div>
          </div>

          {/* Interactive Manual Action Buttons (Quote 4) */}
          <div className="p-4 bg-[#070a12] rounded-2xl border border-cyan-500/15 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-white text-xs">{t('settings.discretionary_operations', 'Discretionary Record Operations')}</span>
                <p className="text-[11px] text-slate-400">{t('settings.discretionary_operations_desc', 'Perform immediate manual vault actions on existing shift records')}</p>
              </div>
              <span className="text-[10px] text-cyan-300 font-mono bg-cyan-500/10 px-2.5 py-0.5 rounded-lg border border-cyan-500/20">
                {t('settings.badge_admin_access', 'ADMIN ACCESS ONLY')}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setIsArchiveModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm"
              >
                <Archive className="w-3.5 h-3.5" />
                <span>{t('settings.archive_selected', 'Archive Selected Records')}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsPurgeModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t('settings.permanent_delete', 'Permanent Manual Deletion')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Core Detection & Timing Parameters */}
        <div className="bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
          <div className="border-b border-cyan-500/10 pb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Clock className="w-4 h-4" />
              </span>
              <span>{t('settings.telemetry_thresholds_title', 'Shift Telemetry & Interval Thresholds')}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {t('settings.telemetry_thresholds_desc', 'These settings control when the Windows background agent pauses active time, schedules audited captures, and applies grace windows.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Idle Timeout Slider */}
            <div className="space-y-3 bg-[#070a12]/90 p-5 rounded-2xl border border-cyan-500/15">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white">{t('settings.idle_threshold_label', 'Inactivity / Idle Threshold')}</span>
                  <p className="text-[11px] text-slate-400">{t('settings.idle_threshold_desc', "Duration without keyboard/mouse input before state switches to 'Idle'")}</p>
                </div>
                <span className="font-mono text-sm font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/30">
                  {idleTimeout} {t('settings.minutes', 'Minutes')}
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="20"
                step="5"
                value={idleTimeout}
                onChange={(e) => setIdleTimeout(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>5m ({t('settings.strict', 'Strict')})</span>
                <span>10m ({t('settings.standard_rec', 'Standard Recommended')})</span>
                <span>15m</span>
                <span>20m ({t('settings.relaxed', 'Relaxed')})</span>
              </div>
            </div>

            {/* Screenshot Interval Slider */}
            <div className="space-y-3 bg-[#070a12]/90 p-5 rounded-2xl border border-cyan-500/15">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white">{t('settings.screenshot_freq_label', 'Audited Screenshot Frequency')}</span>
                  <p className="text-[11px] text-slate-400">{t('settings.screenshot_freq_desc', 'Randomized interval inside scheduled shift window')}</p>
                </div>
                <span className="font-mono text-sm font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                  {screenshotInterval} {t('settings.minutes', 'Minutes')}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="15"
                value={screenshotInterval}
                onChange={(e) => setScreenshotInterval(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>10m ({t('settings.frequent', 'Frequent')})</span>
                <span>15m ({t('settings.balanced', 'Balanced')})</span>
                <span>30m</span>
                <span>60m ({t('settings.minimal', 'Minimal')})</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Pre-Signed URL Lifespan */}
            <div className="space-y-3 bg-[#070a12]/90 p-5 rounded-2xl border border-cyan-500/15">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white">{t('settings.url_lifespan_label', 'Pre-Signed URL Lifespan')}</span>
                  <p className="text-[11px] text-slate-400">{t('settings.url_lifespan_desc', 'Temporary S3 access token')}</p>
                </div>
                <span className="font-mono text-sm font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-lg border border-cyan-500/30">
                  {signedUrlExpiry}m
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="5"
                value={signedUrlExpiry}
                onChange={(e) => setSignedUrlExpiry(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>5m</span>
                <span>15m (Rec)</span>
                <span>30m</span>
              </div>
            </div>

            {/* Auto-Launch Grace Period */}
            <div className="space-y-3 bg-[#070a12]/90 p-5 rounded-2xl border border-cyan-500/15">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white">{t('settings.grace_window_label', 'Auto-Start Grace Window')}</span>
                  <p className="text-[11px] text-slate-400">{t('settings.grace_window_desc', 'Shift start check-in tolerance')}</p>
                </div>
                <span className="font-mono text-sm font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-lg border border-emerald-500/30">
                  {gracePeriod}m
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                step="5"
                value={gracePeriod}
                onChange={(e) => setGracePeriod(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>5m</span>
                <span>10m (Std)</span>
                <span>20m</span>
              </div>
            </div>

            {/* Configured Window Retention Slider */}
            <div className="space-y-3 bg-[#070a12]/90 p-5 rounded-2xl border border-cyan-500/15">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white">{t('settings.review_window_label', 'Discretionary Review Window')}</span>
                  <p className="text-[11px] text-slate-400">{t('settings.review_window_desc', 'Audit timeline review cycle')}</p>
                </div>
                <span className="font-mono text-sm font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/30">
                  {retentionDays}d
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="90"
                step="30"
                value={retentionDays}
                onChange={(e) => setRetentionDays(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>30 {t('settings.days', 'Days')} (Cycle)</span>
                <span>60d</span>
                <span>90d</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ethical Privacy Controls & Non-Negotiable Toggles */}
        <div className="bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
          <div className="border-b border-cyan-500/10 pb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <span>{t('settings.privacy_safeguards_title', 'Ethical Privacy Safeguards & Compliance Rules')}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {t('settings.privacy_safeguards_desc', 'Transparent guardrails ensuring dignity, legal compliance, and employee trust.')}
            </p>
          </div>

          <div className="space-y-4">
            {/* Sensitive App Auto-Blur */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#070a12]/90 border border-cyan-500/15">
              <div className="space-y-0.5 max-w-xl">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <EyeOff className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t('settings.auto_mask_apps', 'Auto-Mask Sensitive & Financial Applications')}</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {t('settings.auto_mask_desc', "Automatically blurs Excel files with 'Payroll', banking portals, password managers, and personal browser tabs before transmission.")}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={blurFinancial}
                  onChange={(e) => setBlurFinancial(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>

            {/* Desktop Notification On Capture */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#070a12]/90 border border-cyan-500/15">
              <div className="space-y-0.5 max-w-xl">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <Bell className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t('settings.tray_notification', 'Desktop Tray Notification On Capture')}</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {t('settings.tray_notification_desc', "Displays an unobtrusive notification on employee's screen whenever a routine screenshot is captured, ensuring zero covert surprise.")}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>

            {/* Permanent Locked Security Enforcements */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#070a12]/60 border border-cyan-500/10 opacity-90">
              <div className="space-y-0.5 max-w-xl">
                <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('settings.keylogger_disabled', 'Keystroke Logging (Hard-Coded Disabled)')}</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">
                    {t('settings.badge_non_negotiable', 'NON-NEGOTIABLE')}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {t('settings.keylogger_desc', 'ApexWork architecture physically omits keylogging drivers. Passwords and messages are never intercepted.')}
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-xl">
                {t('settings.badge_permanently_blocked', 'PERMANENTLY BLOCKED')}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#070a12]/60 border border-cyan-500/10 opacity-90">
              <div className="space-y-0.5 max-w-xl">
                <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('settings.webcam_disabled', 'Audio & Webcam Surveillance (Hard-Coded Disabled)')}</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">
                    {t('settings.badge_non_negotiable', 'NON-NEGOTIABLE')}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {t('settings.webcam_desc', 'Hardware webcam and microphone access is prohibited by software sandbox policy.')}
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-xl">
                {t('settings.badge_permanently_blocked', 'PERMANENTLY BLOCKED')}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-cyan-500/10">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#070a12] text-slate-300 hover:bg-[#0f172a] text-xs font-semibold transition-colors cursor-pointer border border-cyan-500/15 shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('settings.reset_defaults', 'Reset to Recommended Defaults')}</span>
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{t('settings.deploy_policy', 'Deploy & Enforce Policy')}</span>
          </button>
        </div>
      </form>

      {/* Modal: Archive Selected Records Confirmation (Quote 4) */}
      <Modal
        isOpen={isArchiveModalOpen}
        onClose={() => setIsArchiveModalOpen(false)}
        title={t('settings.modal_archive_title', 'Archive Selected Records to Vault')}
        subtitle={t('settings.modal_archive_subtitle', 'Discretionary storage operation — moves captures into long-term protected vault')}
        maxWidth="md"
      >
        <div className="space-y-4 text-xs text-slate-300">
          <div className="p-4 bg-amber-950/30 border border-amber-500/30 rounded-2xl flex items-start gap-3">
            <Archive className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-white">{t('settings.archive_confirm_heading', 'Manual Archiving Confirmation')}</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {t('settings.archive_confirm_p1', 'You are initiating a manual discretionary archive operation on existing telemetry captures. Archived records are securely segregated into the Archived Vault and will remain available for future compliance audits.')}
              </p>
              <p className="text-[11px] text-amber-300/80">
                {t('Data is NOT automatically destroyed', 'Data is NOT automatically destroyed; administrators retain the right to restore or inspect these items at any time.')}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-cyan-500/10">
            <button
              type="button"
              onClick={() => setIsArchiveModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-[#070a12] text-slate-300 hover:bg-[#0f172a] font-medium border border-cyan-500/15 cursor-pointer"
            >
              {t('common.cancel', 'Cancel')}
            </button>
            <button
              type="button"
              onClick={handleExecuteArchiveSelected}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <Archive className="w-3.5 h-3.5" />
              <span>{t('settings.confirm_archive', 'Confirm & Archive Records')}</span>
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal: Permanent Manual Deletion Confirmation (Quote 4) */}
      <Modal
        isOpen={isPurgeModalOpen}
        onClose={() => setIsPurgeModalOpen(false)}
        title={t('settings.permanent_delete', 'Permanent Manual Deletion')}
        subtitle={t('settings.purge_modal_subtitle', 'Authoritative permanent purge of archived records from compliance vault')}
        maxWidth="md"
      >
        <div className="space-y-4 text-xs text-slate-300">
          <div className="p-4 bg-rose-950/30 border border-rose-500/30 rounded-2xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-white">{t('settings.delete_warning_heading', 'Permanent Deletion Warning')}</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {t('settings.delete_warning_p1', 'This action will permanently delete all archived vault items from cloud storage and local persistent storage. Active screenshots will remain untouched.')}
              </p>
              <p className="text-[11px] text-rose-400 font-semibold">
                {t('settings.delete_warning_p2', 'Once permanently deleted by administrator discretion, this telemetry cannot be recovered.')}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-cyan-500/10">
            <button
              type="button"
              onClick={() => setIsPurgeModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-[#070a12] text-slate-300 hover:bg-[#0f172a] font-medium border border-cyan-500/15 cursor-pointer"
            >
              {t('common.cancel', 'Cancel')}
            </button>
            <button
              type="button"
              onClick={handleExecutePermanentDelete}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold shadow-lg shadow-rose-600/30 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t('screenshots.confirm_permanent_delete', 'Confirm Permanent Deletion')}</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
