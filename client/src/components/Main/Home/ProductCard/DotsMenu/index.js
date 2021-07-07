import React, { useState } from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import IconButton from '@material-ui/core/IconButton'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import './DotsMenu.scss'

const DotsMenu = ({ setIsProductDeleteOpen }) => {
    const [isMenuTrayOpen, setIsMenuTrayOpen] = useState(false)

    return (
        <div className="dotsMenu">
            <ClickAwayListener onClickAway={() => setIsMenuTrayOpen(false)}>
                <IconButton
                    className="dotsMenu__button"
                    onClick={() => setIsMenuTrayOpen(!isMenuTrayOpen)}
                >
                    <MoreHorizIcon fontSize="large" />
                </IconButton>
            </ClickAwayListener>
            <ul
                className={
                    isMenuTrayOpen ? 'dotsMenu__menuTray open' : 'dotsMenu__menuTray'
                }
            >
                <li>Edit</li>
                <li className="dotsMenu__menuTrayLine"></li>
                <li onClick={() => setIsProductDeleteOpen(true)}>Delete</li>
            </ul>
        </div>
    )
}

export default DotsMenu
