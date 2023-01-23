import React from 'react'
import { Tooltip } from 'react-tooltip'
import { MT_ITEM } from '../interfaces'

const HoverCard = ({ item, id }: { item: MT_ITEM, id: string }) => {
    return (
        <>
            <Tooltip anchorId={id} content={item.lore.join('\n')} />
        </>
    )
}

export default HoverCard