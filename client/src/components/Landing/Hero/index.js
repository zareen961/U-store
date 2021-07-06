import React from 'react'
import { useSelector } from 'react-redux'
import { HashLink } from 'react-router-hash-link'

import waveImage from '../../../assets/images/hero-wave.png'
import LoginForm from '../LoginForm'
import './Hero.scss'

const Hero = ({ isOpen, setIsOpen }) => {
    const { secondaryColor } = useSelector((state) => state.theme)

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
                            <HashLink to="#featuresID">How It Works?</HashLink>
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
                            <feFuncR type="table" tableValues={secondaryColor.R / 255} />
                            <feFuncG type="table" tableValues={secondaryColor.G / 255} />
                            <feFuncB type="table" tableValues={secondaryColor.B / 255} />
                            <feFuncA type="table" tableValues="0 1" />
                        </feComponentTransfer>
                    </filter>
                </svg>
            </div>
        </div>
    )
}

export default Hero
