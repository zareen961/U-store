import React from 'react'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import { IconButton } from '@material-ui/core'

import './AdminItem.css'

const AdminItem = ({ _id, username, createdAt }) => {
    return (
        <div className="adminItem">
            <div className="adminItem__text">
                <p>
                    <span className="adminItem__label">username : &nbsp;</span>{' '}
                    <span className="adminItem__value">{username}</span>
                </p>
                <p>
                    <span className="adminItem__label">created : &nbsp;</span>
                    <span className="adminItem__value adminItem__createdAt">
                        {createdAt}
                    </span>
                </p>
            </div>
            <IconButton>
                <DeleteOutlineIcon className="adminItem__delete" />
            </IconButton>
        </div>
    )
}

export default AdminItem
