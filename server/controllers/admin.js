const asyncHandler = require('express-async-handler')

const Admin = require('../models/Admin')

// to register a new admin
const adminRegister = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    const newAdmin = await Admin.create({
        username,
        password,
    })

    if (newAdmin) {
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

        res.status(200).json({ message: 'Admin Deleted!', adminID })
    } else {
        res.status(401)
        throw new Error('Wrong Credentials!')
    }
})

// to add a new state
const adminStateAdd = asyncHandler(async (req, res) => {})

// to add a new city
const adminCityAdd = asyncHandler(async (req, res) => {})

// to add a new college
const adminCollegeAdd = asyncHandler(async (req, res) => {})

module.exports = {
    adminRegister,
    adminLogin,
    adminDelete,
    adminStateAdd,
    adminCityAdd,
    adminCollegeAdd,
}
