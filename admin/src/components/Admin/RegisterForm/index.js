import React, { useEffect } from 'react'
import { TextField, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'

import { useForm } from '../../../utils/useForm'
import { adminRegister, alertAdd } from '../../../store/actions'
import './RegisterForm.css'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#fff',
        },
        secondary: {
            main: '#f3818d',
        },
    },
})

const RegisterForm = () => {
    const dispatch = useDispatch()
    const { loading, error, success } = useSelector((state) => state.adminRegister)

    const { inputVals, handleOnChange, handleReset } = useForm({
        username: '',
        password: '',
        passwordConfirm: '',
    })

    const handleOnSubmit = (e) => {
        e.preventDefault()

        if (inputVals.password === inputVals.passwordConfirm) {
            dispatch(
                adminRegister({
                    username: inputVals.username,
                    password: inputVals.password,
                })
            )
        } else {
            dispatch(alertAdd('Passwords do not match!', 'error'))
        }
    }

    useEffect(() => {
        if (success) {
            handleReset()
        }
    }, [success])

    return (
        <form className="registerForm" onSubmit={handleOnSubmit}>
            <ThemeProvider theme={theme}>
                <TextField
                    required
                    type="text"
                    autoComplete="off"
                    spellCheck="off"
                    variant="outlined"
                    color="secondary"
                    label="Username"
                    className="registerForm__input"
                    name="username"
                    value={inputVals.username}
                    onChange={handleOnChange}
                />
                <TextField
                    required
                    type="password"
                    variant="outlined"
                    color="secondary"
                    label="Password"
                    className="registerForm__input"
                    name="password"
                    value={inputVals.password}
                    onChange={handleOnChange}
                />
                <TextField
                    required
                    type="password"
                    variant="outlined"
                    color="secondary"
                    label="Confirm Password"
                    className="registerForm__input"
                    name="passwordConfirm"
                    value={inputVals.passwordConfirm}
                    onChange={handleOnChange}
                />
            </ThemeProvider>

            <Button type="submit" variant="contained" className="registerForm__button">
                Create Admin
            </Button>
        </form>
    )
}

export default RegisterForm
