'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Home, LayoutDashboard } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function NotFound() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex items-center justify-center p-4 selection:bg-cyan-500 selection:text-black obsidian-mesh-bg">
      {/* Background radial mesh ambient glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-lg w-full bg-[#0a0f1d]/90 backdrop-blur-2xl border border-cyan-500/25 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-cyan-950/40 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
            HTTP 404 • Route Not Found
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight pt-2">
            {language === 'bn' ? 'পৃষ্ঠাটি খুঁজে পাওয়া যায়নি' : 'Page Not Found in Vault'}
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
            {language === 'bn'
              ? 'আপনি যে রুট বা অডিট রেকর্ডটি অনুসন্ধান করছেন তা সরানো হয়েছে অথবা সিস্টেম ডিরেক্টরিতে বিদ্যমান নেই।'
              : 'The route or audit record you are looking for does not exist in the encrypted system directory or has expired.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold text-xs px-5 py-3 rounded-xl border border-cyan-400/30 shadow-lg shadow-cyan-600/25 transition-all cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>{language === 'bn' ? 'ড্যাশবোর্ডে ফিরুন' : 'Return to Dashboard'}</span>
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#070a12] hover:bg-slate-900 text-slate-300 border border-slate-700/80 font-medium text-xs px-5 py-3 rounded-xl transition-all cursor-pointer"
          >
            <Home className="w-4 h-4 text-cyan-400" />
            <span>{language === 'bn' ? 'মূল পাতা' : 'ApexWork Home'}</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-cyan-500/15 text-[11px] text-slate-500 font-mono">
          ApexWork Enterprise Gateway • Cryptographically Signed & Audited
        </div>
      </div>
    </div>
  );
}
