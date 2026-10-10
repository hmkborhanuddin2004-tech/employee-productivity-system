'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-[#070a12] border-t border-cyan-500/20 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-sm shadow-md shadow-cyan-500/20">
                AW
              </div>
              <span className="text-base font-bold text-white tracking-tight">ApexWork Enterprise</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {language === 'bn' 
                ? 'আধুনিক ইঞ্জিনিয়ারিং, মার্কেটিং ও ফিন্যান্স দলের জন্য তৈরি নৈতিক ও স্বয়ংক্রিয় শিফট ট্র্যাকিং এবং টেলিমেট্রি প্ল্যাটফর্ম।' 
                : 'Ethical, automated employee shift tracking and productivity telemetry platform engineered for modern engineering, marketing, and finance teams.'}
            </p>
            <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t('landing.trust_zero_keystroke', 'Zero-Keystroke Privacy Architecture')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              {language === 'bn' ? 'পোর্টাল মডিউল' : 'Portal Modules'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/dashboard" className="hover:text-cyan-400 transition-colors">{t('nav.overview_dashboard', 'Executive Overview')}</Link></li>
              <li><Link href="/dashboard/departments" className="hover:text-cyan-400 transition-colors">{t('nav.departments', 'Department Portfolios')}</Link></li>
              <li><Link href="/dashboard/roster" className="hover:text-cyan-400 transition-colors">{t('nav.roster', 'Shift Roster & Timetable')}</Link></li>
              <li><Link href="/dashboard/analytics" className="hover:text-cyan-400 transition-colors">{t('nav.analytics', 'Visual Monthly Graphs')}</Link></li>
              <li><Link href="/dashboard/screenshots" className="hover:text-cyan-400 transition-colors">{t('nav.screenshots', 'Audited Screenshot Vault')}</Link></li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              {language === 'bn' ? 'গভর্ন্যান্স ও প্রাইভেসি' : 'Governance & Privacy'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#privacy-ethics" className="hover:text-cyan-400 transition-colors">{language === 'bn' ? 'কর্মী প্রাইভেসি সনদ' : 'Employee Privacy Charter'}</a></li>
              <li><a href="#privacy-ethics" className="hover:text-cyan-400 transition-colors">{language === 'bn' ? 'নিরাপদ S3 ভল্ট পলিসি' : 'Ephemeral S3 Vault Policy'}</a></li>
              <li><a href="#privacy-ethics" className="hover:text-cyan-400 transition-colors">{language === 'bn' ? '৩০-দিনের অটো-পার্জ মানদণ্ড' : '30-Day Auto-Purge Standards'}</a></li>
              <li><a href="#privacy-ethics" className="hover:text-cyan-400 transition-colors">{language === 'bn' ? 'বাংলাদেশ শ্রম আইন সম্মতি' : 'Bangladesh Labor Code Compliance'}</a></li>
            </ul>
          </div>

          {/* Security Summary */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              {language === 'bn' ? 'নিরাপত্তা অবকাঠামো' : 'Security Infrastructure'}
            </h4>
            <div className="p-4 rounded-2xl bg-[#0a0f1d] border border-cyan-500/20 space-y-2 shadow-inner">
              <div className="text-[11px] font-semibold text-cyan-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>ISO/IEC 27001 Aligned</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {language === 'bn' 
                  ? 'স্ক্রিনশট AES-256 এনক্রিপশনে সুরক্ষিত থাকে, প্রি-সাইন্ড টোকেনের মেয়াদ ১৫ মিনিট এবং নির্ধারিত শিফটের বাইরে ক্লায়েন্ট নিজে থেকেই বন্ধ থাকে।' 
                  : 'Screenshots use AES-256 at rest, pre-signed tokens expire in 15 minutes, and local client shuts off automatically outside assigned shift hours.'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cyan-500/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} {t('brand.name', 'ApexWork Enterprise')}. {t('footer.copyright', 'All rights reserved. Dhaka, Bangladesh.')}
          </div>
          <div className="flex items-center gap-1">
            <span>{t('footer.tagline', 'Built with precision for ethical enterprise teamwork')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
