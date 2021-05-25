import React, { useState, useEffect } from 'react'
import Badge from '@material-ui/core/Badge'
import Avatar from '@material-ui/core/Avatar'
import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/Edit'
import { CheckCircleIcon } from '@primer/octicons-react'
import { useDispatch, useSelector } from 'react-redux'
import PhoneIcon from '@material-ui/icons/Phone'
import PhonePausedIcon from '@material-ui/icons/PhonePaused'
import EmailIcon from '@material-ui/icons/Email'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import LockIcon from '@material-ui/icons/Lock'
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined'
import PersonIcon from '@material-ui/icons/Person'

import { useForm } from '../../../utils/hooks/useForm'
import ButtonComp from '../../utils/ButtonComp'
import AvatarForm from '../../Landing/RegisterForm/AvatarForm'
import ConfirmModal from '../../utils/ConfirmModal'
import { userUpdate } from '../../../store/actions/user'
import { alertAdd } from '../../../store/actions/alert'
import './AccountForm.css'

const AccountForm = ({ isEdit, setIsEdit }) => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.userLogin)
    const { loading, success } = useSelector((state) => state.userUpdate)

    const [isAvatarOpen, setIsAvatarOpen] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [initialInputVals, setInitialInputVals] = useState({
        firstName: user && user.userInfo ? `${user.userInfo.firstName}` : '',
        lastName: user && user.userInfo ? `${user.userInfo.lastName}` : '',
        username: user && user.userInfo ? `${user.userInfo.username}` : '',
        email: user && user.userInfo ? `${user.userInfo.email}` : '',
        avatar: user && user.userInfo ? user.userInfo.avatar : 0,
        primaryPhone: user && user.userInfo ? `${user.userInfo.primaryPhone}` : '',
        secondaryPhone: user && user.userInfo ? `${user.userInfo.secondaryPhone}` : '',
        password: '',
        passwordConfirm: '',
        currentPassword: '',
    })

    const { inputVals, customSetInputVals, handleOnChange, handleReset } =
        useForm(initialInputVals)

    const handleOnSubmit = () => {
        let toUpdate = {}

        if (initialInputVals.firstName !== inputVals.firstName.trim()) {
            toUpdate.firstName = inputVals.firstName
        }
        if (initialInputVals.lastName !== inputVals.lastName.trim()) {
            toUpdate.lastName = inputVals.lastName
        }
        if (initialInputVals.username !== inputVals.username.trim()) {
            toUpdate.username = inputVals.username
        }
        if (initialInputVals.email !== inputVals.email.trim()) {
            toUpdate.email = inputVals.email
        }
        if (initialInputVals.avatar !== inputVals.avatar) {
            toUpdate.avatar = inputVals.avatar
        }
        if (initialInputVals.primaryPhone !== inputVals.primaryPhone.trim()) {
            toUpdate.primaryPhone = inputVals.primaryPhone
        }
        if (initialInputVals.secondaryPhone !== inputVals.secondaryPhone.trim()) {
            toUpdate.secondaryPhone = inputVals.secondaryPhone
        }

        if (inputVals.password || inputVals.passwordConfirm) {
            if (inputVals.password === inputVals.passwordConfirm) {
                toUpdate.password = inputVals.password
            } else {
                dispatch(alertAdd('Passwords do not match!', 'error'))
                return
            }
        }

        if (Object.keys(toUpdate).length > 0) {
            dispatch(userUpdate(toUpdate, inputVals.currentPassword))
        } else {
            dispatch(alertAdd('Nothing to update!', 'error'))
        }
    }

    useEffect(() => {
        if (success) {
            customSetInputVals('currentPassword', '')
            customSetInputVals('password', '')
            customSetInputVals('passwordConfirm', '')
            setIsConfirmOpen(false)
            setIsEdit(false)
        }
    }, [success, setIsEdit, customSetInputVals])

    useEffect(() => {
        if (!isEdit) {
            handleReset()
        }
    }, [isEdit, handleReset])

    useEffect(() => {
        if (success) {
            setInitialInputVals({
                firstName: user && user.userInfo ? `${user.userInfo.firstName}` : '',
                lastName: user && user.userInfo ? `${user.userInfo.lastName}` : '',
                username: user && user.userInfo ? `${user.userInfo.username}` : '',
                email: user && user.userInfo ? `${user.userInfo.email}` : '',
                avatar: user && user.userInfo ? user.userInfo.avatar : 0,
                primaryPhone:
                    user && user.userInfo ? `${user.userInfo.primaryPhone}` : '',
                secondaryPhone:
                    user && user.userInfo ? `${user.userInfo.secondaryPhone}` : '',
                password: '',
                passwordConfirm: '',
                currentPassword: '',
            })
        }
    }, [success, user])

    return (
        <>
            <form className="accountForm" onSubmit={(e) => e.preventDefault()}>
                {/* username */}
                <div
                    className={
                        isEdit ? 'accountForm__input active' : 'accountForm__input'
                    }
                >
                    <span className="icon">
                        <AlternateEmailIcon />
                    </span>
                    <input
                        required
                        type="text"
                        disabled={!isEdit}
                        placeholder="Try new username!"
                        autoComplete="new-password"
                        name="username"
                        value={inputVals.username}
                        onChange={handleOnChange}
                    />
                </div>
                {/* avatar */}
                <div className="accountForm__avatar">
                    <Badge
                        overlap="circle"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        badgeContent={
                            <Fab
                                size="small"
                                className={isEdit ? 'editButton active' : 'editButton'}
                                onClick={() => setIsAvatarOpen(true)}
                            >
                                <EditIcon />
                            </Fab>
                        }
                    >
                        <Avatar
                            alt="Avatar"
                            src={`avatars/avatar${inputVals.avatar}.png`}
                            className="avatar"
                        />
                    </Badge>
                </div>
                {/* email */}
                <div
                    className={
                        isEdit ? 'accountForm__input active' : 'accountForm__input'
                    }
                >
                    <span className="icon">
                        <EmailIcon />
                    </span>
                    <input
                        required
                        type="email"
                        disabled={!isEdit}
                        placeholder="Change your email"
                        autoComplete="new-password"
                        name="email"
                        value={inputVals.email}
                        onChange={handleOnChange}
                    />
                </div>
                {/* first name */}
                <div
                    className={
                        isEdit ? 'accountForm__input active' : 'accountForm__input'
                    }
                >
                    <span className="icon">
                        <PersonIcon />
                    </span>
                    <input
                        required
                        type="text"
                        disabled={!isEdit}
                        placeholder="Enter First Name"
                        autoComplete="new-password"
                        name="firstName"
                        value={inputVals.firstName}
                        onChange={handleOnChange}
                    />
                </div>
                {/* last name */}
                <div
                    className={
                        isEdit ? 'accountForm__input active' : 'accountForm__input'
                    }
                >
                    <span className="icon">
                        <PersonOutlineOutlinedIcon />
                    </span>
                    <input
                        type="text"
                        disabled={!isEdit}
                        placeholder="Fill Last Name"
                        autoComplete="new-password"
                        name="lastName"
                        value={inputVals.lastName}
                        onChange={handleOnChange}
                    />
                </div>
                {/* primary phone */}
                <div
                    className={
                        isEdit ? 'accountForm__input active' : 'accountForm__input'
                    }
                >
                    <span className="icon">
                        <PhoneIcon />
                    </span>
                    <input
                        required
                        type="text"
                        disabled={!isEdit}
                        placeholder="Primary contact changed?"
                        autoComplete="new-password"
                        name="primaryPhone"
                        value={inputVals.primaryPhone}
                        onChange={handleOnChange}
                    />
                </div>
                {/* secondary phone */}
                <div
                    className={
                        isEdit ? 'accountForm__input active' : 'accountForm__input'
                    }
                >
                    <span className="icon">
                        <PhonePausedIcon />
                    </span>
                    <input
                        type="text"
                        disabled={!isEdit}
                        placeholder="Also, add secondary phone!"
                        autoComplete="new-password"
                        name="secondaryPhone"
                        value={inputVals.secondaryPhone}
                        onChange={handleOnChange}
                    />
                </div>
                {/* password */}
                <div
                    className={
                        isEdit ? 'accountForm__input active' : 'accountForm__input'
                    }
                >
                    <span className="icon">
                        <LockOpenIcon />
                    </span>
                    <input
                        type="password"
                        disabled={!isEdit}
                        placeholder="Update your password"
                        name="password"
                        value={inputVals.password}
                        onChange={handleOnChange}
                    />
                </div>
                {/* confirm password */}
                <div
                    className={
                        isEdit ? 'accountForm__input active' : 'accountForm__input'
                    }
                >
                    <span className="icon">
                        <LockIcon />
                    </span>
                    <input
                        type="password"
                        disabled={!isEdit}
                        placeholder="Confirm your updated password"
                        name="passwordConfirm"
                        value={inputVals.passwordConfirm}
                        onChange={handleOnChange}
                    />
                </div>

                <ButtonComp
                    typeClass={'primary'}
                    text={'Update'}
                    modifyClass={!isEdit && 'disabled'}
                    handleOnClick={() => setIsConfirmOpen(true)}
                >
                    <CheckCircleIcon />
                </ButtonComp>
            </form>

            <AvatarForm
                isAvatarOpen={isAvatarOpen}
                setIsAvatarOpen={setIsAvatarOpen}
                avatar={inputVals.avatar}
                setAvatar={handleOnChange}
            />

            <ConfirmModal
                isOpen={isConfirmOpen}
                setIsOpen={setIsConfirmOpen}
                currentPassword={inputVals.currentPassword}
                setCurrentPassword={(newVal) =>
                    customSetInputVals('currentPassword', newVal)
                }
                handleOnChange={handleOnChange}
                handleOnConfirm={handleOnSubmit}
                isLoading={loading}
            />
        </>
    )
}

export default AccountForm
