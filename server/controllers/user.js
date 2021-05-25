const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

const User = require('../models/User')
const Product = require('../models/Product')
const Bid = require('../models/Bid')
const generateToken = require('../utils/generateToken')
const validateUserInputs = require('../validators/user')

// to get all the details of an User
const userGet = asyncHandler(async (req, res) => {
    const foundUser = await User.findById(req.authUser._id).populate({
        path: 'products bids following',
        options: { sort: { createdAt: -1 } },
        populate: {
            path: 'bids',
            options: { sort: { createdAt: -1 } },
        },
    })

    if (foundUser) {
        res.status(200).json(foundUser)
    } else {
        res.status(500)
        throw new Error('Cannot find the requested user!')
    }
})

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
        throw new Error(
            'This username belongs to someone else, be creative and get a unique one'
        )
    }

    //  checking for the uniqueness fo email address
    const isUniqueEmail = await User.countDocuments({ email })
    if (isUniqueEmail > 0) {
        res.status(400)
        throw new Error('Email is already registered! Try Logging in.')
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
        throw new Error("Your account couldn't be registered! Try again.")
    }
})

// to login existing user
const userLogin = asyncHandler(async (req, res) => {
    const { usernameOrEmail, password } = req.body

    // finding the user by either username or email
    const foundUser = await User.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    }).populate({
        path: 'products bids following',
        options: { sort: { createdAt: -1 } },
        populate: {
            path: 'bids',
            options: { sort: { createdAt: -1 } },
        },
    })

    if (foundUser && (await foundUser.matchPassword(password))) {
        // now deleting the password from the foundUser object before sending to frontend
        foundUser.password = null

        res.send({
            userInfo: foundUser,
            token: generateToken(foundUser._id),
        })
    } else {
        res.status(401)
        throw new Error("Wrong Credentials! Can't log you in.")
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
        throw new Error("Wrong Credentials! Can't delete your account.")
    }
})

// to update details of existing user
const userUpdate = asyncHandler(async (req, res) => {
    const { currentPassword, ...toUpdateUser } = req.body

    // finding the logged in user
    const foundUser = await User.findById(req.authUser._id)

    // matching the current password
    if (
        foundUser &&
        currentPassword &&
        (await foundUser.matchPassword(currentPassword))
    ) {
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
            if (isUniqueUsername) {
                res.status(400)
                throw new Error(
                    'This username belongs to someone else, be creative and get a unique one'
                )
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

        // checking if both the phone numbers are different
        const { primaryPhone, secondaryPhone } = toUpdateUser
        if (
            (primaryPhone && primaryPhone === foundUser.secondaryPhone) ||
            (secondaryPhone && secondaryPhone === foundUser.primaryPhone)
        ) {
            if (!primaryPhone || !secondaryPhone) {
                res.status(400)
                throw new Error("Phone numbers can't be same!")
            }
        }

        // if password needs to be updated, then hash it
        if (toUpdateUser.password) {
            const salt = await bcrypt.genSalt(13)
            toUpdateUser.password = await bcrypt.hash(toUpdateUser.password, salt)
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: req.authUser._id },
            { $set: toUpdateUser },
            { new: true }
        )

        if (updatedUser) {
            res.status(200).json({ message: 'User Details Updated!' })
        } else {
            res.status(500)
            throw new Error("Your details couldn't be updated at the moment! Try again.")
        }
    } else {
        res.status(401)
        throw new Error('Wrong Credentials! Try again.')
    }
})

module.exports = { userGet, userRegister, userLogin, userDelete, userUpdate }
