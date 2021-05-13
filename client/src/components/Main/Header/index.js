import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import { Link } from 'react-router-dom'
import { SearchIcon, DiffAddedIcon } from '@primer/octicons-react'

import Logo from '../../utils/Logo'
import './Header.css'

const Header = () => {
    return (
        <div className="header">
            <a href="#" className="header__logoWrapper">
                <Logo sizeClass={'small'} />
            </a>
            <div className="header__rightWrapper">
                <div className="header__searchWrapper">
                    <SearchIcon />
                    <input type="text" placeholder="Search" />
                </div>

                <button className="header__uploadButton">
                    <DiffAddedIcon size={16} />
                    <span>Upload</span>
                </button>

                <div className="header__menuWrapper">
                    <IconButton>
                        <Avatar src="avatars/avatar3.png" />
                    </IconButton>
                    <div className="header__menu">
                        <Link to="/account">My Account</Link>
                        <button>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
