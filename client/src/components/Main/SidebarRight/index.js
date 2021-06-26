import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Badge from '@material-ui/core/Badge'

import { messaging } from '../../../utils/firebase'
import BlockHeader from '../../utils/BlockHeader'
import NoItemMessage from '../../utils/NoItemMessage'
import Loader from '../../utils/Loader'
import { alertAdd } from '../../../store/actions/ui'
import { batchSubscribe } from '../../../utils/notification'
import './SidebarRight.css'

const { VAPID_KEY = '' } = process.env

const SidebarRight = () => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.userLogin)

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
                        console.log(currentToken)
                        // saving token to localStorage
                        localStorage.setItem('ustore__notificationClient', currentToken)

                        // subscribing to all the required topics (products)
                        const topicsArray = [
                            ...user.userInfo.products.map((product) =>
                                product._id ? product._id : product
                            ),
                            ...user.userInfo.bids.map((bid) =>
                                bid.product ? bid.product : bid._id
                            ),
                            ...user.userInfo.following.map((product) =>
                                product._id ? product._id : product
                            ),
                        ]

                        batchSubscribe(currentToken, topicsArray)
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
                <div className="sidebarRight__loaderWrapper">
                    <Loader />
                </div>

                {notificationPermission === 'denied' && (
                    <NoItemMessage
                        title={'Notification permission denied!'}
                        text={'Allow Notifications for this site to get live updates!'}
                    />
                )}
            </div>
        </div>
    )
}

export default SidebarRight
