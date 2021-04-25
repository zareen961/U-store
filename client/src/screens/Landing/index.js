import React, { useState } from 'react'

import Hero from '../../components/Landing/Hero'
import Navbar from '../../components/Landing/Navbar'
import Overview from '../../components/Landing/Overview'
import RegisterForm from '../../components/Landing/RegisterForm'
import './Landing.css'

const Landing = () => {
    const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(!false)

    return (
        <>
            <div className="landing">
                <Navbar />
                <Hero isOpen={isRegisterFormOpen} />
                <Overview />
                {/* Feature x N */}
                {/* FAQ */}
                {/* CallToAction */}
                {/* ContactUs */}
                {/* Footer */}
            </div>

            <RegisterForm
                isOpen={isRegisterFormOpen}
                setIsOpen={setIsRegisterFormOpen}
                direction={'left'}
            />
        </>
    )
}

export default Landing
