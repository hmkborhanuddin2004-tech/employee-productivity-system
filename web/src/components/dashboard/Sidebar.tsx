'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  CalendarClock, 
  BarChart3, 
  Camera, 
  FileText, 
  Settings, 
  ShieldCheck, 
  ExternalLink,
  X
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { SCREENSHOTS } from '@/lib/demo-data';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { key: 'nav.overview', name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { key: 'nav.departments', name: 'Department Portfolios', href: '/dashboard/departments', icon: Users },
  { key: 'nav.roster', name: 'Shift Roster & Schedule', href: '/dashboard/roster', icon: CalendarClock },
  { key: 'nav.analytics', name: 'Monthly Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { key: 'nav.screenshots', name: 'Screenshot Vault', href: '/dashboard/screenshots', icon: Camera },
  { key: 'nav.work_updates', name: 'Work Updates Feed', href: '/dashboard/work-updates', icon: FileText },
  { key: 'nav.settings', name: 'Policy & Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [activeScreenshotsCount, setActiveScreenshotsCount] = React.useState<number | null>(null);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('apexwork_audited_screenshots');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setTimeout(() => {
            setActiveScreenshotsCount(parsed.filter((s: { isArchived?: boolean }) => !s.isArchived).length);
          }, 0);
        }
      }
    } catch {
      // Ignore
    }

    const handleStorage = (e: StorageEvent | Event) => {
      const storageEvent = e as StorageEvent;
      if (!storageEvent.key || storageEvent.key === 'apexwork_audited_screenshots') {
        try {
          const saved = storageEvent.newValue !== undefined && storageEvent.newValue !== null ? storageEvent.newValue : localStorage.getItem('apexwork_audited_screenshots');
          if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
              setActiveScreenshotsCount(parsed.filter((s: { isArchived?: boolean }) => !s.isArchived).length);
            }
          } else {
            setActiveScreenshotsCount(SCREENSHOTS.filter(s => !s.isArchived).length);
          }
        } catch {
          // Ignore
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-[#0a0f1d]/95 backdrop-blur-2xl border-r border-cyan-500/15 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-cyan-500/15 bg-[#070a12]/80">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform">
              AW
            </div>
            <div>
              <span className="font-bold text-white text-base tracking-tight flex items-center gap-1.5">
                ApexWork
                <span className="text-[10px] uppercase font-semibold bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded border border-cyan-500/30">
                  Enterprise
                </span>
              </span>
              <p className="text-[11px] text-slate-400">{t('brand.tagline', 'Smart Shift Productivity')}</p>
            </div>
          </Link>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 lg:hidden cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {t('sidebar.workspace_management', 'Workspace Management')}
          </div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose()}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-lg shadow-cyan-600/30 font-semibold border border-cyan-400/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{t(item.key, item.name)}</span>
                {item.name === 'Screenshot Vault' && (
                  <span className="ml-auto text-[10px] bg-[#070a12] text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-500/30 font-mono">
                    {activeScreenshotsCount !== null ? activeScreenshotsCount : SCREENSHOTS.filter(s => !s.isArchived).length}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Privacy & Trust Badge */}
        <div className="p-4 border-t border-cyan-500/15 bg-[#070a12]/50">
          <div className="p-3 rounded-xl bg-[#0a0f1d] border border-cyan-500/20 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('sidebar.zero_covert_title', 'Zero Covert Monitoring')}</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {t('sidebar.zero_covert_desc', 'No keystroke loggers. Screen captures are interval-audited & automatically masked for sensitive windows.')}
            </p>
          </div>

          {/* Quick exit to public site */}
          <Link
            href="/"
            className="mt-3 flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 rounded-lg transition-colors"
          >
            <span>{t('nav.public_site', 'Public Company Site')}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>
    </>
  );
}
