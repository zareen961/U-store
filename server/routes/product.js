const express = require('express')

const { protectUser } = require('../middleware/protect')
const {
    productUpload,
    productGetAll,
    productDelete,
    productUpdate,
    productFollowToggle,
    productSearch,
    productGetOne,
} = require('../controllers/product')

const router = express.Router()

// @route: POST /api/product
// @desc: To upload a new product
// @access: Private
router.post('/', protectUser, productUpload)

// @route: GET /api/product
// @desc: To get all products for the logged in user’s college
// @access: Private
router.get('/', protectUser, productGetAll)

// @route: GET /api/product/:productID
// @desc: To a product by its ID for the logged in user’s college
// @access: Private
router.get('/:productID', protectUser, productGetOne)

// @route: GET /api/product/search/:query
// @desc: To get all products for the query
// @access: Private
router.get('/search/:query', protectUser, productSearch)

// @route: DELETE /api/product/:productID
// @desc: To delete a product
// @access: Private
router.delete('/:productID', protectUser, productDelete)

// @route: PATCH /api/product/:productID
// @desc: To update one’s product until no bid is placed
// @access: Private
router.patch('/:productID', protectUser, productUpdate)

// @route: PATCH /api/product/follow
// @desc: To follow/unfollow a product
// @access: Private
router.patch('/follow/:productID', protectUser, productFollowToggle)

module.exports = router
