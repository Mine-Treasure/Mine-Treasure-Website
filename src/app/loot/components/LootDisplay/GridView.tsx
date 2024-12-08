import { ChevronRight } from 'lucide-react';
import type { GridViewProps } from '@/types/types';
import ItemCard from './ItemCard';
import { RARITIES } from '../../utils/filterUtils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getBiomeIcon } from '../../utils/biomeIcons';
import biomeData from '@/data/biomes.json';

const formatBiomeName = (biome: string) => {
    return biome
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export default function GridView({
    data,
    getItemImage,
    onItemClick,
    collapsedRarities,
    onToggleCollapse,
    collapsedBiomes,
    onToggleBiomeCollapse
}: GridViewProps) {
    const router = useRouter();

    const handleHashClick = (biome: string, e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`#${biome}`);
    };

    useEffect(() => {
        const handleHash = () => {
            const hash = window.location.hash.slice(1);
            if (hash) {
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };

        handleHash();
        window.addEventListener('hashchange', handleHash);
        return () => window.removeEventListener('hashchange', handleHash);
    }, []);

    return (
        <div className="space-y-8">
            {Object.entries(data).map(([biome, rarities]) => {
                const hasItems = Object.values(rarities).some(items => items.length > 0);
                if (!hasItems) return null;

                const isCollapsed = collapsedBiomes[biome];
                const formattedBiomeName = formatBiomeName(biome);
                const BiomeIcon = getBiomeIcon(biome);
                const availableBiomes = biomeData[biome as keyof typeof biomeData] || [];

                return (
                    <div key={biome} id={biome} className="space-y-4 transition-all duration-300 ease-in-out">
                        <div
                            className="flex items-center gap-2 bg-gradient-to-b from-zinc-100/95 to-zinc-100 dark:from-zinc-800/95 dark:to-zinc-800 p-4 rounded-xl shadow-md ring-1 ring-black/5 dark:ring-white/5"
                            onClick={() => onToggleBiomeCollapse(biome)}
                            role="button"
                            aria-expanded={!isCollapsed}
                            tabIndex={0}
                        >
                            <div className={`transform transition-transform duration-200 ${isCollapsed ? '' : 'rotate-90'}`}>
                                <ChevronRight className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                            </div>
                            <div className="flex items-center gap-3 flex-1">
                                <div className="transform transition-all duration-200 hover:scale-110">
                                    <BiomeIcon />
                                </div>
                                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{formattedBiomeName}</h2>
                                <button
                                    onClick={(e) => handleHashClick(biome, e)}
                                    className="flex items-center justify-center w-8 h-8 text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 focus:text-zinc-700 dark:focus:text-zinc-200 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700/50 transition-all duration-200 transform hover:scale-110"
                                    title="Copy link to section"
                                    aria-label="Copy link to section"
                                >
                                    #
                                </button>
                                <div className="text-base text-zinc-500 dark:text-zinc-400 italic ml-auto">
                                    <p>{availableBiomes.join(', ')}</p>
                                </div>
                            </div>
                        </div>

                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[5000px] opacity-100'}`}>
                            <div className="space-y-6 pt-2">
                                {RARITIES.map(rarity => {
                                    const items = rarities[rarity] || [];
                                    if (items.length === 0) return null;
                                    const isRarityCollapsed = collapsedRarities[biome]?.[rarity];

                                    return (
                                        <div key={rarity} className="space-y-3">
                                            <div
                                                className="flex items-center gap-2 cursor-pointer hover:bg-zinc-100/80 dark:hover:bg-zinc-600/50 duration-200 transition-all p-3 rounded-lg"
                                                onClick={() => onToggleCollapse(biome, rarity)}
                                                role="button"
                                                aria-expanded={!isRarityCollapsed}
                                                tabIndex={0}
                                            >
                                                <div className={`transform transition-transform duration-200 ${isRarityCollapsed ? '' : 'rotate-90'}`}>
                                                    <ChevronRight className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                                                </div>
                                                <h3 className={`text-lg font-semibold capitalize transition-colors duration-200 ${
                                                    rarity === 'common' ? 'text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-300' :
                                                    rarity === 'rare' ? 'text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300' :
                                                    rarity === 'epic' ? 'text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300' :
                                                    'text-yellow-500 hover:text-yellow-600 dark:text-yellow-400 dark:hover:text-yellow-300'
                                                }`}>
                                                    {rarity} ({items.length})
                                                </h3>
                                            </div>

                                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isRarityCollapsed ? 'max-h-0 opacity-0' : 'max-h-[5000px] opacity-100'}`}>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 p-2">
                                                    {items.map((item, index) => (
                                                        <ItemCard
                                                            key={`${item.type}-${index}`}
                                                            item={item}
                                                            getItemImage={getItemImage}
                                                            onClick={() => onItemClick(item)}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
