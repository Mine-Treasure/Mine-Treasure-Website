'use client';
import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useTranslation, Language } from '@/lib/i18n';
import { formatDistance } from 'date-fns';
import { Download, Clock, ArrowRight, Package } from 'lucide-react';
import Link from 'next/link';
import { getLocalStorage } from '@/utils/localStorage';

interface Version {
  id: string;
  name: string;
  version_number: string;
  changelog: string;
  date_published: string;
  downloads: number;
  loaders: string[];
  game_versions: string[];
  files: {
    url: string;
    filename: string;
  }[];
}
export default function VersionPage() {
  const params = useParams();
  const [version, setVersion] = useState<Version | null>(null);
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
    const fetchVersion = async () => {
      try {
        // Fetch directly using the version ID
        const response = await fetch(`https://api.modrinth.com/v2/version/${params.version}`);
        const versionData = await response.json();

        if (!versionData || versionData.error) {
          notFound();
          return;
        }

        setVersion(versionData);
      } catch (error) {
        console.error('Error fetching version:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchVersion();
  }, [params.version]);

  const formatText = (text: string) => {
    return text.split('``').map((part, index) =>
      index % 2 === 0 ? (
        <span key={index}>{part}</span>
      ) : (
        <code key={index} className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-700 font-mono text-sm">{part}</code>
      )
    );
  };

  const formatBoldText = (text: string): JSX.Element => {
    return (
      <>
        {text.split('**').map((part, index) =>
          index % 2 === 0 ? (
            <span key={index}>{part}</span>
          ) : (
            <strong key={index}>{part}</strong>
          )
        )}
      </>
    );
  };

  const parseChangelog = (changelog: string) => {
    const sections: { title: string; items: (string | JSX.Element)[] }[] = [];
    let currentSection = { title: 'General', items: [] as (string | JSX.Element)[] };

    const lines = changelog.split('\n').map(line => line.trim());

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Skip empty lines
      if (!line) continue;

      // Handle headers (# ## ### etc)
      if (line.match(/^#{1,6}\s/)) {
        if (currentSection.items.length > 0) {
          sections.push({ ...currentSection });
        }
        currentSection = {
          title: line.replace(/^#{1,6}\s/, ''),
          items: []
        };
      }
      // Handle list items (-, *, >)
      else if (line.match(/^[-*>]\s/)) {
        const item = line.replace(/^[-*>]\s/, '');
        if (item.trim()) {
          if (item.includes('**')) {
            currentSection.items.push(formatBoldText(item));
          } else {
            currentSection.items.push(item);
          }
        }
      }
      // Handle numbered lists
      else if (line.match(/^\d+\.\s/)) {
        const item = line.replace(/^\d+\.\s/, '');
        if (item.trim()) {
          if (item.includes('**')) {
            currentSection.items.push(formatBoldText(item));
          } else {
            currentSection.items.push(item);
          }
        }
      }
      // Handle plain text (if not empty and not part of previous patterns)
      else if (line.trim() && !line.startsWith('#')) {
        if (line.includes('**')) {
          currentSection.items.push(formatBoldText(line));
        } else {
          currentSection.items.push(line);
        }
      }
    }

    // Add the last section if it has items
    if (currentSection.items.length > 0) {
      sections.push(currentSection);
    }

    return sections;
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Navbar />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/news" className="inline-flex items-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 mb-8">
          <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
          {t('news.backToVersions')}
        </Link>

        {loading ? (
          <div className="space-y-8 animate-pulse">
            <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-xl p-8 text-white relative overflow-hidden">
              <div className="relative max-w-3xl">
                <div className="w-24 h-7 bg-zinc-800 rounded-full mb-4" />
                <div className="w-2/3 h-10 bg-zinc-800 rounded-lg mb-4" />
                <div className="w-72 h-6 bg-zinc-800 rounded mb-6" />
                <div className="flex flex-wrap gap-4">
                  <div className="w-40 h-12 bg-zinc-800 rounded-lg" />
                  <div className="w-40 h-12 bg-zinc-800 rounded-lg" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((index) => (
                <div key={index} className="bg-white dark:bg-zinc-800 rounded-xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-zinc-200 dark:bg-zinc-700 rounded-lg w-12 h-12" />
                    <div className="space-y-2">
                      <div className="w-16 h-4 bg-zinc-200 dark:bg-zinc-700 rounded" />
                      <div className="w-24 h-8 bg-zinc-200 dark:bg-zinc-700 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-xl p-8">
              <div className="w-48 h-7 bg-zinc-200 dark:bg-zinc-700 rounded mb-6" />
              <div className="space-y-8">
                {[1, 2].map((section) => (
                  <div key={section} className="space-y-4">
                    <div className="w-56 h-6 bg-zinc-200 dark:bg-zinc-700 rounded" />
                    <div className="space-y-3">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-start space-x-3">
                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-zinc-200 dark:bg-zinc-700 flex-shrink-0" />
                          <div className="w-full h-5 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : version ? (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/images/treasure.svg')] opacity-5 bg-center bg-no-repeat bg-contain"></div>
              <div className="relative max-w-3xl">
                <div className="inline-block px-3 py-1 rounded-full bg-zinc-800 text-sm text-zinc-300 mb-4">
                  v{version.version_number}
                </div>
                <h2 className="text-3xl font-bold mb-4">{version.name}</h2>
                <p className="text-zinc-400 mb-6">
                  {t('news.version.releaseDate')}: {new Date(version.date_published).toLocaleDateString()}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={version.files[0].url}
                    download={version.files[0].filename}
                    className="inline-flex items-center px-6 py-3 rounded-lg bg-zinc-100 text-zinc-900 hover:bg-zinc-200 transition-colors"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    {t('news.version.download')}
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-zinc-800 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Download className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">{t('news.downloads')}</div>
                    <div className="text-2xl font-bold">{version.downloads.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-800 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">{t('news.version.gameVersions')}</div>
                    <div className="text-2xl font-bold">{version.game_versions.join(', ')}</div>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-800 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">{t('news.version.releaseDate')}</div>
                    <div className="text-2xl font-bold">
                      {formatDistance(new Date(version.date_published), new Date(), { addSuffix: true })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6">{t('news.version.changelog')}</h3>
              <div className="space-y-8">
                {parseChangelog(version.changelog).map((section, index) => (
                  <div key={index} className="space-y-4">
                    <h4 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">{section.title}</h4>
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-3 text-zinc-600 dark:text-zinc-400">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-zinc-600 dark:bg-zinc-400 flex-shrink-0"></span>
                          {typeof item === 'string' ? (
                            <span>{formatText(item)}</span>
                          ) : (
                            item
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-zinc-600 dark:text-zinc-400">
            {t('news.noUpdates')}
          </div>
        )}
      </div>
    </main>
  );
}
