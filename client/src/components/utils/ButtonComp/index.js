import React from 'react'

import './ButtonComp.scss'

const Button = ({
    typeClass,
    text,
    handleOnClick,
    modifyClass,
    children,
    type = 'button',
}) => {
    return (
        <button
            className={`buttonComp ${typeClass} ${modifyClass}`}
            onClick={handleOnClick}
            disabled={modifyClass ? modifyClass.includes('disabled') : false}
            type={type}
        >
            {children && <span className="icon">{children}</span>}
            {text && <span className="text">{text}</span>}
        </button>
    )
}

export default Button
