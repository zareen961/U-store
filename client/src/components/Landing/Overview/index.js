import React from 'react'

import image from '../../../assets/images/laptop.png'
import './Overview.css'

const Overview = () => {
    return (
        <div className="overview">
            <div className="overview__headerWrapper">
                <h1>Overview</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, placeat
                    recusandae dolore sit vel temporibus illo debitis eaque molestiae?
                    Mollitia molestias quo nulla neque error.
                </p>
            </div>
            <div className="overview__bodyWrapper">
                <section className="overview__section">1</section>
                <section className="overview__centerSection">
                    <img src={image} alt="overview-image" />
                </section>
                <section className="overview__section">3</section>
            </div>
        </div>
    )
}

export default Overview
