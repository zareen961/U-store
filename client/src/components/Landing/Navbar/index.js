import React, { useState, useEffect } from 'react'
import { HashLink } from 'react-router-hash-link'

import Logo from '../../utils/Logo'
import './Navbar.css'

const Navbar = () => {
    const [backgroundClass, setBackgroundClass] = useState('navbar')
    useEffect(() => {
        const listener = document.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                setBackgroundClass('navbar filled')
            } else {
                setBackgroundClass('navbar')
            }
        })
        return () => {
            document.removeEventListener('scroll', listener)
        }
    }, [])

    return (
        <div className={backgroundClass}>
            <div className="navbar__container">
                <div className="navbar__logoWrapper">
                    <Logo />
                </div>
                <div className="navbar__linksWrapper">
                    <HashLink to="#homeID">Home</HashLink>
                    <HashLink to="#featuresID">Features</HashLink>
                    <HashLink to="#faqID">FAQs</HashLink>
                    <HashLink to="#contactID">Contact</HashLink>
                    <button>Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
