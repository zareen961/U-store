import React, { useEffect, useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'

import { useForm } from '../../../utils/useForm'
import { adminRegister, alertAdd } from '../../../store/actions'
import ConfirmModal from '../../utils/ConfirmModal'
import './RegisterForm.css'

const initialInputVals = {
    username: '',
    password: '',
    passwordConfirm: '',
}

const RegisterForm = () => {
    const dispatch = useDispatch()
    const { loading, success } = useSelector((state) => state.adminRegister)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [adminPassword, setAdminPassword] = useState('')
    const { inputVals, handleOnChange, handleReset } = useForm(initialInputVals)

    const handleOnSubmit = (e) => {
        e.preventDefault()

        if (inputVals.password === inputVals.passwordConfirm) {
            setIsModalOpen(true)
        } else {
            dispatch(alertAdd('Passwords do not match!', 'error'))
        }
    }

    const handleAdminRegister = () => {
        dispatch(
            adminRegister(
                {
                    username: inputVals.username,
                    password: inputVals.password,
                },
                adminPassword
            )
        )
    }

    useEffect(() => {
        if (success) {
            handleReset()
            setIsModalOpen(false)
            setAdminPassword('')
        }
    }, [success, handleReset])

    return (
        <>
            <form className="registerForm" onSubmit={handleOnSubmit}>
                <TextField
                    required
                    type="text"
                    autoComplete="new-password"
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
                    autoComplete="new-password"
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
                    autoComplete="new-password"
                    color="secondary"
                    label="Confirm Password"
                    className="registerForm__input"
                    name="passwordConfirm"
                    value={inputVals.passwordConfirm}
                    onChange={handleOnChange}
                />

                <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    className="registerForm__button"
                >
                    Create Admin
                </Button>
            </form>

            <ConfirmModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                handleOnConfirm={handleAdminRegister}
                password={adminPassword}
                setPassword={setAdminPassword}
                loading={loading}
            />
        </>
    )
}

export default RegisterForm
