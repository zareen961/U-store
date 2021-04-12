const express = require('express')

const { protectUser } = require('../middleware/protect')
const { userRegister, userLogin, userDelete, userUpdate } = require('../controllers/user')

const router = express.Router()

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

module.exports = router
