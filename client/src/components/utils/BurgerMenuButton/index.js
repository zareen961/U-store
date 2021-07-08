import React from 'react'
import { HashLink } from 'react-router-hash-link'

import './BurgerMenuButton.scss'

const BurgerMenuButton = ({ setIsRegisterOpen, isMenuOpen }) => {
    return (
        <>
            <div className={isMenuOpen ? 'burgerMenuButton active' : 'burgerMenuButton'}>
                <div className="toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <nav className={isMenuOpen ? 'hamburgerMenuNav active' : 'hamburgerMenuNav'}>
                <ul>
                    <li>
                        <HashLink to="#homeID">Home</HashLink>
                    </li>
                    <li>
                        <HashLink to="#overviewID">Overview</HashLink>
                    </li>
                    <li>
                        <HashLink to="#featuresID">Features</HashLink>
                    </li>
                    <li>
                        <HashLink to="#contactID">Contact</HashLink>
                    </li>
                    <li>
                        <span
                            className="registerButton"
                            onClick={() => setIsRegisterOpen(true)}
                        >
                            Sign Up
                        </span>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default BurgerMenuButton
