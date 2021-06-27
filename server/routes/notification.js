const express = require('express')

const { protectUser } = require('../middleware/protect')
const { notificationLoginAndLogoutAction } = require('../controllers/notification')

const router = express.Router()

// @route: POST /api/notification/batch/:action
// @desc: To batch subscribe/unsubscribe to topics on user login/logout
// @access: Private
router.post('/batch/:action', protectUser, notificationLoginAndLogoutAction)

module.exports = router
