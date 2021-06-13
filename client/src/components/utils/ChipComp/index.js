import React from 'react'
import { ClockIcon, CheckCircleIcon, XCircleIcon } from '@primer/octicons-react'

import './ChipComp.css'

const ChipComp = ({ type, text }) => {
    return (
        <div className={`chipComp ${type}`}>
            <h3>{text}</h3>
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
