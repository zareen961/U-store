import React from 'react'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import MyLocationIcon from '@material-ui/icons/MyLocation'

import './OverviewItem.scss'

const getIcon = (icon) => {
    switch (icon) {
        case 'SIGN_UP':
            return <PersonAddIcon />
        case 'SELL':
            return <LocalOfferIcon />
        case 'BID_BUY':
            return <ShoppingCartIcon />
        case 'INTERACTION':
            return <PeopleAltIcon />
        case 'PRIVACY':
            return <VisibilityOffIcon />
        case 'PRECISE':
            return <MyLocationIcon />
        default:
            return <PersonAddIcon />
    }
}

const OverviewItem = ({ icon, title, content, isLeft }) => {
    return (
        <div className={isLeft ? 'overviewItem left' : 'overviewItem'}>
            <div className="overviewItem__iconWrapper">{getIcon(icon)}</div>
            <div className="overviewItem__bodyWrapper">
                <h3>{title}</h3>
                <p>{content}</p>
            </div>
        </div>
    )
}

export default OverviewItem
