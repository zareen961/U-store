import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'

import Logo from '../../utils/Logo'
import './Sidebar.css'

const Sidebar = () => {
    const path =
        window.location.pathname === '/' ? 'home' : window.location.pathname.substr(1)
    const [activeItem, setActiveItem] = useState(path)

    useEffect(() => {
        setActiveItem(path)
    }, [path])

    return (
        <div className="sidebar">
            <a href="#" className="sidebar__logoWrapper">
                <Logo />
            </a>
            <h2 className="sidebar__heading">Menu</h2>
            <div className="sidebar__menu">
                <Link to="/" className={activeItem === 'home' ? 'active' : ''}>
                    <span className="icon">
                        <HomeIcon />
                    </span>
                    <span className="text">Home</span>
                </Link>
                <Link
                    to="/products"
                    className={activeItem === 'products' ? 'active' : ''}
                >
                    <span className="icon">
                        <HomeIcon />
                    </span>
                    <span className="text">My Products</span>
                </Link>
                <Link to="/bids" className={activeItem === 'bids' ? 'active' : ''}>
                    <span className="icon">
                        <HomeIcon />
                    </span>
                    <span className="text">My Bids</span>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar
