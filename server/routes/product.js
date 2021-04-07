const express = require('express')

const protect = require('../middleware/protect')
const {productUpload, productGetAll, productDelete, productUpdate} = require('../controllers/product')

const router = express.Router()

// @route: POST /api/product
// @desc: To upload a new product
// @access: Private
router.post('/', protect, productUpload)

// @route: GET /api/product
// @desc: To get all products for the logged in user’s college
// @access: Private
router.get('/', protect, productGetAll)

// @route: DELETE /api/product/:productID
// @desc: To delete a product
// @access: Private
router.delete('/', protect, productDelete)

// @route: PUT /api/product/:productID
// @desc: To update one’s product until no bid is placed
// @access: Private
router.put('/', protect, productUpdate)