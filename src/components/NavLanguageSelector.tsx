'use client';

import { useState, useEffect } from 'react';
import { Language, languages, languageIcons } from '@/lib/i18n';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface NavLanguageSelectorProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  isMobile?: boolean;
}

export default function NavLanguageSelector({ language, onLanguageChange, isMobile = false }: NavLanguageSelectorProps) {
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
    <div className={`language-selector relative ${isMobile ? 'w-full' : ''}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all duration-200 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 ${isMobile ? 'w-full justify-between text-base' : 'text-md'
          }`}
      >
        <div className="flex items-center gap-2">
          <Image
            src={languageIcons[language]}
            alt={`${languages[language]} flag`}
            width={20}
            height={15}
            className="object-cover rounded-sm"
          />
          <span className="text-base font-medium">{languages[language]}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
        />
        <span className="sr-only">Select language</span>
      </button>

      <div
        className={`${isMobile
          ? 'absolute left-0 right-0 z-50'
          : 'absolute right-0'
          } mt-2 py-1 bg-white dark:bg-zinc-900 rounded-lg shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-800 min-w-[160px] transition-all duration-300 ease-out transform origin-top ${isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
          }`}
      >
        {Object.entries(languages).map(([key, value]) => (
          <button
            key={key}
            onClick={() => {
              onLanguageChange(key as Language);
              setIsOpen(false);
            }}
            className="flex items-center gap-2 w-full px-4 py-2 text-left text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
          >
            <Image
              src={languageIcons[key as Language]}
              alt={`${value} flag`}
              width={20}
              height={15}
              className="object-cover rounded-sm"
            />
            <span className="text-base">{value}</span>
          </button>
        ))}
        <div className="px-4 py-2 text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800">
          More languages soon...
        </div>
      </div>
    </div>
  );
}
