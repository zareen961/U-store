const asyncHandler = require("express-async-handler")

const Product = require("../models/Product")

// to upload new product
const productUpload = asyncHandler(async (req, res) => {
    const { name, image, price, description } = req.body
    const productOwner = req.authUser._id
    const college = req.authUser.college

    const newProduct = await Product.create({
        name,
        image,
        price,
        description,
        productOwner,
        college,
    })

    if (newProduct) {
        res.status(200).json(newProduct)
    } else {
        res.status(400)
        throw new Error("Invalid Product data!")
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
        await foundProduct.remove()
        res.status(200).json({
            message: "Product Deleted!",
        })
    } else {
        res.status(404)
        throw new Error("No product found with this productID!")
    }
})

// To update one’s product until no bid is placed
const productUpdate = asyncHandler(async (req, res) => {
    const { name, image, price, description } = req.body
    const productID = req.params.productID

    const foundProduct = await Product.findById(productID)

    if (foundProduct) {
        if (foundProduct.bids.length > 0) {
            res.status(400)
            throw new Error("Cannot update products with active bids!")
        }

        const updatedProduct = await Product.findOneAndUpdate(
            { _id: productID },
            { $set: { name, image, price, description } }
        )

        if (updatedProduct) {
            res.status(200).json(updatedProduct)
        } else {
            res.status(500)
            throw new Error("Some Error occurred while updating the product!")
        }
    } else {
        res.status(404)
        throw new Error("No product found with this productID!")
    }
})

module.exports = { productUpload, productGetAll, productDelete, productUpdate }
