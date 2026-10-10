'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  Award, 
  PieChart,
  ShieldCheck,
  ShieldAlert,
  Zap,
  Activity,
  Laptop
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { useLanguage } from '@/context/LanguageContext';
import { MONTHLY_ANALYTICS, DEPARTMENTS, EMPLOYEES, DailyAnalytics, Employee } from '@/lib/demo-data';

export default function MonthlyAnalyticsPage() {
  const { t } = useLanguage();
  const [employees, setEmployees] = useState<Employee[]>(EMPLOYEES);
  const [selectedMonth, setSelectedMonth] = useState('September 2026');
  const [hoveredDay, setHoveredDay] = useState<DailyAnalytics | null>(null);
  const [viewMode, setViewMode] = useState<'hours' | 'score'>('hours');

  // Hydrate employees from localStorage on load & cross-tab sync
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
            if (Array.isArray(parsed)) setEmployees(parsed);
          } else {
            setEmployees(EMPLOYEES);
          }
        } catch {
          // Ignore
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Compute aggregate totals for actual days (days 1-19)
  const actualDays = MONTHLY_ANALYTICS.filter(d => !d.isProjected);
  const totalActiveHours = actualDays.reduce((acc, curr) => acc + curr.activeHours, 0).toFixed(1);
  const totalIdleHours = actualDays.reduce((acc, curr) => acc + curr.idleHours, 0).toFixed(1);
  const validWorkingDays = actualDays.filter(d => d.activeHours > 0);
  const avgMonthlyScore = (validWorkingDays.reduce((acc, curr) => acc + curr.score, 0) / (validWorkingDays.length || 1)).toFixed(1);

  // Top performers ranked by monthlyScore
  const sortedEmployees = [...employees].sort((a, b) => b.monthlyScore - a.monthlyScore);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner - Obsidian Midnight Luxe */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/20 p-6 sm:p-8 shadow-2xl shadow-cyan-950/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 shadow-sm shadow-cyan-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                {t('analytics.badge', 'Aggregated Enterprise Telemetry')}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                {t('antievation.title', 'Anti-Evasion Shield Active')}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {t('analytics.title', 'Monthly Productivity Trends & Visual Analytics')}
            </h1>
            <p className="text-sm text-slate-300/80 mt-1 max-w-2xl leading-relaxed">
              {t('analytics.subtitle', 'Objective metrics derived from active window engagement, keystroke/mouse activity density, and idle timers across the entire month. Neutral, transparent, and fair.')}
            </p>
          </div>

          {/* Month Selector */}
          <div className="flex items-center gap-2 bg-[#070a12]/90 p-2.5 rounded-2xl border border-cyan-500/20 shadow-inner">
            <Calendar className="w-4 h-4 text-cyan-400 ml-2" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent text-white text-xs font-semibold pr-4 py-1 focus:outline-none cursor-pointer"
            >
              <option value="September 2026" className="bg-[#0a0f1d] text-white">{t('month.september_2026', 'September 2026')}</option>
              <option value="August 2026" className="bg-[#0a0f1d] text-white">{t('month.august_2026', 'August 2026')}</option>
              <option value="July 2026" className="bg-[#0a0f1d] text-white">{t('month.july_2026', 'July 2026')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Cards: 5 Metrics Including Anti-Evasion Telemetry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title={t('analytics.kpi_active_hours', 'Total Active Hours (MTD)')}
          value={`${totalActiveHours} ${t('roster.hours_short', 'hrs')}`}
          change="+14.2% MoM"
          changeType="positive"
          icon={Clock}
          subtext={t('analytics.mtd_logged', 'Month-to-date logged')}
          accentColor="cyan"
        />
        <StatCard
          title={t('analytics.kpi_idle_hours', 'Total Inactive / Idle')}
          value={`${totalIdleHours} ${t('roster.hours_short', 'hrs')}`}
          change="5.1% idle ratio"
          changeType="positive"
          icon={TrendingUp}
          subtext={t('analytics.within_threshold', 'Within 10% threshold')}
          accentColor="amber"
        />
        <StatCard
          title={t('analytics.kpi_score', 'Team Productivity Score')}
          value={`${avgMonthlyScore}%`}
          change="Top Decile"
          changeType="positive"
          icon={BarChart3}
          subtext={t('analytics.target_score', 'Target: >90.0%')}
          accentColor="emerald"
        />
        <StatCard
          title={t('antievation.avg_density', 'Average Team Activity Density')}
          value="86.8%"
          change="⚡ High Intensity"
          changeType="positive"
          icon={Zap}
          subtext={t('antievation.density_desc', 'Weighted keystrokes & mouse activity')}
          accentColor="cyan"
        />
        <StatCard
          title={t('antievation.flagged_hours', 'Flagged Inactive / Media Hours')}
          value="3.2 hrs"
          change="4.1% shift time"
          changeType="negative"
          icon={ShieldAlert}
          subtext={t('antievation.filter_flagged', 'Phone & media evasion intercepted')}
          accentColor="rose"
        />
      </div>

      {/* Visual Chart: 30-Day Work Hours vs Idle Hours Bar Chart */}
      <div className="bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <BarChart3 className="w-4 h-4" />
              </span>
              <span>{t('analytics.chart_title', 'Continuous 30-Day Shift Activity Timeline (September 2026)')}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {t('analytics.chart_subtitle', 'Hover over bars to inspect daily active time, idle breakdown, and team scores (Days 1–19 Telemetry, Days 20–30 Scheduled)')}
            </p>
          </div>

          {/* View Mode Toggle & Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1 bg-[#070a12] p-1 rounded-xl border border-cyan-500/20">
              <button
                onClick={() => setViewMode('hours')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  viewMode === 'hours' 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-500/20' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t('analytics.mode_hours', 'Hours (Active/Idle)')}
              </button>
              <button
                onClick={() => setViewMode('score')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  viewMode === 'score' 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-500/20' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t('analytics.mode_score', 'Score %')}
              </button>
            </div>

            {viewMode === 'hours' ? (
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-cyan-500 shadow-sm shadow-cyan-500/50 inline-block"></span>
                  <span className="text-slate-300 font-medium">{t('analytics.legend_active', 'Active Work')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-amber-500 shadow-sm shadow-amber-500/50 inline-block"></span>
                  <span className="text-slate-300 font-medium">{t('analytics.legend_idle', 'Idle / Break')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded border border-dashed border-cyan-400 bg-cyan-500/20 inline-block"></span>
                  <span className="text-slate-400">{t('analytics.legend_projected', 'Projected')}</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500 shadow-sm shadow-emerald-500/50 inline-block"></span>
                <span className="text-slate-300 font-medium">{t('analytics.legend_score', 'Productivity Score')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bar Chart Visualization with mathematically solid CSS height calculation */}
        <div className="pt-4 pb-2">
          <div className="h-64 flex items-end gap-1 sm:gap-1.5 px-2 border-b border-slate-800/80">
            {MONTHLY_ANALYTICS.map((day) => {
              const maxHours = 10;
              const activeHeight = Math.min(100, (day.activeHours / maxHours) * 100);
              const idleHeight = Math.min(100, (day.idleHours / maxHours) * 100);
              const scoreHeight = day.score;
              const isWeekend = day.activeHours === 0;
              const isToday = day.day === 19;

              return (
                <div
                  key={day.day}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  className={`flex-1 h-full flex flex-col justify-end items-center group relative cursor-pointer ${
                    isToday ? 'bg-cyan-500/10 rounded-t border-b-2 border-cyan-400' : ''
                  }`}
                >
                  {/* Weekend indicator */}
                  {isWeekend ? (
                    <div className="w-full bg-slate-800/30 rounded-t h-5 flex items-center justify-center border-t border-slate-700/30">
                      <span className="text-[7px] text-slate-500 hidden sm:inline">{t('roster.off', 'Off')}</span>
                    </div>
                  ) : viewMode === 'hours' ? (
                    /* Hours Mode Stacked Bar */
                    <div className="w-full h-full flex flex-col justify-end items-center max-w-[24px]">
                      {/* Idle portion */}
                      {idleHeight > 0 && (
                        <div
                          style={{ height: `${idleHeight}%` }}
                          className={`w-full rounded-t transition-all ${
                            day.isProjected
                              ? 'bg-amber-500/30 border border-dashed border-amber-500/50'
                              : 'bg-amber-500/80 group-hover:bg-amber-400 shadow-sm shadow-amber-500/20'
                          }`}
                        ></div>
                      )}
                      {/* Active portion */}
                      <div
                        style={{ height: `${activeHeight}%` }}
                        className={`w-full transition-all ${
                          day.isProjected
                            ? 'bg-cyan-600/30 border border-dashed border-cyan-400/50'
                            : isToday
                            ? 'bg-gradient-to-t from-cyan-600 via-cyan-400 to-emerald-400 shadow-lg shadow-cyan-500/30'
                            : 'bg-gradient-to-t from-cyan-700 to-cyan-500 group-hover:from-cyan-600 group-hover:to-cyan-400'
                        }`}
                      ></div>
                    </div>
                  ) : (
                    /* Score Mode Bar */
                    <div className="w-full h-full flex flex-col justify-end items-center max-w-[24px]">
                      <div
                        style={{ height: `${scoreHeight}%` }}
                        className={`w-full rounded-t transition-all ${
                          day.isProjected
                            ? 'bg-emerald-500/30 border border-dashed border-emerald-400/50'
                            : 'bg-gradient-to-t from-emerald-600 to-emerald-400 group-hover:from-emerald-500 group-hover:to-emerald-300 shadow-sm shadow-emerald-500/20'
                        }`}
                      ></div>
                    </div>
                  )}

                  {/* Day Label */}
                  <span className={`text-[9px] sm:text-[10px] mt-2 group-hover:text-white font-mono ${
                    isToday ? 'text-cyan-400 font-bold' : 'text-slate-400'
                  }`}>
                    {day.day}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Hover Detail Card */}
          <div className="mt-4 p-3.5 bg-[#070a12]/90 rounded-2xl border border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs shadow-inner">
            {hoveredDay ? (
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <div>
                  <span className="text-slate-400">{t('analytics.date', 'Date')}:</span>{' '}
                  <span className="font-bold text-white">{hoveredDay.date}, 2026</span>
                  {hoveredDay.isProjected && (
                    <span className="text-[10px] ml-1.5 font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">
                      {t('analytics.projected', 'Projected')}
                    </span>
                  )}
                  {hoveredDay.day === 19 && (
                    <span className="text-[10px] ml-1.5 font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      {t('analytics.today_live', 'Today Live')}
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-slate-400">{t('analytics.active_work', 'Active Work')}:</span>{' '}
                  <span className="font-bold text-cyan-400 font-mono">{hoveredDay.activeHours} {t('roster.hours_short', 'hrs')}</span>
                </div>
                <div>
                  <span className="text-slate-400">{t('analytics.idle_break', 'Idle / Break')}:</span>{' '}
                  <span className="font-bold text-amber-400 font-mono">{hoveredDay.idleHours} {t('roster.hours_short', 'hrs')}</span>
                </div>
                <div>
                  <span className="text-slate-400">{t('analytics.productivity_score', 'Productivity Score')}:</span>{' '}
                  <span className="font-bold text-emerald-400 font-mono">{hoveredDay.score}%</span>
                </div>
              </div>
            ) : (
              <span className="text-slate-400 italic text-[11px]">
                {t('analytics.hover_hint', 'Hover over any day bar above to see specific active/idle breakdown and shift scores.')}
              </span>
            )}
            <span className="text-slate-400 text-[10px] font-mono">
              {viewMode === 'hours' ? t('analytics.scale_hours', 'Scale: 0 — 10.0 Hours/Day') : t('analytics.scale_score', 'Scale: 0 — 100% Score')}
            </span>
          </div>
        </div>
      </div>

      {/* Anti-Evasion Telemetry & Work Authenticity Breakdown */}
      <div className="bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-white">
                {t('antievation.title', 'Anti-Evasion Work Authenticity & Density Telemetry')}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {t('antievation.subtitle', 'Deep inspection into keystroke density, foreground window validation, and randomized verification intervals across all departments.')}
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              {t('antievation.genuine_rate', '95.9% Genuine Work Rate')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Pillar 1: High Engagement */}
          <div className="p-5 rounded-2xl bg-[#070a12]/80 border border-emerald-500/30 space-y-3 relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                {t('High Engagement', 'High Engagement')} (≥70%)
              </span>
              <span className="text-lg font-bold font-mono text-emerald-400">78.2%</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t('antievation.scenario_a_desc', 'High engagement (88%), genuine typing & clicks')}. Active typing ({'>'}40 wpm), continuous mouse navigations, active IDE/CRM manipulation.
            </p>
            <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full" style={{ width: '78.2%' }}></div>
            </div>
            <div className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              1,248 Verified Captures • 0 Evasion Flags
            </div>
          </div>

          {/* Pillar 2: Moderate Engagement */}
          <div className="p-5 rounded-2xl bg-[#070a12]/80 border border-amber-500/30 space-y-3 relative overflow-hidden group hover:border-amber-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                {t('Moderate Engagement', 'Moderate Engagement')} (40–69%)
              </span>
              <span className="text-lg font-bold font-mono text-amber-400">17.7%</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Researching documentation, reviewing pull requests, inspecting schematics. Healthy intervals with lower keystroke intensity.
            </p>
            <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full" style={{ width: '17.7%' }}></div>
            </div>
            <div className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
              <CheckCircle2 className="w-3 h-3 text-amber-400" />
              282 Verified Captures • Whitelisted Workflow
            </div>
          </div>

          {/* Pillar 3: Ghost Inactivity & Media Evasion Interceptions */}
          <div className="p-5 rounded-2xl bg-[#070a12]/80 border border-rose-500/30 space-y-3 relative overflow-hidden group hover:border-rose-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping"></span>
                {t('Ghost Inactivity / Suspicious', 'Ghost Inactivity / Suspicious')} (&lt;30%)
              </span>
              <span className="text-lg font-bold font-mono text-rose-400">4.1%</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t('antievation.scenario_b_desc', 'Excel open, 4% density, 0 keystrokes (phone scrolling)')} or media stream playing in foreground during shift.
            </p>
            <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-rose-500 to-red-500 h-full rounded-full" style={{ width: '4.1%' }}></div>
            </div>
            <div className="text-[10px] text-rose-400 flex items-center gap-1 font-mono">
              <ShieldAlert className="w-3 h-3 text-rose-400" />
              {t('antievation.flagged_hours', 'Flagged Inactive / Media Hours')}: 3.2 hrs Intercepted
            </div>
          </div>
        </div>

        {/* Why Traditional Fixed Screenshots Fail - Callout Banner */}
        <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
            <Laptop className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="font-bold text-white flex items-center gap-2">
              <span>{t('antievation.why_title', 'Why Traditional Fixed Screenshots Fail')}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {t('Randomized Interval', 'Randomized Interval')}
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {t('antievation.why_desc', 'When workers know a screenshot takes place every 15 minutes, they can easily switch to a work document or pretend to work right at that minute, then return to phone scrolling or video watching. Our 4-pillar system combines randomized unpredictable shutter timing, keystroke/mouse activity density metering, foreground process title inspection, and media interception to guarantee genuine workplace productivity.')}
            </p>
          </div>
        </div>
      </div>

      {/* Department Productivity Breakdown & Top Contributors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Department Distribution */}
        <div className="bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <PieChart className="w-4 h-4" />
              </span>
              <span>{t('analytics.dept_activity_index', 'Departmental Activity Index')}</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">{t('analytics.september_avg', 'September Average')}</span>
          </div>

          <div className="space-y-4 pt-2">
            {DEPARTMENTS.map((dept) => (
              <div key={dept.id} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-white">{t(dept.name, dept.name)}</span>
                  <span className="font-mono text-emerald-400 font-bold">{dept.avgScore}% {t('analytics.score_label', 'Score')}</span>
                </div>
                <div className="w-full bg-[#070a12] h-2.5 rounded-full overflow-hidden border border-slate-800/80">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full transition-all shadow-sm shadow-cyan-500/20"
                    style={{ width: `${dept.avgScore}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{dept.headCount} {t('departments.employees_assigned', 'Employees Assigned')}</span>
                  <span>{t('departments.lead_label', 'Lead')}: {dept.head}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Contributor Highlights */}
        <div className="bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Award className="w-4 h-4" />
              </span>
              <span>{t('analytics.top_contributors', 'Top Shift Compliance & Focus Highlights')}</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">{t('analytics.ranked_by_activity', 'Ranked by Activity %')}</span>
          </div>

          <div className="space-y-3 pt-2">
            {sortedEmployees.slice(0, 5).map((emp, index) => (
              <div
                key={emp.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#070a12]/80 border border-cyan-500/10 hover:border-cyan-500/30 transition-all shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs font-mono shadow-sm ${
                    index === 0 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-amber-500/10' :
                    index === 1 ? 'bg-slate-300/20 text-slate-200 border border-slate-400/40' :
                    index === 2 ? 'bg-amber-700/20 text-amber-400 border border-amber-700/40' :
                    'bg-slate-800/80 text-slate-400 border border-slate-700/40'
                  }`}>
                    #{index + 1}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      {emp.name}
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        ⚡ {emp.avgActivityDensity ?? 88}%
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">{emp.role} • {t(emp.department, emp.department)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-emerald-400">{emp.monthlyScore}%</div>
                  <div className="text-[10px] text-slate-400 font-mono">{emp.monthlyIdlePercent}% {t('common.idle', 'idle')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
