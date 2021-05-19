import React, { useState } from 'react'
import Badge from '@material-ui/core/Badge'
import Avatar from '@material-ui/core/Avatar'
import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/Edit'
import { PencilIcon, CheckCircleIcon } from '@primer/octicons-react'
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
import './AccountForm.css'

const AccountForm = ({ isEdit }) => {
    const { user } = useSelector((state) => state.userLogin)

    const [isAvatarOpen, setIsAvatarOpen] = useState(false)

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
        <>
            <form className="accountForm">
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
                            <Fab
                                size="small"
                                className={isEdit ? 'editButton active' : 'editButton'}
                            >
                                <EditIcon />
                            </Fab>
                        }
                        onClick={() => setIsAvatarOpen(true)}
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
                        type="email"
                        disabled={!isEdit}
                        placeholder="Enter Email"
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
                    isModify={!isEdit}
                    disabled={!isEdit}
                    handleOnClick={() => {}}
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
        </>
    )
}

export default AccountForm
