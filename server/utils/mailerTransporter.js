const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const REDIRECT_URI = 'https://developers.google.com/oauthplayground'

const oAuthClient = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    REDIRECT_URI
)
oAuthClient.setCredentials({ refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN })

const createTransporter = async () => {
    try {
        const ACCESS_TOKEN = await oAuthClient.getAccessToken()

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL_LOGIN,
                clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
                clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
                refreshToken: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
                accessToken: ACCESS_TOKEN,
            },
        })

        return transporter
    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports = { createTransporter }
