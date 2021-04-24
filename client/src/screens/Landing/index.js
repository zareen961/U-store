import React from 'react'

import Hero from '../../components/Landing/Hero'
import Navbar from '../../components/Landing/Navbar'
import Overview from '../../components/Landing/Overview'
import './Landing.css'

const Landing = () => {
    return (
        <div className="landing">
            <Navbar />
            <Hero />
            {/* <Overview /> */}
            {/* Feature x N */}
            {/* FAQ */}
            {/* CallToAction */}
            {/* ContactUs */}
            {/* Footer */}
        </div>
    )
}

export default Landing
