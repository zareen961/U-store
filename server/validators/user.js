const { ObjectID } = require('mongodb')

const {
    EMAIL_LEN_MAX,
    EMAIL_REGEX,
    USERNAME_REGEX,
    NAME_REGEX,
    PASSWORD_LEN_MIN,
    PHONE_REGEX,
} = require('../utils/constants')

const validateUserInputs = (inputData, isEdit = false) => {
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
    } = inputData

    // validating college data
    if (!isEdit) {
        if (collegeState) {
            if (!ObjectID.isValid(collegeState)) {
                return {
                    isValid: false,
                    message: 'Please select a valid college state!',
                }
            }
        } else {
            return {
                isValid: false,
                message: 'Please select the state of your college!',
            }
        }

        if (collegeCity) {
            if (!ObjectID.isValid(collegeCity)) {
                return {
                    isValid: false,
                    message: 'Please select a valid college city!',
                }
            }
        } else {
            return {
                isValid: false,
                message: 'Please select the city of your college!',
            }
        }

        if (college) {
            if (!ObjectID.isValid(college)) {
                return {
                    isValid: false,
                    message: 'Please select a valid college!',
                }
            }
        } else {
            return {
                isValid: false,
                message: 'Please select your college!',
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
        if (!isEdit) {
            return {
                isValid: false,
                message: 'Email address is needed!',
            }
        }
    }

    // validating username
    if (username) {
        if (!username.match(USERNAME_REGEX)) {
            return {
                isValid: false,
                message:
                    // TODO: we 'll cum here again. Please remove this comment once this message makes sense.
                    'Invalid Username! It must be 6-17 characters long, can only have alphanumeric characters, underscore(_) and period(.), it can only start and end with alphanumeric characters and no allowed special characters can appear consecutively!',
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
        if (!firstName.match(NAME_REGEX)) {
            return {
                isValid: false,
                message: 'Please enter a valid first name!',
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
        if (!lastName.match(NAME_REGEX)) {
            return {
                isValid: false,
                message: 'Please enter a valid last name!',
            }
        }
    }

    // validating primary phone number
    if (primaryPhone) {
        if (!primaryPhone.match(PHONE_REGEX)) {
            return {
                isValid: false,
                message: 'Your primary phone number seems invalid to us!',
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
        if (!secondaryPhone.match(PHONE_REGEX)) {
            return {
                isValid: false,
                message: 'Your secondary phone number seems invalid to us!',
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
    if (password) {
        if (password.length < PASSWORD_LEN_MIN) {
            return {
                isValid: false,
                message: 'Keeping short passwords is risky!',
            }
        }
    } else {
        if (!isEdit) {
            return {
                isValid: false,
                message: 'Password must be provided, in case you wish to login!',
            }
        }
    }

    return {
        isValid: true,
    }
}

module.exports = validateUserInputs
