/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, ChevronDown, ChevronUp, Terminal, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { Language, useTranslation } from '@/lib/i18n';
import { getLocalStorage } from '@/utils/localStorage';
import ImageModal from '@/components/ImageModal';

export default function HelpPage() {
  const [language, setLanguage] = useState<Language>('en');
  const [openCommand, setOpenCommand] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
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
            <h1 className="text-4xl font-bold mb-4">{t('help.title')}</h1>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              {t('help.description')}
            </p>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-700/20 dark:to-amber-600/10 border border-amber-200 dark:border-amber-500/20 backdrop-blur-sm p-8 rounded-xl mb-8">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-amber-100 dark:bg-amber-500/20 rounded-lg">
                <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-400 mb-2">{t('help.note.title')}</h3>
                <p className="text-amber-700 dark:text-amber-300/90 leading-relaxed">{t('help.note.description')}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(t('help.commands')).map(([key, command]: [string, any]) => (
              <div 
                key={key} 
                className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl"
              >
                <button
                  onClick={() => setOpenCommand(openCommand === key ? null : key)}
                  className="w-full p-6 flex flex-col md:flex-row md:items-center gap-4 text-left group"
                >
                  <div className="flex items-center gap-4 min-w-[220px]">
                    <div className="p-2 bg-emerald-500/10 border-emerald-500 rounded-lg group-hover:bg-emerald-500/20 group-hover:border-emerald-200/20 transition-colors">
                      <Terminal className="w-5 h-5 text-emerald-500" />
                    </div>
                    <code className="px-4 py-2 bg-zinc-100 dark:bg-zinc-900/80 rounded-lg text-emerald-600 dark:text-emerald-400 font-mono text-sm whitespace-nowrap overflow-x-auto">
                      {command.command}
                    </code>
                  </div>
                  <div className="flex-grow flex items-center justify-between gap-4">
                    <p className="text-zinc-700 dark:text-zinc-300">{command.description}</p>
                    {command.details && (
                      <div className="flex-shrink-0 transition-transform duration-200">
                        {openCommand === key ? (
                          <ChevronUp className="w-5 h-5 text-zinc-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-zinc-400" />
                        )}
                      </div>
                    )}
                  </div>
                </button>

                {openCommand === key && command.details && (
                  <div className="px-6 pb-6 border-t border-zinc-200 dark:border-zinc-700/50">
                    <div className="pt-6 space-y-6">
                      <div>
                        <h3 className="text-2xl font-semibold mb-3">{command.details.title}</h3>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {command.details.description}
                        </p>
                      </div>

                      {command.details.features && (
                        <div className="space-y-3">
                          {command.details.features.map((feature: string, index: number) => (
                            <div key={index} className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span className="leading-relaxed">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {command.details.options && (
                        <div className="grid gap-3">
                          {command.details.options.map((option: any, index: number) => (
                            <div key={index} className="bg-zinc-100/50 dark:bg-zinc-900/50 rounded-xl p-4">
                              <h4 className="font-semibold mb-2 flex items-center gap-2">
                                <span className="text-emerald-600 dark:text-emerald-400">{option.name}</span>
                              </h4>
                              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                {option.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {command.details.steps && (
                        <div className="space-y-3">
                          {command.details.steps.map((step: string, index: number) => (
                            <div key={index} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
                              <span className="text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                                {index + 1}.
                              </span>
                              <span className="leading-relaxed">{step}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {command.details.warning && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/20 rounded-xl p-4">
                          <p className="text-red-700 dark:text-red-400 leading-relaxed flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            {command.details.warning}
                          </p>
                        </div>
                      )}

                      {command.details.screenshot && (
                        <button
                          onClick={() => setSelectedImage({
                            src: command.details.screenshot,
                            alt: `Screenshot of ${command.details.title}`
                          })}
                          className="group relative w-full sm:w-64 h-48 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 hover:ring-2 hover:ring-emerald-500/50 transition-all duration-200"
                        >
                          <Image
                            src={command.details.screenshot}
                            alt={`Screenshot of ${command.details.title}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-200"
                            unoptimized
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/0 group-hover:bg-zinc-900/40 transition-colors duration-200">
                            <ExternalLink className="w-6 h-6 text-white transform scale-0 group-hover:scale-100 transition-transform duration-200" />
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedImage && (
        <ImageModal
          src={selectedImage.src}
          alt={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </main>
  );
}
