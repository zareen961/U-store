import React, { useState, useEffect, useCallback } from 'react'
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
import { useHistory } from 'react-router-dom'

import { useForm } from '../../../hooks/useForm'
import ButtonComp from '../../utils/ButtonComp'
import UnderlineButtonComp from '../../utils/UnderlineButtonComp'
import AvatarForm from '../../Landing/RegisterForm/AvatarForm'
import ConfirmModal from '../../utils/ConfirmModal'
import { userUpdate } from '../../../store/actions/user'
import { alertAdd } from '../../../store/actions/ui'
import { validateUserInputs } from '../../../validators/user'
import { handleGetContact } from '../../../utils/handleGetContact'
import './AccountForm.scss'

const AccountForm = ({ isEdit, setIsEdit }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { loading: loadingCollege, data: collegeData } = useSelector(
        (state) => state.college
    )
    const { user, success: successUserLogin } = useSelector((state) => state.userLogin)
    const { loading, success } = useSelector((state) => state.userUpdate)

    const [collegeInfo, setCollegeInfo] = useState({
        state: '',
        city: '',
        college: '',
    })
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

    // function to get the college info of the logged in user
    const getCollegeInfo = useCallback(() => {
        let collegeInfoObj = {
            state: '',
            city: '',
            college: '',
        }
        if (!loadingCollege && !loading && collegeData && user && user.userInfo) {
            collegeData.forEach((state) => {
                if (String(state._id) === String(user.userInfo.collegeState)) {
                    collegeInfoObj.state = state.name

                    state.cities.forEach((city) => {
                        if (String(city._id) === String(user.userInfo.collegeCity)) {
                            collegeInfoObj.city = city.name

                            city.colleges.forEach((college) => {
                                if (
                                    String(college._id) === String(user.userInfo.college)
                                ) {
                                    collegeInfoObj.college = college.name
                                    return collegeInfoObj
                                }
                            })
                        }
                    })
                }
            })
        }
        return collegeInfoObj
    }, [loadingCollege, loading, collegeData, user])

    useEffect(() => {
        if (!loading && !loadingCollege) {
            setCollegeInfo(getCollegeInfo())
        }
    }, [loading, loadingCollege, getCollegeInfo])

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
            if (inputVals.password && inputVals.passwordConfirm) {
                toUpdate.password = inputVals.password
            } else {
                dispatch(alertAdd('Both password fields are required!', 'error'))
                return
            }
        }

        // validating all the inputs that needs to be updated
        const { isValid, message } = validateUserInputs(
            { ...toUpdate, passwordConfirm: inputVals.passwordConfirm },
            true
        )
        if (!isValid) {
            dispatch(alertAdd(message, 'error'))
            return
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

    // setting up the handleGetContact function
    const handleCallGetContact = () =>
        handleGetContact({
            dispatch,
            history,
            successUserLogin,
            username: user.userInfo.username,
        })

    return (
        <>
            <form className="accountForm" onSubmit={(e) => e.preventDefault()}>
                {/* College Info */}
                <div className="accountForm__collegeInfo">
                    <h1>
                        {collegeInfo.college !== ''
                            ? collegeInfo.college
                            : 'Your College Name'}
                    </h1>
                    <h2>
                        {collegeInfo.city !== '' && collegeInfo.state !== ''
                            ? `${collegeInfo.city}, ${collegeInfo.state}`
                            : 'Your College City, State'}
                    </h2>
                </div>

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
                        autoComplete="new-password"
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
                        autoComplete="new-password"
                        name="passwordConfirm"
                        value={inputVals.passwordConfirm}
                        onChange={handleOnChange}
                    />
                </div>

                <div className="accountForm__buttonWrapper">
                    <UnderlineButtonComp
                        text={'View Contact Page'}
                        handleOnClick={handleCallGetContact}
                        isActive={true}
                    />
                    <ButtonComp
                        typeClass={'primary'}
                        text={'Update'}
                        modifyClass={!isEdit && 'disabled'}
                        handleOnClick={() => setIsConfirmOpen(true)}
                    >
                        <CheckCircleIcon />
                    </ButtonComp>
                </div>
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
