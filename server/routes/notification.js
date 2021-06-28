const express = require('express')

const { protectUser } = require('../middleware/protect')
const {
    notificationLoginAndLogoutAction,
    notificationGetSaved,
    notificationUpdateRead,
    notificationDelete,
} = require('../controllers/notification')

const router = express.Router()

// @route: POST /api/notification/batch/:action
// @desc: To batch subscribe/unsubscribe to topics on user login/logout
// @access: Private
router.post('/batch/:action', protectUser, notificationLoginAndLogoutAction)

// @route: GET /api/notification
// @desc: To get all the saved notifications of the logged in user
// @access: Private
router.get('/', protectUser, notificationGetSaved)

// @route: PATCH /api/notification/:notificationID
// @desc: To delete a saved notifications of the logged in user
// @access: Private
router.patch('/:notificationID', protectUser, notificationUpdateRead)

// @route: GET /api/notification/:notificationID
// @desc: To delete a saved notifications of the logged in user
// @access: Private
router.delete('/:notificationID', protectUser, notificationDelete)

module.exports = router
