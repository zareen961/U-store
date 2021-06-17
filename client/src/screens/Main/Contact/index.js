import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { userFetchContact } from '../../../store/actions/user'
import Loader from '../../../components/utils/Loader'
import './Contact.css'

const Contact = ({ match }) => {
    const username = match.params.username
    const dispatch = useDispatch()

    const { success: successUserLogin } = useSelector((state) => state.userLogin)
    const { loading, contactDetails } = useSelector((state) => state.userContactDetails)

    useEffect(() => {
        if (successUserLogin && username) {
            dispatch(userFetchContact(username))
        }
    }, [dispatch, username, successUserLogin])

    return (
        <div>
            <h1>Contact Screen</h1>
            <h2>{username}</h2>

            {loading ? (
                <div className="contact__loader">
                    <Loader />
                </div>
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
