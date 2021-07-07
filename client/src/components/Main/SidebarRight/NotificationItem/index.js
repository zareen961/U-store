import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import { TrashIcon } from '@primer/octicons-react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

import { productSingleFetch } from '../../../../store/actions/product'
import {
    notificationDelete,
    notificationUpdateRead,
} from '../../../../store/actions/notification'
import { createNotificationBody } from '../../../../utils/createNotificationBody'
import './NotificationItem.scss'

const NotificationItem = ({ notification }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { user } = useSelector((state) => state.userLogin)
    const { error: errorNotificationDelete } = useSelector(
        (state) => state.notificationDelete
    )

    const [loadingDelete, setLoadingDelete] = useState(false)

    const productSlug = notification.productName.toLowerCase().split(' ').join('-')

    const handleNotificationOnClick = () => {
        dispatch(productSingleFetch(notification.productID))

        if (notification.isRead === 'false') {
            dispatch(notificationUpdateRead(notification._id))
        }

        history.push(`/products/${productSlug}`)
    }

    const handleNotificationDelete = () => {
        setLoadingDelete(true)
        dispatch(notificationDelete(notification._id))
    }

    // to reset the loading if the notification fails to delete
    useEffect(() => {
        if (errorNotificationDelete) {
            setLoadingDelete(false)
        }
    }, [errorNotificationDelete])

    return (
        <div
            className={
                notification.isRead === 'true'
                    ? `${
                          loadingDelete ? 'notificationItem deleting' : 'notificationItem'
                      }`
                    : `${
                          loadingDelete
                              ? 'notificationItem unread deleting'
                              : 'notificationItem unread'
                      }`
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
                onClick={handleNotificationDelete}
                disabled={loadingDelete}
            >
                <TrashIcon size={18} />
            </IconButton>
        </div>
    )
}

export default NotificationItem
