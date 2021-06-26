import { messaging } from './firebase'

// function to subscribe to a topic
export const subscribeTopic = (token, topic) => {
    admin
        .messaging()
        .subscribeToTopic([token], topic)
        .then((response) => {
            console.log('Successfully subscribed to topic:', response)
        })
        .catch((error) => {
            console.log('Error subscribing to topic:', error)
        })
}

// function to unsubscribe from a topic
export const unsubscribeTopic = (token, topic) => {
    messaging()
        .unsubscribeFromTopic([token], topic)
        .then((_) => {
            // console.log('Successfully subscribed to topic:', response);
        })
        .catch((error) => {
            console.log('Error unsubscribing to topic:', error)
        })
}

// function to subscribe to multiple topics
export const batchSubscribe = (token, topics) => {
    topics.forEach((topic) => subscribeTopic(token, topic))
}

// function to unsubscribe from multiple topics
export const batchUnsubscribe = (token, topics) => {
    topics.forEach((topic) => unsubscribeTopic(token, topic))
}
