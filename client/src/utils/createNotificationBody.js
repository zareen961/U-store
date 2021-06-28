import * as notificationType from './constants/notificationType'

export const createNotificationBody = (notification, loggedInUserID) => {
    switch (notification.type) {
        case notificationType.BID_PLACED:
            return (
                <>
                    <span>@{notification.creatorUsername}</span> placed a bid on{' '}
                    {loggedInUserID === notification.spotlightUser ? 'your product' : ''}{' '}
                    {notification.product.name}
                </>
            )
    }
}
