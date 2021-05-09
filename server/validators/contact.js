const {
    EMAIL_LEN_MAX,
    EMAIL_REGEX,
    NAME_REGEX,
    CONTACT_MESSAGE_LENGTH,
    CONTACT_SUBJECT_LENGTH,
} = require('../utils/constants')

const validateContactInputs = (contactInfo) => {
    const { name, email, subject, message } = contactInfo

    // validating name
    if (name) {
        if (!name.match(NAME_REGEX)) {
            return {
                isValid: false,
                message: 'Please enter a valid name!',
            }
        }
    } else {
        return {
            isValid: false,
            message: 'Please provide us your name!',
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
        return {
            isValid: false,
            message: 'Please provide us your email!',
        }
    }

    // validating subject
    if (subject) {
        if (subject.trim().length < CONTACT_SUBJECT_LENGTH) {
            return {
                isValid: false,
                message: 'Please provide a meaningful and brief subject to your message!',
            }
        }
    } else {
        return {
            isValid: false,
            message: 'Please provide a subject to your message!',
        }
    }

    // validating message
    if (message) {
        if (message.trim().length < CONTACT_MESSAGE_LENGTH) {
            return {
                isValid: false,
                message: 'Message too short! Express more.',
            }
        }
    } else {
        return {
            isValid: false,
            message: 'Providing a detailed message shall help us reach you better!',
        }
    }

    return {
        isValid: true,
    }
}

module.exports = validateContactInputs
