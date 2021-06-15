import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment'
import { useHistory } from 'react-router-dom'

import './AvatarHeader.css'

const AvatarHeader = ({ product }) => {
    const history = useHistory()

    return (
        <div className="avatarHeader">
            <Avatar
                src={`avatars/avatar${product.productOwner.avatar}.png`}
                className="avatarHeader__avatar"
                onClick={() => history.push(`/contact/${product.productOwner.username}`)}
            />
            <div className="avatarHeader__nameTime">
                <p
                    className="username"
                    onClick={() =>
                        history.push(`/contact/${product.productOwner.username}`)
                    }
                >
                    @{product.productOwner.username}
                </p>
                <span>{moment(product.createdAt).fromNow()}</span>
            </div>
        </div>
    )
}

export default AvatarHeader
