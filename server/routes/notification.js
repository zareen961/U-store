const express = require('express')

const { protectUser } = require('../middleware/protect')
const { notificationAddClient } = require('../controllers/notification')

const router = express.Router()

// @route: POST /api/notification
// @desc: To add user's new client to notification client
// @access: Private
router.post('/', protectUser, notificationAddClient)

module.exports = router
