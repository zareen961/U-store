import React from 'react'
import { useSelector } from 'react-redux'
import Alert from '@material-ui/lab/Alert'

import './Alerts.css'

const Alerts = () => {
    const alerts = useSelector((state) => state.alerts)

    return (
        <div className="alerts">
            {alerts !== null &&
                alerts.length > 0 &&
                alerts.map((alert) => (
                    <Alert severity={alert.alertType} key={alert._id} variant="filled">
                        {alert.msg}
                    </Alert>
                ))}
        </div>
    )
}

export default Alerts
