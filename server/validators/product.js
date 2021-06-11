const {
    PRICE_MAX,
    PRICE_MIN,
    DESCRIPTION_LEN_MAX,
    PRODUCT_LEN_MIN,
    PRODUCT_LEN_MAX,
} = require('../utils/constants')

const validateProductInputs = (inputData, isEdit = false) => {
    const { name, image, price, description } = inputData

    // checking if the user hasn't passed any field value to update
    if (isEdit && Object.keys(inputData).length === 0) {
        return {
            isValid: false,
            message: 'No field provided to update!',
        }
    }

    //validating name
    if (name) {
        if (typeof name === 'string') {
            if (name.length < PRODUCT_LEN_MIN || name.length > PRODUCT_LEN_MAX) {
                return {
                    isValid: false,
                    message: 'Name must be upto 3-31 characters!',
                }
            }
        } else {
            return {
                isValid: false,
                message: ' Product name must be a string!',
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
    if (typeof image === 'object') {
        if (image.fileName && image.url) {
            if (typeof image.fileName !== 'string' || typeof image.url !== 'string') {
                return {
                    isValid: false,
                    message: 'Product filename or url is not a string!',
                }
            }
        } else {
            if (
                Object.keys(image).length === 0 &&
                !image.fileName &&
                !image.url &&
                !isEdit
            ) {
                return {
                    isValid: false,
                    message: 'Product image is needed!',
                }
            }
        }
    } else {
        if (!isEdit) {
            return {
                isValid: false,
                message: 'Image must be an object!',
            }
        }
    }

    // validating price
    if (price || Number(price) === 0) {
        if (typeof price === 'number') {
            if (price < PRICE_MIN) {
                return {
                    isValid: false,
                    message: 'Please provide a valid amount!',
                }
            }

            if (price > PRICE_MAX) {
                return {
                    isValid: false,
                    message: `Price can't exceed ${PRICE_MAX} rupees!`,
                }
            }
        } else {
            return {
                isValid: false,
                message: 'Price must be a number!',
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
        if (typeof description === 'string') {
            if (description.length > DESCRIPTION_LEN_MAX) {
                return {
                    isValid: false,
                    message: `Please be precise and write the description within ${DESCRIPTION_LEN_MAX} characters!`,
                }
            }
        } else {
            return {
                isValid: false,
                message: 'Description must be a string!',
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
