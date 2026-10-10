'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Activity, 
  Clock, 
  Coffee, 
  PowerOff, 
  ShieldCheck, 
  Filter, 
  Download, 
  Megaphone, 
  Eye, 
  CheckCircle2, 
  Target, 
  Search, 
  ListChecks, 
  AlertCircle,
  Camera
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import Modal from '@/components/dashboard/Modal';
import ScreenshotMockup from '@/components/dashboard/ScreenshotMockup';
import IndividualWorkLedgerModal from '@/components/dashboard/IndividualWorkLedgerModal';
import { 
  EMPLOYEES, 
  DEPARTMENTS, 
  SCREENSHOTS, 
  Employee, 
  ScreenshotItem,
  calculateQuotaPercent,
  getQuotaProgressBarColor,
  getQuotaStatus
} from '@/lib/demo-data';
import { useLanguage } from '@/context/LanguageContext';

export default function OverviewDashboardPage() {
  const { t, language } = useLanguage();
  const [employees, setEmployees] = useState<Employee[]>(EMPLOYEES);
  const [screenshots, setScreenshots] = useState<ScreenshotItem[]>(SCREENSHOTS);
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedScreenshot, setSelectedScreenshot] = useState<ScreenshotItem | null>(null);
  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
  const [announcementText, setAnnouncementText] = useState('');
  const [announcementSent, setAnnouncementSent] = useState(false);

  // Individual Work & Quota Ledger state
  const [ledgerEmployee, setLedgerEmployee] = useState<Employee | null>(null);
  const [ledgerSearch, setLedgerSearch] = useState('');
  const [ledgerDept, setLedgerDept] = useState('all');
  const [ledgerFilterStatus, setLedgerFilterStatus] = useState<'all' | 'met' | 'ontrack' | 'behind'>('all');

  // Sync employees and screenshots from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('apexwork_employees_directory');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setTimeout(() => {
            setEmployees(parsed);
          }, 0);
        }
      }
      const savedSc = localStorage.getItem('apexwork_audited_screenshots');
      if (savedSc) {
        const parsedSc = JSON.parse(savedSc);
        if (Array.isArray(parsedSc)) {
          setTimeout(() => {
            setScreenshots(parsedSc);
          }, 0);
        }
      }
    } catch {
      // Ignore
    }

    const handleStorageChange = (e: StorageEvent | Event) => {
      const storageEvent = e as StorageEvent;
      if (!storageEvent.key || storageEvent.key === 'apexwork_employees_directory') {
        try {
          const saved = storageEvent.newValue !== undefined && storageEvent.newValue !== null ? storageEvent.newValue : localStorage.getItem('apexwork_employees_directory');
          if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
              setEmployees(parsed);
            }
          } else {
            setEmployees(EMPLOYEES);
          }
        } catch {
          // Ignore
        }
      }
      if (!storageEvent.key || storageEvent.key === 'apexwork_audited_screenshots') {
        try {
          const savedSc = storageEvent.newValue !== undefined && storageEvent.newValue !== null ? storageEvent.newValue : localStorage.getItem('apexwork_audited_screenshots');
          if (savedSc) {
            const parsedSc = JSON.parse(savedSc);
            if (Array.isArray(parsedSc)) {
              setScreenshots(parsedSc);
            }
          } else {
            setScreenshots(SCREENSHOTS);
          }
        } catch {
          // Ignore
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Filter employees
  const filteredEmployees = employees.filter(emp => {
    const matchesDept = selectedDept === 'all' || emp.departmentId === selectedDept;
    const matchesStatus = statusFilter === 'all' || emp.status === statusFilter;
    return matchesDept && matchesStatus;
  });

  const activeCount = employees.filter(e => e.status === 'active').length;
  const idleCount = employees.filter(e => e.status === 'idle').length;
  const breakCount = employees.filter(e => e.status === 'break').length;
  const offlineCount = employees.filter(e => e.status === 'offline').length;
  const totalTodayHours = employees.reduce((acc, curr) => acc + (curr.todayHours || 0), 0).toFixed(1);

  // Dynamic daily project & task completion aggregation across all employees
  const totalTasks = employees.reduce((acc, curr) => acc + (curr.dailyTasksTotal ?? 0), 0);
  const totalCompletedTasks = employees.reduce((acc, curr) => acc + (curr.dailyTasksCompleted ?? 0), 0);
  const overallCompletionPercent = totalTasks > 0 ? Math.round((totalCompletedTasks / totalTasks) * 100) : 0;

  // Handle updates from IndividualWorkLedgerModal
  const handleUpdateEmployee = (updatedEmp: Employee) => {
    setEmployees(prev => {
      const next = prev.map(e => e.id === updatedEmp.id ? updatedEmp : e);
      try {
        localStorage.setItem('apexwork_employees_directory', JSON.stringify(next));
        window.dispatchEvent(new Event('storage'));
        try {
          window.dispatchEvent(new StorageEvent('storage', {
            key: 'apexwork_employees_directory',
            newValue: JSON.stringify(next)
          }));
        } catch {}
      } catch {
        // Ignore
      }
      return next;
    });
    if (selectedEmployee?.id === updatedEmp.id) {
      setSelectedEmployee(updatedEmp);
    }
    if (ledgerEmployee?.id === updatedEmp.id) {
      setLedgerEmployee(updatedEmp);
    }
  };

  // 1-Click quick quota adjustment directly from ledger table row
  const handleQuickAdjustQuota = (empId: string, delta: number) => {
    setEmployees(prev => {
      let updatedEmp: Employee | null = null;
      const next = prev.map(e => {
        if (e.id !== empId) return e;
        const currentQuota = Math.max(0, e.dailyTasksTotal ?? 4);
        const nextQuota = Math.max(0, currentQuota + delta);
        const completed = Math.max(0, e.dailyTasksCompleted ?? 0);
        const newPercent = calculateQuotaPercent(completed, nextQuota);
        const nextEmp = {
          ...e,
          dailyTasksTotal: nextQuota,
          dailyWorkCompletionPercent: newPercent
        };
        updatedEmp = nextEmp;
        return nextEmp;
      });
      try {
        localStorage.setItem('apexwork_employees_directory', JSON.stringify(next));
        window.dispatchEvent(new Event('storage'));
        try {
          window.dispatchEvent(new StorageEvent('storage', {
            key: 'apexwork_employees_directory',
            newValue: JSON.stringify(next)
          }));
        } catch {}
      } catch {
        // Ignore
      }
      if (updatedEmp) {
        if (selectedEmployee?.id === empId) setSelectedEmployee(updatedEmp);
        if (ledgerEmployee?.id === empId) setLedgerEmployee(updatedEmp);
      }
      return next;
    });
  };

  // Quota ledger filtering & metrics
  const ledgerEmployees = employees.filter(emp => {
    const matchesDept = ledgerDept === 'all' || emp.departmentId === ledgerDept;
    const matchesSearch = emp.name.toLowerCase().includes(ledgerSearch.toLowerCase()) ||
                          emp.role.toLowerCase().includes(ledgerSearch.toLowerCase()) ||
                          emp.code.toLowerCase().includes(ledgerSearch.toLowerCase()) ||
                          emp.department.toLowerCase().includes(ledgerSearch.toLowerCase());
    const quota = Math.max(0, emp.dailyTasksTotal ?? 4);
    const completed = Math.max(0, emp.dailyTasksCompleted ?? 0);
    const percent = calculateQuotaPercent(completed, quota);
    let matchesStatus = true;
    if (ledgerFilterStatus === 'met') {
      matchesStatus = quota > 0 && percent >= 100;
    } else if (ledgerFilterStatus === 'ontrack') {
      matchesStatus = quota > 0 && percent >= 70 && percent < 100;
    } else if (ledgerFilterStatus === 'behind') {
      matchesStatus = quota > 0 && percent < 70;
    }
    return matchesDept && matchesSearch && matchesStatus;
  });

  const totalLedgerQuotas = employees.reduce((acc, curr) => acc + (curr.dailyTasksTotal ?? 0), 0);
  const totalLedgerCompleted = employees.reduce((acc, curr) => acc + (curr.dailyTasksCompleted ?? 0), 0);
  const targetsMetCount = employees.filter(e => {
    const q = e.dailyTasksTotal ?? 0;
    const c = e.dailyTasksCompleted ?? 0;
    return q > 0 && c >= q;
  }).length;
  const onTrackCount = employees.filter(e => {
    const q = e.dailyTasksTotal ?? 0;
    const c = e.dailyTasksCompleted ?? 0;
    const p = calculateQuotaPercent(c, q);
    return q > 0 && p >= 70 && p < 100;
  }).length;
  const behindScheduleCount = employees.filter(e => {
    const q = e.dailyTasksTotal ?? 0;
    const c = e.dailyTasksCompleted ?? 0;
    const p = calculateQuotaPercent(c, q);
    return q > 0 && p < 70;
  }).length;

  const getStatusBadge = (status: Employee['status'], idleMinutes: number) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            {t('dashboard.kpi_active', 'Active Now')}
          </span>
        );
      case 'idle':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            {t('common.idle', 'Idle')} ({idleMinutes}m)
          </span>
        );
      case 'break':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Coffee className="w-3 h-3 text-blue-400" />
            {language === 'bn' ? 'বিরতিতে' : 'On Break'}
          </span>
        );
      case 'offline':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-400 border border-slate-700">
            <PowerOff className="w-3 h-3" />
            {t('common.offline', 'Offline')}
          </span>
        );
    }
  };

  const handleExportCSV = () => {
    const csvHeader = 'Code,Name,Department,Status,Today_Hours,Monthly_Score,Daily_Tasks_Done,Daily_Work_Completion\n';
    const csvRows = employees.map(
      e => `${e.code},"${e.name}","${e.department}",${e.status},${e.todayHours},${e.monthlyScore}%,${e.dailyTasksCompleted}/${e.dailyTasksTotal},${e.dailyWorkCompletionPercent}%`
    ).join('\n');
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ApexWork_Shift_Summary_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner & Quick Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0a0f1d]/85 backdrop-blur-xl p-6 rounded-3xl border border-cyan-500/20 shadow-2xl shadow-cyan-950/20">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {t('dashboard.live_control', 'Live Operations Control')}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono">
              ⚡ {t('antievation.badge', 'Anti-Evasion Engine Active')}
            </span>
            <span className="text-xs text-slate-400 font-mono">{t('common.dhaka_bst', 'DHAKA BST (GMT+6)')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {t('dashboard.title', 'Shift Productivity & Telemetry Dashboard')}
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            {t('dashboard.subtitle', 'Real-time active work telemetry, automated shift auto-start status, and ethical non-intrusive activity audits.')}
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-[#070a12] hover:bg-slate-900 text-slate-200 border border-slate-700/80 px-3.5 py-2 rounded-xl text-xs font-medium transition-all shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('common.export_csv', 'Export CSV')}</span>
          </button>
          <button
            onClick={() => { setAnnouncementSent(false); setAnnouncementModalOpen(true); }}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-lg shadow-cyan-600/25 cursor-pointer border border-cyan-400/30"
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>{t('dashboard.broadcast_btn', 'Broadcast Notice')}</span>
          </button>
        </div>
      </div>

      {/* 6 KPI Stat Cards Grid with Anti-Evasion Telemetry & Flagged Ghost Hours */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title={t('dashboard.kpi_active', 'Active Now')}
          value={`${activeCount} ${language === 'bn' ? 'কর্মী' : 'Team'}`}
          change={`${activeCount} ${t('common.active', 'Active')} / ${employees.length} ${t('common.all', 'Total')}`}
          changeType="positive"
          icon={Activity}
          hasPulse={true}
          pulseColor="bg-emerald-400"
          badge={`${((activeCount / (employees.length || 1)) * 100).toFixed(1)}% Online`}
          accentColor="emerald"
        />
        <StatCard
          title={t("Today's Overall Project / Work Completion", "Today's Overall Project / Work Completion")}
          value={`${overallCompletionPercent}%`}
          change={`${overallCompletionPercent}% ${t('common.completed', 'Completed')}`}
          changeType="positive"
          icon={CheckCircle2}
          badge={`${totalCompletedTasks}/${totalTasks} ${t('common.tasks', 'Tasks')}`}
          subtext={language === 'bn' 
            ? `আজকের মোট ${totalTasks}টি কাজের মধ্যে ${totalCompletedTasks}টি সম্পন্ন`
            : `${totalCompletedTasks} of ${totalTasks} tasks completed today`}
          progress={overallCompletionPercent}
          accentColor="cyan"
        />
        <StatCard
          title={t('dashboard.kpi_hours', 'Shift Hours Today')}
          value={`${totalTodayHours} hrs`}
          subtext={language === 'bn' ? 'টার্গেট: ৬৪.০ ঘণ্টা' : 'Target: 64.0 hrs'}
          icon={Users}
          changeType="positive"
          change={language === 'bn' ? '৭৩% সম্পন্ন' : '73% Completed'}
          accentColor="amber"
        />
        <StatCard
          title={t('antievation.avg_density', 'Average Team Activity Density')}
          value="86.8%"
          change="⚡ High Engagement"
          changeType="positive"
          icon={Activity}
          badge="86.8% Density"
          subtext={language === 'bn' ? 'ফাঁকিবাজি প্রতিরোধ সেন্সর সক্রিয়' : 'Anti-evasion sensor active'}
          accentColor="cyan"
        />
        <StatCard
          title={t('antievation.flagged_hours', 'Flagged Inactive / Media Hours')}
          value="3.2 hrs"
          change="⚠️ 3.2 hrs Flagged"
          changeType="negative"
          icon={AlertCircle}
          badge="Suspicious Flag"
          subtext={language === 'bn' ? 'ভুয়া উপস্থিতি / বিনোদন ফ্ল্যাগ' : 'Evasion & media alerts'}
          accentColor="rose"
        />
        <StatCard
          title={t('dashboard.kpi_score', 'Monthly Activity Score')}
          value="93.8%"
          subtext={language === 'bn' ? 'টার্গেট: >৯০% কমপ্লায়েন্ট' : 'Target: >90% compliant'}
          icon={ShieldCheck}
          changeType="positive"
          change={language === 'bn' ? '+১.৪% এই সপ্তাহে' : '+1.4% this week'}
          accentColor="amber"
        />
      </div>

      {/* Main Grid: Live Roster & Side Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Live Team Roster Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-5 shadow-xl space-y-4">
            {/* Header & Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-cyan-500/15">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>{t('Live Team Roster', 'Live Team Roster')}</span>
                  <span className="text-xs bg-[#070a12] text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full font-mono">
                    {filteredEmployees.length} {language === 'bn' ? 'সদস্য' : 'Members'}
                  </span>
                </h2>
                <p className="text-xs text-slate-400">{t('dashboard.heartbeat_subtext', 'Continuous telemetry heartbeats every 10 seconds')}</p>
              </div>

              {/* Department Dropdown */}
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-cyan-400" />
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="bg-[#070a12] border border-slate-700/80 text-slate-200 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="all">{t('common.all', 'All Departments')}</option>
                  {DEPARTMENTS.map(d => (
                    <option key={d.id} value={d.id}>{t(d.name, d.name)}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Status Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {[
                { label: t('common.all', 'All Statuses'), value: 'all' },
                { label: `${t('common.active', 'Active')} (${activeCount})`, value: 'active' },
                { label: `${t('common.idle', 'Idle')} (${idleCount})`, value: 'idle' },
                { label: `${t('common.break', 'Break')} (${breakCount})`, value: 'break' },
                { label: `${t('common.offline', 'Offline')} (${offlineCount})`, value: 'offline' },
              ].map(tab => (
                <button
                  key={tab.value}
                  onClick={() => setStatusFilter(tab.value)}
                  className={`px-3 py-1 rounded-xl font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    statusFilter === tab.value
                      ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-600/30 font-semibold border border-cyan-400/30'
                      : 'bg-[#070a12] text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Roster Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-cyan-500/15 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                    <th className="pb-3 pl-2">{t('dashboard.col_employee', 'Employee')}</th>
                    <th className="pb-3">{t('dashboard.col_shift_window', 'Shift Window')}</th>
                    <th className="pb-3">{t('dashboard.col_status', 'Status')}</th>
                    <th className="pb-3">{t('Work Done', 'Work Done')}</th>
                    <th className="pb-3">{t('dashboard.col_logged', 'Logged')}</th>
                    <th className="pb-3">{t('dashboard.col_heartbeat', 'Heartbeat')}</th>
                    <th className="pb-3 text-right pr-2">{t('dashboard.col_portfolio', 'Portfolio')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredEmployees.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <Users className="w-8 h-8 text-slate-600" />
                          <span className="text-xs">{language === 'bn' ? 'নির্বাচিত ফিল্টারে কোনো কর্মী পাওয়া যায়নি।' : 'No employees found matching selected department and status filters.'}</span>
                          <button
                            onClick={() => { setSelectedDept('all'); setStatusFilter('all'); }}
                            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer underline"
                          >
                            {language === 'bn' ? 'সব ফিল্টার রিসেট করুন' : 'Reset All Filters'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-800/40 transition-colors group">
                      <td className="py-3 pl-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-950/60 to-indigo-950/60 border border-cyan-500/30 text-cyan-300 font-bold text-xs flex items-center justify-center flex-shrink-0">
                            {emp.avatar}
                          </div>
                          <div>
                            <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                              {emp.name}
                            </div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                              <span className="font-mono text-[10px] text-slate-400">{emp.code}</span>
                              <span>•</span>
                              <span>{emp.role}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="text-slate-300 font-medium">{emp.shiftHours}</div>
                        <div className="text-[10px] text-slate-400">{t(emp.department, emp.department)}</div>
                      </td>
                      <td className="py-3">
                        {getStatusBadge(emp.status, emp.idleMinutes)}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-white font-mono text-xs">
                            {emp.dailyWorkCompletionPercent || 0}%
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            ({emp.dailyTasksCompleted || 0}/{emp.dailyTasksTotal || 0})
                          </span>
                        </div>
                        <div className="w-20 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                          <div
                            className="bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 h-full rounded-full"
                            style={{ width: `${emp.dailyWorkCompletionPercent || 0}%` }}
                          />
                        </div>
                      </td>
                      <td className="py-3 font-mono font-medium text-slate-200">
                        {emp.todayHours > 0 ? `${emp.todayHours}h` : '—'}
                      </td>
                      <td className="py-3 text-slate-400 font-mono text-[11px]">
                        {emp.lastHeartbeat}
                      </td>
                      <td className="py-3 text-right pr-2">
                        <button
                          onClick={() => setSelectedEmployee(emp)}
                          className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{t('common.view', 'View')}</span>
                        </button>
                      </td>
                    </tr>
                  )))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Recent Audited Screenshots & Shift Progress */}
        <div className="space-y-6">
          {/* Shift Progress Widget */}
          <div className="bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                {t('dashboard.shift_autorun_title', 'Shift Auto-Run Status')}
              </span>
              <span className="text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                {t('dashboard.daemon_synced', 'Client Daemon Synced')}
              </span>
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>{t('dashboard.morning_shift_elapsed', 'Morning Shift Elapsed:')}</span>
                <span className="font-semibold text-white font-mono">6h 15m / 9h 00m</span>
              </div>
              <div className="w-full bg-[#070a12] h-2.5 rounded-full overflow-hidden border border-white/5">
                <div className="bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 h-full w-[69%] rounded-full transition-all"></div>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {t('dashboard.shift_autorun_desc', 'Desktop client automatically started at 09:00 AM on employee work stations. Grace period: 10 mins.')}
            </p>
          </div>

          {/* Recent Audited Screenshots Widget */}
          <div className="bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-cyan-400" />
                  <span>{t('dashboard.recent_captures_title', 'Recent Audited Captures')}</span>
                </h3>
                <p className="text-[11px] text-slate-400">{t('dashboard.expiring_signed_links', '15-min expiring signed links')}</p>
              </div>
              <span className="text-[10px] bg-[#070a12] text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30 font-mono">
                {t('dashboard.auto_purge_30d', 'Discretionary Vault')}
              </span>
            </div>

            <div className="space-y-3">
              {screenshots.filter(s => !s.isArchived).slice(0, 3).map((item) => {
                const isItemFlagged = item.isEvasionFlagged || item.hasMediaFlag || (item.activityDensityPercent ?? 100) < 30;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedScreenshot(item)}
                    className={`p-2.5 rounded-xl bg-[#070a12] border ${isItemFlagged ? 'border-rose-500/30 hover:border-rose-500/50' : 'border-slate-800 hover:border-cyan-500/40'} transition-all cursor-pointer group flex items-start gap-3`}
                  >
                    <div className="w-20 h-14 rounded-lg bg-slate-900 border border-slate-700/60 overflow-hidden flex-shrink-0 relative">
                      <ScreenshotMockup screenshot={item} showWatermark={false} className="scale-[0.5] origin-top-left w-[200%] h-[200%]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
                          {item.employeeName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{item.timeAgo}</span>
                      </div>
                      <div className="text-[11px] text-slate-300 truncate mt-0.5 font-medium">
                        {item.activeApp}
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 mt-1">
                        <span className="text-[9px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 px-1.5 py-0.2 rounded">
                          ⚡ {item.activityDensityPercent ?? 85}%
                        </span>
                        {isItemFlagged && (
                          <span className="text-[9px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 px-1.5 py-0.2 rounded flex items-center gap-0.5 animate-pulse">
                            <AlertCircle className="w-2.5 h-2.5 text-rose-400" />
                            <span>{item.hasMediaFlag ? 'Media' : 'Ghost'}</span>
                          </span>
                        )}
                        {item.isBlurred && (
                          <span className="text-[9px] text-amber-300 bg-amber-500/15 border border-amber-500/25 px-1.5 py-0.2 rounded">{t('dashboard.masked', 'Masked')}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Dedicated Section: Individual Employee Work & Quota Ledger (কাজের সীমা ও স্বতন্ত্র কাজের হিসাব) */}
      <div className="bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 shadow-2xl space-y-6">
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-cyan-500/15">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t('dashboard.ledger_tag', 'কাজের সীমা ও স্বতন্ত্র কাজের হিসাব')}</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">Individual Work Breakdown</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {t("Individual Employee Work & Quota Ledger", "Individual Employee Work & Quota Ledger")}
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              {t('dashboard.ledger_desc', "Boss & Manager view to monitor each team member's assigned work quota (কাজের সীমা), deliverables accomplished, and completion progress percentages.")}
            </p>
          </div>

          {/* Summary Metric Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-[#070a12] p-2.5 px-3.5 rounded-xl border border-cyan-500/20 text-center shadow-inner">
              <div className="text-[10px] uppercase font-semibold text-slate-400">{t('dashboard.ledger_total_quotas', 'Total Quotas')}</div>
              <div className="text-sm font-bold text-white font-mono mt-0.5">{totalLedgerQuotas} {t('common.tasks', 'Tasks')}</div>
            </div>
            <div className="bg-[#070a12] p-2.5 px-3.5 rounded-xl border border-cyan-500/20 text-center shadow-inner">
              <div className="text-[10px] uppercase font-semibold text-slate-400">{t('dashboard.ledger_completed_tasks', 'Completed Tasks')}</div>
              <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">{totalLedgerCompleted} {t('common.completed', 'Done')}</div>
            </div>
            <div className="bg-[#070a12] p-2.5 px-3.5 rounded-xl border border-cyan-500/20 text-center shadow-inner">
              <div className="text-[10px] uppercase font-semibold text-slate-400">{t('Target Met', 'Target Met')}</div>
              <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">{targetsMetCount}</div>
            </div>
            <div className="bg-[#070a12] p-2.5 px-3.5 rounded-xl border border-rose-500/20 text-center shadow-inner">
              <div className="text-[10px] uppercase font-semibold text-slate-400">{t('Behind Schedule', 'Behind Schedule')}</div>
              <div className="text-sm font-bold text-rose-400 font-mono mt-0.5">{behindScheduleCount}</div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2 flex-1">
            {/* Search Box */}
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={ledgerSearch}
                onChange={(e) => setLedgerSearch(e.target.value)}
                placeholder={language === 'bn' ? 'কর্মী, কোড, পদবি বা বিভাগ খুঁজুন...' : 'Search employee, code, role, or department...'}
                className="w-full bg-[#070a12] border border-cyan-500/20 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Department Dropdown */}
            <select
              value={ledgerDept}
              onChange={(e) => setLedgerDept(e.target.value)}
              className="bg-[#070a12] border border-slate-700/80 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="all">{t('common.all', 'All Departments')}</option>
              {DEPARTMENTS.map(d => (
                <option key={d.id} value={d.id}>{t(d.name, d.name)}</option>
              ))}
            </select>
          </div>

          {/* Status Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { label: t('common.all', 'All'), value: 'all' },
              { label: `${t('Target Met', 'Target Met')} (${targetsMetCount})`, value: 'met' },
              { label: `${t('On Track', 'On Track')} (${onTrackCount})`, value: 'ontrack' },
              { label: `${t('Behind Schedule', 'Behind Schedule')} (${behindScheduleCount})`, value: 'behind' }
            ].map(tab => (
              <button
                key={tab.value}
                onClick={() => setLedgerFilterStatus(tab.value as 'all' | 'met' | 'ontrack' | 'behind')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  ledgerFilterStatus === tab.value
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* The Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="pb-3 pl-3">{t('common.employee', 'Employee')}</th>
                <th className="pb-3">{t('common.department', 'Department')}</th>
                <th className="pb-3">{t('Assigned Work Quota / Target (কাজের সীমা)', 'Assigned Work Quota / Target (কাজের সীমা)')}</th>
                <th className="pb-3">{t('Tasks Completed so far', 'Tasks Completed so far')}</th>
                <th className="pb-3">{t('Quota Completion %', 'Quota Completion %')}</th>
                <th className="pb-3">{t('common.status', 'Status')}</th>
                <th className="pb-3 text-right pr-3">{t('common.actions', 'Actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {ledgerEmployees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Target className="w-8 h-8 text-slate-600" />
                      <span className="text-xs">{t('dashboard.no_ledger_match', 'No employees found matching the quota ledger filter.')}</span>
                      <button
                        onClick={() => { setLedgerSearch(''); setLedgerDept('all'); setLedgerFilterStatus('all'); }}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer underline"
                      >
                        {t('dashboard.reset_filters', 'Reset Ledger Filters')}
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                ledgerEmployees.map((emp) => {
                  const quota = Math.max(0, emp.dailyTasksTotal ?? 4);
                  const completed = Math.max(0, emp.dailyTasksCompleted ?? 0);
                  const percent = calculateQuotaPercent(completed, quota);
                  const statusObj = getQuotaStatus(completed, quota);
                  const barColor = getQuotaProgressBarColor(percent);

                  return (
                    <tr key={emp.id} className="hover:bg-slate-800/40 transition-colors group">
                      {/* Employee Name, Code, Role */}
                      <td className="py-3.5 pl-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-900 via-indigo-700 to-purple-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-sm">
                            {emp.avatar}
                          </div>
                          <div>
                            <div className="font-bold text-white group-hover:text-indigo-300 transition-colors">
                              {emp.name}
                            </div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                              <span className="font-mono text-[10px] bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">{emp.code}</span>
                              <span>•</span>
                              <span>{emp.role}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Department */}
                      <td className="py-3.5">
                        <div className="font-medium text-slate-300">{emp.department}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{emp.shiftHours}</div>
                      </td>

                      {/* Assigned Work Quota / Target (কাজের সীমা) with quick adjustment */}
                      <td className="py-3.5">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleQuickAdjustQuota(emp.id, -1)}
                            className="w-6 h-6 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center font-bold text-xs border border-slate-700 cursor-pointer"
                            title={t('Decrease daily quota by 1', 'Decrease quota')}
                          >
                            -
                          </button>
                          <span className="font-mono font-bold text-white text-xs px-2 py-0.5 rounded bg-slate-950 border border-slate-800 min-w-[56px] text-center">
                            {quota} {t('common.tasks', 'Tasks')}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQuickAdjustQuota(emp.id, 1)}
                            className="w-6 h-6 rounded-md bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white flex items-center justify-center font-bold text-xs border border-indigo-500/30 cursor-pointer"
                            title={t('Increase daily quota by 1', 'Increase quota')}
                          >
                            +
                          </button>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">কাজের সীমা: {quota} টি</div>
                      </td>

                      {/* Tasks Completed so far */}
                      <td className="py-3.5">
                        <div className="font-mono font-semibold text-slate-200 text-xs">
                          {completed} {t('common.of', 'of')} {quota} {t('common.tasks', 'Tasks')}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[150px]" title={emp.deliverableSummary}>
                          {emp.deliverableSummary || 'Pending deliverable'}
                        </div>
                      </td>

                      {/* Quota Completion % with visual progress bar */}
                      <td className="py-3.5 min-w-[140px]">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-bold text-white font-mono">{percent}%</span>
                          <span className={`text-[10px] font-mono ${percent >= 80 ? 'text-emerald-400' : percent >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                            {percent >= 100 ? t('Target Met', 'Target Met') : `${Math.max(0, quota - completed)} ${t('ledger.left', 'left')}`}
                          </span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className={`bg-gradient-to-r ${barColor} h-full rounded-full transition-all duration-300`}
                            style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
                          />
                        </div>
                      </td>

                      {/* Status Indicator */}
                      <td className="py-3.5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusObj.badgeClass}`}>
                          {statusObj.label === 'Target Met' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                          {statusObj.label === 'On Track' && <Clock className="w-3 h-3 text-blue-400" />}
                          {statusObj.label === 'Behind Schedule' && <AlertCircle className="w-3 h-3 text-rose-400" />}
                          <span>{t(statusObj.label, statusObj.label)}</span>
                        </span>
                      </td>

                      {/* Actions: View Breakdown & Adjust Quota */}
                      <td className="py-3.5 text-right pr-3">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setLedgerEmployee(emp)}
                            className="inline-flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm cursor-pointer whitespace-nowrap"
                            title="View itemized tasks & deliverables"
                          >
                            <ListChecks className="w-3.5 h-3.5" />
                            <span>{t('View Breakdown', 'View Breakdown')}</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Employee Detailed Portfolio */}
      <Modal
        isOpen={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
        title={selectedEmployee ? `${selectedEmployee.name} — Portfolio` : ''}
        subtitle={selectedEmployee ? `${selectedEmployee.role} • ${selectedEmployee.department}` : ''}
        maxWidth="3xl"
      >
        {selectedEmployee && (
          <div className="space-y-6 text-xs text-slate-300">
            {/* Top Employee Profile Card */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-bold text-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                  {selectedEmployee.avatar}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{selectedEmployee.name}</h4>
                  <div className="text-xs text-indigo-400 font-medium">{selectedEmployee.code} • {selectedEmployee.role}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{selectedEmployee.email} • Joined {selectedEmployee.joinedDate}</div>
                </div>
              </div>
              <div className="flex flex-col sm:items-end">
                {getStatusBadge(selectedEmployee.status, selectedEmployee.idleMinutes)}
                <span className="text-[11px] text-slate-400 font-mono mt-1">Last seen: {selectedEmployee.lastHeartbeat}</span>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase font-semibold">{t('dashboard.today_logged', 'Today Logged')}</div>
                <div className="text-xl font-bold text-white font-mono mt-1">{selectedEmployee.todayHours} hrs</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">{t('common.shift', 'Shift')}: {selectedEmployee.shiftHours}</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase font-semibold">{t('dashboard.monthly_activity_stat', 'Monthly Activity')}</div>
                <div className="text-xl font-bold text-emerald-400 font-mono mt-1">{selectedEmployee.monthlyScore}%</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{t('dashboard.productivity_rating', 'Productivity rating')}</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase font-semibold">{t('dashboard.idle_ratio', 'Idle Ratio')}</div>
                <div className="text-xl font-bold text-amber-400 font-mono mt-1">{selectedEmployee.monthlyIdlePercent}%</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{t('dashboard.across_30_days', 'Across 30 days')}</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase font-semibold">{t('dashboard.auto_trigger', 'Auto-Trigger')}</div>
                <div className="text-sm font-bold text-indigo-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t('dashboard.scheduled', 'Scheduled')}</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">{t('dashboard.desktop_app_sync', 'Desktop App Sync')}</div>
              </div>
            </div>

            {/* Today's Work & Daily Task Completion */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-indigo-400" />
                  <span className="font-bold text-white text-xs">
                    {t('Work Quota / Target (কাজের সীমা):', 'Work Quota / Target (কাজের সীমা):')} {selectedEmployee.dailyTasksTotal ?? 0} {t('common.tasks', 'Tasks')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const emp = selectedEmployee;
                    setSelectedEmployee(null);
                    setLedgerEmployee(emp);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-300 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 px-2.5 py-1 rounded-lg transition-colors cursor-pointer w-fit"
                >
                  <Target className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{t('dashboard.adjust_quota_btn', 'Adjust Quota / View Tasks')}</span>
                </button>
              </div>
              
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                  <span className="text-slate-400">{t('dashboard.daily_deliverable_progress', 'Daily Deliverable Progress:')}</span>
                  <span className="font-semibold text-white font-mono">
                    {selectedEmployee.dailyTasksCompleted || 0} {t('common.of', 'of')} {selectedEmployee.dailyTasksTotal || 0} {t('dashboard.completed_tasks_summary', 'tasks completed today')}
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 h-full rounded-full transition-all"
                    style={{ width: `${selectedEmployee.dailyWorkCompletionPercent || 0}%` }}
                  />
                </div>
              </div>

              {selectedEmployee.deliverableSummary && (
                <div className="text-[11px] text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 flex items-start gap-2">
                  <span className="text-slate-400 font-semibold flex-shrink-0">{t("dashboard.today_deliverable_heading", "Today's Deliverable:")}</span>
                  <span className="text-slate-200">&ldquo;{selectedEmployee.deliverableSummary}&rdquo;</span>
                </div>
              )}
            </div>

            {/* Latest Submitted Work Update */}
            <div className="p-4 bg-[#070a12] rounded-xl border border-cyan-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">{t('dashboard.latest_task_update', 'Latest Task Update')}</span>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded font-mono">
                  {t('dashboard.project_tag', 'Project:')} {selectedEmployee.latestUpdateProject}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed bg-[#0a0f1d] p-3 rounded-lg border border-slate-800">
                &ldquo;{selectedEmployee.latestUpdate}&rdquo;
              </p>
            </div>

            {/* Privacy Guarantee Note */}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-emerald-300 text-[11px]">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>
                {t('dashboard.privacy_guarantee_text', 'Privacy Guarantee: Keystrokes are never logged. Heartbeats only monitor active window titles and input idle delta.')}
              </span>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal: Screenshot Preview with Anti-Evasion Telemetry */}
      <Modal
        isOpen={!!selectedScreenshot}
        onClose={() => setSelectedScreenshot(null)}
        title={selectedScreenshot ? `${t('dashboard.screenshot_audit_title', 'Screenshot Audit')} — ${selectedScreenshot.employeeName}` : ''}
        subtitle={selectedScreenshot ? `${selectedScreenshot.timestamp} • ${selectedScreenshot.activeApp} • ${selectedScreenshot.windowTitle}` : ''}
        maxWidth="4xl"
      >
        {selectedScreenshot && (
          <div className="space-y-4">
            <ScreenshotMockup screenshot={selectedScreenshot} className="w-full h-80 sm:h-96" />
            
            {/* Telemetry metadata bar */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 p-3.5 bg-[#070a12] rounded-xl border border-cyan-500/20 text-xs text-slate-300">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-semibold block">{t('antievation.density_meter', '⚡ Activity Density %')}</span>
                <span className="font-mono font-bold text-cyan-400 text-sm">
                  {selectedScreenshot.activityDensityPercent ?? 85}%
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-semibold block">{t('dashboard.trigger_reason_label', 'Trigger Reason:')}</span>
                <span className="font-semibold text-white truncate block">
                  {t(selectedScreenshot.triggerReason, selectedScreenshot.triggerReason)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-semibold block">{t('screenshots.window_label', 'Active Window:')}</span>
                <span className="font-mono text-slate-200 truncate block text-[11px]">
                  {selectedScreenshot.windowTitle}
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-semibold block">{t('dashboard.audit_code_label', 'Security Audit Code:')}</span>
                <span className="font-mono text-emerald-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-[11px] inline-block mt-0.5">
                  {selectedScreenshot.auditBadge}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal: Broadcast Announcement */}
      <Modal
        isOpen={announcementModalOpen}
        onClose={() => setAnnouncementModalOpen(false)}
        title={t('dashboard.broadcast_modal_title', 'Broadcast Announcement to Active Employees')}
        subtitle={t('dashboard.broadcast_modal_subtitle', 'Desktop client notification will pop up on shift agents')}
        maxWidth="md"
      >
        <div className="space-y-4 text-xs">
          {announcementSent ? (
            <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <div className="text-emerald-300 font-semibold text-sm">{t('dashboard.announcement_broadcasted', 'Announcement Broadcasted!')}</div>
              <p className="text-slate-400 text-xs">
                {language === 'bn' ? `বর্তমানে সক্রিয় সকল ${activeCount}টি ডেস্কটপ অ্যাপ্লিকেশনে পাঠানো হয়েছে।` : t('dashboard.announcement_sent_to', 'Sent to all currently active desktop applications.')}
              </p>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-slate-300 font-medium mb-1">{t('dashboard.notice_message_label', 'Notice Message')}</label>
                <textarea
                  rows={4}
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  placeholder={t('dashboard.broadcast_placeholder', 'e.g. All-hands sprint retrospective starts today at 04:30 PM. Please save ongoing work.')}
                  className="w-full bg-[#070a12] border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setAnnouncementModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
                >
                  {t('common.cancel', 'Cancel')}
                </button>
                <button
                  onClick={() => setAnnouncementSent(true)}
                  disabled={!announcementText.trim()}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold disabled:opacity-50 border border-cyan-400/30 shadow-lg shadow-cyan-600/30 cursor-pointer"
                >
                  {t('dashboard.send_broadcast', 'Send Broadcast')}
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* Individual Work Ledger & Quota Drilldown Modal */}
      <IndividualWorkLedgerModal
        isOpen={!!ledgerEmployee}
        onClose={() => setLedgerEmployee(null)}
        employee={ledgerEmployee}
        onUpdateEmployee={handleUpdateEmployee}
      />
    </div>
  );
}
