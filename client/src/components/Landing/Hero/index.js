import React from 'react'

import waveImage from '../../../assets/images/hero-wave.png'
import LoginForm from '../LoginForm'
import './Hero.css'

const Hero = () => {
    return (
        <div className="hero">
            <div className="hero__container">
                <div className="hero__taglineWrapper">
                    <h1>U-store</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
                        nisi, natus accusantium non eius ad?
                    </p>
                </div>
                <div className="hero__loginFormWrapper">
                    <LoginForm />
                </div>
            </div>
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
