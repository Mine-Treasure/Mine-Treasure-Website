import Image from 'next/image';

export const getBiomeIcon = (biome: string) => {
    const icons: Record<string, string> = {
        ocean: '/items/water_bucket.png',
        ice: '/items/ice.png',
        dark_forest: '/items/dark_oak_log.png',
        nether_fortress: '/items/nether_bricks.png',
        crimson: '/items/crimson_stem.png',
        desert: '/items/sand.png',
        mine: '/items/diamond_pickaxe.png',
        dungeon: '/items/spawner.png',
        mountain: '/items/stone.png',
        jungle: '/items/jungle_log.png',
        bastion: '/items/netherrack.png',
        end: '/items/end_stone.png',
        badlands: '/items/red_sand.png',
        dripstone: '/items/dripstone_block.png',
        flower: '/items/sunflower.png',
        lush_caves: '/items/moss_block.png',
        mushroom: '/items/red_mushroom_block.png',
        nether: '/items/netherrack.png',
        savanna: '/items/acacia_log.png',
        soul_valley: '/items/soul_sand.png',
        swamp: '/items/lily_pad.png',
        taiga: '/items/spruce_log.png',
        warped: '/items/warped_stem.png',
        wind: '/items/gravel.png',
        basalt: '/items/basalt.png',
        deep_dark: '/items/sculk_sensor.png',
        default: '/items/grass_block.png'
    };

    const iconPath = icons[biome] || '/items/missing_texture_block.png';

    // eslint-disable-next-line react/display-name
    return () => (
        <Image
            src={iconPath}
            alt={`${biome} icon`}
            width={30}
            height={30}
            className="pixelated"
            unoptimized
        />
    );
};
