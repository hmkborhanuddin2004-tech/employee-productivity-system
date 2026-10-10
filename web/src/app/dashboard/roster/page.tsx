'use client';

import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar as CalendarIcon,
  PlayCircle,
  PauseCircle
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { SHIFTS, EMPLOYEES, Employee } from '@/lib/demo-data';

export default function ShiftRosterPage() {
  const { t } = useLanguage();
  const [employees, setEmployees] = useState<Employee[]>(EMPLOYEES);
  const [selectedShiftId, setSelectedShiftId] = useState<string>('all');
  const [activeDay, setActiveDay] = useState<string>('Mon');

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
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const filteredEmployees = employees.filter(emp => {
    if (selectedShiftId === 'all') return true;
    return emp.shiftId === selectedShiftId;
  });

  // Calculate day metrics
  const scheduledOnDayCount = employees.filter(emp => {
    const shift = SHIFTS.find(s => s.id === emp.shiftId);
    return shift?.days.includes(activeDay);
  }).length;

  const restingOnDayCount = employees.length - scheduledOnDayCount;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner - Obsidian Midnight Luxe */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/20 p-6 sm:p-8 shadow-2xl shadow-cyan-950/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 shadow-sm shadow-cyan-500/10">
                <PlayCircle className="w-3.5 h-3.5 text-cyan-400" />
                {t('roster.daemon_scheduler_badge', 'Daemon Auto-Scheduler')}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                {t('antievation.title', 'Anti-Evasion Telemetry Synced')}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {t('roster.title', 'Shift Roster & Automated Desktop Trigger Planner')}
            </h1>
            <p className="text-sm text-slate-300/80 mt-1 max-w-2xl leading-relaxed">
              {t('roster.subtitle', "Employees' desktop clients automatically launch and sync telemetry during assigned shifts. Zero manual check-in required.")}
            </p>
          </div>

          {/* Live Sync Badge */}
          <div className="bg-[#070a12]/90 p-4 rounded-2xl border border-cyan-500/20 flex items-center gap-3.5 shadow-inner">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <div className="text-xs">
              <div className="text-white font-bold">{t('roster.scheduler_synced', 'Scheduler Synchronized')}</div>
              <div className="text-cyan-400 text-[11px] font-mono">3 {t('roster.shift_profiles_active', 'Shift Profiles Active')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Shift Definition Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {SHIFTS.map((shift) => (
          <div
            key={shift.id}
            onClick={() => setSelectedShiftId(selectedShiftId === shift.id ? 'all' : shift.id)}
            className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between group ${
              selectedShiftId === shift.id
                ? 'bg-[#0a0f1d]/95 border-cyan-500 ring-2 ring-cyan-500/25 shadow-2xl shadow-cyan-950/40'
                : 'bg-[#0a0f1d]/75 backdrop-blur-xl border-cyan-500/15 hover:border-cyan-500/35 hover:shadow-lg'
            }`}
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-lg">
                  {shift.id.replace('shift-', '').toUpperCase()}
                </span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-semibold">
                  {t('roster.auto_start_enabled', 'Auto-Start Enabled')}
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {t(shift.name, shift.name)}
                </h3>
                <div className="flex items-center gap-2 text-slate-300 font-mono text-xs mt-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{shift.startTime} — {shift.endTime}</span>
                  <span className="text-slate-400 font-normal">({shift.totalHours} {t('roster.hours_short', 'hrs')})</span>
                </div>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <span>{t('roster.grace_window', 'Grace Window')}:</span>
                <span className="font-mono text-cyan-300 font-medium">{shift.gracePeriodMinutes} {t('roster.mins_tolerance', 'mins tolerance')}</span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                <span>{t('roster.working_days', 'Working Days')}:</span>
                <span className="font-mono text-cyan-300 font-semibold">
                  {shift.days.map(d => t(`day.${d.toLowerCase()}`, d)).join(', ')}
                </span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-cyan-500/10 flex items-center justify-between text-xs">
              <span className="text-slate-400">{t('roster.assigned_team', 'Assigned Team')}:</span>
              <span className="font-bold text-white font-mono">{employees.filter(e => e.shiftId === shift.id).length || shift.assignedCount} {t('common.employees', 'Employees')}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Shift Matrix Timetable */}
      <div className="bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
        {/* Controls: Day tabs & Shift filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cyan-500/10">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <CalendarIcon className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-white">
                <span>{t('Weekly Shift Deployment Matrix', 'Weekly Shift Deployment Matrix')}</span>
              </h2>
              <span className="text-xs bg-[#070a12] text-cyan-300 border border-cyan-500/20 px-3 py-1 rounded-full font-mono shadow-sm">
                {t(`day.${activeDay.toLowerCase()}`, activeDay)}: {scheduledOnDayCount} {t('roster.working', 'Working')} / {restingOnDayCount} {t('roster.off', 'Off')}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {t('roster.matrix_subtitle', 'Automated desktop trigger states mapped by workday schedule')}
            </p>
          </div>

          {/* Days of week selector */}
          <div className="flex items-center gap-1.5 bg-[#070a12] p-1.5 rounded-2xl border border-cyan-500/20">
            {DAYS.map(day => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeDay === day
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t(`day.${day.toLowerCase()}`, day)}
              </button>
            ))}
          </div>
        </div>

        {/* Timetable visual schedule */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-cyan-500/15 text-cyan-400/80 text-[10px] font-semibold uppercase tracking-wider">
                <th className="pb-3 pl-2">{t('roster.col_employee_code', 'Employee / Code')}</th>
                <th className="pb-3">{t('roster.col_shift_track', 'Shift Track')}</th>
                <th className="pb-3">{t('roster.col_schedule', 'Schedule')} ({t(`day.${activeDay.toLowerCase()}`, activeDay)})</th>
                <th className="pb-3">{t('roster.col_daemon_status', 'Auto-Start Daemon Status')}</th>
                <th className="pb-3">{t('Daily Work Done', 'Daily Work Done')}</th>
                <th className="pb-3 text-right pr-2">{t('roster.col_shift_today', 'Shift Today')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan-500/10">
              {filteredEmployees.map((emp) => {
                const shift = SHIFTS.find(s => s.id === emp.shiftId);
                const isWorkingDay = shift?.days.includes(activeDay) ?? true;

                return (
                  <tr key={emp.id} className="hover:bg-cyan-500/5 transition-colors">
                    <td className="py-3.5 pl-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-900 to-indigo-900 text-cyan-200 border border-cyan-400/30 font-bold flex items-center justify-center text-xs shadow-sm">
                          {emp.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-white flex items-center gap-1.5">
                            {emp.name}
                            {emp.avgActivityDensity && (
                              <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                                ⚡{emp.avgActivityDensity}%
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400">{emp.code} • {t(emp.department, emp.department)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <span className="font-medium text-slate-200">{t(emp.shiftName, emp.shiftName)}</span>
                    </td>
                    <td className="py-3.5 font-mono text-slate-300">
                      {isWorkingDay ? (
                        <>
                          {emp.shiftHours}
                          <span className="text-[10px] text-emerald-400 ml-2 font-bold">(BST)</span>
                        </>
                      ) : (
                        <span className="text-slate-500 italic">{t('roster.no_scheduled_shift', 'No Scheduled Shift')}</span>
                      )}
                    </td>
                    <td className="py-3.5">
                      {isWorkingDay ? (
                        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {t('roster.daemon_trigger_active', 'Daemon Trigger Active')}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                          <PauseCircle className="w-3.5 h-3.5 text-slate-500" />
                          {t('roster.daemon_suspended', 'Scheduled Rest Day (Daemon Suspended)')}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-white font-mono text-xs">
                          {emp.dailyWorkCompletionPercent || 0}%
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          ({emp.dailyTasksCompleted || 0}/{emp.dailyTasksTotal || 0})
                        </span>
                      </div>
                      <div className="w-24 bg-[#070a12] h-1.5 rounded-full overflow-hidden mt-1.5 border border-slate-800">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full shadow-sm shadow-cyan-500/20"
                          style={{ width: `${emp.dailyWorkCompletionPercent || 0}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-3.5 text-right pr-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold ${
                        emp.status === 'active' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 shadow-sm shadow-emerald-500/10' 
                          : emp.status === 'idle'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/25'
                          : emp.status === 'break'
                          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/25'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {t(`common.${emp.status}`, emp.status.toUpperCase())}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Timetable explanatory note */}
        <div className="p-4 rounded-2xl bg-[#070a12]/90 border border-cyan-500/20 flex items-start gap-3 text-xs text-slate-300">
          <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-white">{t('roster.how_it_works_title', 'How the Automatic Trigger Works:')}</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {t('roster.how_it_works_desc', "When the employee's shift begins (e.g. 09:00 AM BST), the local Windows background daemon automatically initializes session tracking. If the computer is switched on, it checks in with the server. If the employee takes a short break within the 10-minute grace window, it is logged neutrally. On designated off-days (e.g., Sunday for standard shifts or Friday for remote shifts), the daemon remains completely suspended.")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
