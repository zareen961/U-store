import React from 'react'

import './ScreenHeader.css'

const ScreenHeader = ({ title, handleButtonPress, buttonText, children }) => {
    return (
        <div className="screenHeader">
            <h1>{title}</h1>
            {handleButtonPress && (
                <button className="screenHeader__button" onClick={handleButtonPress}>
                    <span className="icon">{children}</span>
                    <span className="text">{buttonText}</span>
                </button>
            )}
        </div>
    )
}

export default ScreenHeader
