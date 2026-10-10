'use client';

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  Trash2, 
  Target, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles,
  Check,
  Briefcase
} from 'lucide-react';
import Modal from '@/components/dashboard/Modal';
import { useLanguage } from '@/context/LanguageContext';
import { 
  EMPLOYEES,
  Employee, 
  EmployeeTaskItem, 
  calculateQuotaPercent, 
  getQuotaProgressBarColor, 
  getQuotaStatus, 
  getEmployeeTasks 
} from '@/lib/demo-data';

interface IndividualWorkLedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
  onUpdateEmployee?: (updatedEmployee: Employee) => void;
}

function IndividualWorkLedgerModalContent({
  employee,
  onClose,
  onUpdateEmployee
}: {
  employee: Employee;
  onClose: () => void;
  onUpdateEmployee?: (updatedEmployee: Employee) => void;
}) {
  const { t } = useLanguage();
  const [quota, setQuota] = useState<number>(() => Math.max(0, employee.dailyTasksTotal ?? 4));
  const [tasks, setTasks] = useState<EmployeeTaskItem[]>(() => getEmployeeTasks(employee));
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskProject, setNewTaskProject] = useState('');
  const [newTaskDeliverable, setNewTaskDeliverable] = useState('');
  const [newTaskUrl, setNewTaskUrl] = useState('');
  const [newTaskStatus, setNewTaskStatus] = useState<'completed' | 'in_progress' | 'pending'>('completed');
  const [saveToast, setSaveToast] = useState(false);

  // Sync with directory updates across tabs or parent updates
  useEffect(() => {
    const handleStorage = (e: StorageEvent | Event) => {
      const storageEvent = e as StorageEvent;
      if (!storageEvent.key || storageEvent.key === 'apexwork_employees_directory') {
        try {
          const saved = storageEvent.newValue !== undefined && storageEvent.newValue !== null ? storageEvent.newValue : localStorage.getItem('apexwork_employees_directory');
          if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
              const updatedEmp = parsed.find((emp: Employee) => emp.id === employee.id);
              if (updatedEmp) {
                setQuota(Math.max(0, updatedEmp.dailyTasksTotal ?? 4));
                setTasks(getEmployeeTasks(updatedEmp));
              }
            }
          }
        } catch {
          // Ignore
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [employee.id]);

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const completionPercent = calculateQuotaPercent(completedCount, quota);
  const quotaStatus = getQuotaStatus(completedCount, quota);
  const progressColor = getQuotaProgressBarColor(completionPercent);

  // Synchronize changes to localStorage and parent state
  const persistEmployeeChanges = (updatedQuota: number, updatedTasks: EmployeeTaskItem[]) => {
    const newCompleted = updatedTasks.filter(t => t.status === 'completed').length;
    const newPercent = calculateQuotaPercent(newCompleted, updatedQuota);
    const topDeliverable = updatedTasks.find(t => t.status === 'completed')?.deliverable || 
                           updatedTasks[0]?.title || 
                           employee.deliverableSummary;

    const updatedEmployee: Employee = {
      ...employee,
      dailyTasksTotal: updatedQuota,
      dailyTasksCompleted: newCompleted,
      dailyWorkCompletionPercent: newPercent,
      deliverableSummary: topDeliverable,
      itemizedTasks: updatedTasks
    };

    // Update localStorage directory
    try {
      const saved = localStorage.getItem('apexwork_employees_directory');
      let dir: Employee[] = EMPLOYEES;
      if (saved !== null) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) dir = parsed;
        } catch {
          dir = EMPLOYEES;
        }
      }
      const existingIdx = dir.findIndex(e => e.id === employee.id);
      let updatedDir: Employee[];
      if (existingIdx >= 0) {
        updatedDir = [...dir];
        updatedDir[existingIdx] = updatedEmployee;
      } else {
        updatedDir = [updatedEmployee, ...dir];
      }
      localStorage.setItem('apexwork_employees_directory', JSON.stringify(updatedDir));
      // Dispatch storage event for same-tab listeners
      window.dispatchEvent(new Event('storage'));
      try {
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'apexwork_employees_directory',
          newValue: JSON.stringify(updatedDir)
        }));
      } catch {
        // StorageEvent polyfill guard
      }
    } catch {
      // Ignore storage errors
    }

    if (onUpdateEmployee) {
      onUpdateEmployee(updatedEmployee);
    }

    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2200);
  };

  const handleQuotaChange = (newVal: number) => {
    const valid = Math.max(0, newVal);
    setQuota(valid);
    persistEmployeeChanges(valid, tasks);
  };

  const handleToggleTaskStatus = (taskId: string) => {
    const nextTasks = tasks.map(t => {
      if (t.id !== taskId) return t;
      let nextStatus: 'completed' | 'in_progress' | 'pending';
      if (t.status === 'completed') {
        nextStatus = 'in_progress';
      } else if (t.status === 'in_progress') {
        nextStatus = 'completed';
      } else {
        nextStatus = 'completed';
      }
      return {
        ...t,
        status: nextStatus,
        deliverable: nextStatus === 'completed' && !t.deliverable 
          ? `Milestone verified at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` 
          : t.deliverable
      };
    });
    setTasks(nextTasks);
    persistEmployeeChanges(quota, nextTasks);
  };

  const handleDeleteTask = (taskId: string) => {
    const nextTasks = tasks.filter(t => t.id !== taskId);
    setTasks(nextTasks);
    persistEmployeeChanges(quota, nextTasks);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' BST';
    const newTask: EmployeeTaskItem = {
      id: `${employee.id}-task-${Date.now()}`,
      title: newTaskTitle.trim(),
      project: newTaskProject.trim() || employee.latestUpdateProject || 'General Assignment',
      timestamp: currentTime,
      status: newTaskStatus,
      deliverable: newTaskDeliverable.trim() || (newTaskStatus === 'completed' ? `Milestone verified at ${currentTime}` : undefined),
      deliverableUrl: newTaskUrl.trim() || undefined
    };

    const nextTasks = [...tasks, newTask];
    setTasks(nextTasks);
    persistEmployeeChanges(quota, nextTasks);

    setNewTaskTitle('');
    setNewTaskProject('');
    setNewTaskDeliverable('');
    setNewTaskUrl('');
    setShowAddTask(false);
  };

  return (
    <div className="space-y-6 text-xs text-slate-300">
      {/* Top Profile Summary Card */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0a0f1d]/90 border border-cyan-500/20 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-cyan-500/20">
            {employee.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">{employee.name}</h2>
              <span className="font-mono text-[11px] text-cyan-300 bg-[#070a12] px-2 py-0.5 rounded border border-cyan-500/30">
                {employee.code}
              </span>
            </div>
            <div className="text-xs text-slate-300 mt-0.5">
              <span>{employee.role}</span> •{' '}
              <span className="text-cyan-400">{t(employee.department, employee.department)}</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              {t('common.shift', 'Shift')}: {employee.shiftHours}
            </div>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800/80">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
            employee.status === 'active' 
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' 
              : employee.status === 'idle'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              employee.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
            }`}></span>
            {t('common.status', 'Status')}: {t('common.' + employee.status, employee.status.toUpperCase())}
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            {t('dashboard.last_heartbeat', 'Last seen')}: {employee.lastHeartbeat}
          </span>
        </div>
      </div>

      {/* Work Quota & Target Management Control (কাজের সীমা নির্ধারণ) */}
      <div className="p-5 bg-gradient-to-b from-[#0a0f1d] to-[#070a12] rounded-2xl border border-cyan-500/25 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-white tracking-tight">
                {t('Work Quota / Target (কাজের সীমা)', 'Work Quota / Target (কাজের সীমা)')}
              </h3>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-mono">
                {t('ledger.target_label', 'Target')}: {quota} {t('common.tasks', 'Tasks')}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {t('ledger.quota_desc', 'Boss/Manager adjustable daily deliverable target limit with instant percentage recalculation.')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${quotaStatus.badgeClass}`}>
              {t(quotaStatus.label, quotaStatus.label)}
            </span>
          </div>
        </div>

        {/* Quota Counter Controls & Quick Presets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Left: Interactive Stepper & Manual Input */}
          <div className="space-y-2">
            <label className="block text-slate-300 font-semibold text-xs">
              {t('Set Assigned Work Quota (কাজের সীমা)', 'Set Assigned Work Quota (কাজের সীমা)')}
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleQuotaChange(Math.max(0, quota - 1))}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-base flex items-center justify-center transition-colors border border-slate-700 cursor-pointer"
                title={t('Decrease daily quota by 1', 'Decrease daily quota by 1')}
              >
                -
              </button>
              <div className="relative flex-1 max-w-[120px]">
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={quota}
                  onChange={(e) => handleQuotaChange(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl py-2 px-3 text-center text-base font-bold text-white font-mono focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => handleQuotaChange(quota + 1)}
                className="w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base flex items-center justify-center transition-colors shadow-md shadow-indigo-600/30 cursor-pointer"
                title={t('Increase daily quota by 1', 'Increase daily quota by 1')}
              >
                +
              </button>
              <span className="text-xs text-slate-400 font-medium">{t('ledger.tasks_per_day', 'Tasks / Day')}</span>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-[10px] text-slate-400 mr-1">{t('ledger.presets', 'Presets')}:</span>
              {[3, 4, 5, 6, 8].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleQuotaChange(val)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                    quota === val 
                      ? 'bg-indigo-600 text-white font-bold' 
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Real-Time Quota Completion Scorecard */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-medium">{t('ledger.completed_vs_quota', 'Completed vs Quota')}:</span>
              <span className="text-white font-bold font-mono text-sm">
                {t('Completed:', 'Completed:')} {completedCount} / {quota} {t('common.tasks', 'Tasks')} ({completionPercent}%)
              </span>
            </div>

            {/* Visual Progress Bar Color-Coded by Fulfillment */}
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <div 
                className={`bg-gradient-to-r ${progressColor} h-full rounded-full transition-all duration-300`}
                style={{ width: `${Math.min(100, Math.max(0, completionPercent))}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] pt-0.5">
              <span className="text-slate-400">
                {completionPercent >= 100 
                  ? t('ledger.target_achieved', '🎉 Target quota 100% achieved!') 
                  : quota > 0 
                  ? `${quota - completedCount} ${t('ledger.tasks_remaining', 'tasks remaining to reach target')}` 
                  : t('No Quota Set', 'No quota defined yet')}
              </span>
              <span className={`font-mono font-semibold ${
                completionPercent >= 80 ? 'text-emerald-400' : completionPercent >= 50 ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {completionPercent}% {t('ledger.fulfilled', 'Fulfilled')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Save confirmation toast */}
      {saveToast && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-emerald-300 flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{t('ledger.toast_saved', 'Quota and individual work ledger changes saved to directory!')}</span>
          </div>
          <span className="font-mono text-[10px] text-emerald-400">SYNCED</span>
        </div>
      )}

      {/* Itemized Tasks Ledger Table (প্রতিটি কাজের আলাদা হিসাব) */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>{t('Itemized Shift Deliverables', 'Itemized Shift Deliverables & Tasks')}</span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">
                {tasks.length} {t('ledger.items_listed', 'Items Listed')}
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              {t('ledger.deliverables_for', 'Specific itemized tasks, completion timestamps, and deliverable summaries for')} {employee.name}.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddTask(!showAddTask)}
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 px-3 py-1.5 rounded-xl transition-colors cursor-pointer w-fit"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showAddTask ? t('common.cancel', 'Close Task Form') : `+ ${t('ledger.add_task', 'Add New Task')}`}</span>
          </button>
        </div>

        {/* Add New Task Inline Sub-Form */}
        {showAddTask && (
          <form onSubmit={handleAddTask} className="p-4 bg-slate-950 rounded-2xl border border-indigo-900/40 space-y-3 animate-in fade-in duration-200">
            <div className="font-bold text-white text-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>{t('ledger.assign_new_deliverable', 'Assign New Deliverable / Task')}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 text-[11px] font-medium mb-1">{t('ledger.task_title', 'Task Title')} *</label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Implement API rate limiter & IPC bridge"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-slate-200 focus:outline-none focus:border-indigo-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-[11px] font-medium mb-1">{t('ledger.project_name', 'Project Name')}</label>
                <input
                  type="text"
                  value={newTaskProject}
                  onChange={(e) => setNewTaskProject(e.target.value)}
                  placeholder={employee.latestUpdateProject || 'Core Project'}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-slate-200 focus:outline-none focus:border-indigo-500 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 text-[11px] font-medium mb-1">{t('ledger.deliverable_note', 'Deliverable Note / Summary')}</label>
                <input
                  type="text"
                  value={newTaskDeliverable}
                  onChange={(e) => setNewTaskDeliverable(e.target.value)}
                  placeholder="e.g. Pull Request merged or benchmark verified"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-slate-200 focus:outline-none focus:border-indigo-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-[11px] font-medium mb-1">{t('ledger.deliverable_url', 'Deliverable URL (Optional)')}</label>
                <input
                  type="url"
                  value={newTaskUrl}
                  onChange={(e) => setNewTaskUrl(e.target.value)}
                  placeholder="https://github.com/apexwork/repo/pull/12"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-slate-200 focus:outline-none focus:border-indigo-500 text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <label className="text-slate-400 text-[11px]">{t('ledger.initial_status', 'Initial Status')}:</label>
                <select
                  value={newTaskStatus}
                  onChange={(e) => setNewTaskStatus(e.target.value as 'completed' | 'in_progress' | 'pending')}
                  className="bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="completed">{t('common.completed', 'Completed')}</option>
                  <option value="in_progress">{t('common.in_progress', 'In Progress')}</option>
                  <option value="pending">{t('common.pending', 'Pending')}</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddTask(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-medium cursor-pointer"
                >
                  {t('common.cancel', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 cursor-pointer"
                >
                  {t('ledger.save_task', 'Save & Append Task')}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Itemized Tasks Table / Feed */}
        {tasks.length === 0 ? (
          <div className="p-8 text-center bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <Briefcase className="w-8 h-8 text-slate-500 mx-auto" />
            <div className="text-slate-300 font-semibold text-xs">{t('ledger.no_tasks', 'No itemized tasks on file for this employee.')}</div>
            <p className="text-slate-400 text-[11px]">
              {t('ledger.click_add_task', 'Click "+ Add New Task" to build an itemized deliverable breakdown.')}
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {tasks.map((task, idx) => (
              <div
                key={task.id}
                className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  task.status === 'completed'
                    ? 'bg-slate-950/90 border-slate-800 hover:border-slate-700'
                    : task.status === 'in_progress'
                    ? 'bg-indigo-950/20 border-indigo-900/40 hover:border-indigo-700/50'
                    : 'bg-slate-950/50 border-slate-800/60 opacity-80'
                }`}
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {/* Toggle Completion Checkbox */}
                  <button
                    type="button"
                    onClick={() => handleToggleTaskStatus(task.id)}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer mt-0.5 ${
                      task.status === 'completed'
                        ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                        : 'bg-slate-800 border border-slate-700 text-transparent hover:text-slate-400'
                    }`}
                    title={task.status === 'completed' ? t('ledger.mark_in_progress', 'Mark In Progress') : t('ledger.mark_completed', 'Mark Completed')}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-white text-xs break-words">
                        {idx + 1}. {task.title}
                      </span>
                      <span className="font-mono text-[10px] bg-slate-900 text-indigo-300 border border-slate-800 px-2 py-0.5 rounded">
                        {task.project}
                      </span>
                    </div>

                    {task.deliverable && (
                      <div className="text-[11px] text-slate-300 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80 flex items-start gap-1.5">
                        <span className="text-slate-400 font-semibold flex-shrink-0">{t('ledger.deliverable', 'Deliverable')}:</span>
                        <span className="text-slate-200 truncate">{task.deliverable}</span>
                        {task.deliverableUrl && (
                          <a
                            href={task.deliverableUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-auto inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-semibold text-[10px] flex-shrink-0"
                          >
                            <span>{t('ledger.link', 'Link')}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side: Timestamp & Status Badge & Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0 pl-9 sm:pl-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800/60">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{task.timestamp}</span>
                    </div>
                  </div>

                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                    task.status === 'completed'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : task.status === 'in_progress'
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {task.status === 'completed' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                    {task.status === 'in_progress' && <Clock className="w-3 h-3 text-blue-400" />}
                    {task.status === 'pending' && <AlertCircle className="w-3 h-3 text-slate-400" />}
                    <span className="capitalize">{t(task.status, task.status.replace('_', ' '))}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-slate-400 hover:text-rose-400 p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
                    title={t('common.delete', 'Remove task')}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Privacy & Compliance Assurance */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-[11px]">
        <ShieldCheck className="w-4 h-4 text-indigo-400 flex-shrink-0" />
        <span>
          {t('ledger.privacy_notice', 'Verified Ethical Work Tracking: Tasks are linked to active shift timestamps and window focus telemetry. Keystroke surveillance is hard-coded disabled.')}
        </span>
      </div>

      {/* Modal Footer */}
      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs cursor-pointer transition-colors"
        >
          {t('common.done_close', 'Done & Close')}
        </button>
      </div>
    </div>
  );
}

export default function IndividualWorkLedgerModal({
  isOpen,
  onClose,
  employee,
  onUpdateEmployee
}: IndividualWorkLedgerModalProps) {
  const { t } = useLanguage();
  if (!isOpen || !employee) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${employee.name} — ${t('Individual Work Ledger & Quota', 'Individual Work Ledger & Quota')}`}
      subtitle={`${t('Work Quota / Target (কাজের সীমা)', 'Work Quota / Target (কাজের সীমা)')} & ${t('Itemized Shift Deliverables', 'Itemized Shift Deliverables')} • ${t(employee.department, employee.department)}`}
      maxWidth="4xl"
    >
      <IndividualWorkLedgerModalContent
        key={employee.id}
        employee={employee}
        onClose={onClose}
        onUpdateEmployee={onUpdateEmployee}
      />
    </Modal>
  );
}
