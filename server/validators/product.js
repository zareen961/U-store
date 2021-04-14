const {
    PRICE_MAX,
    PRICE_MIN,
    DESCRIPTION_MAX,
    PRODUCT_NAME_REGEX,
} = require('../utils/constants')

const validateProductInputs = (inputData, isEdit = false) => {
    const { name, price, description } = inputData

    //validating name
    if (name) {
        if (!name.match(PRODUCT_NAME_REGEX)) {
            return {
                isValid: false,
                message: 'Invalid Name!',
            }
        }
    } else {
        if (!isEdit) {
            return {
                isValid: false,
                message: 'Name is a required field!',
            }
        }
    }

    // validating price
    if (price) {
        if (price < PRICE_MIN) {
            return {
                isValid: false,
                message: `Price must be more than ${PRICE_MIN} rupees!`,
            }
        }

        if (price > PRICE_MAX) {
            return {
                isValid: false,
                message: `Price must be less than ${PRICE_MAX} rupees!`,
            }
        }
    } else {
        if (!isEdit) {
            return {
                isValid: false,
                message: 'Price is a required field!',
            }
        }
    }

    // validating description
    if (description) {
        if (description.length() < DESCRIPTION_MAX) {
            return {
                isValid: false,
                message: `Please be precise and write the description within ${DESCRIPTION_MAX} characters!`,
            }
        }
    } else {
        if (!isEdit) {
            return {
                isValid: false,
                message: 'Description is a required field!',
            }
        }
    }
}

module.exports = validateProductInputs
