const express = require('express')

const { protectAdmin } = require('../middleware/protect')
const { collegeAdd, collegeGetAll, collegeDelete } = require('../controllers/college')

const router = express.Router()

// @route: POST /api/college
// @desc: To add a new state, city or college
// @access: Private
router.post('/', protectAdmin, collegeAdd)

// @route: DELETE /api/college
// @desc: To delete a state, city or college
// @access: Private
router.delete('/', protectAdmin, collegeDelete)

// @route: GET /api/college
// @desc: To get all the states
// @access: Public
router.get('/', collegeGetAll)

module.exports = router
