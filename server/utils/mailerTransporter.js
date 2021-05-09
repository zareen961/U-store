const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_LOGIN,
        pass: process.env.EMAIL_PASSWORD,
    },
})

module.exports = { transporter }
