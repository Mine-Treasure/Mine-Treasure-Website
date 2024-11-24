'use client'

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { GitHubData } from '@/types/types';
import { Language, useTranslation } from '@/lib/i18n';

const Footer = () => {
    const [data, setData] = useState<GitHubData | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [language, setLanguage] = useState<Language>('en');
    const { t } = useTranslation(language);

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') as Language;
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/github');
                const githubData = await response.json();
                setData(githubData);
            } catch (error) {
                console.error('Error fetching GitHub data:', error);
            } finally {
                setLoaded(true);
            }
        };

        fetchData();
    }, []);

    return (
        <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                            {t('components.footer.title')}
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            {t('components.footer.description')}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">
                            {t('components.footer.resources.title')}
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="/download"
                                    className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                >
                                    {t('components.footer.resources.download')}
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/Mine-Treasure/mine-treasure"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                >
                                    {t('components.footer.resources.github')}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="https://ko-fi.com/frozytime"
                                    target="_blank"
                                    className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                >
                                    Support Datapack Author
                                    <Image
                                        src="/images/kofi.webp"
                                        alt="Ko-fi"
                                        height={30}
                                        width={30}
                                        className="rounded"
                                        unoptimized
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://ko-fi.com/supercrafter100"
                                    target="_blank"
                                    className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                >
                                    Support Original Website Author
                                    <Image
                                        src="/images/kofi.webp"
                                        alt="Ko-fi"
                                        height={30}
                                        width={30}
                                        className="rounded"
                                        unoptimized
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://prodbyeagle.vercel.app/"
                                    target="_blank"
                                    className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                >
                                    <span className="eagle-text">Website Creator</span>
                                    <Image
                                        src="https://raw.githubusercontent.com/prodbyeagle/portfolio2/refs/heads/master/src/assets/eagleicon.webp"
                                        alt="Ko-fi"
                                        height={20}
                                        width={20}
                                        className="rounded"
                                        unoptimized
                                    />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Version</h3>
                        {loaded && data && (
                            <div className="space-y-2">
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    <Link
                                        href={`https://github.com/${data.repo_owner}/${data.repo_name}`}
                                        className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                                    >
                                        {data.repo_owner}/{data.repo_name}
                                    </Link>
                                </p>
                                {data.commit_sha !== 'development' && (
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                        <Link
                                            href={`https://github.com/${data.repo_owner}/${data.repo_name}/tree/${data.commit_sha}`}
                                            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                                            title={data.commit_msg}
                                        >
                                            Commit: {data.commit_ref}@{data.commit_sha.slice(0, 7)}
                                        </Link>
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
                        {new Date().getFullYear()} Mine Treasure. All rights reserved.
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
                        made by <span className="eagle-text">@prodbyeagle</span> | Original Page by: @supercrafter100
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
