const { PRICE_MAX, PRICE_MIN } = require('../utils/constants')

const validateBidInputs = (inputData) => {
    const { price, newBidStatus } = inputData

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
    }

    // validating bid status
    if (newBidStatus) {
        const allowed = ['ACCEPTED', 'REJECTED']
        if (!allowed.includes(newBidStatus)) {
            return {
                isValid: false,
                message: 'Invalid Bid Status!',
            }
        }
    }

    return {
        isValid: true,
    }
}

module.exports = validateBidInputs
