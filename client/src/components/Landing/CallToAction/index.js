import React from 'react'

import './CallToAction.css'

const CallToAction = () => {
    return (
        <div className="callToAction">
            <div className="callToAction__buttonsWrapper">
                <button className="callToAction__registerButton">Sign Up</button>
                <button className="callToAction__loginButton">Login</button>
            </div>
        </div>
    )
}

export default CallToAction
