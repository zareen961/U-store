import { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import './ScrollToTop.scss'

const handleScrollToTop = () => {
    window.scrollTo(0, 0)
}

const ScrollToTop = ({ history }) => {
    const [isHidden, setIsHidden] = useState(true)

    // to always push to top when screen switches
    useEffect(() => {
        const unListen = history.listen(handleScrollToTop)

        return () => {
            unListen()
        }
    }, [history])

    // to show/hide the scrollToTop button based on scroll position
    useEffect(() => {
        const listenerFunc = () => {
            if (window.scrollY > 600) {
                setIsHidden(false)
            } else {
                setIsHidden(true)
            }
        }
        document.addEventListener('scroll', listenerFunc)

        return () => {
            document.removeEventListener('scroll', listenerFunc)
        }
    }, [])

    return (
        <button
            className={isHidden ? 'scrollToTop hide' : 'scrollToTop'}
            onClick={handleScrollToTop}
        >
            <KeyboardArrowUpIcon />
        </button>
    )
}

export default withRouter(ScrollToTop)
