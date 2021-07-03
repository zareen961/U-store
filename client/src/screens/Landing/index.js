import React, { useState } from 'react'

import Hero from '../../components/Landing/Hero'
import Navbar from '../../components/Landing/Navbar'
import Overview from '../../components/Landing/Overview'
import RegisterForm from '../../components/Landing/RegisterForm'
import Features from '../../components/Landing/Features'
import ContactUs from '../../components/Landing/ContactUs'
import CallToAction from '../../components/Landing/CallToAction'
import Footer from '../../components/Landing/Footer'

const Landing = () => {
    const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false)

    return (
        <>
            <div className="landing">
                <Navbar setIsOpen={setIsRegisterFormOpen} />
                <Hero isOpen={isRegisterFormOpen} setIsOpen={setIsRegisterFormOpen} />
                <Overview />
                <Features />
                <CallToAction setIsOpen={setIsRegisterFormOpen} />
                <ContactUs />
                <Footer />
            </div>

            <RegisterForm isOpen={isRegisterFormOpen} setIsOpen={setIsRegisterFormOpen} />
        </>
    )
}

export default Landing
