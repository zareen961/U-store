import React from 'react'

import './UnderlineButtonComp.css'

const UnderlineButtonComp = ({ text, handleOnClick, isActive = false }) => {
    return (
        <button
            type="button"
            onClick={handleOnClick}
            className={isActive ? 'underlineButtonComp active' : 'underlineButtonComp'}
        >
            {text}
        </button>
    )
}

export default UnderlineButtonComp
