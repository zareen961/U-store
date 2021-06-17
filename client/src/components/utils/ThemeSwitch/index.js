import React from 'react'
import { useDispatch } from 'react-redux'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

import * as actionTypes from '../../../store/actionTypes'
import './ThemeSwitch.css'

const ThemeSwitch = () => {
    const dispatch = useDispatch()

    const handleClickAway = () => {
        document.getElementById('menu__active').checked = false
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <section className="themeSwitch menu menu--circle">
                <input type="checkbox" id="menu__active" />
                <label htmlFor="menu__active" className="menu__active">
                    <div className="menu__toggle">
                        <div className="icon">
                            <div className="themeButton"></div>
                        </div>
                    </div>

                    <div className="menu__listings">
                        <ul className="circle">
                            <li>
                                <div className="placeholder">
                                    <div className="upside">
                                        <button
                                            // href="#"
                                            className="button"
                                            onClick={() =>
                                                dispatch({
                                                    type: actionTypes.THEME_SET_BLUE,
                                                })
                                            }
                                        >
                                            <FiberManualRecordIcon />
                                        </button>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="placeholder">
                                    <div className="upside">
                                        <button
                                            // href="#"
                                            className="button"
                                            onClick={() =>
                                                dispatch({
                                                    type: actionTypes.THEME_SET_RED,
                                                })
                                            }
                                        >
                                            <FiberManualRecordIcon />
                                        </button>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="placeholder">
                                    <div className="upside">
                                        <button
                                            // href="#"
                                            className="button"
                                            onClick={() =>
                                                dispatch({
                                                    type: actionTypes.THEME_SET_PURPLE,
                                                })
                                            }
                                        >
                                            <FiberManualRecordIcon />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </label>
            </section>
        </ClickAwayListener>
    )
}

export default ThemeSwitch
