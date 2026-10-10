'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Menu, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-[#070a12]/85 backdrop-blur-xl border-b border-cyan-500/20 shadow-md shadow-cyan-950/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-cyan-400 flex items-center justify-center text-slate-950 font-black text-lg shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform">
            AW
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white tracking-tight">ApexWork</span>
              <span className="text-[10px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Enterprise
              </span>
            </div>
            <p className="text-[11px] text-slate-400">{t('brand.tagline', 'Shift Telemetry & Productivity')}</p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-cyan-300 transition-colors">{t('nav.features', 'Features')}</a>
          <a href="#shift-system" className="hover:text-cyan-300 transition-colors">{t('nav.shift_system', 'Shift Automation')}</a>
          <a href="#departments" className="hover:text-cyan-300 transition-colors">{t('nav.departments', 'Departments')}</a>
          <a href="#privacy-ethics" className="hover:text-cyan-300 transition-colors">{t('nav.privacy_ethics', 'Privacy & Ethics')}</a>
        </nav>

        {/* CTA & Language Switcher */}
        <div className="hidden md:flex items-center gap-3.5">
          {/* Prominent Language Switcher */}
          <LanguageSwitcher compact={false} />

          <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1.5 rounded-full shadow-sm shadow-emerald-500/10">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="font-semibold">{t('nav.privacy_first', 'Privacy First')}</span>
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-cyan-500/25 transition-all hover:gap-3 cursor-pointer"
          >
            <span>{t('nav.enter_portal', 'Enter Management Portal')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button & Compact Switcher */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher compact={true} />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0f1d] border-b border-cyan-500/20 px-6 py-4 space-y-3 text-sm animate-in slide-in-from-top-2">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-cyan-300 py-1"
          >
            {t('nav.features', 'Features')}
          </a>
          <a
            href="#shift-system"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-cyan-300 py-1"
          >
            {t('nav.shift_system', 'Shift Automation')}
          </a>
          <a
            href="#departments"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-cyan-300 py-1"
          >
            {t('nav.departments', 'Departments')}
          </a>
          <a
            href="#privacy-ethics"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-cyan-300 py-1"
          >
            {t('nav.privacy_ethics', 'Privacy & Ethics')}
          </a>
          <div className="pt-2">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs py-3 rounded-xl shadow-lg shadow-cyan-500/25"
            >
              <span>{t('nav.enter_portal', 'Enter Management Portal')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
