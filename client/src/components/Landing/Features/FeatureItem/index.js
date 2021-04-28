import React from 'react'

import laptopImage from '../../../../assets/images/laptop.png'
import './FeatureItem.css'

const FeatureItem = () => {
    return (
        <div className="featureItem">
            <div className="featureItem__contentWrapper">
                <h1>Feature Item</h1>
            </div>
            <img src={laptopImage} alt="laptop" />

            <div className="featureItem__shape"></div>
        </div>
    )
}

export default FeatureItem
