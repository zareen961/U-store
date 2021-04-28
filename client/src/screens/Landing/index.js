import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Hero from '../../components/Landing/Hero'
import Navbar from '../../components/Landing/Navbar'
import Overview from '../../components/Landing/Overview'
import RegisterForm from '../../components/Landing/RegisterForm'
import Features from '../../components/Landing/Features'
import * as actionTypes from '../../store/actionTypes'
import './Landing.css'

const Landing = () => {
    const dispatch = useDispatch()
    const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false)

    return (
        <>
            <div className="landing">
                <Navbar setIsOpen={setIsRegisterFormOpen} />
                <Hero isOpen={isRegisterFormOpen} setIsOpen={setIsRegisterFormOpen} />
                <Overview />
                <Features />
                {/* FAQ */}
                {/* CallToAction */}
                {/* ContactUs */}
                {/* Footer */}

                <div>
                    <button
                        onClick={() => dispatch({ type: actionTypes.THEME_SET_PURPLE })}
                    >
                        PURPLE
                    </button>
                    <button onClick={() => dispatch({ type: actionTypes.THEME_SET_RED })}>
                        RED
                    </button>
                    <button
                        onClick={() => dispatch({ type: actionTypes.THEME_SET_BLUE })}
                    >
                        BLUE
                    </button>
                </div>
            </div>

            <RegisterForm isOpen={isRegisterFormOpen} setIsOpen={setIsRegisterFormOpen} />
        </>
    )
}

export default Landing
