import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import { Link, useLocation, useHistory } from 'react-router-dom'
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

import { getViewportWidth } from '../../../utils/getViewport'
import './SidebarLeft.scss'

const SidebarLeft = () => {
    const location = useLocation()
    const history = useHistory()

    const { user } = useSelector((state) => state.userLogin)

    const path = location.pathname === '/' ? 'home' : location.pathname.substr(1)
    const [active, setActive] = useState(path)

    useEffect(() => {
        setActive(path)
    }, [path])

    // to auto scroll when a menu item is clicked
    const handleResponsiveClick = () => {
        if (getViewportWidth() <= 1000) {
            const mainBodyElement = document.querySelector('.main__bodyWrapper')
            mainBodyElement.scrollLeft = mainBodyElement.scrollLeft + getViewportWidth()
        }
    }

    return (
        <div className="sidebarLeft">
            {/* Account */}
            <div
                className="sidebarLeft__account"
                onClick={() => {
                    history.push('/account')
                    handleResponsiveClick()
                }}
            >
                <Avatar
                    src={`/avatars/avatar${
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
            </div>

            {/* Menu */}
            <div className="sidebarLeft__menu" onClick={handleResponsiveClick}>
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
                        badgeContent={
                            user && user.userInfo ? user.userInfo.following.length : 0
                        }
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
