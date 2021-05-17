import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
    HomeIcon,
    PersonIcon,
    PinIcon,
    MegaphoneIcon,
    TagIcon,
    GearIcon,
} from '@primer/octicons-react'
import Badge from '@material-ui/core/Badge'

import './SidebarLeft.css'

const SidebarLeft = () => {
    const { user } = useSelector((state) => state.userLogin)

    const path =
        window.location.pathname === '/' ? 'home' : window.location.pathname.substr(1)
    const [active, setActive] = useState(path)

    useEffect(() => {
        setActive(path)
    }, [path])

    return (
        <div className="sidebarLeft">
            {/* Account */}
            <Link to="/account" className="sidebarLeft__account">
                <Avatar
                    src={`avatars/avatar${
                        user && user.userInfo ? user.userInfo.avatar : 0
                    }.png`}
                    className="sidebarLeft__avatar"
                />
                <span className="sidebarLeft__name">
                    {user && user.userInfo
                        ? `${user.userInfo.firstName} ${user.userInfo.lastName}`
                        : 'John Doe'}
                </span>
                <span className="sidebarLeft__username">
                    {user && user.userInfo ? `@${user.userInfo.username}` : '@john_doe'}
                </span>
            </Link>

            {/* Menu */}
            <div className="sidebarLeft__menu">
                <Link to="/" className={active === 'home' ? 'active' : ''}>
                    <span className="sidebarLeft__menuIcon">
                        <HomeIcon size={20} />
                    </span>
                    <span className="sidebarLeft__menuText">Home</span>
                </Link>

                <span className="line"></span>

                <Link to="/products" className={active === 'products' ? 'active' : ''}>
                    <span className="sidebarLeft__menuIcon">
                        <TagIcon size={20} />
                    </span>
                    <span className="sidebarLeft__menuText">Products</span>
                    <Badge
                        badgeContent={
                            user && user.userInfo ? user.userInfo.products.length : 0
                        }
                        max={9}
                        color="primary"
                        className="sidebarLeft__menuBadge"
                    />
                </Link>

                <span className="line"></span>

                <Link to="/bids" className={active === 'bids' ? 'active' : ''}>
                    <span className="sidebarLeft__menuIcon">
                        <MegaphoneIcon size={20} />
                    </span>
                    <span className="sidebarLeft__menuText">Bids</span>
                    <Badge
                        badgeContent={
                            user && user.userInfo ? user.userInfo.bids.length : 0
                        }
                        max={9}
                        color="primary"
                        className="sidebarLeft__menuBadge"
                    />
                </Link>

                <span className="line"></span>

                <Link to="/following" className={active === 'following' ? 'active' : ''}>
                    <span className="sidebarLeft__menuIcon">
                        <PinIcon size={20} />
                    </span>
                    <span className="sidebarLeft__menuText">Following</span>
                    <Badge
                        badgeContent={11}
                        max={9}
                        color="primary"
                        className="sidebarLeft__menuBadge"
                    />
                </Link>

                <span className="line"></span>

                <Link to="/account" className={active === 'account' ? 'active' : ''}>
                    <span className="sidebarLeft__menuIcon">
                        <PersonIcon size={20} />
                    </span>
                    <span className="sidebarLeft__menuText">Account</span>
                </Link>

                <span className="line"></span>

                <Link to="/settings" className={active === 'settings' ? 'active' : ''}>
                    <span className="sidebarLeft__menuIcon">
                        <GearIcon size={20} />
                    </span>
                    <span className="sidebarLeft__menuText">Settings</span>
                </Link>
            </div>
        </div>
    )
}

export default SidebarLeft
