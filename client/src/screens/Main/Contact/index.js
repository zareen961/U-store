import React from 'react'
import { useSelector } from 'react-redux'

import ScreenLoader from '../../../components/utils/ScreenLoader'
import './Contact.css'

const Contact = ({ match }) => {
    const username = match.params.username

    const {
        loading,
        contactData: { contact, product },
        success,
    } = useSelector((state) => state.userContactDetails)

    return (
        success && (
            <div>
                <h1>Contact Screen</h1>
                <h2>{username}</h2>

                {loading ? (
                    <ScreenLoader />
                ) : (
                    <div>
                        <h1>{contact._id}</h1>
                        <h2>
                            {contact.firstName} {contact.lastName}
                        </h2>
                        <p>{contact.email}</p>
                        <p>{contact.primaryPhone}</p>
                        <p>{contact.secondaryPhone}</p>
                        <p>{contact.productCount}</p>
                        <p>{contact.createdAt}</p>
                        <p>Avatar: {contact.avatar}</p>

                        <h3>{product.name}</h3>
                        <p>{product.highestBid}</p>
                    </div>
                )}
            </div>
        )
    )
}

export default Contact
