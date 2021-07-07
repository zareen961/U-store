import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { handleGetContact } from '../../../../../utils/handleGetContact'
import './AvatarHeader.scss'

const AvatarHeader = ({ product }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const { success: successUserLogin } = useSelector((state) => state.userLogin)

    // setting up the handleGetContact function
    const handleCallGetContact = () =>
        handleGetContact({
            dispatch,
            history,
            successUserLogin,
            username: product.productOwner.username,
            productID: product._id,
        })

    return (
        <div className="avatarHeader">
            <Avatar
                src={`/avatars/avatar${product.productOwner.avatar}.png`}
                className="avatarHeader__avatar"
                onClick={handleCallGetContact}
            />
            <div className="avatarHeader__nameTime">
                <p className="username" onClick={handleCallGetContact}>
                    @{product.productOwner.username}
                </p>
                <span>{moment(product.createdAt).fromNow()}</span>
            </div>
        </div>
    )
}

export default AvatarHeader
