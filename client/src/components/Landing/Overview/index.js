import React from 'react'

import laptopImage from '../../../assets/images/laptop.png'
import OverviewItem from './OverviewItem'
import { OVERVIEW_CONTENT, OVERVIEW_HEADING } from '../../../constants/overviewData'
import Logo from '../../utils/Logo'
import SectionHeader from '../../utils/SectionHeader'
import './Overview.scss'

const Overview = () => {
    return (
        <div className="overview" id="overviewID">
            <SectionHeader
                title={'Overview'}
                content={OVERVIEW_HEADING}
                paddingTop={70}
            />

            <div className="overview__bodyWrapper">
                <section className="overview__section">
                    {OVERVIEW_CONTENT.slice(0, 3).map((data) => (
                        <OverviewItem
                            key={data.title}
                            icon={data.icon}
                            title={data.title}
                            content={data.content}
                            isLeft
                        />
                    ))}
                </section>
                <section className="overview__centerSection">
                    <div className="overview__laptopOverlay">
                        <Logo isAnimate />
                    </div>
                    <img src={laptopImage} alt="overview-laptop" />
                </section>
                <section className="overview__section">
                    {OVERVIEW_CONTENT.slice(3).map((data) => (
                        <OverviewItem
                            key={data.title}
                            icon={data.icon}
                            title={data.title}
                            content={data.content}
                        />
                    ))}
                </section>
            </div>
        </div>
    )
}

export default Overview
