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
            maxWidth={'md'}
            open={isOpen}
            TransitionComponent={Transition}
            onClose={handleModalClose}
        >
            <form className="registerForm">
                <h1>Sign Up Here!</h1>

                {/* Name , Username, Avatar, Phones, Email */}
                <div className="registerForm__firstWrapper">
                    <div className="registerForm__nameWrapper">
                        <div className="registerForm__formGroup left">
                            <label>
                                <PersonIcon />
                            </label>
                            <input required type="text" placeholder="First Name" />
                        </div>
                        <div className="registerForm__formGroup left ">
                            <label>
                                <PersonIcon />
                            </label>
                            <input type="text" placeholder="Last Name" />
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
                                <Fab color="primary">
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
                                <PersonIcon />
                            </label>
                            <input required type="text" placeholder="Primary Phone" />
                        </div>
                        <div className="registerForm__formGroup">
                            <label>
                                <PersonIcon />
                            </label>
                            <input type="text" placeholder="Secondary Phone" />
                        </div>
                    </div>
                </div>

                <div className="registerForm__fourthWrapper">
                    <div className="registerForm__formGroup left">
                        <label>
                            <PersonIcon />
                        </label>
                        <input required type="text" placeholder="Create Your Username" />
                    </div>
                    <div className="registerForm__formGroup">
                        <label>
                            <PersonIcon />
                        </label>
                        <input required type="email" placeholder="Email Address" />
                    </div>
                </div>

                {/* State, City, College */}
                <div className="registerForm__secondWrapper">
                    <div className="registerForm__formGroup registerForm__select left">
                        <label>
                            <PersonIcon />
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
                            <PersonIcon />
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
                            <PersonIcon />
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
                            <PersonIcon />
                        </label>
                        <input required type="password" placeholder="Password" />
                    </div>
                    <div className="registerForm__formGroup">
                        <label>
                            <PersonIcon />
                        </label>
                        <input required type="password" placeholder="Confirm Password" />
                    </div>
                    <div className="registerForm__formGroup">
                        <button className="registerForm__registerButton">Register</button>
                    </div>
                </div>
            </form>
        </Dialog>
    )
}

export default RegisterForm
