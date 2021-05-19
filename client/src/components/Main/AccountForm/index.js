import React from 'react'
import Badge from '@material-ui/core/Badge'
import Avatar from '@material-ui/core/Avatar'
import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/Edit'
import { PencilIcon, CheckCircleIcon } from '@primer/octicons-react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../../utils/hooks/useForm'

import './AccountForm.css'

const AccountForm = ({ isEdit }) => {
    const { user } = useSelector((state) => state.userLogin)

    const initialInputVals = {
        firstName: user && user.userInfo ? `${user.userInfo.firstName}` : '',
        lastName: user && user.userInfo ? `${user.userInfo.lastName}` : '',
        username: user && user.userInfo ? `${user.userInfo.username}` : '',
        email: user && user.userInfo ? `${user.userInfo.email}` : '',
        avatar: user && user.userInfo ? user.userInfo.avatar : 0,
        primaryPhone: user && user.userInfo ? `${user.userInfo.primaryPhone}` : '',
        secondaryPhone: user && user.userInfo ? `${user.userInfo.secondaryPhone}` : '',
        password: '',
        passwordConfirm: '',
    }

    const { inputVals, handleOnChange, handleReset } = useForm(initialInputVals)

    return (
        <form className="accountForm">
            {/* username */}
            <div className={isEdit ? 'accountForm__input active' : 'accountForm__input'}>
                <span>
                    <PencilIcon />
                </span>
                <input
                    type="text"
                    disabled={!isEdit}
                    placeholder="Enter Username"
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
                        <Fab size="small" className="registerForm__avatarEditButton">
                            <EditIcon />
                        </Fab>
                    }
                >
                    <Avatar alt="Avatar" src={`avatars/avatar3.png`} className="avatar" />
                </Badge>
            </div>
            {/* email */}
            <div className={isEdit ? 'accountForm__input active' : 'accountForm__input'}>
                <span>
                    <PencilIcon />
                </span>
                <input
                    type="email"
                    disabled={!isEdit}
                    placeholder="Enter Email"
                    autoComplete="new-password"
                    name="email"
                    value={inputVals.email}
                    onChange={handleOnChange}
                />
            </div>
            {/* firstname */}
            <div className={isEdit ? 'accountForm__input active' : 'accountForm__input'}>
                <span>
                    <PencilIcon />
                </span>
                <input
                    type="text"
                    disabled={!isEdit}
                    placeholder="Enter First Name"
                    autoComplete="new-password"
                    name="firstName"
                    value={inputVals.firstName}
                    onChange={handleOnChange}
                />
            </div>
            {/* lastname */}
            <div className={isEdit ? 'accountForm__input active' : 'accountForm__input'}>
                <span>
                    <PencilIcon />
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
            <div className={isEdit ? 'accountForm__input active' : 'accountForm__input'}>
                <span>
                    <PencilIcon />
                </span>
                <input
                    type="text"
                    disabled={!isEdit}
                    placeholder="Enter Primary Phone"
                    autoComplete="new-password"
                    name="primaryPhone"
                    value={inputVals.primaryPhone}
                    onChange={handleOnChange}
                />
            </div>
            {/* secondary phone */}
            <div className={isEdit ? 'accountForm__input active' : 'accountForm__input'}>
                <span>
                    <PencilIcon />
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
            <div className={isEdit ? 'accountForm__input active' : 'accountForm__input'}>
                <span>
                    <PencilIcon />
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
            <div className={isEdit ? 'accountForm__input active' : 'accountForm__input'}>
                <span>
                    <PencilIcon />
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

            <button className="accountForm__button" type="submit">
                <span className="icon">
                    <CheckCircleIcon />
                </span>
                <span className="text">Update</span>
            </button>
        </form>
    )
}

export default AccountForm
