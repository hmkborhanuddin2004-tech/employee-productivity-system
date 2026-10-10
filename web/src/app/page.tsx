'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  BarChart3, 
  Camera, 
  CheckCircle2, 
  Lock, 
  PlayCircle,
  EyeOff,
  Sparkles,
  Zap
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { DEPARTMENTS, EMPLOYEES, SHIFTS } from '@/lib/demo-data';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { t, language } = useLanguage();
  const activeCount = EMPLOYEES.filter(e => e.status === 'active').length;

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black obsidian-mesh-bg">
      {/* Top Public Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
          {/* Obsidian Cyan Ambient Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/15 blur-[140px] rounded-full pointer-events-none"></div>
          <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold shadow-lg shadow-cyan-950/40">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>{t('landing.badge', 'Next-Gen Enterprise Productivity Architecture')}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span className="text-slate-400">{t('landing.badge_location', 'Dhaka & Global')}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                {t('landing.hero_title_1', 'Smart Shift Tracking,')}{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
                  {t('landing.hero_title_highlight', 'Automated Daemons')}
                </span>{' '}
                {t('landing.hero_title_2', '& Transparent Analytics.')}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl mx-auto">
                {t('landing.hero_subtitle', 'The desktop agent wakes up automatically at shift time, logs active time objectively, and stores interval screenshots in an audited web vault. Zero keyloggers, zero personal spying.')}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm px-8 py-3.5 rounded-2xl shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all hover:gap-3.5 cursor-pointer"
                >
                  <span>{t('nav.launch_portal', 'Launch Management Portal')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#shift-system"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0a0f1d]/90 hover:bg-[#0f172a] text-slate-200 border border-cyan-500/20 text-sm font-semibold px-6 py-3.5 rounded-2xl transition-all cursor-pointer shadow-sm"
                >
                  <PlayCircle className="w-4 h-4 text-cyan-400" />
                  <span>{t('landing.how_it_works', 'How Auto-Launch Works')}</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>{t('landing.trust_auto_start', 'Auto-Start on Shift Time')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>{t('landing.trust_web_vault', 'Centralized Web Vault (No Telegram Mess)')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{t('landing.trust_zero_keystroke', 'Zero Keystroke Logging')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>{t('antievation.title', 'Anti-Evasion Protected')}</span>
                </div>
              </div>
            </div>

            {/* Interactive Live Preview Component - Obsidian Midnight Luxe */}
            <div className="mt-14 relative mx-auto max-w-5xl rounded-3xl border border-cyan-500/30 bg-[#0a0f1d]/90 p-2 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
              <div className="rounded-2xl border border-cyan-500/20 bg-[#070a12] overflow-hidden">
                {/* Window Bar */}
                <div className="h-11 bg-[#0a0f1d] px-4 flex items-center justify-between border-b border-cyan-500/15">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                    <span className="ml-3 text-xs font-mono text-slate-400">
                      https://apexwork.internal/dashboard
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-cyan-400" />
                      ⚡ 86.8% Density
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                        {t('landing.telemetry_gateway', 'Live Telemetry Gateway')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dashboard Snapshot Content */}
                <div className="p-6 space-y-6">
                  {/* Top quick stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-[#0a0f1d] border border-cyan-500/15">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">
                        {t('landing.active_now', 'Active Now')}
                      </div>
                      <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">
                        {activeCount} / {EMPLOYEES.length} {language === 'bn' ? 'কর্মী' : 'Team'}
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#0a0f1d] border border-cyan-500/15">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">
                        {t('landing.shift_hours_today', 'Shift Hours Today')}
                      </div>
                      <div className="text-2xl font-bold text-white font-mono mt-1">46.7 {language === 'bn' ? 'ঘণ্টা' : 'hrs'}</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#0a0f1d] border border-cyan-500/15">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">
                        {t('landing.monthly_activity', 'Monthly Activity')}
                      </div>
                      <div className="text-2xl font-bold text-cyan-400 font-mono mt-1">93.8%</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#0a0f1d] border border-cyan-500/15">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">
                        {t('landing.vault_security', 'Vault Security')}
                      </div>
                      <div className="text-xs font-bold text-emerald-400 mt-2 flex items-center gap-1 font-mono">
                        <Lock className="w-3.5 h-3.5" />
                        <span>{t('landing.expiring_links', 'Expiring Links')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Roster row preview */}
                  <div className="border border-cyan-500/15 rounded-2xl overflow-hidden text-xs">
                    <div className="bg-[#0a0f1d] px-4 py-2.5 text-cyan-400/80 font-semibold grid grid-cols-4 border-b border-cyan-500/15">
                      <div>{t('common.employee', 'Employee')}</div>
                      <div>{t('common.department', 'Department')}</div>
                      <div>{language === 'bn' ? 'নির্ধারিত শিফট' : 'Assigned Shift'}</div>
                      <div className="text-right">{language === 'bn' ? 'লাইভ স্ট্যাটাস' : 'Live Status'}</div>
                    </div>
                    <div className="divide-y divide-cyan-500/10 bg-[#070a12] font-medium">
                      {EMPLOYEES.slice(0, 3).map((emp) => (
                        <div key={emp.id} className="px-4 py-3 grid grid-cols-4 items-center">
                          <div className="flex items-center gap-2.5">
                            <span className="w-7 h-7 rounded-xl bg-gradient-to-tr from-cyan-900 to-indigo-900 text-cyan-300 text-[10px] font-bold flex items-center justify-center border border-cyan-400/30 shadow-sm">
                              {emp.avatar}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-white font-semibold">{emp.name}</span>
                              <span className="text-[9px] font-mono text-cyan-300 bg-cyan-500/10 px-1 py-0.2 rounded border border-cyan-500/20">
                                ⚡{emp.avgActivityDensity ?? 88}%
                              </span>
                            </div>
                          </div>
                          <span className="text-slate-400">{t(emp.department, emp.department)}</span>
                          <span className="font-mono text-slate-300">{emp.shiftHours}</span>
                          <div className="text-right">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                              {t('common.active', 'Active')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section id="features" className="py-20 border-t border-cyan-500/15 bg-[#070a12]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                {t('landing.features_tag', 'Core Capabilities')}
              </span>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                {t('landing.features_title', 'Designed to Solve Real Workplace Challenges')}
              </h2>
              <p className="text-sm text-slate-400">
                {t('landing.features_subtitle', 'Built specifically to replace cumbersome Telegram bot channels with a clean, centralized web application and smart desktop daemons.')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Feature 1 */}
              <div className="p-6 rounded-3xl bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all space-y-4 shadow-xl hover:shadow-cyan-950/30 group">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/25 group-hover:scale-105 transition-transform">
                  <PlayCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {t('landing.feat1_title', 'Automated Shift Daemon')}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t('landing.feat1_desc', 'Employees do not need to remember to check in. The desktop client reads the company roster, wakes up when their shift starts (e.g. 09:00 AM), and runs neutrally in the background.')}
                </p>
                <div className="text-xs text-cyan-400 font-semibold flex items-center gap-1.5 pt-2">
                  <span>{t('landing.feat1_meta', 'Zero Manual Overhead')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Feature 2: Anti-Evasion Engine Showcase */}
              <div className="p-6 rounded-3xl bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-500/60 transition-all space-y-4 shadow-xl hover:shadow-cyan-950/30 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 blur-xl rounded-full pointer-events-none"></div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center border border-cyan-500/40 group-hover:scale-105 transition-transform shadow-sm shadow-cyan-500/20">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {t('antievation.title', 'Anti-Evasion Engine')}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Stops fake work evasion. Combines randomized unpredictable shutter timing (8–18m), keystroke/click activity density metering, and active process/YouTube detection.
                </p>
                <div className="text-xs text-cyan-300 font-semibold flex items-center gap-1.5 pt-2">
                  <span>⚡ 4-Pillar Verification</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-3xl bg-[#0a0f1d]/85 backdrop-blur-xl border border-emerald-500/20 hover:border-emerald-500/50 transition-all space-y-4 shadow-xl hover:shadow-emerald-950/30 group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/25 group-hover:scale-105 transition-transform">
                  <Camera className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {t('landing.feat2_title', 'Audited Web Vault')}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t('landing.feat2_desc', 'No more messy Telegram group dumps. Screenshots are stored in secure S3 buckets, accessed via 15-minute expiring pre-signed URLs, and auto-purged permanently after 30 days.')}
                </p>
                <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 pt-2">
                  <span>{t('landing.feat2_meta', '15-Min Expiring Links')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Feature 4 */}
              <div className="p-6 rounded-3xl bg-[#0a0f1d]/85 backdrop-blur-xl border border-amber-500/20 hover:border-amber-500/50 transition-all space-y-4 shadow-xl hover:shadow-amber-950/30 group">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/25 group-hover:scale-105 transition-transform">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {t('landing.feat3_title', 'Objective Monthly Graphs')}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t('landing.feat3_desc', 'The web application aggregates monthly hours, active vs. idle ratio, and individual performance ratings automatically. Management gets clean visual charts at a glance.')}
                </p>
                <div className="text-xs text-amber-400 font-semibold flex items-center gap-1.5 pt-2">
                  <span>{t('landing.feat3_meta', 'Interactive 30-Day Trends')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shift Automation Deep-Dive */}
        <section id="shift-system" className="py-20 border-t border-cyan-500/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  {t('landing.shift_sync_tag', 'Intelligent Synchronization')}
                </span>
                <h2 className="text-3xl font-bold text-white tracking-tight">
                  {t('landing.shift_sync_title', 'How the Desktop Client Synchronizes with the Web Roster')}
                </h2>
                <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center font-bold font-mono text-xs flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <strong className="text-white">{t('landing.shift_step1_title', 'Shift Schedule Ingestion:')}</strong>{' '}
                      {t('landing.shift_step1_desc', "The desktop agent checks with the central web portal for today's assigned shift (e.g. 09:00 AM - 06:00 PM).")}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center font-bold font-mono text-xs flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <strong className="text-white">{t('landing.shift_step2_title', 'Automatic Start:')}</strong>{' '}
                      {t('landing.shift_step2_desc', 'Once the clock reaches shift time, the client automatically switches to Active mode. No manual buttons need to be pressed.')}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center font-bold font-mono text-xs flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <strong className="text-white">{t('landing.shift_step3_title', 'Zero-Overhead Idle Sensor:')}</strong>{' '}
                      {t('landing.shift_step3_desc', 'Uses native Windows GetLastInputInfo to detect inactivity beyond 10 minutes, protecting accurate productivity metrics.')}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center font-bold font-mono text-xs flex-shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <strong className="text-white">{t('landing.shift_step4_title', 'Automatic Shutdown on Shift End:')}</strong>{' '}
                      {t('landing.shift_step4_desc', 'When 06:00 PM arrives, the tracking agent unhooks and shuts down. No off-hours monitoring.')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Shift Schedule Card */}
              <div className="bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-cyan-500/10 pb-3.5">
                  <span className="font-bold text-white text-sm">
                    {t('landing.shifts_profile_title', 'Active Standard Shift Profiles')}
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-lg">
                    GMT+6 Dhaka BST
                  </span>
                </div>
                <div className="space-y-3">
                  {SHIFTS.map(shift => (
                    <div key={shift.id} className="p-4 rounded-2xl bg-[#070a12]/90 border border-cyan-500/15 flex items-center justify-between shadow-inner">
                      <div>
                        <div className="text-xs font-bold text-white">{t(shift.name, shift.name)}</div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          {shift.startTime} — {shift.endTime} ({shift.totalHours} {language === 'bn' ? 'ঘণ্টা' : 'hrs'})
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-cyan-400 font-mono">
                          {shift.assignedCount} {language === 'bn' ? 'কর্মী' : 'Employees'}
                        </span>
                        <div className="text-[10px] text-emerald-400 font-semibold">
                          {t('roster.daemon_active', 'Auto-Daemon Active')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Department Portfolios Preview */}
        <section id="departments" className="py-20 border-t border-cyan-500/15 bg-[#070a12]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                {t('landing.team_org_tag', 'Team Organization')}
              </span>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                {t('landing.team_org_title', 'Dedicated Department Portfolios')}
              </h2>
              <p className="text-sm text-slate-400">
                {t('landing.team_org_subtitle', 'Every department has its own live headcount, productivity score, and daily task deliverable feed.')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {DEPARTMENTS.map(dept => (
                <div key={dept.id} className="p-5 rounded-3xl bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/15 hover:border-cyan-500/40 flex flex-col justify-between space-y-4 shadow-lg hover:shadow-cyan-950/20 transition-all group">
                  <div>
                    <span className="font-mono text-[10px] bg-[#070a12] text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/20">
                      {dept.code}
                    </span>
                    <h3 className="font-bold text-white text-sm mt-2 group-hover:text-cyan-300 transition-colors">{t(dept.name, dept.name)}</h3>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{t(dept.description, dept.description)}</p>
                  </div>
                  <div className="pt-3 border-t border-cyan-500/10 flex justify-between items-center text-xs">
                    <span className="text-slate-400">{dept.headCount} {language === 'bn' ? 'কর্মী' : 'Staff'}</span>
                    <span className="font-mono font-bold text-emerald-400">{dept.avgScore}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security & Ethical Safeguards */}
        <section id="privacy-ethics" className="py-20 border-t border-cyan-500/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                {t('landing.ethics_tag', 'Trust & Compliance')}
              </span>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                {t('landing.ethics_title', 'Privacy-First Architecture: What We NEVER Track')}
              </h2>
              <p className="text-sm text-slate-400">
                {t('landing.ethics_subtitle', 'Built with respect for employee dignity. Strict boundary enforcement hard-coded into the client.')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/20 space-y-3 shadow-xl">
                <EyeOff className="w-6 h-6 text-cyan-400" />
                <h4 className="font-bold text-white text-sm">{t('landing.eth1_title', 'Zero Keystroke Logging')}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t('landing.eth1_desc', 'Passwords, private messages, and personal writings are completely invisible. No keylogger is installed.')}
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#0a0f1d]/85 backdrop-blur-xl border border-emerald-500/20 space-y-3 shadow-xl">
                <Lock className="w-6 h-6 text-emerald-400" />
                <h4 className="font-bold text-white text-sm">{t('landing.eth2_title', 'No Webcam or Audio')}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t('landing.eth2_desc', 'Hardware access to microphones and webcams is strictly prohibited by our zero-trust agent policy.')}
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#0a0f1d]/85 backdrop-blur-xl border border-amber-500/20 space-y-3 shadow-xl">
                <Clock className="w-6 h-6 text-amber-400" />
                <h4 className="font-bold text-white text-sm">{t('landing.eth3_title', '30-Day Auto Purge')}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t('landing.eth3_desc', 'Old telemetry and screenshots are permanently wiped from the storage bucket after 30 days.')}
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#0a0f1d]/85 backdrop-blur-xl border border-cyan-500/20 space-y-3 shadow-xl">
                <ShieldCheck className="w-6 h-6 text-cyan-400" />
                <h4 className="font-bold text-white text-sm">{t('landing.eth4_title', 'Auto-Blur Sensitive Apps')}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t('landing.eth4_desc', 'Banking tabs, payroll records, and sensitive passwords are automatically masked before upload.')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 border-t border-cyan-500/20 bg-gradient-to-b from-cyan-950/20 via-[#0a0f1d] to-[#070a12]">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {t('landing.cta_title', 'Ready to Explore the Management Dashboard?')}
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
              {t('landing.cta_desc', 'Inspect active shifts, employee portfolios, automated roster timetables, and audited screenshots right now.')}
            </p>
            <div className="pt-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm px-9 py-4 rounded-2xl shadow-xl shadow-cyan-500/30 hover:gap-3.5 transition-all cursor-pointer"
              >
                <span>{t('nav.enter_portal', 'Enter Live Management Portal')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Public Footer */}
      <Footer />
    </div>
  );
}
