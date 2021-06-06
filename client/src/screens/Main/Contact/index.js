import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { userFetchContact } from '../../../store/actions/user'
import './Contact.css'

const Contact = ({ match }) => {
    const username = match.params.username
    const dispatch = useDispatch()

    const { loading, contactDetails } = useSelector((state) => state.userContactDetails)

    useEffect(() => {
        if (username) {
            dispatch(userFetchContact(username))
        }
    }, [dispatch, username])

    return (
        <div>
            <h1>Contact Screen</h1>
            <h2>{username}</h2>

            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <div>
                    <h1>{contactDetails._id}</h1>
                    <h2>
                        {contactDetails.firstName} {contactDetails.lastName}
                    </h2>
                    <p>{contactDetails.email}</p>
                    <p>{contactDetails.primaryPhone}</p>
                    <p>{contactDetails.secondaryPhone}</p>
                    <p>Avatar: {contactDetails.avatar}</p>
                </div>
            )}
        </div>
    )
}

export default Contact
