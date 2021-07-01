createNotificationBody = (notification, loggedInUsername) => {
    const productName =
        notification.productName.length > 10
            ? `${notification.productName.substring(0, 10)}..`
            : notification.productName

    switch (notification.type) {
        case 'BID_PLACED':
            return `@${notification.creatorUsername} placed a bid on ${
                loggedInUsername === notification.spotlightUser && 'your product'
            } ${productName}.`

        case 'BID_ACCEPTED':
            return `@${notification.creatorUsername} accepted ${
                loggedInUsername === notification.spotlightUser
                    ? 'your'
                    : `@${notification.spotlightUser}'s`
            } bid on ${productName}.`

        case 'BID_REJECTED':
            return `@${notification.creatorUsername} rejected ${
                loggedInUsername === notification.spotlightUser
                    ? 'your'
                    : `@${notification.spotlightUser}'s`
            } bid on ${productName}.`

        case 'BID_UPDATED':
            return `@${notification.creatorUsername} updated the bid on ${
                loggedInUsername === notification.spotlightUser && 'your product'
            } ${productName}.`

        case 'PRODUCT_DELETED':
            return `@${notification.creatorUsername} deleted the product ${productName}.`

        default:
            return `Error occurred while creating notification!`
    }
}
