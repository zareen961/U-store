const asyncHandler = require("express-async-handler")

const Bid = require("../models/Bid")

// to place a bid on a product
const bidPlace = asyncHandler(async (req, res) => {
    const { price } = req.body
    const productOwner = req.params.productID
    const bidOwner = req.authUser._id

    const newBid = await Bid.create({
        price,
        productOwner,
        bidOwner,
    })

    if (newBid) {
        res.status(200).json(newBid)
    } else {
        res.status(400)
        throw new Error("Invalid Bid data!")
    }
})

// to delete a bid
const bidDelete = asyncHandler(async (req, res) => {
    const bidID = req.params.bidID

    const foundBid = await Bid.findById(bidID)

    if (foundBid) {
        await foundBid.remove()
        res.status(200).json({
            message: "Bid Deleted!",
        })
    } else {
        res.status(404)
        throw new Error("No bid found with this bidID!")
    }
})

// to update a bid status
const bidStatusUpdate = asyncHandler(async (req, res) => {
    const bidID = req.params.bidID

    const foundBid = await Bid.findById(bidID)

    if (foundBid) {
        const { price } = req.body

        const updatedBid = await Bid.findOneAndUpdate({ _id: bidID }, { $set: { price } })

        if (updatedBid) {
            res.status(200).json(updatedBid)
        } else {
            res.status(500)
            throw new Error("Some Error occurred while updating the bid!")
        }
    } else {
        res.status(404)
        throw new Error("No bid found with this bidID!")
    }
})

module.exports = {
    bidPlace,
    bidDelete,
    bidStatusUpdate,
}
