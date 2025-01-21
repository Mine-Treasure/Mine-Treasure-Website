'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import type { ItemModalProps } from '@/types/types';
import { Highlight, themes } from 'prism-react-renderer';

export default function ItemModal({
    item,
    onClose,
    getItemImage,
}: ItemModalProps) {
    const getBlockRange = () => {
        if (!item.conditions.stoneMined) return null;

        const min = Math.max(
            (item.conditions.stoneMined.min || 0) - 500_000,
            0
        );
        const max = item.conditions.stoneMined.max
            ? Math.max(item.conditions.stoneMined.max - 500_000, 0)
            : null;

        return { min, max };
    };

    const blockRange = getBlockRange();

    return (
        <div
            className='fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200'
            onClick={onClose}
        >
            <div
                className='bg-gradient-to-b from-white/95 to-white dark:from-zinc-900/95 dark:to-zinc-900 p-6 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50 animate-in zoom-in-95 duration-200'
                onClick={(e) => e.stopPropagation()}
            >
                <div className='flex items-start justify-between mb-8 sticky top-0 bg-transparent pt-2 -mt-2 pb-6 border-b border-zinc-200/50 dark:border-zinc-800/50 z-10'>
                    <div className='flex gap-5'>
                        <div className='bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 p-5 rounded-xl shadow-lg ring-1 ring-black/5 dark:ring-white/5'>
                            <Image
                                src={getItemImage(item)}
                                alt={item.name || item.type}
                                width={48}
                                height={48}
                                className='w-14 h-14 object-contain drop-shadow-lg transform hover:scale-110 transition-transform duration-200'
                                unoptimized
                            />
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent'>
                                {item.name || item.type.replace(/_/g, ' ')}
                            </h2>
                            <div className='mt-2.5 flex items-center gap-2.5'>
                                {blockRange && (
                                    <span className='inline-flex items-center rounded-lg bg-zinc-100 dark:bg-zinc-800/80 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-200 ring-1 ring-black/10 dark:ring-white/10'>
                                        {blockRange.max
                                            ? `${blockRange.min.toLocaleString()} - ${blockRange.max.toLocaleString()} blocks`
                                            : `${blockRange.min.toLocaleString()}+ blocks`}
                                    </span>
                                )}
                                {item.name && (
                                    <span className='inline-flex items-center rounded-lg bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/20 dark:ring-blue-400/20'>
                                        Custom Item
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className='text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors p-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-lg'
                    >
                        <X className='w-5 h-5' />
                    </button>
                </div>

                <div className='space-y-6'>
                    {item.lore && item.lore.length > 0 && (
                        <div className='bg-gradient-to-br from-zinc-100/50 to-zinc-100/30 dark:from-zinc-800/50 dark:to-zinc-800/30 rounded-xl p-5 ring-1 ring-black/5 dark:ring-white/5'>
                            <h3 className='text-sm font-semibold text-zinc-900 dark:text-zinc-200 mb-3'>
                                Description
                            </h3>
                            <div className='text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed'>
                                <p className='last:mb-0'>
                                    {item.lore.join(' ')}
                                </p>
                            </div>
                        </div>
                    )}

                    {item.enchantments && item.enchantments.length > 0 && (
                        <div className='bg-gradient-to-br from-zinc-100/50 to-zinc-100/30 dark:from-zinc-800/50 dark:to-zinc-800/30 rounded-xl p-5 ring-1 ring-black/5 dark:ring-white/5'>
                            <h3 className='text-sm font-semibold text-zinc-900 dark:text-zinc-200 mb-3'>
                                Enchantments
                            </h3>
                            <div className='grid grid-cols-2 gap-3'>
                                {item.enchantments.map((ench, i) => (
                                    <div
                                        key={i}
                                        className='bg-gradient-to-br from-white to-white/80 dark:from-zinc-900 dark:to-zinc-900/80 rounded-lg px-4 py-3 text-sm ring-1 ring-black/5 dark:ring-white/5 hover:ring-black/10 dark:hover:ring-white/10 transition-all duration-200'
                                    >
                                        <span className='font-medium text-zinc-900 dark:text-zinc-200 cursor-default'>
                                            {ench.type.replace(/_/g, ' ')}
                                        </span>
                                        <span className='text-zinc-500 dark:text-zinc-500 ml-2 cursor-default'>
                                            {ench.min}-{ench.max}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {item.components &&
                        Object.keys(item.components).length > 0 && (
                            <div className='bg-gradient-to-br from-zinc-100/50 to-zinc-100/30 dark:from-zinc-800/50 dark:to-zinc-800/30 rounded-xl p-5 ring-1 ring-black/5 dark:ring-white/5'>
                                <h3 className='text-sm font-semibold text-zinc-900 dark:text-zinc-200 mb-3'>
                                    Components
                                </h3>
                                <div className='bg-gradient-to-br from-white to-white/80 dark:from-zinc-900 dark:to-zinc-900/80 p-5 rounded-lg overflow-y-auto max-h-[250px] text-sm ring-1 ring-black/5 dark:ring-white/5'>
                                    <Highlight
                                        theme={themes.nightOwl}
                                        code={JSON.stringify(
                                            item.components,
                                            null,
                                            2
                                        )}
                                        language='json'
                                    >
                                        {({
                                            className,
                                            style,
                                            tokens,
                                            getLineProps,
                                            getTokenProps,
                                        }) => (
                                            <pre
                                                className={className}
                                                style={{
                                                    ...style,
                                                    background: 'transparent',
                                                }}
                                            >
                                                {tokens.map((line, i) => (
                                                    <div
                                                        key={i}
                                                        {...getLineProps({
                                                            line,
                                                        })}
                                                    >
                                                        {line.map(
                                                            (token, key) => (
                                                                <span
                                                                    key={key}
                                                                    {...getTokenProps(
                                                                        {
                                                                            token,
                                                                        }
                                                                    )}
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                ))}
                                            </pre>
                                        )}
                                    </Highlight>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}
