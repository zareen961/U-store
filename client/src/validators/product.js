import {
    PRICE_MAX,
    PRICE_MIN,
    DESCRIPTION_LEN_MAX,
    PRODUCT_LEN_MIN,
    PRODUCT_LEN_MAX,
} from '../constants/validators'

export const validateProductInputs = (inputData, isEdit = false) => {
    const { name, price, description } = inputData

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
