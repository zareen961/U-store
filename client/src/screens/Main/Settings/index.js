import React from 'react'

import BlockHeader from '../../../components/utils/BlockHeader'
import './Settings.css'

const Settings = () => {
    return (
        <div className="settings">
            <div className="settings__headerWrapper">
                <BlockHeader title={'Settings'} />
            </div>

            <div className="settings__bodyWrapper"></div>
        </div>
    )
}

export default Settings
