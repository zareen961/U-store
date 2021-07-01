importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js')

importScripts('./createNotificationBody.js')

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

if ('serviceWorker' in navigator) {
    messaging.onBackgroundMessage((payload) => {
        console.log('[firebase-messaging-sw.js] Received background message ', payload)

        const notificationTitle = payload.data.creatorUsername
        const notificationOptions = {
            body: createNotificationBody(payload.data, '@blck_tie'),
            icon: `/avatars/avatar${payload.data.creatorAvatar}.png`,
        }

        console.log(notificationTitle, notificationOptions)

        self.registration.showNotification(notificationTitle, notificationOptions)
        // runtime.register().then((registration) => {
        //     registration.showNotification(notificationTitle, notificationOptions)
        // })
    })
} else {
    console.log('Push Notification is not supported by your browser!')
}
