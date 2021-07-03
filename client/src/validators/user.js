import {
    EMAIL_LEN_MAX,
    EMAIL_REGEX,
    USERNAME_REGEX,
    NAME_REGEX,
    PASSWORD_LEN_MIN,
    PHONE_REGEX,
} from '../constants/validators'

export const validateUserInputs = (inputData, isEdit = false) => {
    const {
        email,
        username,
        firstName,
        lastName,
        primaryPhone,
        secondaryPhone,
        collegeState,
        collegeCity,
        college,
        password,
        passwordConfirm,
    } = inputData

    // checking if the user hasn't passed any field value to update
    if (isEdit && Object.keys(inputData).length === 0) {
        return {
            isValid: false,
            message: 'No field provided to update!',
        }
    }

    // validating college data
    if (!isEdit) {
        if (!collegeState || collegeState === '0') {
            return {
                isValid: false,
                message: 'Select your college state!',
            }
        }

        if (!collegeCity || collegeCity === '0') {
            return {
                isValid: false,
                message: 'Select your college city!',
            }
        }

        if (!college || college === '0') {
            return {
                isValid: false,
                message: 'Select your college!',
            }
        }
    } else {
        if (collegeState || collegeCity || college) {
            return {
                isValid: false,
                message:
                    'You cannot change your college! Create a new account for your new college.',
            }
        }
    }

    // validating email
    if (email) {
        if (typeof email === 'string') {
            if (email.trim().length > EMAIL_LEN_MAX) {
                return {
                    isValid: false,
                    message: 'Email address too long!',
                }
            } else {
                if (!email.match(EMAIL_REGEX)) {
                    return {
                        isValid: false,
                        message: 'Please provide a valid email address!',
                    }
                }
            }
        } else {
            return {
                isValid: false,
                message: 'Email address must be a string!',
            }
        }
    } else {
        if (!isEdit) {
            return {
                isValid: false,
                message: 'Email address is needed!',
            }
        }
    }

    // validating username
    if (username) {
        if (typeof username === 'string') {
            if (!username.match(USERNAME_REGEX)) {
                return {
                    isValid: false,
                    message:
                        // TODO: we 'll cum here again. Please remove this comment once this message makes sense.
                        'Invalid Username! It must be 3-13 characters long, can only have alphanumeric characters, underscore(_) and period(.), it can only start and end with alphanumeric characters and no allowed special characters can appear consecutively!',
                }
            }
        } else {
            return {
                isValid: false,
                message: 'Username must be a string!',
            }
        }
    } else {
        if (!isEdit) {
            return {
                isValid: false,
                message: 'Username is needed!',
            }
        }
    }

    // validating first name
    if (firstName) {
        if (typeof firstName === 'string') {
            if (!firstName.match(NAME_REGEX)) {
                return {
                    isValid: false,
                    message: 'Please enter a valid first name!',
                }
            }
        } else {
            return {
                isValid: false,
                message: 'First name must be a string!',
            }
        }
    } else {
        if (!isEdit) {
            return {
                isValid: false,
                message:
                    'You cannot create an account without providing your first name!',
            }
        }
    }

    // validating last name
    if (lastName) {
        if (typeof lastName === 'string') {
            if (!lastName.match(NAME_REGEX)) {
                return {
                    isValid: false,
                    message: 'Please enter a valid last name!',
                }
            }
        } else {
            return {
                isValid: false,
                message: 'Last name must be a string!',
            }
        }
    }

    // validating primary phone number
    if (primaryPhone) {
        if (typeof primaryPhone === 'string') {
            if (!primaryPhone.match(PHONE_REGEX)) {
                return {
                    isValid: false,
                    message: 'Your primary phone number seems invalid to us!',
                }
            }
        } else {
            return {
                isValid: false,
                message: 'Primary phone must be a string!',
            }
        }
    } else {
        if (!isEdit) {
            return {
                isValid: false,
                message: 'Make sure to provide us your phone number!',
            }
        }
    }

    // validating secondary phone number
    if (secondaryPhone) {
        if (typeof secondaryPhone === 'string') {
            if (!secondaryPhone.match(PHONE_REGEX)) {
                return {
                    isValid: false,
                    message: 'Your secondary phone number seems invalid to us!',
                }
            }
        } else {
            return {
                isValid: false,
                message: 'Secondary phone must be a string!',
            }
        }
    }

    // checking if both the phone numbers are different
    if (primaryPhone && secondaryPhone) {
        if (primaryPhone === secondaryPhone) {
            return {
                isValid: false,
                message: 'Try giving different phone numbers for better reach!',
            }
        }
    }

    // validating password
    if (password && passwordConfirm) {
        if (typeof password === 'string' && typeof passwordConfirm === 'string') {
            if (password !== passwordConfirm) {
                return {
                    isValid: false,
                    message: 'Password do not match, might be your speedy typing!',
                }
            }

            if (password.length < PASSWORD_LEN_MIN) {
                return {
                    isValid: false,
                    message: 'Keeping short password is risky!',
                }
            }
        } else {
            return {
                isValid: false,
                message: 'Password must be a string!',
            }
        }
    } else {
        if (!isEdit) {
            return {
                isValid: false,
                message:
                    'Both password fields must be provided, in case you wish to login!',
            }
        }
    }

    return {
        isValid: true,
    }
}
