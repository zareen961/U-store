import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { useForm } from '../../utils/useForm'
import { adminLogin } from '../../store/actions'
import logo from '../../assets/images/u-store-logo.png'
import './Login.css'

const Login = () => {
    const dispatch = useDispatch()
    const { inputVals, handleOnChange } = useForm({ username: '', password: '' })

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(adminLogin(inputVals))
    }

    return (
        <div className="login">
            <form className="login__form" onSubmit={handleOnSubmit}>
                <img src={logo} alt="U-store" className="login__formLogo" />
                <h2>Admin Panel</h2>
                <input
                    autoFocus
                    required
                    type="text"
                    name="username"
                    placeholder="Username"
                    autoComplete="off"
                    className="login__formInput"
                    value={inputVals.username}
                    onChange={handleOnChange}
                />
                <input
                    required
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="login__formInput"
                    value={inputVals.password}
                    onChange={handleOnChange}
                />
                <button type="submit" className="login__formButton">
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login
