const express = require('express')

const {bidPlace, bidDelete, bidStatusUpdate} =require('../controllers/bid')
const protect = require('../middleware/protect')

const router = express.Router()

// @route: POST /api/bid/:productID
// @desc: To place a bid on a product - buyer
// @access: Private
router.post('/:productID', protect, bidPlace)

// @route: DELETE /api/bid/:bidID
// @desc: To delete a bid - buyer
// @access: Private
router.delete('/:bidID', protect, bidDelete)

// @route: PUT /api/bid/:bidID
// @desc: To update a bid’s status - seller
// @access: Private
router.put('/:bidID', protect, bidStatusUpdate)