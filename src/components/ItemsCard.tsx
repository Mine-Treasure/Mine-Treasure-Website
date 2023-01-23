import React from 'react'
import { Tooltip } from 'react-tooltip'
import Image from 'next/image'
import Item from './Item'
import Rarity from './Rarity'

const ItemsCard = ({ rarity, loot, advancement }) => {
    const id = (Math.random() + 1).toString(36).substring(2);

    return (
        <div>
            <div className="w-full">
                <Rarity rarity={rarity}>
                    {advancement && (
                        <>
                            <Image src={"/items/" + "book" + ".png"} alt={"book"} width={15} height={15} className="ml-3 inline-block" id={id} />
                            <Tooltip anchorId={id} content={`${advancement?.title}\n${advancement?.description}`} />
                        </>)}
                </Rarity>
            </div>
            {loot.map((item, idx) => <Item item={item} key={idx}></Item>)}
        </div>
    )
}

export default ItemsCard