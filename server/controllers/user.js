const asyncHandler = require('express-async-handler')

const User = require('../models/User')
const Product = require('../models/Product')
const Bid = require('../models/Bid')
const generateToken = require('../utils/generateToken')
const { validateUserInputs } = require('../validators/user')

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

    const { isValid, message } = validateUserInputs(req.body)
    if (!isValid) {
        res.status(500)
        throw new Error(message)
    }

    // checking for the uniqueness of username
    const isUniqueUsername = await User.countDocuments({ username })
    if (isUniqueUsername > 0) {
        res.status(400)
        throw new Error('Username is already taken!')
    }

    //  checking for the uniqueness fo email address
    const isUniqueEmail = await User.countDocuments({ email })
    if (isUniqueEmail > 0) {
        res.status(400)
        throw new Error('Email is already registered! Try Login.')
    }

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
    const foundUser = await User.findById(req.authUser._id)

    if (foundUser && (await foundUser.matchPassword(password))) {
        // deleting all the products uploaded by this user
        await Product.deleteMany({ _id: { $in: foundUser.products } })

        // deleting all the bids placed by this user
        await Bid.deleteMany({ _id: { $in: foundUser.bids } })

        await foundUser.remove()
        res.status(200).json({
            message: 'User Deleted!',
        })
    } else {
        res.status(400)
        throw new Error('Wrong Credentials!')
    }
})

// to update details of existing user
const userUpdate = asyncHandler(async (req, res) => {
    const toUpdateUser = req.body

    const { isValid, message } = validateUserInputs(req.body, true)
    if (!isValid) {
        res.status(500)
        throw new Error(message)
    }

    // checking for the uniqueness of username
    if (toUpdateUser.username) {
        const isUniqueUsername = await User.countDocuments({
            username: toUpdateUser.username,
        })
        if (isUniqueUsername > 0) {
            res.status(400)
            throw new Error('Username is already taken!')
        }
    }

    //  checking for the uniqueness fo email address
    if (toUpdateUser.email) {
        const isUniqueEmail = await User.countDocuments({ email: toUpdateUser.email })
        if (isUniqueEmail > 0) {
            res.status(400)
            throw new Error('This Email is already registered!')
        }
    }

    const updatedUser = await User.findOneAndUpdate(
        { _id: req.authUser._id },
        { $set: toUpdateUser },
        { new: true }
    )

    if (updatedUser) {
        res.status(200).json({ message: 'User Details Updated' })
    } else {
        res.status(500)
        throw new Error('Some Error occurred while updating the user!')
    }
})

module.exports = { userRegister, userLogin, userDelete, userUpdate }
