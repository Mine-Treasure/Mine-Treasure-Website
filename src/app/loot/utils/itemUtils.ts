import type { MT_ITEM } from '@/types/types';

export const getItemImage = (item: MT_ITEM): string => {
    if (item.components && item.components['minecraft:profile']) {
        return `https://mc-heads.net/head/${item.components['minecraft:profile']}`;
    }

    const itemType = item.type.toLowerCase();
    return `/items/${itemType}.png`;
};

export const getBlockRangeText = (item: MT_ITEM): string | null => {
    if (!item.conditions.stoneMined) return null;

    const min = Math.max((item.conditions.stoneMined.min || 0) - 500_000, 0);
    const max = item.conditions.stoneMined.max
        ? Math.max(item.conditions.stoneMined.max - 500_000, 0)
        : null;

    return max !== null
        ? `${min.toLocaleString()} - ${max.toLocaleString()} blocks`
        : `${min.toLocaleString()}+ blocks`;
};

export const hasModalData = (item: MT_ITEM): boolean => {
    return (
        (item.lore && item.lore.length > 0) ||
        (item.enchantments && item.enchantments.length > 0) ||
        (item.components && Object.keys(item.components).length > 0)
    );
};
