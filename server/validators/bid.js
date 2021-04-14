const { PRICE_MAX, PRICE_MIN } = require('../utils/constants')

const validateBidInputs = (inputData) => {
    const { price, newStatus } = inputData

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
    }

    // validating bid status
    if (newStatus) {
        const allowed = ['ACCEPTED', 'REJECTED']
        if (!allowed.includes(newStatus)) {
            return {
                isValid: false,
                message: 'Invalid Status',
            }
        }
    }
}

module.exports = validateBidInputs
