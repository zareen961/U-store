import React, { useState, useEffect } from 'react'

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
            <h1>U-store</h1>
        </div>
    )
}

export default Navbar
