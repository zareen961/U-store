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
                    message: 'Invalid College State!',
                }
            }
        } else {
            return {
                isValid: false,
                message: 'College state is a required field!',
            }
        }

        if (collegeCity) {
            if (!ObjectID.isValid(collegeCity)) {
                return {
                    isValid: false,
                    message: 'Invalid College City!',
                }
            }
        } else {
            return {
                isValid: false,
                message: 'College city is a required field!',
            }
        }

        if (college) {
            if (!ObjectID.isValid(college)) {
                return {
                    isValid: false,
                    message: 'Invalid College!',
                }
            }
        } else {
            return {
                isValid: false,
                message: 'College is a required field!',
            }
        }
    } else {
        if (collegeState || collegeCity || college) {
            return {
                isValid: false,
                message: 'Cannot edit college data!',
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
                    message: 'Invalid email address!',
                }
            }
        }
    } else {
        if (!isEdit) {
            return {
                isValid: false,
                message: 'Email address is a required field!',
            }
        }
    }

    // validating username
    if (username) {
        if (!username.match(USERNAME_REGEX)) {
            return {
                isValid: false,
                message:
                    'Invalid Username! It must be 6-17 characters long, can only have alphanumeric characters, underscore(_) and period(.), it can only start and end with alphanumeric characters and no allowed special characters can appear consecutively!',
            }
        }
    } else {
        if (!isEdit) {
            return {
                isValid: false,
                message: 'Username is a required field!',
            }
        }
    }

    // validating first name
    if (firstName) {
        if (!firstName.match(NAME_REGEX)) {
            return {
                isValid: false,
                message: 'Invalid First Name!',
            }
        }
    } else {
        if (!isEdit) {
            return {
                isValid: false,
                message: 'First Name is a required field!',
            }
        }
    }

    // validating last name
    if (lastName) {
        if (!lastName.match(NAME_REGEX)) {
            return {
                isValid: false,
                message: 'Invalid Last Name!',
            }
        }
    }

    // validating primary phone number
    if (primaryPhone) {
        if (!primaryPhone.match(PHONE_REGEX)) {
            return {
                isValid: false,
                message: 'Invalid Primary Phone number!',
            }
        }
    } else {
        if (!isEdit) {
            return {
                isValid: false,
                message: 'Primary Phone Number is a required field!',
            }
        }
    }

    // validating secondary phone number
    if (secondaryPhone) {
        if (!secondaryPhone.match(PHONE_REGEX)) {
            return {
                isValid: false,
                message: 'Invalid Secondary Phone Number!',
            }
        }
    }

    // checking if both the phone numbers are different
    if (primaryPhone && secondaryPhone) {
        if (primaryPhone === secondaryPhone) {
            return {
                isValid: false,
                message: 'Phone numbers must be different!',
            }
        }
    }

    // validating password
    if (password) {
        if (password.length < PASSWORD_LEN_MIN) {
            return {
                isValid: false,
                message: 'Password too short!',
            }
        }
    } else {
        if (!isEdit) {
            return {
                isValid: false,
                message: 'Password is a required field!',
            }
        }
    }

    return {
        isValid: true,
    }
}

module.exports = validateUserInputs
