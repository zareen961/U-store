const asyncHandler = require('express-async-handler')

const Admin = require('../models/Admin')
const generateToken = require('../utils/generateToken')

// to register a new admin
const adminRegister = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    // checking for the uniqueness of username
    const isUniqueUsername = await Admin.countDocuments({ username })
    if (isUniqueUsername > 0) {
        res.status(400)
        throw new Error('Username is already taken!')
    }

    const newAdmin = await Admin.create({
        username,
        password,
    })

    if (newAdmin) {
        // removing password before sending to client
        newAdmin.password = null

        res.status(201).json(newAdmin)
    } else {
        res.status(500)
    }
})

// to login an existing admin
const adminLogin = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    // finding the admin
    const foundAdmin = await Admin.findOne({ username })

    if (foundAdmin && (await foundAdmin.matchPassword(password))) {
        res.send({
            username: foundAdmin.username,
            token: generateToken(foundAdmin._id),
        })
    } else {
        res.status(401)
        throw new Error('Wrong Credentials!')
    }
})

// to delete an admin
const adminDelete = asyncHandler(async (req, res) => {
    const adminID = req.params.adminID
    const { password } = req.body

    // finding the logged in admin
    const foundAdmin = await Admin.findById(req.authAdmin._id)

    if (foundAdmin && (await foundAdmin.matchPassword(password))) {
        const foundAdminToDelete = await Admin.findById(adminID)

        await foundAdminToDelete.remove()

        res.status(200).json({ message: 'Admin Deleted!' })
    } else {
        res.status(401)
        throw new Error('Wrong Credentials!')
    }
})

// to get all the Admins
const adminGetAll = asyncHandler(async (req, res) => {
    const foundAdmins = await Admin.find().select('-password')

    res.status(200).json(foundAdmins)
})

module.exports = {
    adminRegister,
    adminLogin,
    adminDelete,
    adminGetAll,
}
