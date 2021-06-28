const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const Admin = require('../models/Admin')
const User = require('../models/User')

const protectAdmin = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            req.authAdmin = await Admin.findById(decodedToken._id).select('-password')

            if (!req.authAdmin) {
                res.status(400)
                throw new Error('Admin not found!')
            }

            next()
        } catch (err) {
            console.error(err.message)
            res.status(401)
            throw new Error('Not Authorized, Expired Session! Login Again.')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not Authorized!')
    }
})

const protectUser = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            req.authUser = await User.findById(decodedToken._id).select(
                '_id college username avatar'
            )

            if (!req.authUser) {
                res.status(400)
                throw new Error('User not found!')
            }

            next()
        } catch (err) {
            console.error(err.message)
            res.status(401)
            throw new Error('Not Authorized, Expired Session! Login Again.')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not Authorized!')
    }
})

module.exports = {
    protectAdmin,
    protectUser,
}
