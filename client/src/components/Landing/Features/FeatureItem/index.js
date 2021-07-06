import React from 'react'

import laptopImage from '../../../../assets/images/laptop.png'
import './FeatureItem.scss'

const FeatureItem = ({ isShapeLeft, featureData }) => {
    return (
        <div className={isShapeLeft ? 'featureItem left' : 'featureItem'}>
            <div className="featureItem__contentWrapper">
                <div className="featureItem__content">
                    <h2>{featureData.title}</h2>
                    <ul>
                        {featureData.content.map((point) => (
                            <li key={point}>{point}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <img src={laptopImage} alt="laptop" />

            <div className="featureItem__shape"></div>
        </div>
    )
}

export default FeatureItem
