import React from 'react';
import { MT_ATTRIBUTE, MT_ENCHANTMENT, MT_ITEM } from '../interfaces';
import Image from 'next/image';
import { faTag, faBook, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { attributeNames } from '../utils/attribute-names';
import NBTBlock from './NBTBlock';
import Tooltip from './Tooltip';

const StatsModal = ({
    item,
    setModal,
}: {
    item: MT_ITEM;
    setModal: Function;
}) => {
    const handleModalClick = (e) => {
        if (
            e.target.className &&
            typeof e.target.className.includes === 'function' &&
            e.target.className.includes('modal-background')
        ) {
            setModal(false);
        }
    };

    return (
        <>
            <div
                className='fixed top-0 left-0 h-screen w-screen modal-background'
                onClick={handleModalClick}
                style={{ backgroundColor: 'rgb(0, 0, 0, 0.7)' }}
            >
                <div
                    className='relative w-[80vw] h-[80vh] rounded-xl bg-gray-200 opacity-100 mx-[10vw] my-[10vh] p-5 overflow-x-auto scrollbar-thumb-gray-400 scrollbar-thumb-rounded-lg scrollbar-thin'
                    onClick={handleModalClick}
                >
                    <FontAwesomeIcon
                        height={20}
                        className='inline-block absolute top-5 left-5 text-2xl transition-all duration-100 hover:text-4xl'
                        icon={faXmark}
                        onClick={() => setModal(false)}
                    />
                    {/* Grid */}
                    <div className='w-full h-full grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-3'>
                        <section className='text-center'>
                            <h1 className='text-xl md:text-4xl font-bold md:mb-5'>
                                {item.name ?? item.type.replace(/_/g, ' ')}
                            </h1>
                            <Image
                                className='md:inline-block visible mx-auto '
                                src={'/items/' + item.type + '.png'}
                                alt={item.type}
                                height={200}
                                width={200}
                            />
                            <section>
                                {/* Lore */}
                                {item.lore &&
                                    item.lore.map((line, idx) => (
                                        <p key={idx}>{line}</p>
                                    ))}
                            </section>
                        </section>
                        <section className='text-center'>
                            <h1 className='text-xl md:text-4xl font-bold mb-5'>
                                <FontAwesomeIcon
                                    className='inline-block'
                                    height={30}
                                    icon={faTag}
                                />{' '}
                                Attributes
                            </h1>
                            <div className='grid grid-cols-1 gap-3'>
                                {item.attributes &&
                                    item.attributes.map((attribute, idx) => (
                                        <Attribute
                                            key={idx}
                                            attribute={attribute}
                                        ></Attribute>
                                    ))}
                                {!item.attributes && (
                                    <p className='text-center'>
                                        <i>No attributes</i>
                                    </p>
                                )}
                            </div>
                        </section>
                        <section className='text-center pb-5 md:pb-0'>
                            <h1 className='text-xl md:text-4xl font-bold mb-5'>
                                <FontAwesomeIcon
                                    className='inline-block'
                                    height={30}
                                    icon={faBook}
                                />{' '}
                                Enchantments
                            </h1>
                            <div className='grid grid-cols-1 gap-3'>
                                {item.unbreakable && <UnbreakableEnchantment />}
                                {item.enchantWithLevel && (
                                    <LevelEnchantment
                                        level={item.enchantWithLevel}
                                    />
                                )}
                                {item.enchantments &&
                                    item.enchantments.map(
                                        (enchantment, idx) => (
                                            <Enchantment
                                                key={idx}
                                                enchantment={enchantment}
                                            ></Enchantment>
                                        )
                                    )}
                                {!item.unbreakable &&
                                    !item.enchantments &&
                                    !item.enchantWithLevel && (
                                        <p className='text-center'>
                                            <i>No enchantments</i>
                                        </p>
                                    )}
                            </div>
                        </section>
                        {item.conditions.stoneMined && (
                            <section className='lg:col-span-3'>
                                <h1 className='text-xl md:text-4xl font-bold mb-5 text-center'>
                                    Conditions
                                </h1>
                                <div className='flex flex-col gap-3 items-center'>
                                    {/* Stone mined */}
                                    {item.conditions.stoneMined && (
                                        <div className='flex flex-col gap-3 bg-gray-300 border border-gray-400 p-2 rounded-lg'>
                                            <h2 className='text-lg font-bold'>
                                                Blocks mined
                                            </h2>
                                            {item.conditions.stoneMined.min && (
                                                <span>
                                                    Min:{' '}
                                                    {item.conditions.stoneMined
                                                        .min - 300000}
                                                </span>
                                            )}
                                            {item.conditions.stoneMined.max && (
                                                <span>
                                                    Max:{' '}
                                                    {item.conditions.stoneMined
                                                        .max - 300000}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}
                        {(item.nbt || item.components) && (
                            <section className='lg:col-span-3'>
                                <NBTBlock
                                    nbt={item.nbt || item.components}
                                ></NBTBlock>
                            </section>
                        )}
                        <section></section>
                    </div>
                </div>
            </div>
        </>
    );
};

const Attribute = ({ attribute }: { attribute: MT_ATTRIBUTE }) => {
    const attributeData = attributeNames[attribute.name] || {
        name: attribute.name,
        type: 'value',
    };

    return (
        <div className='text-center lg:text-left'>
            <Image
                src='/items/armor_stand.png'
                alt='armor_stand'
                width={24}
                height={24}
                className='inline-block'
            ></Image>
            <p className='text-lg md:text-xl inline-block align-middle pl-3'>
                {attribute.min !== attribute.max && (
                    <>
                        <samp className='bg-gray-300 rounded-md p-1'>
                            {attribute.min > 0 ? '+' : ''}
                            {attributeData.type == 'percent'
                                ? `${attribute.min * 100}%`
                                : attribute.min}
                        </samp>{' '}
                        to{' '}
                        <samp className='bg-gray-300 rounded-md p-1'>
                            {attribute.max > 0 ? '+' : ''}
                            {attributeData.type == 'percent'
                                ? `${attribute.max * 100}%`
                                : attribute.max}
                        </samp>
                    </>
                )}
                {attribute.min === attribute.max && (
                    <>
                        <samp className='bg-gray-300 rounded-md p-1'>
                            {attribute.min > 0 ? '+' : ''}
                            {attributeData.type == 'percent'
                                ? `${attribute.min * 100}%`
                                : attribute.min}
                        </samp>
                    </>
                )}{' '}
                {attributeNames[attribute.name]?.name ?? attribute.name}
                {attribute.slot &&
                    !['feet', 'legs', 'chest', 'head'].includes(
                        attribute.slot
                    ) && <> in {attribute.slot}</>}
            </p>
        </div>
    );
};

const Enchantment = ({ enchantment }: { enchantment: MT_ENCHANTMENT }) => {
    return (
        <div className='text-center lg:text-left'>
            <Image
                src='/items/enchanted_book.png'
                alt='enchanted_book'
                width={24}
                height={24}
                className='inline-block'
            ></Image>
            <p className='text-lg md:text-xl inline-block align-middle pl-3'>
                <b>{enchantment.type.replace(/_/g, ' ')}</b> {enchantment.min}-
                {enchantment.max}
            </p>
        </div>
    );
};

const UnbreakableEnchantment = () => {
    return (
        <div className='text-center lg:text-left'>
            <Image
                src='/items/enchanted_book.png'
                alt='enchanted_book'
                width={24}
                height={24}
                className='inline-block'
            ></Image>
            <p className='text-lg md:text-xl inline-block align-middle pl-3'>
                <b>Unbreakable</b>
            </p>
        </div>
    );
};

const LevelEnchantment = ({ level }) => {
    const id = (Math.random() + 1).toString(36).substring(2);

    return (
        <div className='text-center lg:text-left'>
            <Image
                src='/items/enchanted_book.png'
                alt='enchanted_book'
                width={24}
                height={24}
                className='inline-block'
            ></Image>
            <p className='text-lg md:text-xl inline-block align-middle pl-3'>
                <b>Level {level} enchantment(s)</b>
            </p>
            <Tooltip
                name={id}
                content={`If you were to put this item in an enchantment table, it would get enchantments worth ${level} levels`}
            />
        </div>
    );
};

export default StatsModal;
