const asyncHandler = require('express-async-handler')

const Bid = require('../models/Bid')
const User = require('../models/User')
const Product = require('../models/Product')

// to place a bid on a product
const bidPlace = asyncHandler(async (req, res) => {
    const { price } = req.body
    const product = req.params.productID
    const bidOwner = req.authUser._id

    // checking if the User placing Bid is NOT the owner of the Product.
    const foundProduct = await Product.findById(product)
        .select('productOwner bids')
        .populate('bids')

    if (String(foundProduct.productOwner) === String(bidOwner)) {
        res.status(401)
        throw new Error("User cannot place bid on it's own Product")
    }

    // checking if the User has already placed a Bid on the Product or NOT, if already placed then the
    // Bid's status of the last Bid must be "REJECTED", only then new Bid can be placed.
    foundProduct.bids.forEach((bid) => {
        if (String(bid.bidOwner) === String(bidOwner) && bid.status !== 'REJECTED') {
            res.status(401)
            throw new Error(
                'User has already placed a bid on the product which is active!'
            )
        }
    })

    const newBid = await Bid.create({
        price,
        product,
        bidOwner,
    })

    // pushing the new bidID to the bidOwner's bids array
    await User.updateOne(
        { _id: req.authUser._id },
        {
            $push: {
                bids: {
                    $each: [newBid._id],
                    $position: 0,
                },
            },
        }
    )

    // pushing the new bidID to the Product's bids array
    await Product.updateOne(
        { _id: product },
        {
            $push: {
                bids: {
                    $each: [newBid._id],
                    $position: 0,
                },
            },
        }
    )

    if (newBid) {
        res.status(200).json(newBid)
    } else {
        res.status(400)
        throw new Error('Invalid Bid data!')
    }
})

// to delete a bid
const bidDelete = asyncHandler(async (req, res) => {
    const bidID = req.params.bidID

    const foundBid = await Bid.findById(bidID).populate('product')

    // checking if the logged in user is the owner of the Bid being deleted
    if (String(foundBid.bidOwner) !== String(req.authUser._id)) {
        res.status(401)
        throw new Error('Unauthorized to delete this bid!')
    }

    if (foundBid) {
        // removing the deleted Bid's ID from the bidOwner's bids array
        await User.updateOne({ _id: req.authUser._id }, { $pull: { bids: bidID } })

        // removing the deleted Bid's ID from the Product's bids array
        await Product.updateOne({ _id: foundBid.product }, { $pull: { bids: bidID } })

        await foundBid.remove()
        res.status(200).json({
            message: 'Bid Deleted!',
        })
    } else {
        res.status(404)
        throw new Error('No bid found with this bidID!')
    }
})

// to update a bid status
const bidStatusUpdate = asyncHandler(async (req, res) => {
    const { newStatus } = req.body
    const bidID = req.params.bidID

    const foundBid = await Bid.findById(bidID).populate('product')

    // checking if the logged in user is the Product owner
    if (String(foundBid.product.productOwner) !== String(req.authUser._id)) {
        res.status(401)
        throw new Error('Unauthorized to update this bid!')
    }

    if (foundBid) {
        const updatedBid = await Bid.findOneAndUpdate(
            { _id: bidID },
            { $set: { status: newStatus } },
            { new: true }
        )

        if (updatedBid) {
            res.status(200).json({ message: 'Bid Status Updated!' })
        } else {
            res.status(500)
            throw new Error('Some Error occurred while updating the bid!')
        }
    } else {
        res.status(404)
        throw new Error('No bid found with this bidID!')
    }
})

module.exports = {
    bidPlace,
    bidDelete,
    bidStatusUpdate,
}
