const { PRICE_MAX, PRICE_MIN } = require('../utils/constants')

const validateBidInputs = (inputData, isEdit = false) => {
    const { price, newBidStatus } = inputData

    // checking if the user hasn't passed any field value to update
    if (isEdit && Object.keys(inputData).length === 0) {
        return {
            isValid: false,
            message: 'No field provided to update!',
        }
    }

    // validating price
    if (price || Number(price) === 0) {
        if (typeof price === 'number') {
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
            return {
                isValid: false,
                message: 'Bid price must be a number!',
            }
        }
    } else {
        if (!isEdit) {
            return {
                isValid: false,
                message: 'Bid price is needed!',
            }
        }
    }

    // validating bid status
    if (newBidStatus) {
        if (typeof newBidStatus === 'string') {
            const allowed = ['ACCEPTED', 'REJECTED']
            if (!allowed.includes(newBidStatus)) {
                return {
                    isValid: false,
                    message: 'Invalid Bid Status!',
                }
            }
        } else {
            return {
                isValid: false,
                message: 'Bid status must be a string!',
            }
        }
    }

    return {
        isValid: true,
    }
}

module.exports = validateBidInputs
