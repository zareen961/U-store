import React, { useState, useEffect } from 'react'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import { IconButton } from '@material-ui/core'
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'

import { adminDelete } from '../../../store/actions'
import ConfirmModal from '../../utils/ConfirmModal'
import './AdminItem.css'

const AdminItem = ({ admin: { _id, username, createdAt }, isAdmin }) => {
    const dispatch = useDispatch()
    const { loading, success } = useSelector((state) => state.adminDelete)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [password, setPassword] = useState('')

    const handleAdminDelete = () => {
        dispatch(adminDelete(_id, password))
    }

    useEffect(() => {
        if (success) {
            setPassword('')
        }
    }, [success])

    return (
        <>
            <div className={isAdmin ? 'adminItem isAdmin' : 'adminItem'}>
                <div className="adminItem__text">
                    <p>
                        <span className="adminItem__label">username : &nbsp;</span>{' '}
                        <span className="adminItem__value">{username}</span>
                    </p>
                    <p>
                        <span className="adminItem__label">created :</span>
                        <span className="adminItem__value adminItem__createdAt">
                            <Moment format="DD-MMM-YYYY | HH:mm">{createdAt}</Moment>
                        </span>
                    </p>
                </div>
                {!isAdmin && (
                    <IconButton
                        color="secondary"
                        className="adminItem__deleteButton"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <DeleteOutlineIcon />
                    </IconButton>
                )}
            </div>

            <ConfirmModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                handleOnConfirm={handleAdminDelete}
                password={password}
                setPassword={setPassword}
                loading={loading}
            />
        </>
    )
}

export default AdminItem
