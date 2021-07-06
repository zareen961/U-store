import React from 'react'
import { useSelector } from 'react-redux'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'

import './Alerts.scss'

const Alerts = ({ isRounded }) => {
    const alerts = useSelector((state) => state.alerts)

    return (
        <div className="alerts">
            {alerts !== null &&
                alerts.length > 0 &&
                alerts.map((alert) =>
                    isRounded ? (
                        <div
                            className={`alerts__box rounded ${alert.alertType}`}
                            key={alert._id}
                        >
                            {alert.alertType === 'success' ? (
                                <CheckCircleIcon fontSize="small" />
                            ) : (
                                <ErrorIcon fontSize="small" />
                            )}
                            <p>{alert.msg}</p>
                        </div>
                    ) : (
                        <div className={`alerts__box ${alert.alertType}`} key={alert._id}>
                            {alert.alertType === 'success' ? (
                                <CheckCircleIcon fontSize="small" />
                            ) : (
                                <ErrorIcon fontSize="small" />
                            )}
                            <p>{alert.msg}</p>
                        </div>
                    )
                )}
        </div>
    )
}

export default Alerts
