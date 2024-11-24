/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { Download, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Language, useTranslation } from '@/lib/i18n';

interface InstallationStep {
     title: string;
     description: string;
}

export default function DownloadPage() {
     const [language, setLanguage] = useState<Language>('en');
     const { t } = useTranslation(language);

     // Load saved language preference
     useEffect(() => {
          const savedLang = localStorage.getItem('language') as Language;
          if (savedLang) {
               setLanguage(savedLang);
          }
     }, []);

     return (
          <main>
               <Navbar />

               <div className="pt-24 min-h-screen bg-white dark:bg-zinc-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <div className="text-center mb-16">
                              <h1 className="text-4xl font-bold mb-4">{t('download.title')}</h1>
                              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                                   {t('download.subtitle')}
                              </p>
                         </div>

                         <div className="mb-8">
                              <div className="bg-zinc-50 dark:bg-zinc-800/50 p-8 rounded-xl">
                                   <h2 className="text-2xl font-semibold mb-4">{t('download.modrinth.title')}</h2>
                                   <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                                        {t('download.modrinth.description')}
                                   </p>
                                   <Link
                                        href="https://modrinth.com/datapack/mine-treasure"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-6 py-3 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-100 transition-colors"
                                   >
                                        <Download className="mr-2 h-5 w-5" />
                                        {t('download.modrinth.button')}
                                        <ExternalLink className="ml-2 h-4 w-4" />
                                   </Link>
                              </div>
                         </div>

                         <div className="bg-zinc-50 dark:bg-zinc-800/50 p-8 rounded-xl mb-16">
                              <h2 className="text-2xl font-semibold mb-6">{t('download.installation.title')}</h2>

                              <div className="space-y-8">
                                   {(t('download.installation.steps') as unknown as InstallationStep[]).map((step, index) => (
                                        <div key={index} className="flex gap-4">
                                             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-semibold">
                                                  {index + 1}
                                             </div>
                                             <div>
                                                  <h3 className="font-semibold mb-2">{step.title}</h3>
                                                  <p className="text-zinc-600 dark:text-zinc-400 whitespace-pre-line">
                                                       {step.description}
                                                  </p>
                                             </div>
                                        </div>
                                   ))}
                              </div>
                         </div>

                         <div className="text-center mb-16">
                              <h2 className="text-2xl font-semibold mb-4">{t('download.needHelp.title')}</h2>
                              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                                   {t('download.needHelp.description')}
                              </p>
                              <Link
                                   href="https://discord.gg/ASB67acx2Y"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="inline-flex items-center px-6 py-3 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-100 transition-colors"
                              >
                                   {t('download.needHelp.button')}
                                   <ExternalLink className="ml-2 h-4 w-4" />
                              </Link>
                         </div>
                    </div>
               </div>
          </main>
     );
}