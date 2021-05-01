import React, { useState } from 'react'
import PersonIcon from '@material-ui/icons/Person'
import LockIcon from '@material-ui/icons/Lock'

import FormLoader from '../../utils/FormLoader'
import './LoginForm.css'

const LoginForm = ({ setIsOpen }) => {
    const [loading, setLoading] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true)
    }

    return (
        <div className="loginForm">
            <div className="loginForm__main">
                <h1>Login Here!</h1>
                <form onSubmit={handleLogin}>
                    <div className="loginForm__inputGroup">
                        <label>
                            <PersonIcon />
                        </label>
                        <input
                            // required
                            type="text"
                            autoComplete="new-password"
                            id="loginFormInputID"
                            className="loginForm__input"
                            placeholder="Username or Email"
                        />
                    </div>
                    <div className="loginForm__inputGroup">
                        <label>
                            <LockIcon />
                        </label>
                        <input
                            // required
                            type="password"
                            className="loginForm__input"
                            placeholder="Password"
                        />
                    </div>

                    <button type="submit" className="loginForm__loginButton">
                        Login
                    </button>
                </form>

                <div className="loginForm__dividerWrapper">
                    <span className="line"></span>
                    <span>Don't have an account?</span>
                    <span className="line"></span>
                </div>
                <button
                    className="loginForm__registerButton"
                    onClick={() => setIsOpen(true)}
                >
                    Sign Up
                </button>
            </div>

            <FormLoader loading={loading} />
        </div>
    )
}

export default LoginForm
