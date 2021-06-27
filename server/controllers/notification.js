const asyncHandler = require('express-async-handler')
const _ = require('lodash')

const User = require('../models/User')
const { batchSubscribe, batchUnsubscribe } = require('../utils/notification')

// to add a user's new client to NotificationClient
const notificationLoginAndLogoutAction = asyncHandler(async (req, res) => {
    const { notificationClientToken } = req.body
    const { action } = req.params

    if (!notificationClientToken) {
        res.status(400)
        throw new Error(
            "Notification client token not received! Can't provide live updates."
        )
    }

    if (action !== 'SUBSCRIBE' && action !== 'UNSUBSCRIBE') {
        res.status(400)
        throw new Error('No action provided! Action can be SUBSCRIBE/UNSUBSCRIBE.')
    }

    // finding the logged in user
    const foundUser = await User.findById(req.authUser._id)
        .select('products bids following')
        .populate({
            path: 'bids',
            select: 'product',
        })

    if (!foundUser) {
        res.status(500)
        throw new Error(
            'Some error occurred while retrieving the logged in user! Refresh and try again.'
        )
    }

    // collecting all the topics needed to be subscribed for the logged in user
    const topicsArray = [
        ...foundUser.products.map((productID) => String(productID)),
        ...foundUser.bids.map((bid) => String(bid.product)),
        ...foundUser.following.map((productID) => String(productID)),
    ]

    // removing duplication of topics
    const refinedTopicsArray = _.uniq(topicsArray)

    // batch subscribing/unsubscribing based on action provided
    if (action === 'SUBSCRIBE') {
        batchSubscribe(notificationClientToken, refinedTopicsArray)
    } else if (action === 'UNSUBSCRIBE') {
        batchUnsubscribe(notificationClientToken, refinedTopicsArray)
    }

    res.status(200).json({ message: 'Successfully subscribed to notifications!' })
})

module.exports = {
    notificationLoginAndLogoutAction,
}
