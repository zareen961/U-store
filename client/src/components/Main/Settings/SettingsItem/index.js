import React from 'react'

import './SettingsItem.css'

const SettingsItem = ({ title, children }) => {
    return (
        <div className="settingsItem">
            <h3 className="settingsItem__title">{title}</h3>

            <div className="settingsItem__bodyWrapper">{children}</div>
        </div>
    )
}

export default SettingsItem
