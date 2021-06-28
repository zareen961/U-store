const getNotificationToken = (headers) => {
    const { notification } = headers
    return notification ? notification.split(' ')[1] : ''
}

module.exports = { getNotificationToken }
