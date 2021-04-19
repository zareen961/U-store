const {
    PRICE_MAX,
    PRICE_MIN,
    DESCRIPTION_LEN_MAX,
    PRODUCT_LEN_MIN,
    PRODUCT_LEN_MAX,
} = require('../utils/constants')

const validateProductInputs = (inputData, isEdit = false) => {
    const { name, image, price, description } = inputData

    //validating name
    if (name) {
        if (name.length < PRODUCT_LEN_MIN || name.length > PRODUCT_LEN_MAX) {
            return {
                isValid: false,
                message: 'Name must be upto 3-31 characters!',
            }
        }
    } else {
        if (!isEdit) {
            return {
                isValid: false,
                message: 'Product name is needed!',
            }
        }
    }

    //validating image
    if (!image && !isEdit) {
        return {
            isValid: false,
            message: 'Product image is needed!',
        }
    }

    // validating price
    if (price) {
        if (price < PRICE_MIN) {
            return {
                isValid: false,
                message: `Please provide a valid amount!`,
            }
        }

        if (price > PRICE_MAX) {
            return {
                isValid: false,
                message: `Price can't exceed ${PRICE_MAX} rupees!`,
            }
        }
    } else {
        if (!isEdit) {
            return {
                isValid: false,
                message: 'Product price is required!',
            }
        }
    }

    // validating description
    if (description) {
        if (description.length > DESCRIPTION_LEN_MAX) {
            return {
                isValid: false,
                message: `Please be precise and write the description within ${DESCRIPTION_LEN_MAX} characters!`,
            }
        }
    } else {
        if (!isEdit) {
            return {
                isValid: false,
                message: 'Product description is needed!',
            }
        }
    }

    return {
        isValid: true,
    }
}

module.exports = validateProductInputs
