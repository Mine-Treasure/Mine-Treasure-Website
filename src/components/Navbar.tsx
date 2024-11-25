'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Download, Menu, X } from 'lucide-react';
import NavLanguageSelector from './NavLanguageSelector';
import { Language, useTranslation } from '@/lib/i18n';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';

export default function Navbar() {
     const [isOpen, setIsOpen] = useState(false);
     const [language, setLanguage] = useState<Language>('en');
     const { t } = useTranslation(language);

     useEffect(() => {
          const savedLanguage = getLocalStorage('language', 'en') as Language;
          if (savedLanguage) {
               setLanguage(savedLanguage);
          }
     }, []);

     const handleLanguageChange = (newLanguage: Language) => {
          setLanguage(newLanguage);
          setLocalStorage('language', newLanguage);
          window.location.reload();
     };

     return (
          <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                         <Link
                              href="/"
                              className="font-semibold text-lg hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                         >
                              {t('components.navbar.title')}
                         </Link>

                         <div className="hidden md:flex items-center gap-8">
                              <Link
                                   href="/"
                                   className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
                              >
                                   {t('components.navbar.home')}
                              </Link>
                              <Link
                                   href="/loot"
                                   className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
                              >
                                   {t('components.navbar.loot')}
                              </Link>
                              <Link
                                   href="/news"
                                   className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
                              >
                                   {t('components.navbar.news')}
                              </Link>
                              <Link
                                   href="https://discord.gg/ASB67acx2Y"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
                              >
                                   {t('components.navbar.discord')}
                              </Link>
                              <div className="-ml-4">
                                   <NavLanguageSelector
                                        language={language}
                                        onLanguageChange={handleLanguageChange}
                                   />
                              </div>
                              <Link
                                   href="/download"
                                   className="inline-flex items-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 rounded-xl hover:opacity-60 dark:hover:opacity-60 transition-all"
                              >
                                   <Download className="h-4 w-4" />
                                   {t('components.navbar.download')}
                              </Link>
                         </div>

                         <button
                              onClick={() => setIsOpen(!isOpen)}
                              className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                              aria-label="Toggle menu"
                         >
                              {isOpen ? (
                                   <X className="h-6 w-6" />
                              ) : (
                                   <Menu className="h-6 w-6" />
                              )}
                         </button>
                    </div>
               </div>

               {isOpen && (
                    <div
                         className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm md:hidden"
                         onClick={() => setIsOpen(false)}
                    />
               )}

               <div
                    className={`absolute top-[64px] left-0 right-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 md:hidden transform transition-all duration-300 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none'
                         }`}
               >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-3">
                         <Link
                              href="/"
                              onClick={() => setIsOpen(false)}
                              className="flex items-center px-3 py-2 rounded-lg text-base font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                         >
                              {t('components.navbar.home')}
                         </Link>
                         <Link
                              href="/loot"
                              onClick={() => setIsOpen(false)}
                              className="flex items-center px-3 py-2 rounded-lg text-base font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                         >
                              {t('components.navbar.loot')}
                         </Link>
                         <Link
                              href="/news"
                              onClick={() => setIsOpen(false)}
                              className="flex items-center px-3 py-2 rounded-lg text-base font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                         >
                              {t('components.navbar.news')}
                         </Link>
                         <Link
                              href="https://discord.gg/ASB67acx2Y"
                              onClick={() => setIsOpen(false)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center px-3 py-2 rounded-lg text-base font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                         >
                              {t('components.navbar.discord')}
                         </Link>
                         <NavLanguageSelector
                              language={language}
                              onLanguageChange={handleLanguageChange}
                              isMobile={true}
                         />
                         <Link
                              href="/download"
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-1 px-4 py-2 text-base font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all duration-200 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
                         >
                              <Download className="h-4 w-4" />
                              {t('components.navbar.download')}
                         </Link>
                    </div>
               </div>
          </nav>
     );
}
