import React from 'react'

import laptopImage from '../../../assets/images/laptop.png'
import OverviewItem from './OverviewItem'
import overviewData from '../../../utils/overviewData'
import './Overview.css'

const Overview = () => {
    return (
        <div className="overview">
            <div className="overview__headerWrapper">
                <h1>Overview</h1>
                <p>
                    Loremc ipsum dolor sit amet consectetur adipisicing elit. Quod,
                    placeat recusandae dolore sit vel temporibus illo debitis eaque
                    molestiae? Mollitia molestias quo nulla neque error.
                </p>
            </div>
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
