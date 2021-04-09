const express = require('express')

const { protectAdmin } = require('../middleware/protect')
const {
    adminRegister,
    adminLogin,
    adminDelete,
    adminGetAll,
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

// @route: GET /api/admin
// @desc: To get all admins
// @access: Private
router.get('/', protectAdmin, adminGetAll)

module.exports = router
