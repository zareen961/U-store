const jwt = require('jsonwebtoken')

const generateToken = (userID) =>
    jwt.sign({ _id: userID }, process.env.JWT_SECRET, { expiresIn: '1h' })

module.exports = generateToken
