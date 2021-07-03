const asyncHandler = require('express-async-handler')
const _ = require('lodash')

const User = require('../models/User')
const { batchSubscribe, batchUnsubscribe } = require('../utils/notification')
const { getNotificationToken } = require('../utils/getNotificationToken')

// to batch subscribe/unsubscribe to all the concerned topics of the logged in user to get live updates
const notificationLoginAndLogoutAction = asyncHandler(async (req, res) => {
    const { action } = req.params
    const notificationClientToken = getNotificationToken(req.headers)

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

// to fetch all the saved notifications of the logged in user
const notificationGetSaved = asyncHandler(async (req, res) => {
    const foundUser = await User.findById(req.authUser._id)
        .select('notifications')
        .populate({
            path: 'notifications',
            populate: {
                path: 'notification',
                populate: {
                    path: 'product creator',
                    select: '_id name username avatar',
                },
            },
        })

    if (!foundUser) {
        res.status(500)
        throw new Error(
            'Some error occurred while fetching your notifications! Please refresh to try again.'
        )
    }

    const notifications = foundUser.notifications.map(({ notification, isRead }) => ({
        _id: String(notification._id),
        productID: notification.product._id,
        productName: notification.product.name,
        creatorID: notification.creator._id,
        creatorUsername: notification.creator.username,
        creatorAvatar: notification.creator.avatar,
        spotlightUser: notification.spotlightUser,
        type: notification.type,
        isRead: String(isRead),
        createdAt: notification.createdAt,
    }))

    res.status(200).json(notifications)
})

// to delete a notification
const notificationDelete = asyncHandler(async (req, res) => {
    const { notificationID } = req.params

    // removing the notificationID from User's notifications array
    await User.updateOne(
        { _id: req.authUser._id },
        { $pull: { notifications: { notification: notificationID } } },
        { safe: true, upsert: true }
    )

    res.status(200).json({ message: 'Notification deleted!' })
})

// to update a user's notification as READ
const notificationUpdateRead = asyncHandler(async (req, res) => {
    const { notificationID } = req.params

    // setting that one notification in User's notifications array as READ
    await User.updateOne(
        { _id: req.authUser._id, 'notifications.notification': notificationID },
        { $set: { 'notifications.$.isRead': true } }
    )

    res.status(200).json({ message: 'Notification Read!' })
})

module.exports = {
    notificationLoginAndLogoutAction,
    notificationGetSaved,
    notificationDelete,
    notificationUpdateRead,
}
