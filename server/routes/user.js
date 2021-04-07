const express = require('express')

const protect = require('../middleware/protect')
const {userRegister, userLogin, userDelete, userUpdate} = require('../controllers/user')

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
router.delete('/', protect, userDelete)

// @route: PUT /api/user
// @desc: To update an existing user
// @access: Private
router.put('/', protect, userUpdate)