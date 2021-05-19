import React from 'react'

import './ButtonComp.css'

const Button = ({ typeClass, text, handleOnClick, isModify, children }) => {
    return (
        <button
            className={
                isModify ? `buttonComp ${typeClass} modify` : `buttonComp ${typeClass}`
            }
            onClick={handleOnClick}
        >
            <span className="icon">{children}</span>
            <span className="text">{text}</span>
        </button>
    )
}

export default Button
