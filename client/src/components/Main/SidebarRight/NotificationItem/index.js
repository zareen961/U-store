import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import { TrashIcon } from '@primer/octicons-react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

import { productSingleFetch } from '../../../../store/actions/product'
import { notificationUpdateRead } from '../../../../store/actions/notification'
import { createNotificationBody } from '../../../../utils/createNotificationBody'
import './NotificationItem.css'

const NotificationItem = ({ notification }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { user } = useSelector((state) => state.userLogin)

    const productSlug = notification.productName.toLowerCase().split(' ').join('-')

    const handleNotificationOnClick = () => {
        dispatch(productSingleFetch(notification.productID))
        dispatch(notificationUpdateRead(notification._id))
        history.push(`/products/${productSlug}`)
    }

    return (
        <div
            className={
                notification.isRead === 'true'
                    ? 'notificationItem'
                    : 'notificationItem unread'
            }
        >
            <span className="notificationItem__timestamp">
                {moment(notification.createdAt).fromNow()}
            </span>
            <div
                className="notificationItem__clickWrapper"
                onClick={handleNotificationOnClick}
            >
                <Avatar
                    src={`/avatars/avatar${notification.creatorAvatar}.png`}
                    className="notificationItem__avatar"
                />

                <div className="notificationItem__body">
                    {createNotificationBody(notification, user.userInfo.username)}
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
