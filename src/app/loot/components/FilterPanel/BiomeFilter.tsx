import { getBiomeIcon } from '../../utils/biomeIcons';
import type { BiomeFilterProps } from '@/types/types';

const formatBiomeName = (biome: string) => {
    return biome
        .replace('_treasure', '')
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const getBiomeClasses = (biome: string, isSelected: boolean) => {
    const baseClasses = `px-3 py-1 rounded-xl text-sm capitalize border hover:opacity-80 transition-all duration-200 ${isSelected ? 'scale-[1.03]' : ''}`;

    switch (biome) {
        case 'badlands':
            return `${baseClasses} ${isSelected
                ? 'bg-orange-100 dark:bg-orange-900 border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400'
                : 'bg-orange-50 dark:bg-orange-950 border-orange-100 dark:border-orange-900 text-orange-500 dark:text-orange-400'}`;
        case 'basalt':
            return `${baseClasses} text-slate-700 dark:text-slate-300 ${isSelected
                ? 'bg-slate-300 dark:bg-slate-700 border-slate-400 dark:border-slate-600'
                : 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700'}`;
        case 'crimson':
            return `${baseClasses} ${isSelected
                ? 'bg-rose-100 dark:bg-rose-900 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400'
                : 'bg-rose-50 dark:bg-rose-950 border-rose-100 dark:border-rose-900 text-rose-500 dark:text-rose-400'}`;
        case 'dark_forest':
            return `${baseClasses} text-amber-800 dark:text-amber-400 ${isSelected
                ? 'bg-amber-200 dark:bg-amber-800 border-amber-300 dark:border-amber-700'
                : 'bg-amber-300 dark:bg-amber-950 border-amber-400 dark:border-amber-900'}`;
        case 'deep_dark':
            return `${baseClasses} text-blue-800 dark:text-blue-400 ${isSelected
                ? 'bg-blue-200 dark:bg-blue-800 border-blue-300 dark:border-blue-700'
                : 'bg-blue-300 dark:bg-blue-950 border-blue-400 dark:border-blue-900'}`;
        case 'default':
            return `${baseClasses} ${isSelected
                ? 'bg-green-100 dark:bg-green-900 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400'
                : 'bg-green-50 dark:bg-green-950 border-green-100 dark:border-green-900 text-green-500 dark:text-green-400'}`;
        case 'desert':
            return `${baseClasses} ${isSelected
                ? 'bg-yellow-100 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-800 text-yellow-600 dark:text-yellow-400'
                : 'bg-yellow-50 dark:bg-yellow-950 border-yellow-100 dark:border-yellow-900 text-yellow-500 dark:text-yellow-400'}`;
        case 'dripstone':
            return `${baseClasses} text-orange-600 dark:text-orange-400 ${isSelected
                ? 'bg-orange-100 dark:bg-orange-800 border-orange-200 dark:border-orange-700'
                : 'bg-orange-200 dark:bg-orange-950 border-orange-300 dark:border-orange-900'}`;
        case 'end':
            return `${baseClasses} ${isSelected
                ? 'bg-purple-100 dark:bg-purple-900 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400'
                : 'bg-purple-50 dark:bg-purple-950 border-purple-100 dark:border-purple-900 text-purple-500 dark:text-purple-400'}`;
        case 'flower':
            return `${baseClasses} ${isSelected
                ? 'bg-pink-100 dark:bg-pink-900 border-pink-200 dark:border-pink-800 text-pink-600 dark:text-pink-400'
                : 'bg-pink-50 dark:bg-pink-950 border-pink-100 dark:border-pink-900 text-pink-500 dark:text-pink-400'}`;
        case 'forest':
            return `${baseClasses} ${isSelected
                ? 'bg-emerald-100 dark:bg-emerald-900 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400'
                : 'bg-emerald-50 dark:bg-emerald-950 border-emerald-100 dark:border-emerald-900 text-emerald-500 dark:text-emerald-400'}`;
        case 'ice':
            return `${baseClasses} ${isSelected
                ? 'bg-sky-100 dark:bg-sky-900 border-sky-200 dark:border-sky-800 text-sky-600 dark:text-sky-400'
                : 'bg-sky-50 dark:bg-sky-950 border-sky-100 dark:border-sky-900 text-sky-500 dark:text-sky-400'}`;
        case 'jungle':
            return `${baseClasses} ${isSelected
                ? 'bg-lime-100 dark:bg-lime-900 border-lime-200 dark:border-lime-800 text-lime-600 dark:text-lime-400'
                : 'bg-lime-50 dark:bg-lime-950 border-lime-100 dark:border-lime-900 text-lime-500 dark:text-lime-400'}`;
        case 'lush_caves':
            return `${baseClasses} ${isSelected
                ? 'bg-teal-100 dark:bg-teal-900 border-teal-200 dark:border-teal-800 text-teal-600 dark:text-teal-400'
                : 'bg-teal-50 dark:bg-teal-950 border-teal-100 dark:border-teal-900 text-teal-500 dark:text-teal-400'}`;
        case 'mountain':
            return `${baseClasses} text-slate-700 dark:text-slate-400 ${isSelected
                ? 'bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`;
        case 'mushroom':
            return `${baseClasses} ${isSelected
                ? 'bg-red-100 dark:bg-red-900 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400'
                : 'bg-red-50 dark:bg-red-950 border-red-100 dark:border-red-900 text-red-500 dark:text-red-400'}`;
        case 'nether':
            return `${baseClasses} ${isSelected
                ? 'bg-red-200 dark:bg-red-900 border-red-300 dark:border-red-800 text-red-700 dark:text-red-400'
                : 'bg-red-100 dark:bg-red-950 border-red-200 dark:border-red-900 text-red-600 dark:text-red-400'}`;
        case 'ocean':
            return `${baseClasses} ${isSelected
                ? 'bg-blue-100 dark:bg-blue-900 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400'
                : 'bg-blue-50 dark:bg-blue-950 border-blue-100 dark:border-blue-900 text-blue-500 dark:text-blue-400'}`;
        case 'savanna':
            return `${baseClasses} ${isSelected
                ? 'bg-amber-100 dark:bg-amber-900 border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400'
                : 'bg-amber-50 dark:bg-amber-950 border-amber-100 dark:border-amber-900 text-amber-500 dark:text-amber-400'}`;
        case 'soul_valley':
            return `${baseClasses} ${isSelected
                ? 'bg-cyan-100 dark:bg-cyan-900 border-cyan-200 dark:border-cyan-800 text-cyan-600 dark:text-cyan-400'
                : 'bg-cyan-50 dark:bg-cyan-950 border-cyan-100 dark:border-cyan-900 text-cyan-500 dark:text-cyan-400'}`;
        case 'swamp':
            return `${baseClasses} ${isSelected
                ? 'bg-emerald-100 dark:bg-emerald-900 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400'
                : 'bg-emerald-50 dark:bg-emerald-950 border-emerald-100 dark:border-emerald-900 text-emerald-500 dark:text-emerald-400'}`;
        case 'taiga':
            return `${baseClasses} ${isSelected
                ? 'bg-emerald-100 dark:bg-emerald-900 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400'
                : 'bg-emerald-50 dark:bg-emerald-950 border-emerald-100 dark:border-emerald-900 text-emerald-500 dark:text-emerald-400'}`;
        case 'warped':
            return `${baseClasses} ${isSelected
                ? 'bg-indigo-100 dark:bg-indigo-900 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400'
                : 'bg-indigo-50 dark:bg-indigo-950 border-indigo-100 dark:border-indigo-900 text-indigo-500 dark:text-indigo-400'}`;
        case 'wind':
            return `${baseClasses} text-slate-600 dark:text-slate-400 ${isSelected
                ? 'bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`;
        default:
            return `${baseClasses} ${isSelected
                ? 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
                : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-900 text-zinc-500 dark:text-zinc-400'}`;
    }
};

export default function BiomeFilter({ biomes, selectedBiomes, onToggleBiome }: BiomeFilterProps) {
    return (
        <div className="mb-6">
            <h4 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">Biomes</h4>
            <div className="flex flex-wrap gap-2">
                {biomes.map((biome) => {
                    const BiomeIcon = getBiomeIcon(biome);
                    const formattedName = formatBiomeName(biome);
                    const isSelected = selectedBiomes.includes(biome);

                    return (
                        <button
                            key={biome}
                            onClick={() => onToggleBiome(biome)}
                            className={getBiomeClasses(biome, isSelected)}
                        >
                            <div className="flex items-center gap-2">
                                <BiomeIcon />
                                <span>{formattedName}</span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
