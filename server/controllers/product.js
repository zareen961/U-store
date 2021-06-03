const asyncHandler = require('express-async-handler')
const { ObjectID } = require('mongodb')

const Product = require('../models/Product')
const User = require('../models/User')
const Bid = require('../models/Bid')
const validateProductInputs = require('../validators/product')

// to upload new product
const productUpload = asyncHandler(async (req, res) => {
    const { name, image, price, description } = req.body
    const productOwner = req.authUser._id
    const college = req.authUser.college

    const { isValid, message } = validateProductInputs(req.body)
    if (!isValid) {
        res.status(500)
        throw new Error(message)
    }

    const newProduct = await Product.create({
        name,
        image,
        price,
        description,
        productOwner,
        college,
    })

    if (newProduct) {
        // pushing the new productID to the productOwner's products array
        await User.updateOne(
            { _id: productOwner },
            {
                $push: {
                    products: {
                        $each: [newProduct._id],
                        $position: 0,
                    },
                },
            }
        )

        res.status(200).json(newProduct)
    } else {
        res.status(400)
        throw new Error('Unable to upload your product at the moment! Try again.')
    }
})

// to get all products for the logged in user’s college
const productGetAll = asyncHandler(async (req, res) => {
    const foundProducts = await Product.find({ college: req.authUser.college })
        .populate({
            path: 'bids',
            options: { sort: { price: -1 } },
            populate: {
                path: 'bidOwner',
                select: '_id avatar username',
            },
        })
        .populate({
            path: 'productOwner',
            select: '_id avatar username',
        })
        .sort({
            createdAt: -1,
        })
    res.status(200).json(foundProducts)
})

// to delete a product
const productDelete = asyncHandler(async (req, res) => {
    const productID = req.params.productID

    const foundProduct = await Product.findById(productID)

    if (foundProduct) {
        // checking if the logged in user is the owner of the Product
        if (String(foundProduct.productOwner) !== String(req.authUser._id)) {
            res.status(401)
            throw new Error('You are not authorized to delete this product!')
        }

        // removing the deleted productID from productOwner's products array
        await User.updateOne(
            { _id: req.authUser._id },
            { $pull: { products: productID } }
        )

        // removing all the bids placed on that product
        await Bid.deleteMany({ _id: { $in: foundProduct.bids } })

        await foundProduct.remove()
        res.status(200).json({
            message: 'Product Deleted!',
        })
    } else {
        res.status(404)
        throw new Error("The product you are trying to delete can't be found! Try again")
    }
})

// To update one’s product until no bid is placed
const productUpdate = asyncHandler(async (req, res) => {
    const toUpdateProduct = req.body
    const productID = req.params.productID

    const { isValid, message } = validateProductInputs(req.body, true)
    if (!isValid) {
        res.status(500)
        throw new Error(message)
    }

    const foundProduct = await Product.findById(productID)

    if (foundProduct) {
        // checking if the logged in user is the owner of the Product
        if (String(foundProduct.productOwner) !== String(req.authUser._id)) {
            res.status(401)
            throw new Error('You are not authorized to edit this product!')
        }

        if (foundProduct.bids.length > 0) {
            res.status(400)
            throw new Error('Sorry, you cannot edit the product while it is has bids!')
        }

        const updatedProduct = await Product.findOneAndUpdate(
            { _id: productID },
            { $set: toUpdateProduct },
            { new: true }
        )

        if (updatedProduct) {
            res.status(200).json({ message: 'Product Updated!' })
        } else {
            res.status(500)
            throw new Error("The product couldn't be updated at the moment! Try again.")
        }
    } else {
        res.status(404)
        throw new Error(
            'The product you are trying to edit could not be found! Try again.'
        )
    }
})

// to follow/unfollow a product
const productFollowToggle = asyncHandler(async (req, res) => {
    const { productID } = req.params
    const userID = req.authUser._id

    // checking if the productID exists in following array of the user
    const foundUser = await User.findById(userID).select()
    if (foundUser && ObjectID.isValid(productID)) {
        const isProductFollowed = foundUser.following.includes(productID)
        if (isProductFollowed) {
            await User.updateOne({ _id: userID }, { $pull: { following: productID } })

            res.status(200).json({ message: 'Product Unfollowed!' })
        } else {
            /*checking if the product belongs to user's college and
              checking if the user does not own the product*/
            const foundProduct = await Product.findById(productID).select(
                'college productOwner'
            )

            if (
                String(foundProduct.college) === String(req.authUser.college) &&
                String(foundProduct.productOwner) !== String(userID)
            ) {
                await User.updateOne(
                    { _id: userID },
                    {
                        $push: {
                            following: {
                                $each: [productID],
                                $position: 0,
                            },
                        },
                    }
                )

                res.status(200).json({ message: 'Product Followed!' })
            } else {
                res.status(402)
                throw new Error('Unauthorized to follow this product!')
            }
        }
    } else {
        res.status(500)
        throw new Error("Can't follow/unfollow the product at the moment! Try again.")
    }
})

module.exports = {
    productUpload,
    productGetAll,
    productDelete,
    productUpdate,
    productFollowToggle,
}
