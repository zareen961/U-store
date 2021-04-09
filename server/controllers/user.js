const asyncHandler = require('express-async-handler')

const User = require('../models/User')
const generateToken = require('../utils/generateToken')

// to register new user
const userRegister = asyncHandler(async (req, res) => {
    const {
        email,
        username,
        firstName,
        lastName,
        avatar,
        primaryPhone,
        secondaryPhone,
        collegeState,
        collegeCity,
        college,
        password,
    } = req.body

    const newUser = await User.create({
        email,
        username,
        firstName,
        lastName,
        avatar,
        primaryPhone,
        secondaryPhone,
        collegeState,
        collegeCity,
        college,
        password,
    })

    if (newUser) {
        res.status(201).json({
            message: 'New User Registered!',
        })
    } else {
        res.status(500)
        throw new Error('Invalid User data!')
    }
})

// to login existing user
const userLogin = asyncHandler(async (req, res) => {
    const { usernameOrEmail, password } = req.body

    // finding the user by either username or email
    const foundUser = await User.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    }).populate('products bids')

    if (foundUser && (await foundUser.matchPassword(password))) {
        // now deleting the password from the foundUser object before sending to frontend
        foundUser.password = null

        res.send({
            user: foundUser,
            token: generateToken(foundUser._id),
        })
    } else {
        res.status(401)
        throw new Error('Wrong Credentials!')
    }
})

// to delete existing user
const userDelete = asyncHandler(async (req, res) => {
    const { password } = req.body

    // finding the user
    const foundUser = await findById(req.authUser._id)

    if (foundUser && (await foundUser.matchPassword(password))) {
        await foundUser.remove()
        res.status(200).json({
            message: 'User Deleted!',
        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials!')
    }
})

// to update details of existing user
const userUpdate = asyncHandler(async (req, res) => {
    const {
        email,
        username,
        firstName,
        lastName,
        avatar,
        primaryPhone,
        secondaryPhone,
        collegeState,
        collegeCity,
        college,
        password,
    } = req.body

    // finding the user
    const foundUser = await User.findById(req.authUser._id)

    foundUser.email = email
    foundUser.username = username
    foundUser.firstName = firstName
    foundUser.lastName = lastName
    foundUser.avatar = avatar
    foundUser.primaryPhone = primaryPhone
    foundUser.secondaryPhone = secondaryPhone
    foundUser.collegeState = collegeState
    foundUser.collegeCity = collegeCity
    foundUser.college = college
    foundUser.password = password

    await foundUser.save()

    res.status(200).json(foundUser)
})

module.exports = { userRegister, userLogin, userDelete, userUpdate }
