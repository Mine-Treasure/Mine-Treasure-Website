import React from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import TooltipIcon from './icons/TooltipIcon'

const Tooltip = ({ name, content }: { name: string; content: string }) => {
    return (
        <div className="inline-block ml-1" id={name}>
            <TooltipIcon className="h-5 w-5 inline-block" />
            <ReactTooltip anchorId={name} content={content} />
        </div>
    )
}

export default Tooltip