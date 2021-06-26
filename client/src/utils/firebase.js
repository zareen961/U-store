import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/messaging'

firebase.initializeApp({
    apiKey: 'AIzaSyC0gnQJ9V0qbI1OBw0XFuBQU2YVd94Xw00',
    authDomain: 'u-store-961.firebaseapp.com',
    projectId: 'u-store-961',
    storageBucket: 'u-store-961.appspot.com',
    messagingSenderId: '887692518639',
    appId: '1:887692518639:web:cb5174bda59e4ecb7f671a',
    measurementId: 'G-WE9VKZPFNC',
})

const storage = firebase.storage()
const messaging = firebase.messaging()

export { storage, messaging }
