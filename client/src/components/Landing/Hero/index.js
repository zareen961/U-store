import React from 'react'

import waveImage from '../../../assets/images/hero-wave.png'
import LoginForm from '../LoginForm'
import './Hero.css'

// PURPLE THEME
let R = 247,
    G = 251,
    B = 252

// RED THEME
// let R = 34,
//     G = 40,
//     B = 49

// BLUE THEME
// let R = 0,
//     G = 0,
//     B = 0

const Hero = ({ isOpen, setIsOpen }) => {
    return (
        <div className="hero" id="homeID">
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
                            <LoginForm setIsOpen={setIsOpen} />
                        </div>
                    </>
                )}
            </div>
            <div className="hero__wave">
                <img src={waveImage} alt="wave" />
                <svg>
                    <filter id="wave-acid">
                        <feComponentTransfer>
                            <feFuncR type="table" tableValues={R / 255} />
                            <feFuncG type="table" tableValues={G / 255} />
                            <feFuncB type="table" tableValues={B / 255} />
                            <feFuncA type="table" tableValues="0 1" />
                        </feComponentTransfer>
                    </filter>
                </svg>
            </div>
        </div>
    )
}

export default Hero
