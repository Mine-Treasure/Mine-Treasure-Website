import Image from 'next/image';
import { useEffect, useState } from 'react';
import Biome from '../components/Biome';
import ChanceSection from '../components/ChanceSection';
import Grid from '../components/Grid';
import ItemsCard from '../components/ItemsCard';
import Section from '../components/Section';
import useRequest from '../hooks/useRequest';
import { MT_DATA } from '../interfaces';
import Footer from '../components/Footer';
import Locations from '../components/Locations';
import Head from 'next/head';
import Navbar from '../components/layout/Navbar';
import MultiSelect from '../components/form/MultiSelect';
import Toggle from '../components/form/Toggle';
import Tooltip from '../components/Tooltip';
import formatNumber from '../utils/formatNumber';

const IndexPage = () => {
    // Filters
    const [customData, setCustomData] = useState<MT_DATA>({});

    const [queryString, setQueryString] = useState('');
    const [selectedTreasures, setSelectedTreasures] = useState([]);
    const [selectedRarities, setSelectedRarities] = useState([]);
    const [customItemsOnly, setCustomItemsOnly] = useState(false);
    const [listAllItems, setListAllItems] = useState(false);
    const [blocksMined, setBlocksMined] = useState(0);

    const [decimalPlaces, setDecimalPlaces] = useState(3);
    const [commonChance, setCommonChance] = useState(0);
    const [rareChance, setRareChance] = useState(0);
    const [epicChance, setEpicChance] = useState(0);
    const [legendaryChance, setLegendaryChance] = useState(0);

    // Rarity data
    const [rarityData, loadedRarityData] = useRequest('/api/rarityData');
    const [lootData, loadedLootData] = useRequest('/api/treasureData');
    const [biomeData, loadedBiomeData] = useRequest('/api/biomeData');
    const [advancementData, loadedAdvancementData] =
        useRequest('/api/advancements');
    const [initialChanceData, loadedInitialChanceData] = useRequest(
        '/api/initialChances'
    );

    const filterData = (query) => {
        if (!loadedLootData) return;

        const validBiomes = selectedTreasures.map((t) => t.value);
        const validRarities = selectedRarities.map((t) => t.value);

        let filteredData = {};
        let biomes = Object.keys(lootData);
        biomes = validBiomes.length
            ? biomes.filter((b) => validBiomes.includes(b))
            : biomes;

        for (const biome of biomes) {
            filteredData[biome] = {};
            for (const rarity of Object.keys(lootData[biome])) {
                if (validRarities.length && !validRarities.includes(rarity)) {
                    filteredData[biome][rarity] = [];
                    continue;
                }
                filteredData[biome][rarity] = lootData[biome][rarity].filter(
                    (value) =>
                        (
                            value.name?.toLowerCase() ??
                            value.type.replace(/_/g, ' ').toLowerCase()
                        ).includes(query.toLowerCase())
                );
                if (customItemsOnly)
                    filteredData[biome][rarity] = filteredData[biome][
                        rarity
                    ].filter((value) => value.name !== undefined);

                // Min / Max conditions, only if list all items is false
                if (!listAllItems) {
                    filteredData[biome][rarity] = filteredData[biome][
                        rarity
                    ].filter((value) => {
                        const actualBlocksMined =
                            parseInt(blocksMined as any) + 300000;
                        const minValue = value.conditions.stoneMined?.min;
                        const maxValue = value.conditions.stoneMined?.max;

                        if (
                            actualBlocksMined < minValue ||
                            actualBlocksMined > maxValue
                        ) {
                            return false;
                        }
                        return true;
                    });
                }
            }
        }

        setCustomData(filteredData);
    };

    useEffect(() => {
        filterData(queryString);
    }, [
        selectedTreasures,
        selectedRarities,
        queryString,
        customItemsOnly,
        loadedLootData,
        blocksMined,
        listAllItems,
    ]);

    const clearFilters = () => {
        setSelectedTreasures([]);
        setSelectedRarities([]);
        setCustomItemsOnly(false);
        setQueryString('');
    };

    useEffect(() => {
        if (initialChanceData) {
            setCommonChance(initialChanceData.common);
            setRareChance(initialChanceData.rare);
            setEpicChance(initialChanceData.epic);
            setLegendaryChance(initialChanceData.legendary);
        }
    }, [loadedInitialChanceData]);

    return (
        <>
            <Head>
                <title>Mine Treasure | Loot</title>
                <meta
                    name='viewport'
                    content='initial-scale=1.0, width=device-width'
                />

                <meta
                    name='description'
                    content='These are the loot tables of the datapack. They are the items that can appear in the treasure barrels'
                    key='desc'
                />
                <meta
                    property='og:title'
                    content='Loot table | Mine Treasure'
                />
                <meta
                    property='og:description'
                    content='These are the loot tables of the datapack. They are the items that can appear in the treasure barrels'
                />
            </Head>
            <div className='bg-white px-6 lg:px-24 py-12'>
                <Navbar />
                <Section className='bg-orange-400'>
                    <h1 className='text-white text-center text-3xl font-bold'>
                        Important!
                    </h1>
                    <p className='text-lg font-medium text-center text-white'>
                        The rarities shown below are for the latest version
                        only! (at the time of writing, version 1.4.1). Please
                        remember that the loot of older versions may differ and
                        you should not rely on this site for the older versions!
                    </p>
                </Section>
                {(!loadedRarityData ||
                    !loadedLootData ||
                    !loadedBiomeData ||
                    !loadedAdvancementData ||
                    !loadedInitialChanceData) && (
                    <Section>
                        <div className='text-center'>
                            <span className='loader' />
                        </div>
                    </Section>
                )}
                {loadedRarityData &&
                    loadedLootData &&
                    loadedInitialChanceData && (
                        <>
                            <Section>
                                <div>
                                    <label htmlFor='search' className='sr-only'>
                                        Search
                                    </label>
                                    <div className='relative w-full'>
                                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                            <svg
                                                aria-hidden='true'
                                                className='w-5 h-5 text-gray-500'
                                                fill='currentColor'
                                                viewBox='0 0 20 20'
                                                xmlns='http://www.w3.org/2000/svg'
                                            >
                                                <path
                                                    fillRule='evenodd'
                                                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                                                    clipRule='evenodd'
                                                ></path>
                                            </svg>
                                        </div>
                                        <input
                                            type='text'
                                            id='search'
                                            value={queryString}
                                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5'
                                            onChange={(e) =>
                                                setQueryString(e.target.value)
                                            }
                                        ></input>
                                    </div>
                                    <div className='grid grid-cols-2 md:grid-cols-4 mt-2 gap-4'>
                                        <div>
                                            <label htmlFor='decimalPlaces'>
                                                Decimal places
                                            </label>
                                            <input
                                                type='number'
                                                id='decimalPlaces'
                                                value={decimalPlaces}
                                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 p-2.5'
                                                onChange={(e) =>
                                                    setDecimalPlaces(
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <p className='font-medium mt-4 inline-block'>
                                        Output values
                                    </p>
                                    <Tooltip
                                        name='outputvalues'
                                        content='Input a number to determine a range of output values. The higher the number, the lower the chance or vice versa.'
                                    />
                                    <div className='grid grid-cols-2 md:grid-cols-4 mt-2 gap-4'>
                                        <div>
                                            <label htmlFor='commonChance'>
                                                Common chance
                                            </label>
                                            <input
                                                type='number'
                                                id='commonChance'
                                                value={commonChance}
                                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 p-2.5'
                                                onChange={(e) =>
                                                    setCommonChance(
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor='rareChance'>
                                                Rare chance
                                            </label>
                                            <input
                                                type='number'
                                                id='rareChance'
                                                value={rareChance}
                                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 p-2.5'
                                                onChange={(e) =>
                                                    setRareChance(
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor='epicChance'>
                                                Epic chance
                                            </label>
                                            <input
                                                type='number'
                                                id='epicChance'
                                                value={epicChance}
                                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 p-2.5'
                                                onChange={(e) =>
                                                    setEpicChance(
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor='legendaryChance'>
                                                Legendary chance
                                            </label>
                                            <input
                                                type='number'
                                                id='legendaryChance'
                                                value={legendaryChance}
                                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 p-2.5'
                                                onChange={(e) =>
                                                    setLegendaryChance(
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between mt-4'>
                                        <p className='font-medium'>Filters</p>
                                        <button
                                            className='px-4 py-2 bg-white hover:bg-gray-200 text-sm font-medium rounded-md'
                                            onClick={() => clearFilters()}
                                        >
                                            Reset Filter
                                        </button>
                                    </div>
                                    <div>
                                        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4'>
                                            <div>
                                                <p className='text-sm font-medium'>
                                                    Treasure types
                                                </p>
                                                <MultiSelect
                                                    options={Object.keys(
                                                        lootData
                                                    ).map((biome) => {
                                                        return {
                                                            name: biome.replace(
                                                                /_/g,
                                                                ' '
                                                            ),
                                                            value: biome,
                                                        };
                                                    })}
                                                    standard={''}
                                                    selected={selectedTreasures}
                                                    setSelected={
                                                        setSelectedTreasures
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <p className='text-sm font-medium'>
                                                    Rarity types
                                                </p>
                                                <MultiSelect
                                                    options={[
                                                        {
                                                            name: 'Common',
                                                            value: 'common',
                                                        },
                                                        {
                                                            name: 'Rare',
                                                            value: 'rare',
                                                        },
                                                        {
                                                            name: 'Epic',
                                                            value: 'epic',
                                                        },
                                                        {
                                                            name: 'Legendary',
                                                            value: 'legendary',
                                                        },
                                                    ]}
                                                    standard={''}
                                                    selected={selectedRarities}
                                                    setSelected={
                                                        setSelectedRarities
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <p className='text-sm font-medium'>
                                                    Custom items only
                                                </p>
                                                <Toggle
                                                    setToggled={
                                                        setCustomItemsOnly
                                                    }
                                                    toggled={customItemsOnly}
                                                />
                                            </div>
                                            <div>
                                                <p className='text-sm font-medium'>
                                                    List all items
                                                </p>
                                                <Toggle
                                                    setToggled={setListAllItems}
                                                    toggled={listAllItems}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Section>
                            <Section>
                                <header className='text-center'>
                                    <Image
                                        src={'/items/diamond.png'}
                                        width={48}
                                        height={48}
                                        alt={'Diamond'}
                                        className='inline-block'
                                    ></Image>
                                    <p className='font-mono text-3xl md:inline-block md:ml-5 align-middle'>
                                        Rarities
                                    </p>
                                </header>
                                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 mt-5 max-h-96 scrollbar-thumb-gray-400 scrollbar-thumb-rounded-lg scrollbar-thin overflow-y-scroll'>
                                    {Object.keys(rarityData).map((ore, idx) => (
                                        <ChanceSection
                                            key={idx}
                                            ore={ore}
                                            chance={rarityData[ore]}
                                            rarityValues={{
                                                common: commonChance,
                                                rare: rareChance,
                                                epic: epicChance,
                                                legendary: legendaryChance,
                                            }}
                                            decimalPlaces={decimalPlaces}
                                        />
                                    ))}
                                </div>
                            </Section>
                            <Section>
                                <header className='text-center'>
                                    <Image
                                        src={'/items/diamond_pickaxe.png'}
                                        width={48}
                                        height={48}
                                        alt={'Diamond pickaxe'}
                                        className='inline-block'
                                    ></Image>
                                    <p className='font-mono text-3xl md:inline-block md:ml-5 align-middle'>
                                        Blocks mined
                                    </p>
                                </header>
                                <div className='relative'>
                                    <span className='absolute left-0 font-bold font-mono'>
                                        0
                                    </span>
                                    <span className='absolute right-0 font-bold font-mono'>
                                        {formatNumber(500000)}
                                    </span>
                                    <p className='font-bold font-mono text-center'>
                                        Current: {formatNumber(blocksMined)}
                                    </p>
                                    <input
                                        type='range'
                                        min='0'
                                        max='500000'
                                        onClickCapture={(e) =>
                                            setBlocksMined(
                                                (e.target as any).value
                                            )
                                        }
                                        className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
                                    ></input>
                                </div>
                            </Section>
                        </>
                    )}

                {loadedRarityData &&
                    loadedLootData &&
                    loadedBiomeData &&
                    loadedAdvancementData &&
                    Object.keys(customData).map((biome, idx) => {
                        const commonData = customData[biome]['common'];
                        const rareData = customData[biome]['rare'];
                        const epicData = customData[biome]['epic'];
                        const legendaryData = customData[biome]['legendary'];

                        if (
                            !commonData.length &&
                            !rareData.length &&
                            !epicData.length &&
                            !legendaryData.length
                        )
                            return '';

                        return (
                            <Section key={idx}>
                                <Biome name={biome}></Biome>
                                <Locations biomes={biomeData[biome]} />
                                <Grid>
                                    <ItemsCard
                                        advancement={
                                            advancementData[biome]?.['common']
                                        }
                                        rarity={'common'}
                                        loot={customData[biome]['common']}
                                    />
                                    <ItemsCard
                                        advancement={
                                            advancementData[biome]?.['rare']
                                        }
                                        rarity={'rare'}
                                        loot={customData[biome]['rare']}
                                    />
                                    <ItemsCard
                                        advancement={
                                            advancementData[biome]?.['epic']
                                        }
                                        rarity={'epic'}
                                        loot={customData[biome]['epic']}
                                    />
                                    <ItemsCard
                                        advancement={
                                            advancementData[biome]?.[
                                                'legendary'
                                            ]
                                        }
                                        rarity={'legendary'}
                                        loot={customData[biome]['legendary']}
                                    />
                                </Grid>
                            </Section>
                        );
                    })}
                <Footer />
            </div>
        </>
    );
};

export default IndexPage;
