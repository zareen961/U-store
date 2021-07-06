import React from 'react'
import { ClockIcon, CheckCircleIcon, XCircleIcon } from '@primer/octicons-react'

import './ChipComp.scss'

const ChipComp = ({ type, text, isPositionAbsolute = false, children }) => {
    return (
        <div
            className={
                isPositionAbsolute
                    ? `chipComp ${type} positionAbsolute`
                    : `chipComp ${type}`
            }
        >
            <h3>{children ? children : text}</h3>
            {type === 'error' ? (
                <XCircleIcon size={16} />
            ) : type === 'success' ? (
                <CheckCircleIcon size={16} />
            ) : (
                <ClockIcon size={16} />
            )}
        </div>
    )
}

export default ChipComp
