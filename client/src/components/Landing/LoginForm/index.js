import React from 'react'

import './LoginForm.css'

const LoginForm = () => {
    return (
        <div className="loginForm">
            <form>
                <input type="text" className="loginForm__input" />
                <input type="password" className="loginForm__input" />
                <button className="loginForm__loginButton">Login</button>
            </form>
        </div>
    )
}

export default LoginForm
