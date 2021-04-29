import React from 'react'

import laptopImage from '../../../assets/images/laptop.png'
import OverviewItem from './OverviewItem'
import overviewData from '../../../utils/overviewData'
import Logo from '../../utils/Logo'
import SectionHeader from '../../utils/SectionHeader'
import './Overview.css'

const Overview = () => {
    return (
        <div className="overview" id="overviewID">
            <SectionHeader
                title={'Overview'}
                content={
                    'Loremc ipsum dolor sit amet consectetur adipisicing elit. Quod, placeat recusandae dolore sit vel temporibus illo debitis eaque molestiae? Mollitia molestias quo nulla neque error.'
                }
                paddingTop={70}
            />

            <div className="overview__bodyWrapper">
                <section className="overview__section">
                    {overviewData.slice(0, 3).map((data) => (
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
                    {overviewData.slice(3).map((data) => (
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
