const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const _ = require('lodash')

const User = require('../models/User')
const Product = require('../models/Product')
const Bid = require('../models/Bid')
const generateToken = require('../utils/generateToken')
const validateUserInputs = require('../validators/user')
const { capitalize } = require('../utils/capitalize')

// to get all the details of logged in User
const userGet = asyncHandler(async (req, res) => {
    const foundUser = await User.findById(req.authUser._id).populate({
        path: 'bids',
        options: { sort: { createdAt: -1 } },
        select: 'product',
    })

    // removing bids duplicates on the same product
    const bidsClubbed = _.uniqBy(foundUser.bids, (bid) => String(bid.product))
    foundUser.bids = bidsClubbed

    if (foundUser) {
        res.status(200).json(foundUser)
    } else {
        res.status(500)
        throw new Error('Cannot find the requested user!')
    }
})

// to get the contact details of an user
const userGetContact = asyncHandler(async (req, res) => {
    const productID = req.headers.productid
    const requestedUsername = req.params.username

    if (requestedUsername === 'ustore_user') {
        res.status(404)
        throw new Error('The requested user has deleted his/her account!')
    }

    // getting the contact details of the requested user
    const foundUser = await User.findOne({ username: requestedUsername }).select(
        '_id firstName lastName username email primaryPhone secondaryPhone avatar createdAt products'
    )

    if (!foundUser) {
        res.status(500)
        throw new Error('Cannot find the requested user!')
    }

    const productCount = foundUser.products.length // getting the total products count of the requested user

    foundUser.products = undefined // no need for for requested user's products

    // when the "VIEW CONTACT PAGE" button is clicked from my account screen
    if (String(req.authUser._id) === String(foundUser._id) && !productID) {
        return res.status(200).json({ contact: { ...foundUser._doc, productCount } })
    }

    // finding the associated product
    const foundProduct = await Product.findById(productID)
        .select('-updatedAt -college')
        .populate({
            path: 'bids',
            select: '-updatedAt',
            populate: {
                path: 'bidOwner',
                select: '_id username avatar',
            },
        })

    if (!foundProduct) {
        res.status(500)
        throw new Error('No product found!')
    }

    let isAuthToView = false
    const acceptedBids = foundProduct.bids.filter((bid) => bid.status === 'ACCEPTED')

    // if user has requested to view his contact page on a particular bid / product
    if (String(req.authUser._id) === String(foundUser._id)) {
        isAuthToView = true
    }

    // seller requested to see the bidder contact details
    else if (String(foundProduct.productOwner) === String(req.authUser._id)) {
        isAuthToView =
            acceptedBids.filter(
                (bid) => String(bid.bidOwner._id) === String(foundUser._id)
            ).length > 0
    }

    // buyer requested to see the product owner contact details
    else if (String(foundProduct.productOwner) === String(foundUser._id)) {
        isAuthToView =
            acceptedBids.filter(
                (bid) => String(bid.bidOwner._id) === String(req.authUser._id)
            ).length > 0
    }

    // product belongs to neither requester user nor requested user
    else {
        res.status(404)
        throw new Error(`Not authorized to view @${foundUser.username} contact details!`)
    }

    // finding the highest bid on the product
    let highestBid = 0
    if (foundProduct.bids.length > 0) {
        highestBid = _.orderBy(foundProduct.bids, ['price'], ['desc'])[0].price
    }

    if (isAuthToView) {
        res.status(200).json({
            contact: { ...foundUser._doc, productCount },
            product: {
                ...foundProduct._doc,
                highestBid,
                totalAcceptedBids: acceptedBids.length,
                totalBidsCount: foundProduct.bids.length,
            },
        })
    } else {
        res.status(401)
        throw new Error(
            `You're not authorized to view @${foundUser.username} contact details!`
        )
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
        res.status(400)
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
        firstName: capitalize(firstName),
        lastName: capitalize(lastName),
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
        path: 'bids',
        options: { sort: { createdAt: -1 } },
        select: 'product',
    })

    if (foundUser && (await foundUser.matchPassword(password))) {
        // removing bids duplicates on the same product
        const bidsClubbed = _.uniqBy(foundUser.bids, (bid) => String(bid.product))
        foundUser.bids = bidsClubbed

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
        // getting the default user
        const defaultUser = await User.findOne({ isDefaultUser: true })

        // setting all the products of the user as DELETED and productOwner as the default user
        await Product.updateMany(
            { _id: { $in: foundUser.products } },
            {
                $set: { isActive: false, productOwner: defaultUser._id },
            }
        )

        //removing the User from following list of the products he/she follows
        await Product.updateMany(
            { _id: { $in: foundUser.following } },
            { $pull: { following: foundUser._id } }
        )

        // deleting all the bids placed by this user (expect the ACCEPTED ones)
        await Bid.deleteMany({
            _id: { $in: foundUser.bids },
            status: { $in: ['PENDING', 'REJECTED'] },
        })

        // setting the default user to bidOwner
        await Bid.updateMany(
            {
                _id: { $in: foundUser.bids },
                status: { $in: ['ACCEPTED'] },
            },
            {
                $set: { bidOwner: defaultUser._id },
            }
        )

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
            res.status(400)
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

        // if first name or last name is updated, then capitalize them
        if (toUpdateUser.firstName) {
            toUpdateUser.firstName = capitalize(toUpdateUser.firstName)
        }
        if (toUpdateUser.lastName) {
            toUpdateUser.lastName = capitalize(toUpdateUser.lastName)
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

// to get all the products of logged in user
const userGetProducts = asyncHandler(async (req, res) => {
    const foundUser = await User.findById(req.authUser._id)
        .select('products')
        .populate({
            path: 'products',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'bids',
                options: { sort: { price: -1 } },
                select: '-updatedAt',
                populate: {
                    path: 'bidOwner',
                    select: '_id username avatar',
                },
            },
        })

    // if (foundUser.products.bids.bidOwner)
    if (foundUser && foundUser.products) {
        res.status(200).json(foundUser.products)
    } else {
        res.status(500)
        throw new Error("Cannot find the requested user's products!")
    }
})

// to get all the bids of logged in user
const userGetBids = asyncHandler(async (req, res) => {
    const foundUser = await User.findById(req.authUser._id)
        .select('bids')
        .populate({
            path: 'bids',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'product',
                select: '-college -updatedAt',
                populate: {
                    path: 'productOwner bids',
                    select: '_id username avatar price createdAt status',
                    options: { sort: { price: -1 } },
                    populate: {
                        path: 'bidOwner',
                        select: '_id avatar username',
                    },
                },
            },
        })

    if (foundUser && foundUser.bids) {
        /* clubbing the bids on the same product by simply removing other bids object for the same product
           and only keeping the latest bid object among the duplicates. So as the bids array is sorted 
           according to createAt = -1, we will only get latest ones. */
        const bidsClubbed = _.uniqBy(foundUser.bids, (bid) => bid.product._id)

        // now refactoring the clubbedBids array to turn it to product object
        const biddenProducts = bidsClubbed.map((bidObj) => bidObj.product)

        res.status(200).json(biddenProducts)
    } else {
        res.status(500)
        throw new Error("Cannot find the requested user's bids!")
    }
})

// to get all the following of logged in user
const userGetFollowing = asyncHandler(async (req, res) => {
    const foundUser = await User.findById(req.authUser._id)
        .select('following')
        .populate({
            path: 'following',
            select: '-updateAt -college',
            populate: {
                path: 'bids productOwner',
                select: 'price createdAt _id avatar username status',
                populate: {
                    path: 'bidOwner',
                    select: '_id username avatar price',
                    options: { sort: { price: -1 } },
                },
            },
        })

    if (foundUser && foundUser.following) {
        res.status(200).json(foundUser.following)
    } else {
        res.status(500)
        throw new Error("Cannot find the requested user's following!")
    }
})

module.exports = {
    userGet,
    userRegister,
    userLogin,
    userDelete,
    userUpdate,
    userGetContact,
    userGetProducts,
    userGetBids,
    userGetFollowing,
}
