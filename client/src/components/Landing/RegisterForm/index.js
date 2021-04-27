import React from 'react'
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
import './RegisterForm.css'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const RegisterForm = ({ isOpen, setIsOpen }) => {
    const handleModalClose = () => {
        setIsOpen(false)
    }

    return (
        <Dialog
            disableScrollLock
            hideBackdrop
            fullWidth
            maxWidth={'lg'}
            open={isOpen}
            TransitionComponent={Transition}
            onClose={handleModalClose}
        >
            <form className="registerForm">
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
                            <Avatar alt="Avatar" src={avatarImage} className="avatar" />
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
                                //   value={age}
                                //   onChange={handleChange}
                                variant="outlined"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="registerForm__formGroup registerForm__select">
                        <label>
                            <RoomIcon />
                        </label>
                        <FormControl>
                            <Select
                                //   value={age}
                                //   onChange={handleChange}
                                variant="outlined"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="registerForm__formGroup registerForm__select">
                        <label>
                            <AccountBalanceIcon />
                        </label>
                        <FormControl>
                            <Select
                                //   value={age}
                                //   onChange={handleChange}
                                variant="outlined"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
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
                        <input required type="password" placeholder="Password" />
                    </div>
                    <div className="registerForm__formGroup">
                        <label>
                            <LockIcon />
                        </label>
                        <input required type="password" placeholder="Confirm Password" />
                    </div>
                    <div className="registerForm__formGroup buttonWrapper">
                        <p>Register</p>
                        <button className="registerForm__registerButton">Register</button>
                    </div>
                </div>
            </form>
        </Dialog>
    )
}

export default RegisterForm
