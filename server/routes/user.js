const express = require('express')

const { protectUser } = require('../middleware/protect')
const {
    userGet,
    userRegister,
    userLogin,
    userDelete,
    userUpdate,
    userGetContact,
    userGetProducts,
    userGetBids,
    userGetFollowing,
} = require('../controllers/user')

const router = express.Router()

// @route: GET /api/user
// @desc: To fetch details of the logged in user
// @access: Private
router.get('/', protectUser, userGet)

// @route: GET /api/user/:userID
// @desc: To fetch contact details of any user
// @access: Private
router.get('/contact/:username', protectUser, userGetContact)

// @route: POST /api/user
// @desc: To register a new user
// @access: Public
router.post('/', userRegister)

// @route: POST /api/user/login
// @desc: To login an existing user
// @access: Public
router.post('/login', userLogin)

// @route: DELETE /api/user
// @desc: To delete an user
// @access: Private
router.delete('/', protectUser, userDelete)

// @route: PATCH /api/user
// @desc: To update an existing user
// @access: Private
router.patch('/', protectUser, userUpdate)

// @route: GET /api/user/products
// @desc: To fetch all the products of logged in user
// @access: Private
router.get('/products', protectUser, userGetProducts)

// @route: GET /api/user/bids
// @desc: To fetch all the bids of logged in user
// @access: Private
router.get('/bids', protectUser, userGetBids)

// @route: GET /api/user/following
// @desc: To fetch all the following of logged in user
// @access: Private
router.get('/following', protectUser, userGetFollowing)

module.exports = router
