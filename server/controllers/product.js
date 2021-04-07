const asyncHandler = require('express-async-handler')

// to upload new product
const productUpload = asyncHandler(async (req, res) => {})

// to get all products for the logged in user’s college
const productGetAll = asyncHandler(async (req, res) => {})

// to delete a product
const productDelete = asyncHandler(async (req, res) => {})

// To update one’s product until no bid is placed
const productUpdate = asyncHandler(async (req, res) => {})

module.exports = { productUpload, productGetAll, productDelete, productUpdate }
