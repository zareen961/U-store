const express = require('express')

const protect = require('../middleware/protect')
const {adminRegister, adminLogin, adminDelete, adminStateAdd, adminCityAdd, adminCollegeAdd} = require('../controllers/admin')

const router = express.Router()

// @route: POST /api/admin
// @desc: To register a new admin
// @access: Private
router.post('/', protect,  adminRegister)

// @route: POST /api/admin/login
// @desc: To login an existing admin
// @access: Public
router.post('/login', adminLogin)

// @route: DELETE /api/admin/:adminID
// @desc: To delete other admin
// @access: Private
router.delete('/:adminID', protect, adminDelete)

// @route: POST /api/admin/state
// @desc: To add a new state
// @access: Private
router.post('/state', protect, adminStateAdd)

// @route: POST /api/admin/city
// @desc: To add a new city
// @access: Private
router.post('/city', protect, adminCityAdd)

// @route: POST /api/admin/college
// @desc: To add a new college
// @access: Private
router.post('/college', protect, adminCollegeAdd)