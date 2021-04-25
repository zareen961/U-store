import React from 'react'

import waveImage from '../../../assets/images/hero-wave.png'
import LoginForm from '../LoginForm'
import './Hero.css'

const Hero = ({ isOpen }) => {
    return (
        <div className="hero">
            <div className="hero__container">
                {!isOpen && (
                    <>
                        <div className="hero__taglineWrapper">
                            <h1>
                                <span className="overLine">Buy</span> and{' '}
                                <span className="overLine">Sell</span> with
                                <span className="highlight">in</span> your{' '}
                                <span className="buttonHighlight">College</span>
                            </h1>
                            <button>How It Works?</button>
                        </div>
                        <div className="hero__loginFormWrapper">
                            <LoginForm />
                        </div>
                    </>
                )}
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
