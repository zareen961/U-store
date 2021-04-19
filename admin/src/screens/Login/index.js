import React from 'react'

import logo from '../../assets/images/logo.png'
import './Login.css'

const Login = () => {
    return (
        <div className="login">
            <form className="login__form">
                <img src={logo} alt="U-store" className="login__formLogo" />
                <h2>Admin Panel</h2>
                <input type="text" placeholder="Username" className="login__formInput" />
                <input
                    type="password"
                    placeholder="Password"
                    className="login__formInput"
                />
                <button type="submit" className="login__formButton">
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login
