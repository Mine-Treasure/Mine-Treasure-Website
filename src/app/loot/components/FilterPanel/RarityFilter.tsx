import { RARITIES } from '../../utils/filterUtils';
import type { RarityFilterProps } from '@/types/types';

export default function RarityFilter({ selectedRarities, onToggleRarity }: RarityFilterProps) {
    const getRarityClasses = (rarity: string, isSelected: boolean) => {
        const baseClasses = `px-3 py-1 rounded-xl text-sm capitalize border hover:opacity-80 transition-all duration-200 ${isSelected ? 'scale-[1.03]' : ''}`;
        switch (rarity) {
            case 'common':
                return `${baseClasses} text-zinc-600 dark:text-zinc-400 ${isSelected ? 'bg-zinc-200 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600' : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700'}`;
            case 'rare':
                return `${baseClasses} text-blue-500 dark:text-blue-400 ${isSelected ? 'bg-blue-100 dark:bg-blue-900 border-blue-200 dark:border-blue-800' : 'bg-blue-50 dark:bg-blue-950 border-blue-100 dark:border-blue-900'}`;
            case 'epic':
                return `${baseClasses} text-purple-500 dark:text-purple-400 ${isSelected ? 'bg-purple-100 dark:bg-purple-900 border-purple-200 dark:border-purple-800' : 'bg-purple-50 dark:bg-purple-950 border-purple-100 dark:border-purple-900'}`;
            default:
                return `${baseClasses} text-yellow-500 dark:text-yellow-400 ${isSelected ? 'bg-yellow-100 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-800' : 'bg-yellow-50 dark:bg-yellow-950 border-yellow-100 dark:border-yellow-900'}`;
        }
    };

    return (
        <div className="mb-6">
            <h4 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">Rarity</h4>
            <div className="flex flex-wrap gap-2">
                {RARITIES.map((rarity) => (
                    <button
                        key={rarity}
                        onClick={() => onToggleRarity(rarity)}
                        className={getRarityClasses(rarity, selectedRarities.includes(rarity))}
                    >
                        {rarity}
                    </button>
                ))}
            </div>
        </div>
    );
}
