const express = require('express')

const { sendContactMail } = require('../controllers/contact')

const router = express.Router()

// @route: POST /api/contact
// @desc: To send contact mail from the contact form
// @access: Public
router.post('/', sendContactMail)

module.exports = router
