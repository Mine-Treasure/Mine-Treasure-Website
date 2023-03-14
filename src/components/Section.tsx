import React from 'react'

const Section = ({ children, className = "" }) => {
    return (
        <div className={"bg-gray-100 mt-5 rounded-xl p-5 shadow-xl " + className}>
            {children}
        </div>
    )
}

export default Section