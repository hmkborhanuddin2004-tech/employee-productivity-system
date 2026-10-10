'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Bell, 
  Menu, 
  Clock, 
  UserCheck, 
  ShieldAlert,
  ChevronDown,
  X,
  ArrowRight,
  LayoutDashboard,
  CalendarClock,
  Camera,
  FileText,
  Settings
} from 'lucide-react';
import { EMPLOYEES, Employee } from '@/lib/demo-data';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';

interface HeaderProps {
  onToggleMobileSidebar: () => void;
}

export default function Header({ onToggleMobileSidebar }: HeaderProps) {
  const router = useRouter();
  const { t } = useLanguage();
  const [employees, setEmployees] = useState<Employee[]>(EMPLOYEES);
  const [role, setRole] = useState<'Admin' | 'Supervisor'>('Admin');
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Hydrate employees directory from localStorage on load & cross-tab sync
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

    const handleStorage = (e: StorageEvent | Event) => {
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
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const activeCount = employees.filter(e => e.status === 'active').length;
  const totalCount = employees.length;

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(prev => !prev);
      }
      if (e.key === 'Escape') {
        setShowCommandPalette(false);
        setShowRoleMenu(false);
        setShowNotificationToast(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered search results for command palette
  const matchingEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.code.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  const NAV_LINKS = [
    { key: 'nav.overview_dashboard', name: 'Overview Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { key: 'nav.departments', name: 'Department Portfolios', href: '/dashboard/departments', icon: UserCheck },
    { key: 'nav.roster_planner', name: 'Shift Roster Planner', href: '/dashboard/roster', icon: CalendarClock },
    { key: 'nav.analytics_visual', name: 'Monthly Visual Analytics', href: '/dashboard/analytics', icon: LayoutDashboard },
    { key: 'nav.screenshots', name: 'Audited Screenshot Vault', href: '/dashboard/screenshots', icon: Camera },
    { key: 'nav.work_updates', name: 'Work Updates Feed', href: '/dashboard/work-updates', icon: FileText },
    { key: 'nav.settings', name: 'Policy & Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const matchingNav = NAV_LINKS.filter(nav =>
    nav.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t(nav.key, nav.name).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-[#070a12]/80 backdrop-blur-xl border-b border-cyan-500/15 px-4 sm:px-8 flex items-center justify-between gap-4">
        {/* Left side: Hamburger & Shift Status Pill */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-900 lg:hidden cursor-pointer"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Live Shift Pill */}
          <div className="hidden sm:flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-full text-xs text-emerald-300 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-medium">{t('header.shift_live', 'Morning Shift Live')}</span>
            <span className="text-emerald-400/60 font-mono text-[11px]">(09:00 AM - 06:00 PM BST)</span>
          </div>

          {/* Anti-Evasion Status Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 bg-cyan-950/40 border border-cyan-500/30 px-2.5 py-1 rounded-full text-[11px] text-cyan-300 font-mono shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>⚡ {t('antievation.badge', 'Anti-Evasion Engine Active')}</span>
          </div>

          {/* Simulated Supervisor Mode Badge */}
          {role === 'Supervisor' && (
            <span className="hidden xl:inline-flex items-center gap-1 text-[11px] bg-amber-500/10 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded-md font-medium">
              {t('header.supervisor_view', 'Supervisor View')}
            </span>
          )}
        </div>

        {/* Center Search Bar (Launches Command Palette) */}
        <div className="flex-1 max-w-md hidden md:block">
          <div 
            onClick={() => setShowCommandPalette(true)}
            className="relative cursor-pointer group"
          >
            <Search className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2 transition-colors pointer-events-none" />
            <div className="w-full bg-[#0a0f1d] hover:bg-slate-900 border border-cyan-500/20 group-hover:border-cyan-400/40 rounded-xl pl-9 pr-12 py-1.5 text-xs text-slate-400 group-hover:text-slate-200 transition-all flex items-center justify-between shadow-sm">
              <span>{t('header.search_placeholder', 'Quick search employee, route, shift...')}</span>
              <kbd className="text-[10px] font-mono text-cyan-300 bg-[#070a12] px-1.5 py-0.5 rounded border border-cyan-500/30">
                Ctrl+K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right side: Language Switcher, Active Team Counter, Role Switcher, Notifications, Profile */}
        <div className="flex items-center gap-3">
          {/* Prominent Interactive Language Switcher */}
          <LanguageSwitcher compact={false} />

          {/* Active Team Counter Pill */}
          <div className="flex items-center gap-1.5 bg-[#0a0f1d] border border-cyan-500/20 px-3 py-1.5 rounded-xl text-xs">
            <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-300 font-medium">{t('header.active_counter', 'Active:')}</span>
            <span className="font-bold text-emerald-400">{activeCount}</span>
            <span className="text-slate-400">/ {totalCount}</span>
          </div>

          {/* Role Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setShowRoleMenu(!showRoleMenu);
                setShowNotificationToast(false);
              }}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-200 transition-colors cursor-pointer"
            >
              <span className={`w-2 h-2 rounded-full ${role === 'Admin' ? 'bg-indigo-500' : 'bg-amber-500'}`}></span>
              <span>{role === 'Admin' ? t('header.role_admin', 'Executive Admin') : t('header.role_supervisor', 'Department Supervisor')}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowRoleMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-1 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                    {t('header.simulate_portal_view', 'Simulate Portal View')}
                  </div>
                  <button
                    onClick={() => { setRole('Admin'); setShowRoleMenu(false); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800 cursor-pointer ${
                      role === 'Admin' ? 'text-indigo-400 font-semibold bg-indigo-500/10' : 'text-slate-300'
                    }`}
                  >
                    <span>{t('header.role_admin', 'Executive Admin')}</span>
                    {role === 'Admin' && <span className="text-[10px] text-indigo-400 font-mono">Active</span>}
                  </button>
                  <button
                    onClick={() => { setRole('Supervisor'); setShowRoleMenu(false); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800 cursor-pointer ${
                      role === 'Supervisor' ? 'text-amber-400 font-semibold bg-amber-500/10' : 'text-slate-300'
                    }`}
                  >
                    <span>{t('header.role_supervisor', 'Department Supervisor')}</span>
                    {role === 'Supervisor' && <span className="text-[10px] text-amber-400 font-mono">Active</span>}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Notifications Icon */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotificationToast(!showNotificationToast);
                setShowRoleMenu(false);
              }}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-900 border border-slate-800 relative cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500"></span>
            </button>

            {showNotificationToast && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowNotificationToast(false)}
                />
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-4 z-50 text-xs space-y-3 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-semibold text-white">{t('header.notifications', 'System Notifications')}</span>
                    <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded font-medium">{t('header.new_notif_count', '2 New')}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/40">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-medium text-[11px]">
                        <Clock className="w-3 h-3" /> {t('header.notif_handover_title', 'Shift Handover Imminent')}
                      </div>
                      <p className="text-slate-300 text-[11px] mt-0.5">
                        {t('header.notif_handover_desc', 'Evening Support Shift starts at 02:00 PM BST. Client triggers primed across 6 workstations.')}
                      </p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/40">
                      <div className="flex items-center gap-1.5 text-amber-400 font-medium text-[11px]">
                        <ShieldAlert className="w-3 h-3" /> {t('header.notif_purge_title', 'Retention Auto-Purge Done')}
                      </div>
                      <p className="text-slate-300 text-[11px] mt-0.5">
                        {t('header.notif_purge_desc', '42 screenshots older than 30 days securely permanently deleted from S3 storage bucket.')}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-indigo-500/30">
              HB
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-semibold text-slate-200">HMk Borhan</div>
              <div className="text-[10px] text-slate-400">{t('header.chief_architect', 'Chief Architect')}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Search Command Palette Modal */}
      {showCommandPalette && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="fixed inset-0" 
            onClick={() => setShowCommandPalette(false)}
          />
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col animate-in zoom-in-95 duration-200">
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3 border-b border-slate-800 gap-3 bg-slate-950">
              <Search className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('header.palette_search_placeholder', 'Type to search employees, navigation, or features...')}
                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={() => setShowCommandPalette(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Results Body */}
            <div className="p-3 max-h-80 overflow-y-auto custom-scrollbar space-y-3 text-xs">
              {/* Navigation Links */}
              <div>
                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {t('header.modules_pages', 'Modules & Pages')}
                </div>
                <div className="space-y-1 mt-1">
                  {matchingNav.map((nav) => {
                    const Icon = nav.icon;
                    return (
                      <button
                        key={nav.href}
                        onClick={() => {
                          router.push(nav.href);
                          setShowCommandPalette(false);
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{t(nav.key, nav.name)}</span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-slate-500" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Employee Results */}
              <div>
                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {t('header.team_members', 'Team Members')} ({matchingEmployees.length})
                </div>
                <div className="space-y-1 mt-1">
                  {matchingEmployees.map((emp) => (
                    <button
                      key={emp.id}
                      onClick={() => {
                        router.push(`/dashboard/departments`);
                        setShowCommandPalette(false);
                      }}
                      className="w-full flex items-center justify-between p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-lg bg-indigo-600/30 text-indigo-300 font-bold text-[10px] flex items-center justify-center">
                          {emp.avatar}
                        </div>
                        <div>
                          <span className="font-semibold text-white">{emp.name}</span>
                          <span className="text-slate-400 text-[11px] ml-2 font-mono">[{emp.code}] • {t(emp.department, emp.department)}</span>
                        </div>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        emp.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {t('common.' + emp.status, emp.status)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>{t('header.press_esc', 'Press ESC to exit')}</span>
              <span>{t('header.quick_navigator', 'Quick Navigator')}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
