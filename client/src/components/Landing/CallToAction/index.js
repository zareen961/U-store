import React from 'react'

import './CallToAction.scss'

const CallToAction = ({ setIsOpen }) => {
    const handleLoginFocus = () => {
        document.getElementById('loginFormInputID').focus()
    }

    return (
        <div className="callToAction">
            <div className="callToAction__contentWrapper">
                <p>Let's dive right in!</p>

                <div className="callToAction__buttonsWrapper">
                    <button
                        className="callToAction__registerButton"
                        onClick={() => setIsOpen(true)}
                    >
                        Sign Up
                    </button>
                    <button
                        className="callToAction__loginButton"
                        onClick={handleLoginFocus}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CallToAction
