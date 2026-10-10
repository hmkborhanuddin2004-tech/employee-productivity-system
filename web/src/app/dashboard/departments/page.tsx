'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  Eye, 
  Sparkles, 
  Search,
  ShieldCheck,
  RotateCcw,
  Building,
  UserPlus,
  Trash2,
  AlertTriangle,
  Target
} from 'lucide-react';
import Modal from '@/components/dashboard/Modal';
import IndividualWorkLedgerModal from '@/components/dashboard/IndividualWorkLedgerModal';
import { useLanguage } from '@/context/LanguageContext';
import { 
  EMPLOYEES, 
  DEPARTMENTS, 
  SHIFTS, 
  Employee,
  calculateQuotaPercent,
  getQuotaProgressBarColor,
  getQuotaStatus
} from '@/lib/demo-data';

export default function DepartmentsPage() {
  const { t } = useLanguage();
  const [employees, setEmployees] = useState<Employee[]>(EMPLOYEES);
  const [selectedDeptId, setSelectedDeptId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeEmployee, setActiveEmployee] = useState<Employee | null>(null);
  const [quotaModalEmployee, setQuotaModalEmployee] = useState<Employee | null>(null);

  // Add Employee modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newDeptId, setNewDeptId] = useState('it');
  const [newRole, setNewRole] = useState('');
  const [newShiftId, setNewShiftId] = useState('shift-morning');
  const [newStatus, setNewStatus] = useState<Employee['status']>('active');
  const [newTasksTotal, setNewTasksTotal] = useState(4);
  const [newTasksCompleted, setNewTasksCompleted] = useState(3);
  const [newDeliverable, setNewDeliverable] = useState('');
  const [addNotice, setAddNotice] = useState<string | null>(null);
  const [addError, setAddError] = useState<string | null>(null);

  // Delete / Remove confirmation state
  const [employeeToRemove, setEmployeeToRemove] = useState<Employee | null>(null);

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

  // Update default suggested code when modal opens
  const openAddModal = () => {
    const nextCodeNumber = 100 + employees.length + 1;
    setNewCode(`EMP-${nextCodeNumber}`);
    setNewName('');
    setNewRole('');
    setNewDeptId(selectedDeptId !== 'all' ? selectedDeptId : 'it');
    setNewShiftId('shift-morning');
    setNewStatus('active');
    setNewTasksTotal(4);
    setNewTasksCompleted(3);
    setNewDeliverable('');
    setAddNotice(null);
    setAddError(null);
    setIsAddModalOpen(true);
  };

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newRole.trim()) return;

    const trimmedCode = (newCode.trim() || `EMP-${Date.now().toString().slice(-3)}`).toUpperCase();
    if (employees.some(emp => emp.code.toUpperCase() === trimmedCode)) {
      setAddError(`Employee Code "${trimmedCode}" is already in use by another employee. Please provide a unique code.`);
      return;
    }
    setAddError(null);

    const deptObj = DEPARTMENTS.find(d => d.id === newDeptId) || DEPARTMENTS[0];
    const shiftObj = SHIFTS.find(s => s.id === newShiftId) || SHIFTS[0];

    const initials = newName.trim().split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || 'EM';
    const total = Math.max(0, Number(newTasksTotal) || 0);
    const completed = Math.min(total, Math.max(0, Number(newTasksCompleted) || 0));
    const completionPercent = calculateQuotaPercent(completed, total);

    const createdEmployee: Employee = {
      id: `emp-${Date.now()}`,
      code: trimmedCode,
      name: newName.trim(),
      avatar: initials,
      role: newRole.trim(),
      department: deptObj.name,
      departmentId: deptObj.id,
      shiftId: shiftObj.id,
      shiftName: `${shiftObj.name.split(' ')[0]} (${shiftObj.startTime.replace(' ', '')} - ${shiftObj.endTime.replace(' ', '')})`,
      shiftHours: `${shiftObj.startTime} - ${shiftObj.endTime}`,
      status: newStatus,
      idleMinutes: newStatus === 'idle' ? 6 : 0,
      lastHeartbeat: 'Just now',
      todayHours: newStatus === 'active' ? 2.5 : 0,
      monthlyScore: 94.0,
      monthlyIdlePercent: 6.0,
      autoLaunchEnabled: true,
      latestUpdate: newDeliverable.trim() || 'Assigned to active department sprint and synchronized desktop telemetry',
      latestUpdateProject: `${deptObj.name.split(' ')[0]} Core Sprint`,
      email: `${newName.toLowerCase().replace(/[^a-z0-9]/g, '.')}@apexwork.internal`,
      joinedDate: 'Sep 2026',
      dailyTasksCompleted: completed,
      dailyTasksTotal: total,
      dailyWorkCompletionPercent: completionPercent,
      deliverableSummary: newDeliverable.trim() || 'Initial onboarded deliverables',
      avgActivityDensity: 88,
      evasionAlertsCount: 0
    };

    const updated = [createdEmployee, ...employees];
    setEmployees(updated);
    try {
      localStorage.setItem('apexwork_employees_directory', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
      try {
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'apexwork_employees_directory',
          newValue: JSON.stringify(updated)
        }));
      } catch {}
    } catch {
      // Ignore
    }

    setAddNotice(`Successfully added ${createdEmployee.name} to ${deptObj.name}!`);
    setTimeout(() => {
      setIsAddModalOpen(false);
      setAddNotice(null);
    }, 900);
  };

  const handleConfirmRemove = () => {
    if (!employeeToRemove) return;
    const updated = employees.filter(e => e.id !== employeeToRemove.id);
    setEmployees(updated);
    if (activeEmployee?.id === employeeToRemove.id) {
      setActiveEmployee(null);
    }
    try {
      localStorage.setItem('apexwork_employees_directory', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
      try {
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'apexwork_employees_directory',
          newValue: JSON.stringify(updated)
        }));
      } catch {}
    } catch {
      // Ignore
    }
    setEmployeeToRemove(null);
  };

  const handleResetToDefaultEmployees = () => {
    setEmployees(EMPLOYEES);
    try {
      localStorage.removeItem('apexwork_employees_directory');
      window.dispatchEvent(new Event('storage'));
      try {
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'apexwork_employees_directory',
          newValue: null
        }));
      } catch {}
    } catch {
      // Ignore
    }
  };

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
    if (activeEmployee?.id === updatedEmp.id) {
      setActiveEmployee(updatedEmp);
    }
    if (quotaModalEmployee?.id === updatedEmp.id) {
      setQuotaModalEmployee(updatedEmp);
    }
  };

  // 1-Click quick quota adjustment directly from employee profile card
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
        if (activeEmployee?.id === empId) setActiveEmployee(updatedEmp);
        if (quotaModalEmployee?.id === empId) setQuotaModalEmployee(updatedEmp);
      }
      return next;
    });
  };

  // Filter employees
  const filteredEmployees = employees.filter(emp => {
    const matchesDept = selectedDeptId === 'all' || emp.departmentId === selectedDeptId;
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          emp.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          emp.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const currentDeptInfo = DEPARTMENTS.find(d => d.id === selectedDeptId);
  const totalEmployeesCount = employees.length;
  const activeNowTotal = employees.filter(e => e.status === 'active').length;

  // Dynamic department counters
  const currentDeptActiveCount = currentDeptInfo
    ? employees.filter(e => e.departmentId === currentDeptInfo.id && e.status === 'active').length
    : activeNowTotal;

  const currentDeptHeadcount = currentDeptInfo
    ? employees.filter(e => e.departmentId === currentDeptInfo.id).length
    : totalEmployeesCount;

  const currentDeptAvgScore = currentDeptInfo
    ? (() => {
        const deptEmps = employees.filter(e => e.departmentId === currentDeptInfo.id);
        if (deptEmps.length === 0) return 0;
        return (deptEmps.reduce((acc, curr) => acc + curr.monthlyScore, 0) / deptEmps.length).toFixed(1);
      })()
    : employees.length > 0
      ? (employees.reduce((acc, curr) => acc + curr.monthlyScore, 0) / employees.length).toFixed(1)
      : '93.8';

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
                {t('departments.hierarchy_badge', 'Organizational Hierarchy')}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                {t('antievation.title', 'Anti-Evasion Protected')}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {t('departments.title', 'Department Portfolios & Employee Directories')}
            </h1>
            <p className="text-sm text-slate-300/80 mt-1 max-w-2xl leading-relaxed">
              {t('departments.subtitle', 'Manage staffing headcount, assigned shifts, monthly activity ratios, and daily work completion progress.')}
            </p>
          </div>

          {/* Action Bar: Search & Add Employee Button */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-cyan-400/70 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('departments.search_placeholder', 'Search employee, role, or code...')}
                className="w-full bg-[#070a12]/90 border border-cyan-500/20 rounded-2xl pl-9 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-400 shadow-inner"
              />
            </div>

            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-lg shadow-cyan-500/25 cursor-pointer whitespace-nowrap"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ {t('Add Employee', 'Add Employee')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Department Tabs with Dynamic Badges */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 custom-scrollbar">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedDeptId('all')}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedDeptId === 'all'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                : 'bg-[#0a0f1d]/70 text-slate-300 hover:bg-[#0f172a] border border-cyan-500/10'
            }`}
          >
            {t('common.all', 'All')} ({totalEmployeesCount})
          </button>
          {DEPARTMENTS.map(dept => {
            const deptEmployeeCount = employees.filter(e => e.departmentId === dept.id).length;
            return (
              <button
                key={dept.id}
                onClick={() => setSelectedDeptId(dept.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedDeptId === dept.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                    : 'bg-[#0a0f1d]/70 text-slate-300 hover:bg-[#0f172a] border border-cyan-500/10'
                }`}
              >
                {t(dept.name, dept.name)} ({deptEmployeeCount})
              </button>
            );
          })}
        </div>

        {employees.length !== EMPLOYEES.length && (
          <button
            onClick={handleResetToDefaultEmployees}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 bg-[#0a0f1d] px-3.5 py-2 rounded-2xl border border-cyan-500/20 transition-colors whitespace-nowrap cursor-pointer shadow-sm"
            title={t('common.restore_defaults', 'Reset directory to original demo list')}
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('common.restore_defaults', 'Restore Defaults')}</span>
          </button>
        )}
      </div>

      {/* Department Overview Banner (Dynamic Headcount & Active Now) */}
      {currentDeptInfo ? (
        <div className="bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-cyan-300 font-semibold bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-lg">
                [{currentDeptInfo.code}]
              </span>
              <h2 className="text-lg font-bold text-white">{t(currentDeptInfo.name, currentDeptInfo.name)}</h2>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">{t(currentDeptInfo.description, currentDeptInfo.description)}</p>
            <div className="text-[11px] text-slate-300 pt-1">
              <span className="text-slate-400">{t('departments.dept_lead', 'Department Lead:')}</span> <span className="font-semibold text-white">{currentDeptInfo.head}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-[#070a12]/90 p-3.5 rounded-2xl border border-cyan-500/20 text-xs shadow-inner">
            <div className="text-center px-2">
              <div className="text-slate-400 text-[10px] uppercase tracking-wider">{t('departments.headcount', 'Headcount')}</div>
              <div className="text-base font-bold text-white font-mono mt-0.5">{currentDeptHeadcount}</div>
            </div>
            <div className="w-px h-8 bg-cyan-500/20"></div>
            <div className="text-center px-2">
              <div className="text-slate-400 text-[10px] uppercase tracking-wider">{t('departments.online_now', 'Active Now')}</div>
              <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">{currentDeptActiveCount}</div>
            </div>
            <div className="w-px h-8 bg-cyan-500/20"></div>
            <div className="text-center px-2">
              <div className="text-slate-400 text-[10px] uppercase tracking-wider">{t('departments.avg_score', 'Avg Score')}</div>
              <div className="text-base font-bold text-cyan-400 font-mono mt-0.5">{currentDeptAvgScore}%</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Building className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold text-white">{t('departments.corp_operations', 'ApexWork Corporate Operations')}</h2>
              </div>
              <p className="text-xs text-slate-400 max-w-2xl">
                {t('departments.corp_desc', 'Cross-functional enterprise deployment across Engineering, Growth Marketing, Corporate Finance, HR, and Creative Media.')}
              </p>
            </div>
            <div className="flex items-center gap-4 bg-[#070a12]/90 p-3.5 rounded-2xl border border-cyan-500/20 text-xs shadow-inner">
              <div className="text-center px-2">
                <div className="text-slate-400 text-[10px] uppercase tracking-wider">{t('departments.total_staff', 'Total Staff')}</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">{totalEmployeesCount}</div>
              </div>
              <div className="w-px h-8 bg-cyan-500/20"></div>
              <div className="text-center px-2">
                <div className="text-slate-400 text-[10px] uppercase tracking-wider">{t('departments.online_now', 'Online Now')}</div>
                <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">{activeNowTotal}</div>
              </div>
              <div className="w-px h-8 bg-cyan-500/20"></div>
              <div className="text-center px-2">
                <div className="text-slate-400 text-[10px] uppercase tracking-wider">{t('departments.divisions', 'Divisions')}</div>
                <div className="text-base font-bold text-cyan-400 font-mono mt-0.5">{DEPARTMENTS.length}</div>
              </div>
            </div>
          </div>

          {/* 5 Department Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {DEPARTMENTS.map(d => {
              const deptEmps = employees.filter(e => e.departmentId === d.id);
              const deptActive = deptEmps.filter(e => e.status === 'active').length;
              return (
                <div
                  key={d.id}
                  onClick={() => setSelectedDeptId(d.id)}
                  className="bg-[#0a0f1d]/75 hover:bg-[#0a0f1d] border border-cyan-500/15 hover:border-cyan-500/40 p-4 rounded-2xl cursor-pointer transition-all space-y-2 group shadow-sm hover:shadow-cyan-950/30"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                      {d.code}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                      {deptActive} {t('departments.active_stat', 'active')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                      {t(d.name, d.name)}
                    </h3>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{t('departments.lead_label', 'Lead:')} {d.head}</p>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-cyan-500/10 text-[10px]">
                    <span className="text-slate-400">{t('departments.headcount', 'Headcount')}</span>
                    <span className="font-bold text-white font-mono">{deptEmps.length}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Employees Grid or Empty State */}
      {filteredEmployees.length === 0 ? (
        <div className="p-12 text-center bg-[#0a0f1d]/70 border border-cyan-500/20 rounded-3xl space-y-3">
          <Users className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">{t('departments.no_employees_found', 'No Employees Found')}</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {t('departments.no_match_desc', 'No team members match this filter.')}
          </p>
          <div className="flex justify-center gap-2 pt-2">
            <button
              onClick={() => { setSearchQuery(''); setSelectedDeptId('all'); }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-xl cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('departments.reset_filters', 'Reset Filters')}</span>
            </button>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-200 bg-[#070a12] hover:bg-[#0f172a] px-4 py-2 rounded-xl border border-cyan-500/20 cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{t('departments.add_employee_here', 'Add Employee Here')}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((emp) => (
            <div
              key={emp.id}
              className="bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-500/40 rounded-3xl p-5 shadow-xl hover:shadow-cyan-950/30 flex flex-col justify-between transition-all group"
            >
              <div className="space-y-4">
                {/* Card Header: Avatar, Name, Code, Status */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-900 via-indigo-900 to-cyan-600 text-cyan-200 border border-cyan-400/30 font-bold text-base flex items-center justify-center shadow-md shadow-cyan-950/50 flex-shrink-0">
                      {emp.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                        {emp.name}
                        {emp.avgActivityDensity && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                            ⚡ {emp.avgActivityDensity}%
                          </span>
                        )}
                      </h3>
                      <div className="text-[11px] text-slate-400 font-medium">
                        {emp.role}
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] bg-[#070a12] text-cyan-300 px-2 py-0.5 rounded-lg border border-cyan-500/20">
                    {emp.code}
                  </span>
                </div>

                {/* Department & Shift Badges */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Briefcase className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span className="truncate">{t(emp.department, emp.department)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="font-medium text-white font-mono">{emp.shiftHours}</span>
                  </div>
                </div>

                {/* Monthly Active Meter */}
                <div className="bg-[#070a12]/90 p-3 rounded-2xl border border-cyan-500/10 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-medium">{t('departments.monthly_active_ratio', 'Monthly Active Ratio')}</span>
                    <span className="text-emerald-400 font-bold font-mono">{emp.monthlyScore}%</span>
                  </div>
                  <div className="w-full bg-[#0a0f1d] h-2 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all shadow-sm shadow-cyan-500/20"
                      style={{ width: `${emp.monthlyScore}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>{t('departments.idle_stat', 'Idle:')} {emp.monthlyIdlePercent}%</span>
                    <span>{t('departments.today_stat', 'Today:')} {emp.todayHours} {t('common.hrs', 'hrs')}</span>
                  </div>
                </div>

                {/* Work Quota / Target (কাজের সীমা) & Completion (Quote 2) */}
                {(() => {
                  const quota = Math.max(0, emp.dailyTasksTotal ?? 0);
                  const completed = Math.max(0, emp.dailyTasksCompleted ?? 0);
                  const percent = calculateQuotaPercent(completed, quota);
                  const barColor = getQuotaProgressBarColor(percent);
                  const statusObj = getQuotaStatus(completed, quota);

                  return (
                    <div className="bg-[#070a12]/90 p-3 rounded-2xl border border-cyan-500/10 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-300 font-semibold flex items-center gap-1.5 truncate">
                          <Target className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                          <span>{t('Work Quota / Target (কাজের সীমা):', 'Work Quota / Target (কাজের সীমা):')} {quota} {t('common.tasks', 'Tasks')}</span>
                        </span>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <div className="flex items-center gap-0.5 bg-[#0a0f1d] border border-cyan-500/20 rounded-lg p-0.5">
                            <button
                              type="button"
                              onClick={() => handleQuickAdjustQuota(emp.id, -1)}
                              className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-bold transition-colors cursor-pointer"
                              title={t('Decrease daily quota by 1', 'Decrease daily quota by 1')}
                            >
                              -
                            </button>
                            <button
                              type="button"
                              onClick={() => handleQuickAdjustQuota(emp.id, 1)}
                              className="w-5 h-5 rounded flex items-center justify-center text-cyan-300 hover:text-white hover:bg-cyan-600 text-xs font-bold transition-colors cursor-pointer"
                              title={t('Increase daily quota by 1', 'Increase daily quota by 1')}
                            >
                              +
                            </button>
                          </div>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusObj.badgeClass}`}>
                            {t(statusObj.label, statusObj.label)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-mono">
                          {t('Completed:', 'Completed:')} {completed} / {quota} {t('common.tasks', 'Tasks')} ({percent}%)
                        </span>
                        <span className={`font-mono font-bold ${
                          percent >= 80 ? 'text-emerald-400' : percent >= 50 ? 'text-amber-400' : 'text-rose-400'
                        }`}>
                          {percent}%
                        </span>
                      </div>

                      {/* Visual progress bar color-coded: Green >=80%, Amber 50-79%, Red <50% */}
                      <div className="w-full bg-[#0a0f1d] h-2 rounded-full overflow-hidden border border-slate-800">
                        <div 
                          className={`bg-gradient-to-r ${barColor} h-full rounded-full transition-all duration-300 shadow-sm`}
                          style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="truncate max-w-[170px]" title={emp.deliverableSummary}>
                          {emp.deliverableSummary || t('departments.no_deliverable', 'No deliverable reported')}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuotaModalEmployee(emp)}
                          className="text-cyan-400 hover:text-cyan-300 font-medium hover:underline cursor-pointer flex-shrink-0"
                        >
                          {t('departments.edit_quota', 'Edit Quota')}
                        </button>
                      </div>
                    </div>
                  );
                })()}

                {/* Latest Work Task */}
                <div className="text-xs bg-[#070a12]/70 p-2.5 rounded-xl border border-cyan-500/10">
                  <div className="text-[10px] uppercase font-semibold text-slate-400 mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    {t('departments.latest_progress_update', 'Latest Progress Update')}
                  </div>
                  <p className="text-slate-300 line-clamp-2 text-[11px] leading-relaxed">
                    &ldquo;{emp.latestUpdate}&rdquo;
                  </p>
                </div>
              </div>

              {/* Card Footer: Remove Button & Edit Quota / View Tasks & View Portfolio */}
              <div className="pt-4 mt-4 border-t border-cyan-500/10 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => setEmployeeToRemove(emp)}
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer border border-transparent hover:border-rose-500/20"
                  title={t('departments.remove_title', 'Remove Employee from Directory')}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t('Remove', 'Remove')}</span>
                </button>

                <div className="flex items-center gap-1.5 ml-auto">
                  <button
                    onClick={() => setQuotaModalEmployee(emp)}
                    className="inline-flex items-center gap-1 text-cyan-300 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-sm"
                    title={t('departments.edit_quota_tasks', 'Edit Quota and View Tasks')}
                  >
                    <Target className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{t('Edit Quota / View Tasks', 'Edit Quota / View Tasks')}</span>
                  </button>
                  <button
                    onClick={() => setActiveEmployee(emp)}
                    className="inline-flex items-center gap-1 bg-[#070a12] hover:bg-[#0f172a] text-slate-200 border border-cyan-500/20 hover:border-cyan-500/40 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t('departments.portfolio', 'Portfolio')}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Detailed Employee Portfolio */}
      <Modal
        isOpen={!!activeEmployee}
        onClose={() => setActiveEmployee(null)}
        title={activeEmployee ? `${activeEmployee.name} — ${t('departments.portfolio', 'Full Portfolio')}` : ''}
        subtitle={activeEmployee ? `${activeEmployee.role} • ${t(activeEmployee.department, activeEmployee.department)}` : ''}
        maxWidth="3xl"
      >
        {activeEmployee && (
          <div className="space-y-6 text-xs text-slate-300">
            {/* Header info */}
            <div className="flex items-center justify-between p-4 bg-[#070a12] rounded-2xl border border-cyan-500/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-900 to-indigo-900 text-cyan-200 border border-cyan-400/30 font-bold text-lg flex items-center justify-center">
                  {activeEmployee.avatar}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{activeEmployee.name}</h4>
                  <p className="text-slate-400 text-xs">{activeEmployee.email} • ID: {activeEmployee.code}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-semibold text-emerald-400">{t('departments.shift_verified', 'Shift Verified')}</div>
                <div className="text-[11px] text-slate-400 font-mono">{activeEmployee.shiftHours}</div>
              </div>
            </div>

            {/* Performance Indicators */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 bg-[#070a12] rounded-2xl border border-cyan-500/15 text-center">
                <div className="text-slate-400 text-[10px] uppercase tracking-wider">{t('dashboard.today_logged', 'Today Logged')}</div>
                <div className="text-xl font-bold text-white font-mono mt-1">{activeEmployee.todayHours} {t('common.hrs', 'hrs')}</div>
              </div>
              <div className="p-3.5 bg-[#070a12] rounded-2xl border border-cyan-500/15 text-center">
                <div className="text-slate-400 text-[10px] uppercase tracking-wider">{t('departments.active_score', 'Active Score')}</div>
                <div className="text-xl font-bold text-emerald-400 font-mono mt-1">{activeEmployee.monthlyScore}%</div>
              </div>
              <div className="p-3.5 bg-[#070a12] rounded-2xl border border-cyan-500/15 text-center">
                <div className="text-slate-400 text-[10px] uppercase tracking-wider">{t('dashboard.idle_ratio', 'Idle Ratio')}</div>
                <div className="text-xl font-bold text-amber-400 font-mono mt-1">{activeEmployee.monthlyIdlePercent}%</div>
              </div>
            </div>

            {/* Daily Work Completion & Tasks Progress (Quote 2 & 3) */}
            <div className="p-4 bg-[#070a12] rounded-2xl border border-cyan-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold text-white">
                    {t('Work Quota / Target (কাজের সীমা):', 'Work Quota / Target (কাজের সীমা):')} {activeEmployee.dailyTasksTotal ?? 0} {t('common.tasks', 'Tasks')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const emp = activeEmployee;
                    setActiveEmployee(null);
                    setQuotaModalEmployee(emp);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 px-3 py-1.5 rounded-xl transition-colors cursor-pointer shadow-sm"
                >
                  <Target className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t('Edit Quota / View Tasks', 'Edit Quota / View Tasks')}</span>
                </button>
              </div>
              
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                  <span className="text-slate-400">
                    {t('Completed:', 'Completed:')} {activeEmployee.dailyTasksCompleted ?? 0} / {activeEmployee.dailyTasksTotal ?? 0} {t('common.tasks', 'Tasks')} ({calculateQuotaPercent(activeEmployee.dailyTasksCompleted, activeEmployee.dailyTasksTotal)}%)
                  </span>
                  <span className="font-semibold text-white font-mono">
                    {calculateQuotaPercent(activeEmployee.dailyTasksCompleted, activeEmployee.dailyTasksTotal)}% {t('ledger.fulfilled', 'Fulfilled')}
                  </span>
                </div>
                <div className="w-full bg-[#0a0f1d] h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className={`bg-gradient-to-r ${getQuotaProgressBarColor(calculateQuotaPercent(activeEmployee.dailyTasksCompleted, activeEmployee.dailyTasksTotal))} h-full rounded-full transition-all`}
                    style={{ width: `${Math.min(100, Math.max(0, calculateQuotaPercent(activeEmployee.dailyTasksCompleted, activeEmployee.dailyTasksTotal)))}%` }}
                  />
                </div>
              </div>

              {activeEmployee.deliverableSummary && (
                <div className="text-[11px] text-slate-300 bg-[#0a0f1d] p-3 rounded-xl border border-cyan-500/10 flex items-start gap-2">
                  <span className="text-slate-400 font-semibold flex-shrink-0">{t("dashboard.today_deliverable_heading", "Today's Deliverable:")}</span>
                  <span className="text-slate-200">&ldquo;{activeEmployee.deliverableSummary}&rdquo;</span>
                </div>
              )}
            </div>

            {/* Department Project Focus */}
            <div className="p-4 bg-[#070a12] rounded-2xl border border-cyan-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">{t('departments.current_active_assignment', 'Current Active Assignment')}</span>
                <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2 py-0.5 rounded">
                  {activeEmployee.latestUpdateProject}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed bg-[#0a0f1d] p-3 rounded-xl border border-cyan-500/10">
                {activeEmployee.latestUpdate}
              </p>
            </div>

            {/* Automated Duty Triggers */}
            <div className="p-4 bg-[#070a12] rounded-2xl border border-cyan-500/20 space-y-2">
              <div className="font-semibold text-white">{t('departments.client_trigger_specification', 'Client Trigger Specification')}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div className="flex justify-between p-2.5 rounded-xl bg-[#0a0f1d] border border-cyan-500/10">
                  <span className="text-slate-400">{t('departments.desktop_autostart_label', 'Desktop Auto-Start:')}</span>
                  <span className="text-emerald-400 font-medium">{t('departments.enabled_shift_start', 'Enabled (On Shift Start)')}</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-[#0a0f1d] border border-cyan-500/10">
                  <span className="text-slate-400">{t('departments.grace_window_label', 'Grace Check-in Window:')}</span>
                  <span className="text-slate-200 font-mono">10 {t('settings.minutes', 'Minutes')}</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-[#0a0f1d] border border-cyan-500/10">
                  <span className="text-slate-400">{t('departments.idle_threshold_label', 'Idle Trigger Threshold:')}</span>
                  <span className="text-slate-200 font-mono">10 {t('settings.minutes', 'Minutes')}</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-[#0a0f1d] border border-cyan-500/10">
                  <span className="text-slate-400">{t('departments.data_vault_policy_label', 'Data Vault Policy:')}</span>
                  <span className="text-cyan-300 font-mono">{t('departments.discretionary_governance', 'Discretionary Manual Governance')}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-300 text-[11px]">
              <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-400" />
              <span>
                {t('departments.privacy_statement', 'Employee Privacy Statement: ApexWork does not log keystrokes, personal chats, or record ambient audio/webcam feeds.')}
              </span>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal: Add New Employee (Quote 2) */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={t('departments.add_modal_title', 'Add New Employee')}
        subtitle={t('departments.add_modal_subtitle', 'Expand team directory, assign department and shift, and configure daily tasks')}
        maxWidth="lg"
      >
        <form onSubmit={handleAddEmployee} className="space-y-4 text-xs">
          {addNotice && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{addNotice}</span>
            </div>
          )}

          {addError && (
            <div className="p-3 bg-rose-950/40 border border-rose-500/30 rounded-xl text-rose-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{addError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">{t('departments.full_name', 'Full Name *')}</label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Shakib Al Hasan"
                className="w-full bg-[#070a12] border border-cyan-500/20 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">{t('departments.employee_code', 'Employee Code *')}</label>
              <input
                type="text"
                required
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                placeholder="e.g. EMP-127"
                className="w-full bg-[#070a12] border border-cyan-500/20 rounded-xl p-2.5 text-slate-200 font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">{t('departments.department_select', 'Department *')}</label>
              <select
                value={newDeptId}
                onChange={(e) => setNewDeptId(e.target.value)}
                className="w-full bg-[#070a12] border border-cyan-500/20 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                {DEPARTMENTS.map(d => (
                  <option key={d.id} value={d.id} className="bg-[#0a0f1d]">{t(d.name, d.name)} ({d.code})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">{t('departments.role_designation', 'Designation / Role *')}</label>
              <input
                type="text"
                required
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                placeholder="e.g. AI Automation Specialist"
                className="w-full bg-[#070a12] border border-cyan-500/20 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">{t('departments.assigned_shift', 'Assigned Shift *')}</label>
              <select
                value={newShiftId}
                onChange={(e) => setNewShiftId(e.target.value)}
                className="w-full bg-[#070a12] border border-cyan-500/20 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                {SHIFTS.map(s => (
                  <option key={s.id} value={s.id} className="bg-[#0a0f1d]">{t(s.name, s.name)} ({s.startTime} - {s.endTime})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">{t('departments.initial_telemetry_status', 'Initial Telemetry Status')}</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as Employee['status'])}
                className="w-full bg-[#070a12] border border-cyan-500/20 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="active" className="bg-[#0a0f1d]">{t('departments.status_active_online', 'Active Now (Online)')}</option>
                <option value="idle" className="bg-[#0a0f1d]">{t('common.idle', 'Idle')}</option>
                <option value="break" className="bg-[#0a0f1d]">{t('dashboard.on_break', 'On Break')}</option>
                <option value="offline" className="bg-[#0a0f1d]">{t('common.offline', 'Offline')}</option>
              </select>
            </div>
          </div>

          {/* Daily Tasks Configuration (Quote 2 & 3) */}
          <div className="p-3.5 bg-[#070a12] rounded-2xl border border-cyan-500/20 space-y-3">
            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t('departments.quota_deliverables_setup', 'Work Quota / Target (কাজের সীমা) & Deliverables Setup')}</span>
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 text-[11px] mb-1">
                  {t('departments.work_quota_target_label', 'Work Quota / Target (কাজের সীমা) *')}
                </label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={newTasksTotal}
                  onChange={(e) => setNewTasksTotal(parseInt(e.target.value) || 0)}
                  className="w-full bg-[#0a0f1d] border border-cyan-500/20 rounded-xl p-2 text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-[11px] mb-1">
                  {t('departments.initial_tasks_completed', 'Initial Tasks Completed')}
                </label>
                <input
                  type="number"
                  min="0"
                  max={newTasksTotal}
                  value={newTasksCompleted}
                  onChange={(e) => setNewTasksCompleted(parseInt(e.target.value) || 0)}
                  className="w-full bg-[#0a0f1d] border border-cyan-500/20 rounded-xl p-2 text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 text-[11px] mb-1">{t('departments.current_deliverable_summary', 'Current Deliverable Summary')}</label>
              <input
                type="text"
                value={newDeliverable}
                onChange={(e) => setNewDeliverable(e.target.value)}
                placeholder="e.g. Enterprise dashboard redesign & client sync"
                className="w-full bg-[#0a0f1d] border border-cyan-500/20 rounded-xl p-2 text-slate-200 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-cyan-500/10">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-[#070a12] text-slate-300 hover:bg-[#0f172a] font-medium border border-cyan-500/10"
            >
              {t('common.cancel', 'Cancel')}
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{t('departments.save_add_employee', 'Save & Add Employee')}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal: Confirm Remove Employee */}
      <Modal
        isOpen={!!employeeToRemove}
        onClose={() => setEmployeeToRemove(null)}
        title={t('departments.remove_modal_title', 'Confirm Removal of Employee')}
        subtitle={t('departments.remove_modal_subtitle', 'Adjust headcount and remove from active organizational directory')}
        maxWidth="md"
      >
        {employeeToRemove && (
          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-4 bg-rose-950/30 border border-rose-500/30 rounded-2xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-semibold text-white">{t('departments.permanent_directory_removal', 'Permanent Directory Removal')}</span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {t('departments.confirm_remove_p1', 'Are you sure you want to remove')} <strong className="text-white">{employeeToRemove.name}</strong> ({employeeToRemove.code}) from <strong className="text-white">{t(employeeToRemove.department, employeeToRemove.department)}</strong>?
                </p>
                <p className="text-[11px] text-slate-400">
                  {t('departments.confirm_remove_p2', 'This will dynamically decrease the department headcount, active counters, and update company roster matrices across all dashboard views.')}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-cyan-500/10">
              <button
                type="button"
                onClick={() => setEmployeeToRemove(null)}
                className="px-4 py-2 rounded-xl bg-[#070a12] text-slate-300 hover:bg-[#0f172a] font-medium border border-cyan-500/10 cursor-pointer"
              >
                {t('common.cancel', 'Cancel')}
              </button>
              <button
                type="button"
                onClick={handleConfirmRemove}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold shadow-lg shadow-rose-600/30 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t('departments.confirm_removal_btn', 'Confirm Removal')}</span>
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal: Individual Work & Quota Ledger */}
      <IndividualWorkLedgerModal
        isOpen={!!quotaModalEmployee}
        onClose={() => setQuotaModalEmployee(null)}
        employee={quotaModalEmployee}
        onUpdateEmployee={handleUpdateEmployee}
      />
    </div>
  );
}
