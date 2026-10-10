'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  ExternalLink, 
  Search, 
  Tag, 
  RotateCcw,
  ShieldCheck
} from 'lucide-react';
import Modal from '@/components/dashboard/Modal';
import { useLanguage } from '@/context/LanguageContext';
import { WORK_UPDATES, DEPARTMENTS, EMPLOYEES, WorkUpdate, Employee } from '@/lib/demo-data';

export default function WorkUpdatesPage() {
  const { t } = useLanguage();
  const [updates, setUpdates] = useState<WorkUpdate[]>(WORK_UPDATES);
  const [employeesList, setEmployeesList] = useState<Employee[]>(EMPLOYEES);
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // New update form state
  const [newEmployeeId, setNewEmployeeId] = useState('emp-101');
  const [newTitle, setNewTitle] = useState('');
  const [newProject, setNewProject] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newHours, setNewHours] = useState('2.5');
  const [newStatus, setNewStatus] = useState<'completed' | 'in_progress' | 'blocked'>('completed');
  const [newDeliverableUrl, setNewDeliverableUrl] = useState('');

  // Persist created updates & load dynamic employees across sessions
  useEffect(() => {
    try {
      const saved = localStorage.getItem('apexwork_work_updates');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setTimeout(() => {
            setUpdates(parsed);
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
    } catch {
      // Ignore localStorage errors
    }

    const handleStorageChange = (e: StorageEvent | Event) => {
      const storageEvent = e as StorageEvent;
      if (!storageEvent.key || storageEvent.key === 'apexwork_employees_directory') {
        try {
          const savedEmps = storageEvent.newValue !== undefined && storageEvent.newValue !== null ? storageEvent.newValue : localStorage.getItem('apexwork_employees_directory');
          if (savedEmps) {
            const parsedEmps = JSON.parse(savedEmps);
            if (Array.isArray(parsedEmps)) setEmployeesList(parsedEmps);
          } else {
            setEmployeesList(EMPLOYEES);
          }
        } catch { /* ignore */ }
      }
      if (!storageEvent.key || storageEvent.key === 'apexwork_work_updates') {
        try {
          const saved = storageEvent.newValue !== undefined && storageEvent.newValue !== null ? storageEvent.newValue : localStorage.getItem('apexwork_work_updates');
          if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) setUpdates(parsed);
          } else {
            setUpdates(WORK_UPDATES);
          }
        } catch { /* ignore */ }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleCreateUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newProject.trim()) return;

    const empObj = employeesList.find(e => e.id === newEmployeeId) || employeesList[0] || EMPLOYEES[0];
    const created: WorkUpdate = {
      id: `upd-${Date.now()}`,
      employeeId: empObj.id,
      employeeName: empObj.name,
      employeeAvatar: empObj.avatar,
      department: empObj.department,
      timestamp: 'Just now',
      timeAgo: 'Just now',
      project: newProject.trim(),
      title: newTitle.trim(),
      description: newDesc.trim() || 'Productivity milestone logged via employee portal.',
      status: newStatus,
      deliverableUrl: newDeliverableUrl.trim() || undefined,
      hoursSpent: parseFloat(newHours) || 1.0
    };

    const nextUpdates = [created, ...updates];
    setUpdates(nextUpdates);
    try {
      localStorage.setItem('apexwork_work_updates', JSON.stringify(nextUpdates));
      window.dispatchEvent(new Event('storage'));
      try {
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'apexwork_work_updates',
          newValue: JSON.stringify(nextUpdates)
        }));
      } catch {}
    } catch {
      // Ignore storage errors
    }

    setNewTitle('');
    setNewProject('');
    setNewDesc('');
    setNewDeliverableUrl('');
    setIsSubmitModalOpen(false);
  };

  const handleResetFilters = () => {
    setSelectedDept('all');
    setSelectedStatus('all');
    setSearchQuery('');
  };

  const filteredUpdates = updates.filter(item => {
    const matchesDept = selectedDept === 'all' || item.department.toLowerCase().includes(selectedDept.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesSearch = item.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesStatus && matchesSearch;
  });

  const completedCount = updates.filter(u => u.status === 'completed').length;
  const inProgressCount = updates.filter(u => u.status === 'in_progress').length;
  const blockedCount = updates.filter(u => u.status === 'blocked').length;

  const getStatusBadge = (status: WorkUpdate['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-500/10">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {t('common.completed', 'Completed')}
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10">
            <Clock className="w-3.5 h-3.5" />
            {t('common.in_progress', 'In Progress')}
          </span>
        );
      case 'blocked':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30 shadow-sm shadow-rose-500/10">
            <AlertCircle className="w-3.5 h-3.5" />
            {t('updates.blocked_status', 'Blocked / Needs Review')}
          </span>
        );
    }
  };

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
                {t('updates.badge', 'Shift Deliverables Ledger')}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                {t('antievation.title', 'Telemetry Linked')}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {t('updates.title', 'Daily Work Updates & Task Accomplishments')}
            </h1>
            <p className="text-sm text-slate-300/80 mt-1 max-w-2xl leading-relaxed">
              {t('updates.subtitle', 'Real-time activity submissions directly linked to employee shift sessions and verified against active telemetry.')}
            </p>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-lg shadow-cyan-500/25 cursor-pointer whitespace-nowrap self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>{t('updates.post_update', 'Post Shift Update')}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0a0f1d]/85 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-5 flex items-center justify-between shadow-xl">
          <div>
            <div className="text-slate-400 text-xs font-medium uppercase tracking-wider">{t('updates.kpi_completed', 'Milestones Completed')}</div>
            <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">{completedCount}</div>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-2xl shadow-sm">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-5 flex items-center justify-between shadow-xl">
          <div>
            <div className="text-slate-400 text-xs font-medium uppercase tracking-wider">{t('updates.kpi_in_flight', 'Ongoing In-Flight')}</div>
            <div className="text-2xl font-bold text-cyan-400 font-mono mt-1">{inProgressCount}</div>
          </div>
          <div className="p-3 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-2xl shadow-sm">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0a0f1d]/85 backdrop-blur-xl border border-rose-500/20 rounded-3xl p-5 flex items-center justify-between shadow-xl">
          <div>
            <div className="text-slate-400 text-xs font-medium uppercase tracking-wider">{t('updates.kpi_blockers', 'Blockers Flagged')}</div>
            <div className="text-2xl font-bold text-rose-400 font-mono mt-1">{blockedCount}</div>
          </div>
          <div className="p-3 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-2xl shadow-sm">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-4 shadow-xl flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-cyan-400/70 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('updates.search_placeholder', 'Search update title, project, description or employee...')}
            className="w-full bg-[#070a12]/90 border border-cyan-500/20 rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-400 shadow-inner"
          />
        </div>

        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="bg-[#070a12]/90 border border-cyan-500/20 text-slate-300 text-xs rounded-2xl px-3.5 py-2 focus:outline-none focus:border-cyan-400 cursor-pointer"
        >
          <option value="all" className="bg-[#0a0f1d]">{t('common.all_departments', 'All Departments')}</option>
          {DEPARTMENTS.map(d => (
            <option key={d.id} value={d.name} className="bg-[#0a0f1d]">{t(d.name, d.name)}</option>
          ))}
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="bg-[#070a12]/90 border border-cyan-500/20 text-slate-300 text-xs rounded-2xl px-3.5 py-2 focus:outline-none focus:border-cyan-400 cursor-pointer"
        >
          <option value="all" className="bg-[#0a0f1d]">{t('updates.all_statuses', 'All Statuses')}</option>
          <option value="completed" className="bg-[#0a0f1d]">{t('common.completed', 'Completed')}</option>
          <option value="in_progress" className="bg-[#0a0f1d]">{t('common.in_progress', 'In Progress')}</option>
          <option value="blocked" className="bg-[#0a0f1d]">{t('common.blocked', 'Blocked')}</option>
        </select>

        {(selectedDept !== 'all' || selectedStatus !== 'all' || searchQuery) && (
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1.5 text-xs text-cyan-300 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 px-3 py-2 rounded-2xl border border-cyan-500/30 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('screenshots.reset_filter', 'Reset')}</span>
          </button>
        )}
      </div>

      {/* Updates Timeline Feed */}
      {filteredUpdates.length === 0 ? (
        <div className="p-12 text-center bg-[#0a0f1d]/70 border border-cyan-500/20 rounded-3xl space-y-3">
          <FileText className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">{t('updates.no_updates', 'No Work Updates Found')}</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {t('updates.no_updates_desc', 'No employee updates match your current filter query.')}
          </p>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-xl mt-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('updates.reset_filters', 'Reset Search & Filters')}</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredUpdates.map((item) => (
            <div
              key={item.id}
              className="bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/15 hover:border-cyan-500/35 rounded-3xl p-6 shadow-xl hover:shadow-cyan-950/20 space-y-3.5 transition-all"
            >
              {/* Header: Employee, Project, Timestamp */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-500/10 pb-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-900 to-indigo-900 border border-cyan-400/30 text-cyan-200 font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-sm">
                    {item.employeeAvatar}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>{item.employeeName}</span>
                      <span className="text-slate-400 font-normal">• {t(item.department, item.department)}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {t('updates.logged', 'Logged')}: {item.timestamp} ({item.timeAgo})
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 px-3 py-0.5 rounded-full flex items-center gap-1.5 max-w-[200px] truncate shadow-sm">
                    <Tag className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                    <span className="truncate">{item.project}</span>
                  </span>
                  {getStatusBadge(item.status)}
                </div>
              </div>

              {/* Title & Body */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white break-words">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed bg-[#070a12]/90 p-4 rounded-2xl border border-cyan-500/15 break-words whitespace-pre-wrap shadow-inner">
                  {item.description}
                </p>
              </div>

              {/* Footer: Hours spent & Deliverable URL */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1">
                <span className="text-slate-400">
                  {t('updates.time_dedicated', 'Time Dedicated')}: <span className="font-mono text-cyan-300 font-semibold">{item.hoursSpent} {t('roster.hours_short', 'hrs')}</span>
                </span>

                {item.deliverableUrl && (
                  <a
                    href={item.deliverableUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-xs font-semibold hover:underline break-all"
                  >
                    <span>{t('updates.view_deliverable', 'View Deliverable Link')}</span>
                    <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Submit Manual Update */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title={t('updates.modal_title', 'Post Shift Task Update')}
        subtitle={t('updates.modal_subtitle', 'Record your milestone progress into the team shift ledger')}
        maxWidth="lg"
      >
        <form onSubmit={handleCreateUpdate} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">{t('updates.employee_account', 'Employee Account')}</label>
            <select
              value={newEmployeeId}
              onChange={(e) => setNewEmployeeId(e.target.value)}
              className="w-full bg-[#070a12] border border-cyan-500/20 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              {employeesList.map(e => (
                <option key={e.id} value={e.id} className="bg-[#0a0f1d]">{e.name} — {t(e.role, e.role)} ({t(e.department, e.department)})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">{t('updates.task_title', 'Task Title')}</label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder={t('updates.placeholder_task_title', 'e.g. Completed database index optimization for telemetry table')}
              className="w-full bg-[#070a12] border border-cyan-500/20 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">{t('updates.project_name', 'Project Name')}</label>
              <input
                type="text"
                required
                value={newProject}
                onChange={(e) => setNewProject(e.target.value)}
                placeholder={t('updates.placeholder_project_name', 'e.g. Core Productivity Agent')}
                className="w-full bg-[#070a12] border border-cyan-500/20 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">{t('updates.hours_spent', 'Hours Spent')}</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="12"
                value={newHours}
                onChange={(e) => setNewHours(e.target.value)}
                className="w-full bg-[#070a12] border border-cyan-500/20 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">{t('updates.deliverable_url', 'Deliverable / PR / Report URL (Optional)')}</label>
            <input
              type="url"
              value={newDeliverableUrl}
              onChange={(e) => setNewDeliverableUrl(e.target.value)}
              placeholder={t('updates.placeholder_deliverable_url', 'e.g. https://github.com/apexwork/desktop-client/pull/45')}
              className="w-full bg-[#070a12] border border-cyan-500/20 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">{t('updates.progress_status', 'Progress Status')}</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as 'completed' | 'in_progress' | 'blocked')}
              className="w-full bg-[#070a12] border border-cyan-500/20 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="completed" className="bg-[#0a0f1d]">{t('common.completed', 'Completed')}</option>
              <option value="in_progress" className="bg-[#0a0f1d]">{t('common.in_progress', 'In Progress')}</option>
              <option value="blocked" className="bg-[#0a0f1d]">{t('updates.blocked_awaiting', 'Blocked / Awaiting Review')}</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">{t('updates.detailed_explanation', 'Detailed Explanation')}</label>
            <textarea
              rows={3}
              required
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder={t('updates.placeholder_description', 'Detail specific milestones achieved, Pull Request IDs, or obstacles encountered...')}
              className="w-full bg-[#070a12] border border-cyan-500/20 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-cyan-500/10">
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-[#070a12] text-slate-300 hover:bg-[#0f172a] cursor-pointer border border-cyan-500/10"
            >
              {t('common.cancel', 'Cancel')}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              {t('updates.submit_work_log', 'Submit Work Log')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
