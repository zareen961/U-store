import React from 'react'

import laptopImage from '../../../../assets/images/laptop.png'
import './FeatureItem.css'

const FeatureItem = ({ isShapeLeft }) => {
    return (
        <div className={isShapeLeft ? 'featureItem left' : 'featureItem'}>
            <div className="featureItem__contentWrapper">
                <div className="featureItem__content">
                    <h2>Feature Item</h2>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Doloremque laboriosam placeat consequatur cupiditate modi quae
                        ipsa dolore in, eaque eveniet sequi quod autem totam aut
                        repellendus tempora, vel maiores ab.
                    </p>
                </div>
            </div>
            <img src={laptopImage} alt="laptop" />

            <div className="featureItem__shape"></div>
        </div>
    )
}

export default FeatureItem
