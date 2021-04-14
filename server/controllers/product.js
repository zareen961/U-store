const asyncHandler = require('express-async-handler')

const Product = require('../models/Product')
const User = require('../models/User')
const Bid = require('../models/Bid')
const { validateProductInputs } = require('../validators/product')
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
        throw new Error('Invalid Product data!')
    }
})

// to get all products for the logged in user’s college
const productGetAll = asyncHandler(async (req, res) => {
    const foundProducts = await Product.find({ college: req.authUser.college }).sort({
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
            throw new Error('User is not the owner of the product!')
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
        throw new Error('No product found with this productID!')
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
            throw new Error('User is not the owner of the product!')
        }

        if (foundProduct.bids.length > 0) {
            res.status(400)
            throw new Error('Cannot update products with active bids!')
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
            throw new Error('Some Error occurred while updating the product!')
        }
    } else {
        res.status(404)
        throw new Error('No product found with this productID!')
    }
})

module.exports = { productUpload, productGetAll, productDelete, productUpdate }
