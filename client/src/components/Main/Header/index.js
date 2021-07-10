import React from 'react'
import { useHistory } from 'react-router-dom'
import { DiffAddedIcon, BellFillIcon } from '@primer/octicons-react'
import { useSelector } from 'react-redux'
import Badge from '@material-ui/core/Badge'

import Logo from '../../utils/Logo'
import ButtonComp from '../../utils/ButtonComp'
import SearchBar from './SearchBar'
import HeaderMenu from './HeaderMenu'
import { WEBSITE_URL } from '../../../constants/urls'
import './Header.scss'

const Header = ({ setIsUploadFormOpen }) => {
    const history = useHistory()

    const { user } = useSelector((state) => state.userLogin)
    const { notifications } = useSelector((state) => state.notificationGetSaved)

    const handleUploadFormOpen = () => {
        history.push('../')
        setIsUploadFormOpen(true)
    }

    const handleSlideToNotifications = () => {
        const bodyWrapperElement = document.querySelector('.main__bodyWrapper')
        bodyWrapperElement.scrollLeft = 9000
    }

    return (
        <div className="header">
            <div className="header__logoAndMenuWrapper">
                <a
                    href={WEBSITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="header__logoWrapper"
                    title="U-store"
                >
                    <Logo sizeClass={'small'} />
                    <div className="header__logoIconWrapper"></div>
                </a>
                {/* responsive header menu */}
                <div className="header__menuWrapper responsive">
                    <HeaderMenu
                        avatar={user && user.userInfo ? user.userInfo.avatar : '0'}
                    />

                    <Badge
                        badgeContent={notifications.reduce(
                            (acc, curr) => acc + (curr.isRead === 'true' ? 0 : 1),
                            0
                        )}
                        max={9}
                        color="primary"
                        className="header__notificationBadge"
                    >
                        <ButtonComp
                            typeClass={'primary'}
                            modifyClass={'iconButton'}
                            handleOnClick={handleSlideToNotifications}
                        >
                            <BellFillIcon size={20} />
                        </ButtonComp>
                    </Badge>
                </div>
            </div>

            <div className="header__rightWrapper">
                <SearchBar />

                <ButtonComp
                    typeClass={'primary'}
                    text={'Upload'}
                    handleOnClick={handleUploadFormOpen}
                >
                    <DiffAddedIcon size={16} />
                </ButtonComp>

                <div className="header__menuWrapper">
                    <HeaderMenu
                        avatar={user && user.userInfo ? user.userInfo.avatar : '0'}
                    />
                </div>
            </div>
        </div>
    )
}

export default Header
