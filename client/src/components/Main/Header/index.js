import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import { Link } from 'react-router-dom'
import { SearchIcon, DiffAddedIcon } from '@primer/octicons-react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { useDispatch, useSelector } from 'react-redux'

import { userLogout } from '../../../store/actions/user'
import Logo from '../../utils/Logo'
import ButtonComp from '../../utils/ButtonComp'
import './Header.css'

const Header = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.userLogin)

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const logoutHandler = () => {
        dispatch(userLogout())
    }

    return (
        <div className="header">
            <a href="#" className="header__logoWrapper">
                <Logo sizeClass={'small'} />
                <div className="header__logoIconWrapper"></div>
            </a>
            <div className="header__rightWrapper">
                <div className="header__searchWrapper">
                    <SearchIcon />
                    <input type="text" placeholder="Search" />
                </div>

                <ButtonComp
                    typeClass={'primary'}
                    text={'Upload'}
                    handleOnClick={() => {}}
                >
                    <DiffAddedIcon size={16} />
                </ButtonComp>

                <div className="header__menuWrapper">
                    <ClickAwayListener onClickAway={() => setIsMenuOpen(false)}>
                        <IconButton
                            onClick={() =>
                                setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen)
                            }
                        >
                            <Avatar
                                src={`avatars/avatar${
                                    user && user.userInfo ? user.userInfo.avatar : '0'
                                }.png`}
                                className="header__avatar"
                            />
                        </IconButton>
                    </ClickAwayListener>
                    <div className={isMenuOpen ? 'header__menu show' : 'header__menu'}>
                        <Link to="/account">My Account</Link>
                        <span className="line"></span>
                        <Link to="/settings">Settings</Link>
                        <span className="line"></span>
                        <button onClick={logoutHandler}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
