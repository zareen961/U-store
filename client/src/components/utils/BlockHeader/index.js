import React from 'react'

import './BlockHeader.scss'

const BlockHeader = ({ title, children }) => {
    return (
        <div className="blockHeader">
            <h1>{title}</h1>
            {children && children}
        </div>
    )
}

export default BlockHeader
