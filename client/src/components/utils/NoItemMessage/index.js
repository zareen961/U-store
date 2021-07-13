import React from 'react'

import './NoItemMessage.scss'

const NoItemMessage = ({ title, text, titleSize = 1.2 }) => {
    return (
        <div className="noItemMessage">
            {title && (
                <h1
                    className="noItemMessage__title"
                    style={{ fontSize: `${titleSize}rem` }}
                >
                    {title}
                </h1>
            )}

            {text && (
                <p
                    className="noItemMessage__text"
                    style={{ fontSize: `${titleSize / 1.3}rem` }}
                >
                    {text}
                </p>
            )}
        </div>
    )
}

export default NoItemMessage
