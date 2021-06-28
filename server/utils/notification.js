const { messaging } = require('../config/firebaseAdmin')

const Product = require('../models/Product')
const User = require('../models/User')
const Notification = require('../models/Notification')

// function to subscribe to a topic
const subscribeTopic = (token, topic) => {
    messaging()
        .subscribeToTopic([token], topic)
        .then((_) => {
            // console.log('Successfully subscribed to topic:', response)
        })
        .catch((error) => {
            console.log('Error subscribing to topic:', error)
        })
}

// function to unsubscribe from a topic
const unsubscribeTopic = (token, topic) => {
    messaging()
        .unsubscribeFromTopic([token], topic)
        .then((_) => {
            // console.log('Successfully unsubscribed from topic:', response)
        })
        .catch((error) => {
            console.log('Error unsubscribing from topic:', error)
        })
}

// function to subscribe to multiple topics
const batchSubscribe = (token, topics) => {
    topics.forEach((topic) => subscribeTopic(token, topic))
}

// function to unsubscribe from multiple topics
const batchUnsubscribe = (token, topics) => {
    topics.forEach((topic) => unsubscribeTopic(token, topic))
}

// function to send a notification to a topic
const sendNotification = (topic, notificationBody) => {
    const message = {
        data: notificationBody,
        topic,
    }

    messaging()
        .send(message)
        .then((_) => {
            // console.log('Successfully sent message:', response)
        })
        .catch((error) => {
            console.log('Error sending message:', error)
        })
}

const saveAndSendNotification = async (product, type, creator) => {
    const foundProduct = await Product.findById(product._id)
        .select('productOwner bids following')
        .populate({
            path: 'bids',
            select: 'bidOwner',
        })

    const newNotification = new Notification({
        product: product._id,
        creator: creator._id,
        type,
    })

    await newNotification.save()

    const notificationID = newNotification._id

    const usersToNotify = [
        foundProduct.productOwner,
        ...foundProduct.bids.map((bid) => bid.bidOwner),
        ...foundProduct.following.map((userID) => userID),
    ]

    usersToNotify = usersToNotify.filter(
        (userID) => String(userID) !== String(creator._id)
    )

    await User.updateMany(
        {
            _id: { $in: usersToNotify },
        },
        {
            $push: {
                notifications: {
                    $each: [{ notification: notificationID, isRead: false }],
                    $position: 0,
                },
            },
        }
    )

    // sending live notification to concerned users
    sendNotification(productID, {
        productID: product._id,
        productName: product.name,
        creatorID: creator._id,
        creatorUsername: creator.username,
        type,
    })
}

module.exports = {
    subscribeTopic,
    unsubscribeTopic,
    batchSubscribe,
    batchUnsubscribe,
    sendNotification,
    saveAndSendNotification,
}
