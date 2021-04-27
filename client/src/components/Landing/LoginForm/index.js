import React from 'react'
import PersonIcon from '@material-ui/icons/Person'
import LockIcon from '@material-ui/icons/Lock'

import './LoginForm.css'

const LoginForm = ({ setIsOpen }) => {
    return (
        <div className="loginForm">
            <div className="loginForm__front">
                <h1>Login Here!</h1>
                <form>
                    <div className="loginForm__inputGroup">
                        <label>
                            <PersonIcon />
                        </label>
                        <input
                            required
                            type="text"
                            autoComplete="new-password"
                            className="loginForm__input"
                            placeholder="Username or Email"
                        />
                    </div>
                    <div className="loginForm__inputGroup">
                        <label>
                            <LockIcon />
                        </label>
                        <input
                            required
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
        </div>
    )
}

export default LoginForm
