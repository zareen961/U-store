const { messaging } = require('../config/firebaseAdmin')

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

module.exports = {
    subscribeTopic,
    unsubscribeTopic,
    batchSubscribe,
    batchUnsubscribe,
    sendNotification,
}
