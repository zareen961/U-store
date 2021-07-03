import * as notificationType from '../constants/notificationType'

export const createNotificationBody = (notification, loggedInUsername) => {
    const productName =
        notification.productName.length > 10
            ? `${notification.productName.substring(0, 10)}..`
            : notification.productName

    switch (notification.type) {
        case notificationType.BID_PLACED:
            return (
                <p>
                    <span>@{notification.creatorUsername}</span>{' '}
                    <span className="action">placed</span> a bid on{' '}
                    {loggedInUsername === notification.spotlightUser && 'your product'}{' '}
                    <span>{productName}</span>.
                </p>
            )

        case notificationType.BID_ACCEPTED:
            return (
                <p>
                    <span>@{notification.creatorUsername}</span>{' '}
                    <span className="action">accepted</span>{' '}
                    {loggedInUsername === notification.spotlightUser ? (
                        'your'
                    ) : (
                        <span>@{notification.spotlightUser}'s</span>
                    )}{' '}
                    bid on <span>{productName}</span>.
                </p>
            )

        case notificationType.BID_REJECTED:
            return (
                <p>
                    <span>@{notification.creatorUsername}</span>{' '}
                    <span className="action">rejected</span>{' '}
                    {loggedInUsername === notification.spotlightUser ? (
                        'your'
                    ) : (
                        <span>@{notification.spotlightUser}'s</span>
                    )}{' '}
                    bid on <span>{productName}</span>.
                </p>
            )

        case notificationType.BID_UPDATED:
            return (
                <p>
                    <span>@{notification.creatorUsername}</span>{' '}
                    <span className="action">updated</span> the bid on{' '}
                    {loggedInUsername === notification.spotlightUser && 'your product'}{' '}
                    <span>{productName}</span>.
                </p>
            )

        case notificationType.PRODUCT_DELETED:
            return (
                <p>
                    <span>@{notification.creatorUsername}</span>{' '}
                    <span className="action">deleted</span> the product{' '}
                    <span>{productName}</span>.
                </p>
            )

        default:
            return <p>Error occurred while creating notification!</p>
    }
}
