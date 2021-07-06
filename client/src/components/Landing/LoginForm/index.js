import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PersonIcon from '@material-ui/icons/Person'
import LockIcon from '@material-ui/icons/Lock'
import ButtonBase from '@material-ui/core/ButtonBase'

import { userLogin } from '../../../store/actions/user'
import { alertAdd } from '../../../store/actions/ui'
import { useForm } from '../../../hooks/useForm'
import FormLoader from '../../utils/FormLoader'
import './LoginForm.scss'

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

        if (inputVals.usernameOrEmail && inputVals.password) {
            dispatch(userLogin(inputVals))
        } else {
            dispatch(
                alertAdd(
                    'You can login either with your email or username along with password!',
                    'error'
                )
            )
        }
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
                            type="password"
                            autoComplete="current-password"
                            className="loginForm__input"
                            placeholder="Password"
                            name="password"
                            value={inputVals.password}
                            onChange={handleOnChange}
                        />
                    </div>

                    <ButtonBase type="submit" className="loginForm__loginButton">
                        Login
                    </ButtonBase>
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
