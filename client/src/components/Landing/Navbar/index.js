import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

import logo from '../../../assets/images/logo.png'
import './Navbar.css'

const Navbar = () => {
    const [backgroundClass, setBackgroundClass] = useState('navbar')
    useEffect(() => {
        let listener = document.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                setBackgroundClass('navbar filled')
            } else {
                setBackgroundClass('navbar')
            }
        })
        return () => {
            document.removeEventListener('scroll', listener)
        }
    }, [window.scrollY])

    return (
        <div className={backgroundClass}>
            <div className="navbar__container">
                <div className="navbar__logoWrapper">
                    <img src={logo} alt="U-store" />
                </div>
                <div className="navbar__linksWrapper">
                    <HashLink to="#homeID">Home</HashLink>
                    <HashLink to="#featuresID">Features</HashLink>
                    <HashLink to="#faqID">FAQ's</HashLink>
                    <HashLink to="#contactID">Contact</HashLink>
                    <button>Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
