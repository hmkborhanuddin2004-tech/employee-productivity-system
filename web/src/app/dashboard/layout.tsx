'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

import { useLanguage } from '@/context/LanguageContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex relative overflow-x-hidden obsidian-mesh-bg">
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={mobileSidebarOpen} 
        onClose={() => setMobileSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-72 min-w-0">
        {/* Top Header */}
        <Header 
          onToggleMobileSidebar={() => setMobileSidebarOpen(prev => !prev)} 
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>

        {/* Dashboard Footer Bar */}
        <footer className="border-t border-cyan-500/15 px-4 sm:px-8 py-4 bg-[#0a0f1d]/70 backdrop-blur-xl text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block shadow-[0_0_8px_rgba(6,182,212,0.6)]"></span>
            <span className="text-slate-300">{t('footer.gateway_ver', 'ApexWork Telemetry Gateway v2.4 (Encrypted WSS / HTTPS)')}</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>{t('footer.server_time', 'Server Time: Dhaka BST (GMT+6)')}</span>
            <span className="text-emerald-400 font-mono">{t('footer.zero_keystroke_enforced', 'Zero Keystroke Policy: Enforced')}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
