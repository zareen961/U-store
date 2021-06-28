import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import { TrashIcon } from '@primer/octicons-react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { productSingleFetch } from '../../../../store/actions/product'
import './NotificationItem.css'

const NotificationItem = ({ notification }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const productSlug = notification.productName.toLowerCase().split(' ').join('-')

    const handleNotificationOnClick = () => {
        dispatch(productSingleFetch(notification.productID))
        history.push(`/products/${productSlug}`)
    }

    return (
        <div className="notificationItem">
            <div
                className="notificationItem__clickWrapper"
                onClick={handleNotificationOnClick}
            >
                <Avatar
                    src={`/avatars/avatar${notification.creatorAvatar}.png`}
                    className="notificationItem__avatar"
                />

                <div className="notificationItem__body">
                    <p>
                        <span>@{notification.creatorUsername}</span> accepted your bid on{' '}
                        <span>{notification.productName}</span>
                    </p>
                </div>
            </div>
            <IconButton
                className="notificationItem__deleteButton"
                onClick={() => console.log('notification delete!')}
            >
                <TrashIcon size={18} />
            </IconButton>
        </div>
    )
}

export default NotificationItem
