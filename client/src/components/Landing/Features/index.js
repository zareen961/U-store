import React from 'react'

import FeatureItem from './FeatureItem'
import SectionHeader from '../../utils/SectionHeader'
import { FEATURES_HEADING, FEATURES_CONTENT } from '../../../constants/featuresData'

const Features = () => {
    return (
        <div className="features" id="featuresID">
            <SectionHeader
                title={'Features'}
                content={FEATURES_HEADING}
                paddingTop={140}
            />
            <FeatureItem featureData={FEATURES_CONTENT[0]} />
            <FeatureItem featureData={FEATURES_CONTENT[1]} isShapeLeft />
            <FeatureItem featureData={FEATURES_CONTENT[2]} />
        </div>
    )
}

export default Features
