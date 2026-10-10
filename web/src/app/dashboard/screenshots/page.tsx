'use client';

import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  ShieldCheck, 
  Eye, 
  Lock, 
  Search, 
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  Calendar,
  RotateCcw,
  Sparkles,
  Archive,
  ArchiveRestore,
  Trash2,
  Zap,
  Dices,
  MousePointer,
  Keyboard,
  ShieldAlert
} from 'lucide-react';
import Modal from '@/components/dashboard/Modal';
import ScreenshotMockup from '@/components/dashboard/ScreenshotMockup';
import { useLanguage } from '@/context/LanguageContext';
import { 
  SCREENSHOTS, 
  DEPARTMENTS, 
  EMPLOYEES, 
  SHIFTS, 
  ScreenshotItem, 
  Employee,
  getActivityDensityStatus,
  getActivityDensityBarColor
} from '@/lib/demo-data';

export default function ScreenshotVaultPage() {
  const { t } = useLanguage();
  const [screenshots, setScreenshots] = useState<ScreenshotItem[]>(SCREENSHOTS);
  const [employeesList, setEmployeesList] = useState<Employee[]>(EMPLOYEES);
  const [viewMode, setViewMode] = useState<'active' | 'archived'>('active');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedTrigger, setSelectedTrigger] = useState('all');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('all');
  const [selectedShiftId, setSelectedShiftId] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [selectedAuthenticity, setSelectedAuthenticity] = useState<'all' | 'flagged' | 'high' | 'ghost'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewItem, setPreviewItem] = useState<ScreenshotItem | null>(null);
  const [isRefreshingLinks, setIsRefreshingLinks] = useState(false);
  const [refreshNotice, setRefreshNotice] = useState(false);
  const [actionToast, setActionToast] = useState<string | null>(null);

  // Deletion modal state
  const [screenshotToDelete, setScreenshotToDelete] = useState<ScreenshotItem | null>(null);

  // Simulation modal state for testing desktop capture
  const [isSimulateModalOpen, setIsSimulateModalOpen] = useState(false);
  const [simEmployeeId, setSimEmployeeId] = useState('emp-101');
  const [simApp, setSimApp] = useState('Visual Studio Code');
  const [simTrigger, setSimTrigger] = useState<ScreenshotItem['triggerReason']>('Routine Shift Interval');
  const [simBlur, setSimBlur] = useState(false);
  const [simWindowTitle, setSimWindowTitle] = useState('agent_daemon.py - ApexWork Client');
  const [simDensity, setSimDensity] = useState(88);
  const [simClicks, setSimClicks] = useState(48);
  const [simKeystrokes, setSimKeystrokes] = useState(156);
  const [simMediaFlag, setSimMediaFlag] = useState(false);
  const [simEvasionFlag, setSimEvasionFlag] = useState(false);
  const [simEvasionReason, setSimEvasionReason] = useState('');
  const [simulationSuccess, setSimulationSuccess] = useState(false);

  // Hydrate screenshots, dynamic employees & view mode from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('apexwork_audited_screenshots');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setTimeout(() => {
            setScreenshots(parsed);
          }, 0);
        }
      }
      const savedEmps = localStorage.getItem('apexwork_employees_directory');
      if (savedEmps) {
        const parsedEmps = JSON.parse(savedEmps);
        if (Array.isArray(parsedEmps)) {
          setTimeout(() => {
            setEmployeesList(parsedEmps);
          }, 0);
        }
      }
      const savedView = localStorage.getItem('apexwork_screenshot_view_mode');
      if (savedView === 'active' || savedView === 'archived') {
        setTimeout(() => {
          setViewMode(savedView);
        }, 0);
      }
    } catch {
      // Ignore
    }

    const handleStorageChange = (e: StorageEvent | Event) => {
      const storageEvent = e as StorageEvent;
      if (!storageEvent.key || storageEvent.key === 'apexwork_audited_screenshots') {
        try {
          const saved = storageEvent.newValue !== undefined && storageEvent.newValue !== null ? storageEvent.newValue : localStorage.getItem('apexwork_audited_screenshots');
          if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) setScreenshots(parsed);
          } else {
            setScreenshots(SCREENSHOTS);
          }
        } catch {
          // Ignore
        }
      }
      if (!storageEvent.key || storageEvent.key === 'apexwork_employees_directory') {
        try {
          const savedEmps = storageEvent.newValue !== undefined && storageEvent.newValue !== null ? storageEvent.newValue : localStorage.getItem('apexwork_employees_directory');
          if (savedEmps) {
            const parsedEmps = JSON.parse(savedEmps);
            if (Array.isArray(parsedEmps)) setEmployeesList(parsedEmps);
          } else {
            setEmployeesList(EMPLOYEES);
          }
        } catch {
          // Ignore
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleSetViewMode = (mode: 'active' | 'archived') => {
    setViewMode(mode);
    try {
      localStorage.setItem('apexwork_screenshot_view_mode', mode);
    } catch {
      // Ignore
    }
  };

  // Archive a capture (discretionary retention)
  const handleArchive = (id: string) => {
    const updated = screenshots.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isArchived: true,
          archivedAt: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    });
    setScreenshots(updated);
    try {
      localStorage.setItem('apexwork_audited_screenshots', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
      try {
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'apexwork_audited_screenshots',
          newValue: JSON.stringify(updated)
        }));
      } catch {}
    } catch {
      // Ignore
    }
    setActionToast('Capture moved to Archived Vault (discretionary retention).');
    setTimeout(() => setActionToast(null), 3000);
    if (previewItem?.id === id) {
      setPreviewItem(prev => prev ? { ...prev, isArchived: true } : null);
    }
  };

  // Restore an archived capture to active vault
  const handleRestore = (id: string) => {
    const updated = screenshots.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isArchived: false,
          archivedAt: undefined
        };
      }
      return item;
    });
    setScreenshots(updated);
    try {
      localStorage.setItem('apexwork_audited_screenshots', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
      try {
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'apexwork_audited_screenshots',
          newValue: JSON.stringify(updated)
        }));
      } catch {}
    } catch {
      // Ignore
    }
    setActionToast('Capture restored to Active Screenshots Vault.');
    setTimeout(() => setActionToast(null), 3000);
    if (previewItem?.id === id) {
      setPreviewItem(prev => prev ? { ...prev, isArchived: false } : null);
    }
  };

  // Permanently delete a capture (discretionary management)
  const handleConfirmDelete = () => {
    if (!screenshotToDelete) return;
    const updated = screenshots.filter(item => item.id !== screenshotToDelete.id);
    setScreenshots(updated);
    try {
      localStorage.setItem('apexwork_audited_screenshots', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
      try {
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'apexwork_audited_screenshots',
          newValue: JSON.stringify(updated)
        }));
      } catch {}
    } catch {
      // Ignore
    }
    setActionToast(`Capture ${screenshotToDelete.auditBadge} permanently removed from cloud vault.`);
    setTimeout(() => setActionToast(null), 3000);
    if (previewItem?.id === screenshotToDelete.id) {
      setPreviewItem(null);
    }
    setScreenshotToDelete(null);
  };

  const handleResetToDefaultScreenshots = () => {
    setScreenshots(SCREENSHOTS);
    try {
      localStorage.removeItem('apexwork_audited_screenshots');
      window.dispatchEvent(new Event('storage'));
      try {
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'apexwork_audited_screenshots',
          newValue: null
        }));
      } catch {}
    } catch {
      // Ignore
    }
    setActionToast('Reset vault captures to original demo records.');
    setTimeout(() => setActionToast(null), 3000);
  };

  // Presets for Scenario A, B, C testing
  const loadScenarioPreset = (scenario: 'A' | 'B' | 'C') => {
    if (scenario === 'A') {
      // Normal Active Work
      setSimApp('Visual Studio Code');
      setSimWindowTitle('agent_heartbeat.py - employee-productivity-system - VS Code');
      setSimDensity(88);
      setSimClicks(46);
      setSimKeystrokes(162);
      setSimBlur(false);
      setSimMediaFlag(false);
      setSimEvasionFlag(false);
      setSimEvasionReason('');
    } else if (scenario === 'B') {
      // Ghost Presence / Phone Scrolling (Excel open, virtually 0 clicks/typing)
      setSimApp('Microsoft Excel');
      setSimWindowTitle('Monthly_Payroll_Reconciliation_Sept2026.xlsx - Excel');
      setSimDensity(4);
      setSimClicks(2);
      setSimKeystrokes(0);
      setSimBlur(true);
      setSimMediaFlag(false);
      setSimEvasionFlag(true);
      setSimEvasionReason('Ghost Inactivity / Low Interaction (<30%) — Phone Scrolling / Fake Presence Detected');
    } else if (scenario === 'C') {
      // Background Video / Media Playing
      setSimApp('Google Chrome');
      setSimWindowTitle('Google Chrome - YouTube [Tech Podcast & Gaming Streams - Playing]');
      setSimDensity(12);
      setSimClicks(4);
      setSimKeystrokes(2);
      setSimBlur(false);
      setSimMediaFlag(true);
      setSimEvasionFlag(true);
      setSimEvasionReason('Media / Non-Work Window Flagged (Streaming Video in Foreground)');
    }
  };

  // Dynamic filter logic
  const filteredScreenshots = screenshots.filter((item) => {
    // 1. View Mode (Active vs Archived)
    const isArchived = Boolean(item.isArchived);
    if (viewMode === 'active' && isArchived) return false;
    if (viewMode === 'archived' && !isArchived) return false;

    // 2. Department filter
    if (selectedDept !== 'all') {
      const matchDept = item.departmentId ? item.departmentId === selectedDept : item.department.toLowerCase().includes(selectedDept);
      if (!matchDept) return false;
    }

    // 3. Shift filter
    if (selectedShiftId !== 'all') {
      const targetShift = SHIFTS.find(s => s.id === selectedShiftId);
      const shiftKeyword = targetShift ? targetShift.name.split(' ')[0].toLowerCase() : selectedShiftId;
      const itemShift = (item.shiftName || '').toLowerCase();
      if (!itemShift.includes(shiftKeyword)) return false;
    }

    // 4. Employee filter
    if (selectedEmployeeId !== 'all') {
      if (item.employeeId !== selectedEmployeeId) return false;
    }

    // 5. Trigger reason filter
    if (selectedTrigger !== 'all' && item.triggerReason !== selectedTrigger) {
      return false;
    }

    // 6. Date filter
    if (selectedDate !== 'all') {
      if (!item.timestamp.startsWith(selectedDate)) return false;
    }

    // 7. Authenticity / Anti-Evasion filter
    if (selectedAuthenticity === 'flagged') {
      if (!item.isEvasionFlagged && !item.hasMediaFlag && (item.activityDensityPercent ?? 100) >= 30) return false;
    } else if (selectedAuthenticity === 'high') {
      if ((item.activityDensityPercent ?? 0) < 70) return false;
    } else if (selectedAuthenticity === 'ghost') {
      if ((item.activityDensityPercent ?? 100) >= 30) return false;
    }

    // 8. Search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchTitle = item.windowTitle.toLowerCase().includes(query);
      const matchApp = item.activeApp.toLowerCase().includes(query);
      const matchEmp = item.employeeName.toLowerCase().includes(query);
      if (!matchTitle && !matchApp && !matchEmp) return false;
    }

    return true;
  });

  const activeCount = screenshots.filter(s => !s.isArchived).length;
  const archivedCount = screenshots.filter(s => s.isArchived).length;

  // Anti-evasion metrics
  const activeItems = screenshots.filter(s => !s.isArchived);
  const avgDensity = activeItems.length > 0 
    ? Math.round(activeItems.reduce((acc, curr) => acc + (curr.activityDensityPercent ?? 80), 0) / activeItems.length)
    : 85;
  const flaggedCount = activeItems.filter(s => s.isEvasionFlagged || s.hasMediaFlag || (s.activityDensityPercent ?? 100) < 30).length;

  const handleRefreshTokens = () => {
    setIsRefreshingLinks(true);
    setTimeout(() => {
      setIsRefreshingLinks(false);
      setRefreshNotice(true);
      setTimeout(() => setRefreshNotice(false), 3000);
    }, 600);
  };

  const handleResetFilters = () => {
    setSelectedDept('all');
    setSelectedTrigger('all');
    setSelectedEmployeeId('all');
    setSelectedShiftId('all');
    setSelectedDate('all');
    setSelectedAuthenticity('all');
    setSearchQuery('');
  };

  const handleRunSimulationCapture = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = employeesList.find(e => e.id === simEmployeeId) || employeesList[0] || EMPLOYEES[0];
    const now = new Date();
    const timeString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} BST`;
    
    const densityCat = simDensity >= 70 ? 'high' : simDensity >= 30 ? 'moderate' : 'suspicious';
    const isEvasion = simEvasionFlag || simDensity < 30 || simMediaFlag;
    const reason = simEvasionReason || (simMediaFlag 
      ? 'Media / Non-Work Window Flagged (Streaming Video in Foreground)' 
      : simDensity < 30 
        ? 'Ghost Inactivity / Low Interaction (<30%) — Suspicious fake presence' 
        : undefined);

    const newCapture: ScreenshotItem = {
      id: `sc-${Date.now()}`,
      employeeId: emp.id,
      employeeName: emp.name,
      employeeAvatar: emp.avatar,
      department: emp.department,
      departmentId: emp.departmentId,
      shiftId: emp.shiftId,
      shiftName: emp.shiftName.split(' ')[0],
      timestamp: timeString,
      timeAgo: 'Just now',
      triggerReason: simTrigger,
      windowTitle: simWindowTitle || `${simApp} - Active Work Session`,
      activeApp: simApp,
      resolution: '1920x1080',
      isBlurred: simBlur || simApp === 'Microsoft Excel',
      signedUrlExpiry: '15m 00s remaining',
      auditBadge: `AUDIT-LOG-${Math.floor(1000 + Math.random() * 9000)}X`,
      colorTheme: isEvasion ? 'rose' : 'cyan',
      isArchived: false,
      activityDensityPercent: simDensity,
      densityCategory: densityCat,
      hasMediaFlag: simMediaFlag,
      isEvasionFlagged: isEvasion,
      evasionReason: reason,
      interactionMetrics: {
        mouseClicks: simClicks,
        keyStrokes: simKeystrokes,
        scrollEvents: Math.round(simClicks * 0.6),
        intervalMinutes: Math.floor(8 + Math.random() * 10)
      },
      captureIntervalType: 'randomized',
      nextRandomEstimate: `${Math.floor(9 + Math.random() * 8)}m (Randomized Shutter)`
    };

    const updated = [newCapture, ...screenshots];
    setScreenshots(updated);
    try {
      localStorage.setItem('apexwork_audited_screenshots', JSON.stringify(updated));
    } catch {
      // Ignore
    }
    setSimulationSuccess(true);
    setTimeout(() => {
      setSimulationSuccess(false);
      setIsSimulateModalOpen(false);
      setPreviewItem(newCapture);
    }, 800);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner with Anti-Evasion Policy Badges */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0a0f1d]/85 backdrop-blur-xl p-6 rounded-3xl border border-cyan-500/20 shadow-2xl shadow-cyan-950/20">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 shadow-sm">
              <Lock className="w-3 h-3 text-cyan-400" />
              {t('screenshots.signed_vault_badge', 'Ephemerally Signed Storage Vault')}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm">
              {t('screenshots.discretionary_badge', 'Manual Discretionary Governance')}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
              <Dices className="w-3 h-3 text-emerald-400" />
              {t('antievation.randomized_interval_badge', 'Randomized Unpredictable Interval (Anti-Evasion Enabled)')}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>{t('screenshots.title', 'Audited Shift Screenshot Vault')}</span>
            <span className="text-xs px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-mono">
              v2.8 LUXE
            </span>
          </h1>

          <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            {t('screenshots.subtitle', 'Controlled, tamper-evident visual verification. Pre-signed URLs expire after 15 minutes. Data is NOT automatically destroyed; administrators and managers retain discretionary control to manually Archive or Permanently Delete records according to company review.')}
          </p>
        </div>

        {/* Action Buttons: Simulate Agent Capture & Refresh */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsSimulateModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-lg shadow-cyan-600/30 cursor-pointer border border-cyan-400/30"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('screenshots.simulate_capture', 'Simulate Desktop Capture')}</span>
          </button>
          <button
            onClick={handleRefreshTokens}
            className="flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingLinks ? 'animate-spin text-cyan-400' : ''}`} />
            <span>{t('screenshots.refresh_urls', 'Refresh URLs')}</span>
          </button>
        </div>
      </div>

      {/* Anti-Evasion Telemetry KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Average Activity Density */}
        <div className="bg-[#0a0f1d]/80 backdrop-blur-xl p-4 rounded-2xl border border-cyan-500/20 shadow-lg flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
              {t('antievation.avg_density', 'Average Team Activity Density')}
            </span>
            <div className="text-2xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400" />
              <span>{avgDensity}%</span>
            </div>
            <p className="text-[10px] text-cyan-300">
              {avgDensity >= 70 ? t('High Engagement', 'High Engagement') : t('Moderate Engagement', 'Moderate Engagement')} (Keystroke & Mouse Frequency)
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-mono font-bold text-sm">
            ⚡ {avgDensity}%
          </div>
        </div>

        {/* Flagged Evasion / Ghost Presence */}
        <div className="bg-[#0a0f1d]/80 backdrop-blur-xl p-4 rounded-2xl border border-rose-500/20 shadow-lg flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
              {t('antievation.filter_flagged', 'Flagged Evasion Only')}
            </span>
            <div className="text-2xl font-bold text-rose-400 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" />
              <span>{flaggedCount} {t('common.tasks', 'Captures')}</span>
            </div>
            <p className="text-[10px] text-rose-300">
              {t('antievation.phone_scrolling_alert', 'Window open but virtually zero interaction (phone scrolling / fake presence)')}
            </p>
          </div>
          <div className={`w-14 h-14 rounded-2xl ${flaggedCount > 0 ? 'bg-rose-950/60 border-rose-500/40 text-rose-400 animate-pulse' : 'bg-slate-900 border-slate-800 text-slate-500'} border flex items-center justify-center font-mono font-bold text-sm`}>
            ⚠️ {flaggedCount}
          </div>
        </div>

        {/* Randomized Shutter Engine */}
        <div className="bg-[#0a0f1d]/80 backdrop-blur-xl p-4 rounded-2xl border border-amber-500/20 shadow-lg flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
              {t('antievation.randomized_shutter', 'Randomized Shutter')}
            </span>
            <div className="text-2xl font-bold text-amber-400 flex items-center gap-2">
              <Dices className="w-5 h-5" />
              <span>Active</span>
            </div>
            <p className="text-[10px] text-amber-300">
              Unpredictable 8-18 min interval prevents timing evasion
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold text-sm">
            🎲 100%
          </div>
        </div>
      </div>

      {/* Discretionary Policy Notice Banner (Quote 4) */}
      <div className="p-4 bg-gradient-to-r from-[#0a0f1d] via-cyan-950/30 to-[#0a0f1d] rounded-2xl border border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-white block">{t('screenshots.policy_enforced', 'Manual Discretionary Retention Policy Enforced')}</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {t('screenshots.policy_desc', 'Data is NOT automatically destroyed; administrators and managers retain discretionary control to manually Archive or Permanently Delete records according to company review.')}
            </p>
          </div>
        </div>
        {screenshots.length !== SCREENSHOTS.length && (
          <button
            onClick={handleResetToDefaultScreenshots}
            className="flex items-center gap-1.5 text-[11px] text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t('screenshots.restore_default_captures', 'Restore Default Captures')}</span>
          </button>
        )}
      </div>

      {actionToast && (
        <div className="p-3 bg-cyan-950/80 border border-cyan-500/40 rounded-xl text-cyan-200 text-xs flex items-center gap-2 animate-in fade-in shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{actionToast}</span>
        </div>
      )}

      {refreshNotice && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{t('screenshots.refresh_notice', 'All 15-minute S3 pre-signed cryptographic tokens have been securely re-authorized.')}</span>
        </div>
      )}

      {/* View Mode Selector: Active Screenshots vs Archived Vault (Quote 4) */}
      <div className="flex items-center gap-3 border-b border-slate-800/80 pb-3">
        <button
          onClick={() => handleSetViewMode('active')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            viewMode === 'active'
              ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-lg shadow-cyan-600/30 border border-cyan-400/30'
              : 'bg-[#0a0f1d] text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>{t('screenshots.active_screenshots', 'Active Screenshots')} ({activeCount})</span>
        </button>

        <button
          onClick={() => handleSetViewMode('archived')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            viewMode === 'archived'
              ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-lg shadow-amber-600/30 border border-amber-400/30'
              : 'bg-[#0a0f1d] text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Archive className="w-4 h-4" />
          <span>{t('Archived Vault', 'Archived Vault')} ({archivedCount})</span>
        </button>
      </div>

      {/* Comprehensive Filter Toolbar */}
      <div className="bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/15 rounded-2xl p-4 shadow-xl flex flex-wrap items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[180px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('screenshots.search_placeholder', 'Search window title, app, or employee...')}
            className="w-full bg-[#070a12] border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Authenticity / Anti-Evasion Filter */}
        <select
          value={selectedAuthenticity}
          onChange={(e) => setSelectedAuthenticity(e.target.value as 'all' | 'flagged' | 'high' | 'ghost')}
          className="bg-[#070a12] border border-cyan-500/30 text-cyan-300 font-semibold text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-400 cursor-pointer"
        >
          <option value="all">{t('antievation.filter_all', 'All Authenticity Levels')}</option>
          <option value="flagged">{t('antievation.filter_flagged', 'Flagged Evasion Only')}</option>
          <option value="high">{t('antievation.filter_high', 'High Engagement Only (>=70%)')}</option>
          <option value="ghost">{t('antievation.filter_ghost', 'Ghost Inactivity Only (<30%)')}</option>
        </select>

        {/* Date Filter */}
        <div className="flex items-center gap-1 bg-[#070a12] border border-slate-800 rounded-xl px-2.5 py-1 text-xs">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-transparent text-slate-300 text-xs focus:outline-none cursor-pointer"
          >
            <option value="all">{t('screenshots.all_dates', 'All Dates')}</option>
            <option value="2026-09-19">{t('screenshots.today_date', 'Today (Sep 19, 2026)')}</option>
            <option value="2026-09-18">{t('screenshots.yesterday_date', 'Yesterday (Sep 18, 2026)')}</option>
          </select>
        </div>

        {/* Department Filter */}
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="bg-[#070a12] border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-500 cursor-pointer"
        >
          <option value="all">{t('common.all_departments', 'All Departments')}</option>
          {DEPARTMENTS.map(d => (
            <option key={d.id} value={d.id}>{t(d.name, d.name)}</option>
          ))}
        </select>

        {/* Shift Filter */}
        <select
          value={selectedShiftId}
          onChange={(e) => setSelectedShiftId(e.target.value)}
          className="bg-[#070a12] border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-500 cursor-pointer"
        >
          <option value="all">{t('screenshots.all_shifts', 'All Shift Profiles')}</option>
          {SHIFTS.map(s => (
            <option key={s.id} value={s.id}>{t(s.name, s.name)}</option>
          ))}
        </select>

        {/* Employee Filter */}
        <select
          value={selectedEmployeeId}
          onChange={(e) => setSelectedEmployeeId(e.target.value)}
          className="bg-[#070a12] border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-500 cursor-pointer"
        >
          <option value="all">{t('screenshots.all_employees', 'All Employees')}</option>
          {employeesList.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.name} ({emp.code})</option>
          ))}
        </select>

        {/* Trigger Filter */}
        <select
          value={selectedTrigger}
          onChange={(e) => setSelectedTrigger(e.target.value)}
          className="bg-[#070a12] border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-500 cursor-pointer"
        >
          <option value="all">{t('screenshots.all_triggers', 'All Trigger Types')}</option>
          <option value="Routine Shift Interval">{t('screenshots.trigger_routine', 'Routine Shift Interval')}</option>
          <option value="Prolonged Inactivity Check">{t('screenshots.trigger_inactivity', 'Prolonged Inactivity Check')}</option>
          <option value="Shift Check-in">{t('screenshots.trigger_checkin', 'Shift Check-in')}</option>
          <option value="Task Milestone Submission">{t('screenshots.trigger_milestone', 'Task Milestone Submission')}</option>
        </select>

        {/* Reset Filter Pill */}
        {(selectedDept !== 'all' || selectedTrigger !== 'all' || selectedEmployeeId !== 'all' || selectedShiftId !== 'all' || selectedDate !== 'all' || selectedAuthenticity !== 'all' || searchQuery) && (
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 px-2.5 py-1.5 rounded-xl border border-cyan-500/30 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t('screenshots.reset_filter', 'Reset')}</span>
          </button>
        )}
      </div>

      {/* Screenshot Cards Grid or Empty State */}
      {filteredScreenshots.length === 0 ? (
        <div className="p-12 text-center bg-[#0a0f1d]/70 backdrop-blur border border-slate-800 rounded-3xl space-y-3">
          {viewMode === 'archived' ? (
            <Archive className="w-10 h-10 text-slate-500 mx-auto" />
          ) : (
            <Camera className="w-10 h-10 text-slate-500 mx-auto" />
          )}
          <h3 className="text-base font-bold text-white">
            {viewMode === 'archived' ? t('screenshots.no_archived', 'No Archived Records Found') : t('screenshots.no_captures', 'No Audited Captures Found')}
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {viewMode === 'archived'
              ? t('screenshots.no_archived_desc', 'No captures have been archived to the vault yet. You can manually archive any active screenshot anytime.')
              : t('screenshots.no_captures_desc', 'No screenshot files in the cloud vault match your current filter combination.')}
          </p>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-xl mt-2 cursor-pointer shadow-lg shadow-cyan-600/30"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('screenshots.clear_filters', 'Clear Filter Criteria')}</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScreenshots.map((item) => {
            const density = item.activityDensityPercent ?? 85;
            const densityStatus = getActivityDensityStatus(density);
            const isFlagged = item.isEvasionFlagged || item.hasMediaFlag || density < 30;

            return (
              <div
                key={item.id}
                className={`bg-[#0a0f1d]/85 backdrop-blur-xl border ${
                  isFlagged ? 'border-rose-500/35 shadow-[0_0_20px_rgba(244,63,94,0.12)]' : 'border-cyan-500/20 hover:border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.08)]'
                } rounded-2xl p-4 flex flex-col justify-between transition-all group hover:-translate-y-0.5`}
              >
                <div className="space-y-3">
                  {/* Card Header: Employee info & Shutter tag */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600/30 to-indigo-600/30 border border-cyan-500/30 text-cyan-300 font-bold text-xs flex items-center justify-center">
                        {item.employeeAvatar}
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {item.employeeName}
                        </h3>
                        <p className="text-[10px] text-slate-400">{t(item.department, item.department)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {item.isArchived && (
                        <span className="text-[10px] font-semibold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                          {t('Archive', 'Archived')}
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-cyan-400/80 bg-[#070a12] px-2 py-0.5 rounded border border-cyan-500/20 flex items-center gap-1">
                        <Dices className="w-2.5 h-2.5 text-cyan-400" />
                        <span>{item.timeAgo}</span>
                      </span>
                    </div>
                  </div>

                  {/* Realistic Desktop Mockup Preview */}
                  <div
                    onClick={() => setPreviewItem(item)}
                    className="relative h-44 rounded-xl overflow-hidden cursor-pointer border border-slate-800 hover:border-cyan-500/50 transition-all shadow-inner"
                  >
                    <ScreenshotMockup screenshot={item} className="h-full w-full" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <span className="bg-cyan-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 border border-cyan-400/30">
                        <Eye className="w-3.5 h-3.5" />
                        {t('screenshots.inspect_capture', 'Inspect Audited Capture')}
                      </span>
                    </div>
                  </div>

                  {/* ⚡ Activity Density Meter & Evasion Flag Bar */}
                  <div className="space-y-1.5 bg-[#070a12] p-2.5 rounded-xl border border-slate-800/80">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Zap className="w-3 h-3 text-cyan-400" />
                        <span>{t('antievation.density_meter', '⚡ Activity Density %')}:</span>
                      </span>
                      <span className={`font-mono font-bold ${densityStatus.textColor}`}>
                        {density}% ({t(densityStatus.label, densityStatus.label)})
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-white/5">
                      <div 
                        className={`h-full bg-gradient-to-r ${getActivityDensityBarColor(density)} transition-all duration-500`}
                        style={{ width: `${Math.min(100, Math.max(5, density))}%` }}
                      ></div>
                    </div>

                    {/* Interaction breakdown preview */}
                    {item.interactionMetrics && (
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-0.5">
                        <span className="flex items-center gap-1">
                          <Keyboard className="w-3 h-3 text-slate-400" />
                          <span>{item.interactionMetrics.keyStrokes} keys</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <MousePointer className="w-3 h-3 text-slate-400" />
                          <span>{item.interactionMetrics.mouseClicks} clicks</span>
                        </span>
                        <span>{item.interactionMetrics.intervalMinutes}m interval</span>
                      </div>
                    )}

                    {/* Prominent Crimson Flag if suspicious */}
                    {isFlagged && (
                      <div className="mt-1 bg-rose-500/15 border border-rose-500/30 rounded-lg px-2 py-1 text-rose-300 text-[10px] font-semibold flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                        <span className="truncate">{item.evasionReason || t('antievation.flagged_media', '⚠️ Media / Non-Work Window Flagged')}</span>
                      </div>
                    )}
                  </div>

                  {/* Window & App Meta */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200 truncate">{item.activeApp}</span>
                      <span className="text-[10px] font-mono text-emerald-400">{item.signedUrlExpiry}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">
                      {t('screenshots.window_label', 'Window:')} {item.windowTitle}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Archive / Restore & Delete Actions (Quote 4) */}
                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1">
                    {item.isArchived ? (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRestore(item.id); }}
                        className="inline-flex items-center gap-1 text-slate-300 hover:text-emerald-300 bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                        title={t('screenshots.restore_title', 'Restore Capture to Active Vault')}
                      >
                        <ArchiveRestore className="w-3 h-3 text-emerald-400" />
                        <span>{t('common.restore', 'Restore')}</span>
                      </button>
                    ) : (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleArchive(item.id); }}
                        className="inline-flex items-center gap-1 text-slate-300 hover:text-amber-300 bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                        title={t('screenshots.archive_title', 'Archive Capture to Discretionary Vault')}
                      >
                        <Archive className="w-3 h-3 text-amber-400" />
                        <span>{t('Archive', 'Archive')}</span>
                      </button>
                    )}

                    <button
                      onClick={(e) => { e.stopPropagation(); setScreenshotToDelete(item); }}
                      className="inline-flex items-center gap-1 text-slate-400 hover:text-rose-400 bg-slate-800/60 hover:bg-rose-500/10 px-2 py-1 rounded-lg border border-slate-800 hover:border-rose-500/20 transition-colors cursor-pointer"
                      title={t('screenshots.delete_title', 'Permanently Delete Capture')}
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>{t('Delete', 'Delete')}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setPreviewItem(item)}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer flex items-center gap-1"
                  >
                    <span>{t('screenshots.view_full', 'View Full')}</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Why Fixed Screenshots Fail & How Anti-Evasion Works Info Box */}
      <div className="p-5 bg-[#0a0f1d]/90 rounded-2xl border border-cyan-500/20 space-y-2 text-xs">
        <div className="flex items-center gap-2 font-bold text-white text-sm">
          <ShieldAlert className="w-4 h-4 text-cyan-400" />
          <span>{t('antievation.why_title', 'Why Traditional Fixed Screenshots Fail')}</span>
        </div>
        <p className="text-slate-300 text-xs leading-relaxed">
          {t('antievation.why_desc', 'When workers know a screenshot takes place every 15 minutes, they can easily switch to a work document or pretend to work right at that minute, then return to phone scrolling or video watching. Our 4-pillar system combines randomized unpredictable shutter timing, keystroke/mouse activity density metering, foreground process title inspection, and media interception to guarantee genuine workplace productivity.')}
        </p>
      </div>

      {/* Modal: Fullscreen Audited Preview with Interaction Telemetry */}
      <Modal
        isOpen={!!previewItem}
        onClose={() => setPreviewItem(null)}
        title={previewItem ? `${t('screenshots.audited_capture', 'Audited Capture')} — ${previewItem.employeeName}` : ''}
        subtitle={previewItem ? `${previewItem.timestamp} • ${previewItem.activeApp} • ${t('screenshots.resolution', 'Resolution')}: ${previewItem.resolution}` : ''}
        maxWidth="5xl"
      >
        {previewItem && (
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#070a12]">
              <ScreenshotMockup screenshot={previewItem} className="w-full h-96 sm:h-[450px]" />
            </div>

            {/* Anti-Evasion Telemetry Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 bg-[#070a12] rounded-xl border border-cyan-500/20 text-xs">
              {/* Activity Density */}
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-semibold block">{t('antievation.density_meter', '⚡ Activity Density %')}</span>
                <div className="font-mono text-cyan-400 font-bold text-base mt-0.5">
                  {previewItem.activityDensityPercent ?? 85}%
                </div>
                <div className="text-[10px] text-slate-400">
                  {t(getActivityDensityStatus(previewItem.activityDensityPercent ?? 85).label, getActivityDensityStatus(previewItem.activityDensityPercent ?? 85).label)}
                </div>
              </div>

              {/* Interaction Metrics */}
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-semibold block">Interaction Telemetry</span>
                <div className="font-mono text-white font-semibold mt-0.5">
                  {previewItem.interactionMetrics?.keyStrokes ?? 140} keys • {previewItem.interactionMetrics?.mouseClicks ?? 35} clicks
                </div>
                <div className="text-[10px] text-slate-400">
                  Across {previewItem.interactionMetrics?.intervalMinutes ?? 12} min window
                </div>
              </div>

              {/* Shutter Timing */}
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-semibold block">Shutter Timing</span>
                <div className="text-emerald-400 font-mono font-semibold mt-0.5 flex items-center gap-1">
                  <Dices className="w-3 h-3" />
                  <span>Randomized Shutter</span>
                </div>
                <div className="text-[10px] text-slate-400">{previewItem.nextRandomEstimate || 'Unpredictable interval'}</div>
              </div>

              {/* Vault Retention */}
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-semibold block">{t('screenshots.vault_status', 'Vault Status')}</span>
                <div className="text-amber-400 font-mono font-semibold mt-0.5">
                  {previewItem.isArchived ? `${t('Archive', 'Archived')} (${previewItem.archivedAt || 'Manual'})` : t('screenshots.active_vault', 'Active Vault')}
                </div>
                <div className="text-[10px] text-slate-400">{t('screenshots.discretionary_retention', 'Discretionary Retention')}</div>
              </div>
            </div>

            {/* Evasion Warning if applicable */}
            {(previewItem.isEvasionFlagged || previewItem.hasMediaFlag || (previewItem.activityDensityPercent ?? 100) < 30) && (
              <div className="p-3 bg-rose-950/40 border border-rose-500/40 rounded-xl text-rose-200 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>
                  <strong>Evasion Flagged:</strong> {previewItem.evasionReason || 'Suspicious ghost activity detected: work window active with virtually zero keyboard/mouse interaction.'}
                </span>
              </div>
            )}

            {previewItem.isBlurred && (
              <div className="p-3 bg-amber-950/30 border border-amber-500/20 rounded-xl text-amber-200 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>
                  {t('screenshots.privacy_filter_active', 'Privacy Filter Active: This capture detected financial data or password forms and was automatically blurred prior to cloud ingestion.')}
                </span>
              </div>
            )}

            {/* Interactive Actions inside Fullscreen Modal (Quote 4) */}
            <div className="flex items-center justify-between p-3 bg-[#070a12] rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400">
                {t('screenshots.admin_controls', 'Administrative Discretionary Controls:')}
              </div>
              <div className="flex items-center gap-2">
                {previewItem.isArchived ? (
                  <button
                    onClick={() => handleRestore(previewItem.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <ArchiveRestore className="w-3.5 h-3.5" />
                    <span>{t('screenshots.restore_to_active', 'Restore to Active Vault')}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleArchive(previewItem.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Archive className="w-3.5 h-3.5" />
                    <span>{t('screenshots.archive_to_vault', 'Archive to Vault')}</span>
                  </button>
                )}

                <button
                  onClick={() => setScreenshotToDelete(previewItem)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t('screenshots.permanently_delete', 'Permanently Delete')}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal: Confirm Deletion of Screenshot (Quote 4) */}
      <Modal
        isOpen={!!screenshotToDelete}
        onClose={() => setScreenshotToDelete(null)}
        title={t('screenshots.confirm_deletion_title', 'Confirm Deletion of Audited Capture')}
        subtitle={t('screenshots.confirm_deletion_subtitle', 'Permanent discretionary removal from cloud storage vault')}
        maxWidth="md"
      >
        {screenshotToDelete && (
          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-4 bg-rose-950/30 border border-rose-500/30 rounded-xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-semibold text-white">{t('screenshots.manual_deletion_heading', 'Manual Discretionary Deletion')}</span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {t('screenshots.confirm_delete_p1', 'Are you sure you want to permanently delete capture record')} <strong className="text-white font-mono">{screenshotToDelete.auditBadge}</strong> {t('screenshots.confirm_delete_p2', 'for employee')} <strong className="text-white">{screenshotToDelete.employeeName}</strong>?
                </p>
                <p className="text-[11px] text-slate-400">
                  {t('screenshots.confirm_delete_p3', 'This action is permanent and will remove the image file and associated telemetry audit record from storage.')}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setScreenshotToDelete(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium cursor-pointer"
              >
                {t('common.cancel', 'Cancel')}
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold shadow-lg shadow-rose-600/30 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t('screenshots.confirm_permanent_delete', 'Confirm Permanent Deletion')}</span>
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal: Interactive Simulator with Scenario A, B, C Anti-Evasion Presets */}
      <Modal
        isOpen={isSimulateModalOpen}
        onClose={() => setIsSimulateModalOpen(false)}
        title={t('screenshots.simulate_title', 'Simulate Desktop Client Screen Capture')}
        subtitle={t('screenshots.simulate_subtitle', 'Test the client capture engine, automated watermarking, and privacy blur filters')}
        maxWidth="lg"
      >
        <form onSubmit={handleRunSimulationCapture} className="space-y-4 text-xs">
          {simulationSuccess ? (
            <div className="p-6 text-center space-y-2 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
              <div className="text-sm font-bold text-emerald-300">{t('screenshots.capture_ingested', 'Workstation Capture Ingested!')}</div>
              <p className="text-xs text-slate-400">
                {t('screenshots.capture_ingested_desc', 'Encrypted capture securely added to S3 vault with 15-minute expiring link.')}
              </p>
            </div>
          ) : (
            <>
              {/* Scenario Preset Buttons (for the Boss to test live!) */}
              <div className="p-3 bg-[#070a12] border border-cyan-500/30 rounded-xl space-y-2">
                <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider block">
                  🎯 Quick Scenario Presets (Click to Test Workplace Evasion)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => loadScenarioPreset('A')}
                    className="p-2.5 rounded-lg bg-slate-900 hover:bg-cyan-950/60 border border-cyan-500/30 text-left transition-all cursor-pointer group"
                  >
                    <div className="font-semibold text-cyan-300 text-[11px] flex items-center gap-1">
                      <span>🟢 {t('antievation.scenario_a', 'Scenario A: Normal Active Work')}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{t('antievation.scenario_a_desc', 'High engagement (88%), genuine typing & clicks')}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => loadScenarioPreset('B')}
                    className="p-2.5 rounded-lg bg-slate-900 hover:bg-rose-950/60 border border-rose-500/30 text-left transition-all cursor-pointer group"
                  >
                    <div className="font-semibold text-rose-300 text-[11px] flex items-center gap-1">
                      <span>🔴 {t('antievation.scenario_b', 'Scenario B: Ghost Presence / Phone Scrolling')}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{t('antievation.scenario_b_desc', 'Excel open, 4% density, 0 keystrokes (phone scrolling)')}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => loadScenarioPreset('C')}
                    className="p-2.5 rounded-lg bg-slate-900 hover:bg-amber-950/60 border border-amber-500/30 text-left transition-all cursor-pointer group"
                  >
                    <div className="font-semibold text-amber-300 text-[11px] flex items-center gap-1">
                      <span>⚠️ {t('antievation.scenario_c', 'Scenario C: Background Video / Media Playing')}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{t('antievation.scenario_c_desc', 'YouTube stream playing in foreground during shift')}</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">{t('screenshots.target_workstation', 'Target Employee Workstation')}</label>
                <select
                  value={simEmployeeId}
                  onChange={(e) => setSimEmployeeId(e.target.value)}
                  className="w-full bg-[#070a12] border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  {employeesList.map(e => (
                    <option key={e.id} value={e.id}>{e.name} — {e.role} ({t(e.department, e.department)})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">{t('screenshots.foreground_app', 'Active Foreground App')}</label>
                  <select
                    value={simApp}
                    onChange={(e) => {
                      setSimApp(e.target.value);
                      if (e.target.value === 'Microsoft Excel') {
                        setSimBlur(true);
                      }
                    }}
                    className="w-full bg-[#070a12] border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="Visual Studio Code">Visual Studio Code (IDE)</option>
                    <option value="Figma">Figma (UI Design)</option>
                    <option value="Microsoft Excel">Microsoft Excel (Payroll / Financial)</option>
                    <option value="Windows Terminal">Windows Terminal (DevOps)</option>
                    <option value="Google Chrome">Google Chrome (Web / Video)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">{t('screenshots.trigger_event', 'Trigger Event')}</label>
                  <select
                    value={simTrigger}
                    onChange={(e) => setSimTrigger(e.target.value as ScreenshotItem['triggerReason'])}
                    className="w-full bg-[#070a12] border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="Routine Shift Interval">{t('screenshots.trigger_routine', 'Routine Shift Interval')}</option>
                    <option value="Prolonged Inactivity Check">{t('screenshots.trigger_inactivity', 'Prolonged Inactivity Check')}</option>
                    <option value="Shift Check-in">{t('screenshots.trigger_checkin', 'Shift Check-in')}</option>
                    <option value="Task Milestone Submission">{t('screenshots.trigger_milestone', 'Task Milestone Submission')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">{t('screenshots.sim_window_title', 'Simulated Window Title')}</label>
                <input
                  type="text"
                  value={simWindowTitle}
                  onChange={(e) => setSimWindowTitle(e.target.value)}
                  className="w-full bg-[#070a12] border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono text-[11px]"
                />
              </div>

              {/* Activity Density Slider & Telemetry Controls */}
              <div className="p-3 bg-[#070a12] border border-slate-800 rounded-xl space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-slate-300 font-semibold flex items-center gap-1">
                      <Zap className="w-3 h-3 text-cyan-400" />
                      <span>{t('antievation.density_meter', '⚡ Activity Density %')}</span>
                    </label>
                    <span className="font-mono font-bold text-cyan-400">{simDensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={simDensity}
                    onChange={(e) => setSimDensity(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>0% (Ghost Inactivity)</span>
                    <span>50% (Moderate)</span>
                    <span>100% (High Engagement)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-semibold mb-1">Keystrokes</label>
                    <input
                      type="number"
                      value={simKeystrokes}
                      onChange={(e) => setSimKeystrokes(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-slate-200 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] uppercase font-semibold mb-1">Mouse Clicks</label>
                    <input
                      type="number"
                      value={simClicks}
                      onChange={(e) => setSimClicks(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-slate-200 text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Media Playback Flag Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="font-semibold text-white block">Media Playback Detected</span>
                    <span className="text-[10px] text-slate-400">Flag as background YouTube / video stream</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={simMediaFlag}
                    onChange={(e) => setSimMediaFlag(e.target.checked)}
                    className="w-4 h-4 accent-rose-600 rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Sensitive Masking Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#070a12] border border-slate-800">
                <div>
                  <div className="font-semibold text-white">{t('screenshots.apply_autoblur', 'Apply Sensitive Data Auto-Blur Filter')}</div>
                  <div className="text-[11px] text-slate-400">{t('screenshots.apply_autoblur_desc', 'Blurs content before transmission to protect privacy')}</div>
                </div>
                <input
                  type="checkbox"
                  checked={simBlur}
                  onChange={(e) => setSimBlur(e.target.checked)}
                  className="w-4 h-4 accent-cyan-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsSimulateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium cursor-pointer"
                >
                  {t('common.cancel', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-cyan-600/30 cursor-pointer border border-cyan-400/30"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{t('screenshots.execute_capture', 'Execute Test Capture')}</span>
                </button>
              </div>
            </>
          )}
        </form>
      </Modal>
    </div>
  );
}
