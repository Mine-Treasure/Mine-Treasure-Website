'use client';

import { useState, useEffect } from 'react';
import { Language, languages } from '@/lib/i18n';

interface NavLanguageSelectorProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export default function NavLanguageSelector({ language, onLanguageChange }: NavLanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="language-selector relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
      >
        <span>{languages[language]}</span>
        <span className="sr-only">Select language</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-1 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 min-w-[120px]">
          {Object.entries(languages).map(([key, value]) => (
            <button
              key={key}
              onClick={() => {
                onLanguageChange(key as Language);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left flex items-center gap-2 ${
                key === language
                  ? 'bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white'
                  : 'hover:bg-zinc-50 dark:hover:bg-zinc-700/50 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <span>{value}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
