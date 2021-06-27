import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Badge from '@material-ui/core/Badge'

import { messaging } from '../../../utils/firebase'
import BlockHeader from '../../utils/BlockHeader'
import NoItemMessage from '../../utils/NoItemMessage'
import Loader from '../../utils/Loader'
import { alertAdd } from '../../../store/actions/ui'
import { notificationLoginAndLogoutAction } from '../../../store/actions/notification'
import { setNotificationHeader } from '../../../utils/setAxiosHeaders'
import './SidebarRight.css'

const { VAPID_KEY = '' } = process.env

const SidebarRight = () => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.userLogin)
    const { loading, error } = useSelector(
        (state) => state.notificationLoginAndLogoutAction
    )

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
        if (user && user.userInfo && notificationPermission === 'granted') {
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
    }, [user, notificationPermission, dispatch])

    return (
        <div className="sidebarRight">
            <div className="sidebarRight__headerWrapper">
                <BlockHeader title="Notifications">
                    <Badge
                        badgeContent={10}
                        max={9}
                        color="primary"
                        className="sidebarRight__unreadCount"
                    />
                </BlockHeader>
            </div>
            <div className="sidebarRight__notificationsWrapper">
                {loading && (
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
            </div>
        </div>
    )
}

export default SidebarRight
