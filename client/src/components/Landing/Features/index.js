import React from 'react'

import FeatureItem from './FeatureItem'
import SectionHeader from '../../utils/SectionHeader'
import './Features.css'

const Features = () => {
    return (
        <div className="features" id="featuresID">
            <SectionHeader
                title={'Features'}
                content={
                    'Loremc ipsum dolor sit amet consectetur adipisicing elit. Quod, placeat recusandae dolore sit vel temporibus illo debitis eaque molestiae? Mollitia molestias quo nulla neque error.'
                }
                paddingTop={140}
            />
            <FeatureItem />
            <FeatureItem isShapeLeft />
            <FeatureItem />
        </div>
    )
}

export default Features
