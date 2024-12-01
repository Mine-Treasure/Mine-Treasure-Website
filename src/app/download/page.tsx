/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { Download, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Language, useTranslation } from '@/lib/i18n';
import { getLocalStorage } from '@/utils/localStorage';

interface InstallationStep {
     title: string;
     description: string;
}

export default function DownloadPage() {
     const [language, setLanguage] = useState<Language>('en');
     const { t } = useTranslation(language);

     useEffect(() => {
          const savedLanguage = getLocalStorage('language', 'en') as Language;
          if (savedLanguage) {
               setLanguage(savedLanguage);
          }
     }, []);

     return (
          <main>
               <Navbar />

               <div className="pt-24 min-h-screen bg-white dark:bg-zinc-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <div className="text-center mb-16">
                              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-emerald-800 text-transparent bg-clip-text">
                                   {t('download.title')}
                              </h1>
                              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                                   {t('download.subtitle')}
                              </p>
                         </div>

                         <div className="space-y-8 mb-16">
                              <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 rounded-xl overflow-hidden">
                                   <div className="p-8">
                                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                                             {t('download.modrinth.title')}
                                        </h2>
                                        <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                                             {t('download.modrinth.description')}
                                        </p>
                                        <Link
                                             href="https://modrinth.com/datapack/mine-treasure"
                                             target="_blank"
                                             rel="noopener noreferrer"
                                             className="inline-flex items-center px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-200 group"
                                        >
                                             <Download className="w-5 h-5 mr-2 transition-transform group-hover:-translate-y-0.5" />
                                             {t('download.modrinth.button')}
                                             <ExternalLink className="w-4 h-4 ml-2 opacity-50" />
                                        </Link>
                                   </div>
                              </div>

                              <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 rounded-xl overflow-hidden">
                                   <div className="p-8">
                                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                                             {t('download.installation.title')}
                                        </h2>
                                        <div className="space-y-6">
                                             {(t('download.installation.steps') as unknown as InstallationStep[]).map((step, index) => (
                                                  <div key={index} className="flex gap-4">
                                                       <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                                                                 {index + 1}
                                                            </span>
                                                       </div>
                                                       <div>
                                                            <h3 className="font-medium text-zinc-900 dark:text-white mb-1">
                                                                 {step.title}
                                                            </h3>
                                                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                                                 {step.description}
                                                            </p>
                                                       </div>
                                                  </div>
                                             ))}
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </main>
     );
}