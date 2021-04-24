import React from 'react'

import waveImage from '../../../assets/images/hero-wave.png'
import './Hero.css'

const Hero = () => {
    return (
        <div className="hero">
            {/* <h1>Hero</h1> */}
            <div className="hero__wave">
                <img src={waveImage} alt="wave" />
                <svg>
                    <filter id="wave-acid">
                        <feComponentTransfer>
                            <feFuncR type="table" tableValues="0.97" />
                            <feFuncG type="table" tableValues="0.9843137255" />
                            <feFuncB type="table" tableValues="0.99" />
                            <feFuncA type="table" tableValues="0 1" />
                        </feComponentTransfer>
                    </filter>
                </svg>
            </div>
        </div>
    )
}

export default Hero
