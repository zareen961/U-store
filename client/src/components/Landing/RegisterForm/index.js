import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import PersonIcon from '@material-ui/icons/Person'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Badge from '@material-ui/core/Badge'
import Avatar from '@material-ui/core/Avatar'
import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/Edit'
import PhoneIcon from '@material-ui/icons/Phone'
import PhonePausedIcon from '@material-ui/icons/PhonePaused'
import EmailIcon from '@material-ui/icons/Email'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import LockIcon from '@material-ui/icons/Lock'
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail'
import RoomIcon from '@material-ui/icons/Room'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined'
import GpsFixedIcon from '@material-ui/icons/GpsFixed'
import CloseSharpIcon from '@material-ui/icons/CloseSharp'
import IconButton from '@material-ui/core/IconButton'

import avatarImage from '../../../assets/images/avatar.png'
import { useForm } from '../../../utils/hooks/useForm'
import { userRegister, collegeFetchData } from '../../../store/actions/user'
import { alertAdd } from '../../../store/actions/alert'
import FormLoader from '../../utils/FormLoader'
import './RegisterForm.css'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const RegisterForm = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch()
    const { loading: loadingRegister, success: successRegister } = useSelector(
        (state) => state.userRegister
    )
    const { loading: loadingColleges, data } = useSelector((state) => state.college)

    const initialInputVals = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        avatar: '',
        primaryPhone: '',
        secondaryPhone: '',
        collegeState: 'Choose Your College State',
        collegeCity: 'Choose Your College City',
        college: 'Choose Your College',
        password: '',
        passwordConfirm: '',
    }
    const { inputVals, handleOnChange, handleReset } = useForm(initialInputVals)

    useEffect(() => {
        dispatch(collegeFetchData())
    }, [dispatch])

    const handleRegister = (e) => {
        e.preventDefault()

        if (inputVals.password === inputVals.passwordConfirm) {
            dispatch(userRegister(inputVals))
        } else {
            dispatch(alertAdd("Passwords didn't match!", 'danger'))
        }
    }

    const handleModalClose = () => {
        setIsOpen(false)
        handleReset()
    }

    useEffect(() => {
        if (successRegister) {
            handleModalClose()
        }
    }, [successRegister])

    return (
        <Dialog
            disableBackdropClick={loadingRegister}
            disableScrollLock
            hideBackdrop
            fullWidth
            maxWidth={'lg'}
            open={isOpen}
            TransitionComponent={Transition}
            onClose={handleModalClose}
            className="registerForm"
        >
            <div className="registerForm__main">
                <form onSubmit={handleRegister}>
                    <div className="registerForm__header">
                        <h1>Sign Up Here!</h1>
                        <IconButton
                            className="registerForm__closeButton"
                            onClick={() => setIsOpen(false)}
                        >
                            <CloseSharpIcon />
                        </IconButton>
                    </div>

                    {/* Name , Username, Avatar, Phones, Email */}
                    <div className="registerForm__firstWrapper">
                        <div className="registerForm__nameWrapper">
                            <div className="registerForm__formGroup left">
                                <label>
                                    <PersonIcon />
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="First Name"
                                    autoComplete="new-password"
                                    name="firstName"
                                    value={inputVals.firstName}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="registerForm__formGroup left ">
                                <label>
                                    <PersonOutlineOutlinedIcon />
                                </label>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    autoComplete="new-password"
                                    name="lastName"
                                    value={inputVals.lastName}
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>
                        <div className="registerForm__formGroup registerForm__avatarWrapper">
                            <Badge
                                overlap="circle"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                badgeContent={
                                    <Fab
                                        size="small"
                                        className="registerForm__avatarEditButton"
                                    >
                                        <EditIcon />
                                    </Fab>
                                }
                            >
                                <Avatar
                                    alt="Avatar"
                                    src={avatarImage}
                                    className="avatar"
                                />
                            </Badge>
                        </div>
                        <div className="registerForm__phoneWrapper">
                            <div className="registerForm__formGroup">
                                <label>
                                    <PhoneIcon />
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Primary Phone"
                                    autoComplete="new-password"
                                    name="primaryPhone"
                                    value={inputVals.primaryPhone}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="registerForm__formGroup">
                                <label>
                                    <PhonePausedIcon />
                                </label>
                                <input
                                    type="text"
                                    placeholder="Secondary Phone"
                                    autoComplete="new-password"
                                    name="secondaryPhone"
                                    value={inputVals.secondaryPhone}
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="registerForm__fourthWrapper">
                        <div className="registerForm__formGroup left">
                            <label>
                                <AlternateEmailIcon />
                            </label>
                            <input
                                required
                                type="text"
                                placeholder="Create Username"
                                autoComplete="new-password"
                                name="username"
                                value={inputVals.username}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="registerForm__formGroup">
                            <label>
                                <EmailIcon />
                            </label>
                            <input
                                required
                                type="email"
                                placeholder="Email Address"
                                autoComplete="new-password"
                                name="email"
                                value={inputVals.email}
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>

                    {/* State, City, College */}
                    <div className="registerForm__secondWrapper">
                        <div className="registerForm__formGroup registerForm__select left">
                            <label>
                                <GpsFixedIcon />
                            </label>
                            <FormControl>
                                <Select
                                    name="collegeState"
                                    value={inputVals.collegeState}
                                    onChange={handleOnChange}
                                    variant="outlined"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {data.map((state) => (
                                        <MenuItem key={state._id} value={state._id}>
                                            {state.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="registerForm__formGroup registerForm__select">
                            <label>
                                <RoomIcon />
                            </label>
                            <FormControl>
                                <Select
                                    value={inputVals.collegeCity}
                                    onChange={handleOnChange}
                                    variant="outlined"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {/* {inputVals.collegeState.cities.map((city) => (
                                        <MenuItem key={city._id} value={city._id}>{city.name}</MenuItem>
                                    ))} */}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="registerForm__formGroup registerForm__select">
                            <label>
                                <AccountBalanceIcon />
                            </label>
                            <FormControl>
                                <Select
                                    value={inputVals.collegeCity}
                                    onChange={handleOnChange}
                                    variant="outlined"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {/* {inputVals.collegeCity.colleges.map((college) => (
                                        <MenuItem key={college._id} value={college._id}>
                                            {college.name}
                                        </MenuItem>
                                    ))} */}
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    {/* Password, Confirm Password, Submit */}
                    <div className="registerForm__thirdWrapper">
                        <div className="registerForm__formGroup left">
                            <label>
                                <LockOpenIcon />
                            </label>
                            <input
                                required
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={inputVals.password}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="registerForm__formGroup">
                            <label>
                                <LockIcon />
                            </label>
                            <input
                                required
                                type="password"
                                placeholder="Confirm Password"
                                name="passwordConfirm"
                                value={inputVals.passwordConfirm}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="registerForm__formGroup buttonWrapper">
                            <p>Register</p>
                            <button className="registerForm__registerButton">
                                Register
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <FormLoader loading={loadingRegister} size={70} />
        </Dialog>
    )
}

export default RegisterForm
