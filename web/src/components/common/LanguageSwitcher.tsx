'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface LanguageSwitcherProps {
  className?: string;
  compact?: boolean;
}

export default function LanguageSwitcher({ className = '', compact = false }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center bg-slate-900/90 border border-slate-700/80 rounded-xl p-0.5 shadow-sm backdrop-blur ${className}`}
      role="group"
      aria-label="Language Switcher"
    >
      <div className="flex items-center gap-0.5">
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`flex items-center gap-1.5 font-semibold transition-all rounded-lg cursor-pointer ${
            compact ? 'px-2 py-1 text-[11px]' : 'px-2.5 py-1 text-xs'
          } ${
            language === 'en'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
          aria-pressed={language === 'en'}
          title="Switch to English"
        >
          {!compact && <Globe className="w-3 h-3 text-indigo-200" />}
          <span>EN</span>
        </button>

        <button
          type="button"
          onClick={() => setLanguage('bn')}
          className={`flex items-center gap-1 font-semibold transition-all rounded-lg cursor-pointer font-sans ${
            compact ? 'px-2 py-1 text-[11px]' : 'px-2.5 py-1 text-xs'
          } ${
            language === 'bn'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
          aria-pressed={language === 'bn'}
          title="বাংলায় পরিবর্তন করুন"
        >
          <span>বাংলা</span>
        </button>
      </div>
    </div>
  );
}
