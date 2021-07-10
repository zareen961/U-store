import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Avatar from '@material-ui/core/Avatar'

import { userLogout } from '../../../../store/actions/user'
import './HeaderMenu.scss'

const HeaderMenu = ({ avatar }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const logoutHandler = () => {
        dispatch(userLogout(history))
    }

    return (
        <>
            <ClickAwayListener onClickAway={() => setIsMenuOpen(false)}>
                <IconButton
                    onClick={() => setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen)}
                >
                    <Avatar
                        src={`/avatars/avatar${avatar}.png`}
                        className="headerMenu__avatar"
                    />
                </IconButton>
            </ClickAwayListener>
            <div className={isMenuOpen ? 'headerMenu__menu show' : 'headerMenu__menu'}>
                <Link to="/account">My Account</Link>
                <span className="line"></span>
                <Link to="/settings">Settings</Link>
                <span className="line"></span>
                <button onClick={logoutHandler}>Logout</button>
            </div>
        </>
    )
}

export default HeaderMenu
