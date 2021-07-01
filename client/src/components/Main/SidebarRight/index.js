import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Badge from '@material-ui/core/Badge'

import { messaging } from '../../../utils/firebase'
import BlockHeader from '../../utils/BlockHeader'
import NoItemMessage from '../../utils/NoItemMessage'
import Loader from '../../utils/Loader'
import { alertAdd } from '../../../store/actions/ui'
import {
    notificationLoginAndLogoutAction,
    notificationGetSaved,
    notificationLivePush,
} from '../../../store/actions/notification'
import { setNotificationHeader } from '../../../utils/setAxiosHeaders'
import NotificationItem from './NotificationItem'
import './SidebarRight.css'

const { VAPID_KEY = '' } = process.env

const SidebarRight = () => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.userLogin)
    const {
        loading: loadingNotificationLoginAndLogout,
        error,
        success: successNotificationLoginAndLogoutAction,
    } = useSelector((state) => state.notificationLoginAndLogoutAction)
    const {
        loading: loadingNotificationGetSaved,
        notifications,
        success: successNotificationGetSaved,
    } = useSelector((state) => state.notificationGetSaved)

    const [notificationPermission, setNotificationPermission] = useState(
        Notification.permission
    )

    // getting the notification permission status
    useEffect(() => {
        if (user && user.userInfo) {
            Notification.requestPermission().then((permission) => {
                setNotificationPermission(permission)
            })
        }
    }, [user])

    useEffect(() => {
        if (
            user &&
            user.userInfo &&
            notificationPermission === 'granted' &&
            !successNotificationLoginAndLogoutAction
        ) {
            messaging
                .getToken({ vapidKey: VAPID_KEY })
                .then((currentToken) => {
                    if (currentToken) {
                        // saving token to localStorage
                        localStorage.setItem(
                            'ustore__notificationClientToken',
                            currentToken
                        )

                        // setting the Notification client token in headers
                        setNotificationHeader(currentToken)

                        // subscribing to all the required topics (products)
                        dispatch(notificationLoginAndLogoutAction('SUBSCRIBE'))
                    } else {
                        dispatch(
                            alertAdd(
                                'Notification permission denied! Please allow to get live updates.',
                                'error'
                            )
                        )
                    }
                })
                .catch((err) => {
                    console.log(err)
                    dispatch(
                        alertAdd(
                            'Unable to provide live updates! Refresh and try again.',
                            'error'
                        )
                    )
                })
        }
    }, [user, notificationPermission, dispatch, successNotificationLoginAndLogoutAction])

    // setting up the firebase listener to receive incoming live notifications
    useEffect(() => {
        if (user && user.userInfo) {
            messaging.onMessage((payload) => {
                if (user.userInfo.username !== payload.data.creatorUsername) {
                    dispatch(notificationLivePush(payload.data))
                }
            })
        }
    }, [dispatch, user])

    // getting the saved notifications from the database
    useEffect(() => {
        if (user && user.userInfo && !successNotificationGetSaved) {
            dispatch(notificationGetSaved())
        }
    }, [user, dispatch, successNotificationGetSaved])

    return (
        <div className="sidebarRight">
            <div className="sidebarRight__headerWrapper">
                <BlockHeader title="Notifications">
                    <Badge
                        badgeContent={notifications.reduce(
                            (acc, curr) => acc + (curr.isRead === 'true' ? 0 : 1),
                            0
                        )}
                        max={9}
                        color="primary"
                        className="sidebarRight__unreadCount"
                    />
                </BlockHeader>
            </div>
            <div className="sidebarRight__notificationsWrapper">
                {(loadingNotificationLoginAndLogout || loadingNotificationGetSaved) && (
                    <div className="sidebarRight__loaderWrapper">
                        <Loader />
                    </div>
                )}

                {notificationPermission === 'denied' && (
                    <NoItemMessage
                        titleSize={1.3}
                        title={'Notification permission denied!'}
                        text={'Allow Notifications for this site to get live updates!'}
                    />
                )}

                {error && (
                    <NoItemMessage
                        titleSize={1.3}
                        title={error}
                        text={
                            'Something went wrong! Please refresh to try again and get live updates.'
                        }
                    />
                )}

                {notifications.length === 0 && !loadingNotificationGetSaved ? (
                    <h3 className="sidebarRight__allCaughtUpMessage">
                        No Notifications! You're all caught up.
                    </h3>
                ) : (
                    notifications.map((notification) => (
                        <NotificationItem
                            key={notification._id}
                            notification={notification}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default SidebarRight
