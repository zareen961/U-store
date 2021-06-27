import axiosInstance from './axiosInstance'

export const setAuthHeader = (token) => {
    if (token) {
        axiosInstance.defaults.headers.authorization = `Bearer ${token}`
    } else {
        delete axiosInstance.defaults.headers.authorization
    }
}

export const setNotificationHeader = (token) => {
    if (token) {
        axiosInstance.defaults.headers.notification = `Client ${token}`
    } else {
        delete axiosInstance.defaults.headers.notification
    }
}
