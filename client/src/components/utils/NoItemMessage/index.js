import React from 'react'

import './NoItemMessage.css'

const NoItemMessage = ({ title, text }) => {
    return (
        <div className="noItemMessage">
            <h1 className="noItemMessage__title">{title}</h1>
            <p className="noItemMessage__text">{text}</p>
        </div>
    )
}

export default NoItemMessage
