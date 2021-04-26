import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import PersonIcon from '@material-ui/icons/Person'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'

import './RegisterForm.css'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="bottom" ref={ref} {...props} />
})

const RegisterForm = ({ isOpen, setIsOpen, direction }) => {
    const handleModalClose = () => {
        setIsOpen(false)
    }

    return (
        <Dialog
            hideBackdrop
            fullWidth
            maxWidth={'lg'}
            open={isOpen}
            TransitionComponent={Transition}
            onClose={handleModalClose}
        >
            <form className="registerForm">
                <h1>Sign Up Here!</h1>

                {/* Name , Username, Avatar, Phones, Email */}
                <div className="registerForm__firstWrapper">
                    <div className="registerForm__nameWrapper">
                        <div className="registerForm__formGroup">
                            <label>
                                <PersonIcon />
                            </label>
                            <input required type="text" placeholder="First Name" />
                        </div>
                        <div className="registerForm__formGroup">
                            <label>
                                <PersonIcon />
                            </label>
                            <input type="text" placeholder="Last Name" />
                        </div>
                        <div className="registerForm__formGroup">
                            <label>
                                <PersonIcon />
                            </label>
                            <input required type="text" placeholder="A Cool Username" />
                        </div>
                    </div>
                    <div className="registerForm__formGroup registerForm__avatarWrapper">
                        Avatar
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
                        <div className="registerForm__formGroup">
                            <label>
                                <PersonIcon />
                            </label>
                            <input required type="email" placeholder="Email" />
                        </div>
                    </div>
                </div>

                {/* State, City, College */}
                <div className="registerForm__secondWrapper">
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
                    <div className="registerForm__formGroup">
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
