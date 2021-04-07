const express = require('express')

const { protectAdmin } = require('../middleware/protect')
const {
    adminRegister,
    adminLogin,
    adminDelete,
    adminStateAdd,
    adminCityAdd,
    adminCollegeAdd,
} = require('../controllers/admin')

const router = express.Router()

// @route: POST /api/admin
// @desc: To register a new admin
// @access: Private
router.post('/', protectAdmin, adminRegister)

// @route: POST /api/admin/login
// @desc: To login an existing admin
// @access: Public
router.post('/login', adminLogin)

// @route: DELETE /api/admin/:adminID
// @desc: To delete other admin
// @access: Private
router.delete('/:adminID', protectAdmin, adminDelete)

// @route: POST /api/admin/state
// @desc: To add a new state
// @access: Private
router.post('/state', protectAdmin, adminStateAdd)

// @route: POST /api/admin/city
// @desc: To add a new city
// @access: Private
router.post('/city', protectAdmin, adminCityAdd)

// @route: POST /api/admin/college
// @desc: To add a new college
// @access: Private
router.post('/college', protectAdmin, adminCollegeAdd)
