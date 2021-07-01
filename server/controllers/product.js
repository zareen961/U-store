const asyncHandler = require('express-async-handler')
const { ObjectID } = require('mongodb')
const FuzzySearch = require('fuzzy-search')

const Product = require('../models/Product')
const User = require('../models/User')
const validateProductInputs = require('../validators/product')
const { SEARCH_RESULTS_LIMIT } = require('../utils/constants')
const {
    subscribeTopic,
    unsubscribeTopic,
    saveAndSendNotification,
} = require('../utils/notification')
const { PRODUCT_DELETED } = require('../utils/constants')
const { getNotificationToken } = require('../utils/getNotificationToken')

// to upload new product
const productUpload = asyncHandler(async (req, res) => {
    const { name, image, price, description } = req.body
    const productOwner = req.authUser._id
    const college = req.authUser.college
    const notificationClientToken = getNotificationToken(req.headers)

    const { isValid, message } = validateProductInputs(req.body)
    if (!isValid) {
        res.status(400)
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

        // subscribing to this product group
        subscribeTopic(notificationClientToken, newProduct._id)

        res.status(200).json(newProduct)
    } else {
        res.status(400)
        throw new Error('Unable to upload your product at the moment! Try again.')
    }
})

// to get all products for the logged in user’s college
const productGetAll = asyncHandler(async (req, res) => {
    const foundProducts = await Product.find({
        college: req.authUser.college,
        isActive: true,
    })
        .populate({
            path: 'bids productOwner',
            options: { sort: { price: -1 } },
            select: '_id avatar username bidOwner price status createdAt product',
            populate: {
                path: 'bidOwner',
                select: '_id avatar username',
            },
        })
        .sort({
            createdAt: -1,
        })

    res.status(200).json(foundProducts)
})

// to delete a product
const productDelete = asyncHandler(async (req, res) => {
    const productID = req.params.productID
    const notificationClientToken = getNotificationToken(req.headers)

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

        // if no one is related to the product (No bids, No following)
        const isProductDelete =
            foundProduct.bids.length === 0 && foundProduct.following.length === 0

        // if not then don't delete the product, instead just set isActive to false
        if (!isProductDelete) {
            foundProduct.isActive = false
            await foundProduct.save()
        }

        // unsubscribe and send notifications to this product group
        saveAndSendNotification({
            product: { _id: productID, name: foundProduct.name },
            type: PRODUCT_DELETED,
            creator: {
                _id: req.authUser._id,
                username: req.authUser.username,
                avatar: String(req.authUser.avatar),
            },
            isProductDelete,
        })

        // unsubscribe to this topic group
        unsubscribeTopic(notificationClientToken, foundProduct._id)

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
        res.status(400)
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
    const notificationClientToken = getNotificationToken(req.headers)

    // checking if the productID exists in following array of the user
    const foundUser = await User.findById(userID).select()
    if (foundUser && ObjectID.isValid(productID)) {
        const isProductFollowed = foundUser.following.includes(productID)
        if (isProductFollowed) {
            // removing the productID from User's following array
            await User.updateOne({ _id: userID }, { $pull: { following: productID } })

            // removing the userID from Product's following array
            await Product.updateOne({ _id: productID }, { $pull: { following: userID } })

            // unsubscribing from this product group
            unsubscribeTopic(notificationClientToken, productID)

            res.status(200).json({ message: 'Product Unfollowed!' })
        } else {
            const foundProduct = await Product.findById(productID).select(
                'college productOwner isActive following'
            )

            // checking if the product is NOT deleted
            if (!foundProduct.isActive) {
                res.status(500)
                throw new Error(
                    'The product you wish to keep an eye on has been deleted!'
                )
            }

            /*checking if the product belongs to user's college and
              checking if the user does not own the product*/
            if (
                String(foundProduct.college) === String(req.authUser.college) &&
                String(foundProduct.productOwner) !== String(userID)
            ) {
                // pushing the productID to User's following array
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

                // pushing the userID to Product's following array
                await Product.updateOne(
                    { _id: productID },
                    {
                        $push: {
                            following: {
                                $each: [userID],
                                $position: 0,
                            },
                        },
                    }
                )

                // subscribing to this product group
                subscribeTopic(notificationClientToken, productID)

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

// to search a product based on provided query keyword
const productSearch = asyncHandler(async (req, res) => {
    const { query } = req.params

    const collegeProducts = await Product.find({
        college: req.authUser.college,
        isActive: true,
    })
        .select('_id name description image productOwner price createdAt')
        .populate({
            path: 'productOwner',
            select: 'username',
        })

    const searcher = new FuzzySearch(
        collegeProducts,
        ['name', 'description', 'productOwner.username'],
        { sort: true }
    )

    let searchedProducts = searcher.search(query)

    searchedProducts = searchedProducts
        .map((product) => ({
            ...product._doc,
            description: undefined,
            productOwner: product.productOwner.username,
            image: product.image.url,
        }))
        .slice(0, SEARCH_RESULTS_LIMIT)

    res.status(200).json(searchedProducts)
})

// to get a single product by its ID
const productGetOne = asyncHandler(async (req, res) => {
    const { productID } = req.params

    const foundProduct = await Product.findOne({
        college: req.authUser.college,
        _id: productID,
    }).populate({
        path: 'bids productOwner',
        select: '_id price status bidOwner username avatar createdAt product',
        populate: {
            path: 'bidOwner',
            select: '_id username avatar',
        },
    })

    if (!foundProduct) {
        res.status(500)
        throw new Error('No product found!')
    }

    foundProduct.college = undefined
    foundProduct.updatedAt = undefined

    res.status(200).json(foundProduct)
})

module.exports = {
    productUpload,
    productGetAll,
    productDelete,
    productUpdate,
    productFollowToggle,
    productSearch,
    productGetOne,
}
