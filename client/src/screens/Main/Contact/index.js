import React from 'react'
import { useSelector } from 'react-redux'

import ScreenLoader from '../../../components/utils/ScreenLoader'
import NoItemMessage from '../../../components/utils/NoItemMessage'
import ContactCard from '../../../components/Main/Contact/ContactCard'
import ContactProductCard from '../../../components/Main/Contact/ContactProductCard'
import ContactBidCard from '../../../components/Main/Contact/ContactBidCard'
import BlockHeader from '../../../components/utils/BlockHeader'
import './Contact.css'

const Contact = () => {
    const {
        loading,
        contactData: { contact, product },
        success,
        error,
    } = useSelector((state) => state.userContactDetails)

    return (
        <div className="contact">
            <div className="contact__headerWrapper">
                <BlockHeader title={'Contact Details'} />
            </div>

            {loading ? (
                <ScreenLoader />
            ) : success ? (
                <div className="contact__bodyWrapper">
                    <div className="contact__contactCardWrapper">
                        <ContactCard contact={contact} />
                    </div>
                    {product && (
                        <div className="contact__productAndBidsWrapper">
                            <div className="contact__productCardWrapper">
                                <ContactProductCard product={product} />
                            </div>
                            <div className="contact__bidsWrapper">
                                {product.bids.map((bid) => (
                                    <ContactBidCard bid={bid} key={bid._id} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <NoItemMessage
                    title={error}
                    text={
                        'You must be a buyer or a seller of the respective product and at least one of the bid of the requested user must be in ACCEPTED state.'
                    }
                />
            )}
        </div>
    )
}

export default Contact
