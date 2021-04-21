import React from 'react'
import { useSelector } from 'react-redux'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'

import './Alerts.css'

const Alerts = () => {
    const alerts = useSelector((state) => state.alerts)

    return (
        <div className="alerts">
            {alerts !== null &&
                alerts.length > 0 &&
                alerts.map((alert) => (
                    <div className={`alerts__box ${alert.alertType}`} key={alert._id}>
                        {alert.alertType === 'success' ? (
                            <CheckCircleIcon />
                        ) : (
                            <ErrorIcon />
                        )}
                        <p>{alert.msg}</p>
                    </div>
                ))}
        </div>
    )
}

export default Alerts
