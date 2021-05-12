import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Avatar from '@material-ui/core/Avatar'

import Logo from '../../utils/Logo'
import './Sidebar.css'

const Sidebar = () => {
    const path =
        window.location.pathname === '/' ? 'home' : window.location.pathname.substr(1)

    const [activeItem, setActiveItem] = useState(path)
    const [isAccountOpen, setIsAccountOpen] = useState(true)

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
                        <ShoppingBasketIcon />
                    </span>
                    <span className="text">My Products</span>
                </Link>
                <Link to="/bids" className={activeItem === 'bids' ? 'active' : ''}>
                    <span className="icon">
                        <ShoppingCartIcon />
                    </span>
                    <span className="text">My Bids</span>
                </Link>
            </div>

            <div className="sidebar__accountHeadingWrapper">
                <h2 className="sidebar__heading">Account</h2>
                <IconButton
                    onClick={() =>
                        setIsAccountOpen((prevIsAccountOpen) => !prevIsAccountOpen)
                    }
                >
                    <ExpandMoreIcon
                        className={
                            isAccountOpen
                                ? 'sidebar__accountExpandIcon'
                                : 'sidebar__accountExpandIcon rotate'
                        }
                    />
                </IconButton>
            </div>
            <Link
                to="/account"
                className={
                    isAccountOpen
                        ? 'sidebar__accountWrapper show'
                        : 'sidebar__accountWrapper'
                }
            >
                <Avatar
                    alt="First Name"
                    src="avatars/avatar1.png"
                    className="sidebar__avatar"
                />
                <div className="sidebar__accountDetailsWrapper">
                    <h3>Shubham</h3>
                    <p>@blck_tie</p>
                </div>
            </Link>
        </div>
    )
}

export default Sidebar
