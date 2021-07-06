import React from 'react'
import { useDispatch } from 'react-redux'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

import { themeSwitch } from '../../../store/actions/ui'

import './ThemeSwitch.scss'

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
                                            className="button"
                                            onClick={() => dispatch(themeSwitch('BLUE'))}
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
                                            className="button"
                                            onClick={() => dispatch(themeSwitch('RED'))}
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
                                            className="button"
                                            onClick={() =>
                                                dispatch(themeSwitch('PURPLE'))
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
