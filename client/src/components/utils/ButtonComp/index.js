import React from 'react'

import './ButtonComp.css'

const Button = ({ typeClass, text, handleOnClick, modifyClass, children }) => {
    return (
        <button
            className={`buttonComp ${typeClass} ${modifyClass}`}
            onClick={handleOnClick}
            disabled={modifyClass === 'disabled'}
        >
            {children && <span className="icon">{children}</span>}
            {text && <span className="text">{text}</span>}
        </button>
    )
}

export default Button
