import React from 'react'
import { HashLink } from 'react-router-hash-link'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import './ScrollToTopButton.css'

const ScrollToTopButton = () => {
    return (
        <button className="scrollToTop">
            <HashLink to="#homeID">
                <KeyboardArrowUpIcon />
            </HashLink>
        </button>
    )
}

export default ScrollToTopButton
