import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PersonIcon from '@material-ui/icons/Person'
import LockIcon from '@material-ui/icons/Lock'

import { userLogin } from '../../../store/actions/user'
import { useForm } from '../../../utils/hooks/useForm'
import FormLoader from '../../utils/FormLoader'
import './LoginForm.css'

const LoginForm = ({ setIsOpen }) => {
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.userLogin)

    const initialInputVals = {
        usernameOrEmail: '',
        password: '',
    }
    const { inputVals, handleOnChange } = useForm(initialInputVals)

    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(userLogin(inputVals))
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
                            required
                            type="text"
                            autoComplete="new-password"
                            id="loginFormInputID"
                            className="loginForm__input"
                            placeholder="Username or Email"
                            name="usernameOrEmail"
                            value={inputVals.usernameOrEmail}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="loginForm__inputGroup">
                        <label>
                            <LockIcon />
                        </label>
                        <input
                            required
                            type="password"
                            autoComplete="current-password"
                            className="loginForm__input"
                            placeholder="Password"
                            name="password"
                            value={inputVals.password}
                            onChange={handleOnChange}
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
