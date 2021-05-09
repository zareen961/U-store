const asyncHandler = require('express-async-handler')

const { transporter } = require('../utils/mailerTransporter')
const validateContactInputs = require('../validators/contact')

const contactMailTemplate = (name, email, subject, message) => {
    const to = process.env.EMAIL_LOGIN
    const replyTo = email
    const html = `<p>U-store visitor <strong>${name}</strong>, tried to reach:</p>  
                  <hr />
                  <br />
                  <p>${message}</p>`
    return { to, replyTo, subject, html }
}

// to send mail from the contact form
const sendContactMail = asyncHandler((req, res) => {
    const { name, email, subject, message } = req.body

    const { isValid, message: messageValidator } = validateContactInputs(req.body)
    if (!isValid) {
        res.status(500)
        throw new Error(messageValidator)
    }

    const emailTemplate = contactMailTemplate(name, email, subject, message)

    const sendEmail = () => {
        transporter.sendMail(emailTemplate, (err, info) => {
            if (err) {
                res.status(500).json({
                    message: 'Error sending mail!',
                })
                // throw new Error('Error sending mail!')
            } else {
                // console.log(`** Email sent **`, info)
                res.status(200).json({
                    message: "Thank you for contacting, you'll hear from us very soon!",
                })
            }
        })
    }
    sendEmail()
})

module.exports = { sendContactMail }
