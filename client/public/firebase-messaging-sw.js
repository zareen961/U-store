importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js')

firebase.initializeApp({
    apiKey: 'AIzaSyC0gnQJ9V0qbI1OBw0XFuBQU2YVd94Xw00',
    authDomain: 'u-store-961.firebaseapp.com',
    projectId: 'u-store-961',
    storageBucket: 'u-store-961.appspot.com',
    messagingSenderId: '887692518639',
    appId: '1:887692518639:web:cb5174bda59e4ecb7f671a',
    measurementId: 'G-WE9VKZPFNC',
})

const messaging = firebase.messaging()

const sendBackgroundNotificationToClient = async (notificationData) => {
    const allActiveClients = await clients.matchAll({ includeUncontrolled: true })

    return Promise.all(
        allActiveClients.map((client) => {
            return client.postMessage(notificationData)
        })
    )
}

messaging.onBackgroundMessage((payload) => {
    sendBackgroundNotificationToClient(payload.data)
})
