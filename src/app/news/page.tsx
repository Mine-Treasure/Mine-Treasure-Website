'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { formatDistance } from 'date-fns';
import Navbar from '@/components/Navbar';
import { Language, useTranslation } from '@/lib/i18n';
import { getLocalStorage } from '@/utils/localStorage';
import { Download, ArrowRight, Package } from 'lucide-react';

interface Version {
  id: string;
  name: string;
  version_number: string;
  changelog: string;
  date_published: string;
  downloads: number;
  loaders: string[];
  game_versions: string[];
}

export default function NewsPage() {
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<Language>('en');
  const { t } = useTranslation(language);

  useEffect(() => {
    const savedLanguage = getLocalStorage('language', 'en') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const response = await fetch('https://api.modrinth.com/v2/project/mine-treasure/version');
        const data = await response.json();

        // Filter for datapack versions only
        const datapackVersions = data.filter((version: { loaders: string[]; }) =>
          version.loaders.includes('datapack') &&
          !version.loaders.some((loader: string) => ['fabric', 'forge', 'neoforge', 'quilt'].includes(loader))
        );

        setVersions(datapackVersions);
      } catch (error) {
        console.error('Error fetching versions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVersions();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Navbar />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative mb-12 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-12">
            <div className="absolute inset-0 bg-[url('/images/treasure.svg')] opacity-5 bg-center bg-no-repeat bg-contain"></div>
            <div className="relative max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">{t('news.title')}</h1>
              <p className="text-lg text-zinc-300">
                {t('news.description')}
              </p>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="grid grid-cols-1 gap-6">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-white dark:bg-zinc-800 rounded-xl p-8 animate-pulse">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-4 flex-grow">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="w-20 h-6 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
                      <div className="w-32 h-5 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
                    </div>
                    <div className="w-3/4 h-8 bg-zinc-200 dark:bg-zinc-700 rounded-lg" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg w-9 h-9" />
                        <div className="space-y-2">
                          <div className="w-16 h-3 bg-zinc-200 dark:bg-zinc-700 rounded" />
                          <div className="w-24 h-5 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : versions.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {versions.map((version) => (
              <Link
                key={version.version_number}
                href={`/news/${version.id}`}
                className="group bg-white dark:bg-zinc-800 rounded-xl p-8 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="space-y-4 flex-grow">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-700 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        v{version.version_number}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                        <Clock className="h-4 w-4" />
                        {formatDistance(new Date(version.date_published), new Date(), { addSuffix: true })}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                      {version.name}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
                          <Download className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-500">{t('news.downloads')}</div>
                          <div className="font-medium text-zinc-900 dark:text-zinc-100">{version.downloads.toLocaleString()}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-500">{t('news.version.gameVersions')}</div>
                          <div className="font-medium text-zinc-900 dark:text-zinc-100">{version.game_versions.join(', ')}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center">
                    <ArrowRight className="h-6 w-6 text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300 transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-zinc-600 dark:text-zinc-400">{t('news.noUpdates')}</p>
          </div>
        )}
      </div>
    </main>
  );
}
