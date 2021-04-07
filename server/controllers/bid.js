const asyncHandler = require('express-async-handler')

// to place a bid on a product
const bidPlace = asyncHandler(async (req, res) => {})

// to delete a bid
const bidDelete = asyncHandler(async (req, res) => {})

// to update a bid status
const bidStatusUpdate = asyncHandler(async (req, res) => {})

module.exports = {
    bidPlace,
    bidDelete,
    bidStatusUpdate,
}
