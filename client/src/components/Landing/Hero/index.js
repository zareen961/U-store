import React from 'react'

import waveImage from '../../../assets/images/hero-wave.png'
import './Hero.css'

const Hero = () => {
    return (
        <div className="hero">
            {/* <h1>Hero</h1> */}
            <div className="hero__wave">
                <img src={waveImage} alt="wave" />
            </div>
        </div>
    )
}

export default Hero
