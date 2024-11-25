/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import Review from '@/components/Review';
import StatisticsChart from '@/components/StatisticsChart';
import { ArrowRight, AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Language, useTranslation } from '@/lib/i18n';
import { getLocalStorage } from '@/utils/localStorage';

export default function Home() {
  const whySectionRef = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState<Language>('en');
  const { t } = useTranslation(language);

  useEffect(() => {
    const savedLanguage = getLocalStorage('language', 'en') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const scrollTo = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      <Navbar />
      <div className="pt-16">
        <section className="relative h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="grid lg:grid-cols-2 gap-8 h-full items-center">
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
                  {t('home.hero.title')}
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl">
                  {t('home.hero.description')}
                </p>
                <div className="space-x-4">
                  <button
                    onClick={() => scrollTo(whySectionRef)}
                    className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  >
                    {t('home.hero.readMore')}
                  </button>
                </div>
                <Link
                  href="/download"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                >
                  {t('home.hero.startPlaying')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              <div className="hidden lg:flex items-center justify-center">
                <Image
                  src="/images/treasure.svg"
                  alt="Treasure illustration"
                  width={500}
                  height={500}
                  priority
                  unoptimized
                  className="w-full max-w-[500px] h-auto xl:max-w-[600px] 2xl:max-w-[700px]"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="py-24 bg-zinc-50 dark:bg-zinc-800/50" ref={whySectionRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16">
              {t('home.why.title')}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl">
                <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
                  <Image
                    src="/images/treasure-tiers.gif"
                    alt="Different treasure tiers"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t('home.why.features.treasures.title')}</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {t('home.why.features.treasures.description')}
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl">
                <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
                  <Image
                    src="/images/biomes.jpg"
                    alt="Biome specific treasures"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t('home.why.features.biomes.title')}</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {t('home.why.features.biomes.description')}
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl">
                <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
                  <Image
                    src="/images/items.png"
                    alt="Custom items showcase"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t('home.why.features.items.title')}</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {t('home.why.features.items.description')}
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl">
                <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
                  <Image
                    src="/images/advancements.png"
                    alt="Custom advancements system"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t('home.why.features.advancements.title')}</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {t('home.why.features.advancements.description')}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16">
              {t('home.reviews.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(t('home.reviews.testimonials')).map(([key, review]: [string, any]) => (
                <Review
                  key={key}
                  text={review.text}
                  username={review.author}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="py-24 bg-zinc-50 dark:bg-zinc-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16">
              {t('home.statistics.title')}
            </h2>
            <StatisticsChart />
          </div>
        </section>
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16">
              {t('home.compatibility.title')}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-zinc-50 dark:bg-zinc-800">
                  <tr>
                    <th className="p-4">{t('home.compatibility.table.headers.software')}</th>
                    <th className="p-4">{t('home.compatibility.table.headers.compatible')}</th>
                    <th className="p-4">{t('home.compatibility.table.headers.extra')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  {Object.entries(t('home.compatibility.table.entries')).map(([key, entry]: [string, any]) => (
                    <tr key={key}>
                      <td className="p-4 font-medium">{entry.name}</td>
                      <td className="p-4">
                        {key === 'realms' || key === 'spigot' ? (
                          <AlertCircle className="text-yellow-400 h-5 w-5" />
                        ) : key === 'papermc' || key === 'fabric' || key === 'forge' ? (
                          <CheckCircle2 className="text-green-400 h-5 w-5" />
                        ) : (
                          <HelpCircle className="text-blue-400 h-5 w-5" />
                        )}
                      </td>
                      <td className="p-4 text-zinc-600 dark:text-zinc-400">
                        {entry.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <section className="py-24 bg-zinc-50 dark:bg-zinc-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link
              href="/download"
              className="inline-flex items-center px-8 py-4 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors text-lg"
            >
              {t('home.hero.startPlaying')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
