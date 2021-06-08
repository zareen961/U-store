const express = require('express')

const {
    bidPlace,
    bidDelete,
    bidStatusUpdate,
    bidPriceEdit,
} = require('../controllers/bid')
const { protectUser } = require('../middleware/protect')

const router = express.Router()

// @route: POST /api/bid/:productID
// @desc: To place a bid on a product - buyer
// @access: Private
router.post('/:productID', protectUser, bidPlace)

// @route: DELETE /api/bid/:bidID
// @desc: To delete a bid - buyer
// @access: Private
router.delete('/:bidID', protectUser, bidDelete)

// @route: PATCH /api/bid/:bidID/status
// @desc: To update a bid’s status - seller
// @access: Private
router.patch('/:bidID/status', protectUser, bidStatusUpdate)

// @route: PATCH /api/bid/:bidID/price
// @desc: To update a bid’s price - buyer
// @access: Private
router.patch('/:bidID/price', protectUser, bidPriceEdit)

module.exports = router
