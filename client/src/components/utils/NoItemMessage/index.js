import React from 'react'

import './NoItemMessage.css'

const NoItemMessage = ({ title, text, titleSize = 2 }) => {
    return (
        <div className="noItemMessage">
            <h1 className="noItemMessage__title" style={{ fontSize: `${titleSize}rem` }}>
                {title}
            </h1>
            <p
                className="noItemMessage__text"
                style={{ fontSize: `${titleSize / 1.6}rem` }}
            >
                {text}
            </p>
        </div>
    )
}

export default NoItemMessage
