import React from 'react'
import { useSelector } from 'react-redux'
import {
    CheckCircleIcon,
    TagIcon,
    GraphIcon,
    FileMediaIcon,
    MegaphoneIcon,
    DeviceCameraIcon,
} from '@primer/octicons-react'

import ScreenLoader from '../../../components/utils/ScreenLoader'
import NoItemMessage from '../../../components/utils/NoItemMessage'
import ContactCard from '../../../components/Main/Contact/ContactCard'
import ContactShape from '../../../components/Main/Contact/ContactShape'
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
                    <div className="contact__leftShapeWrapper">
                        {product && (
                            <>
                                <ContactShape
                                    label={'Product Name'}
                                    content={product.name}
                                >
                                    <FileMediaIcon size={24} />
                                </ContactShape>
                                <ContactShape
                                    label={'Product Image'}
                                    content={product.image.url}
                                    isImage={true}
                                >
                                    <DeviceCameraIcon size={24} />
                                </ContactShape>
                                <ContactShape
                                    label={'Product Price'}
                                    content={product.price}
                                    isPrice={true}
                                >
                                    <TagIcon size={24} />
                                </ContactShape>
                            </>
                        )}
                    </div>
                    <div className="contact__contactCardWrapper">
                        <ContactCard contact={contact} />
                    </div>
                    <div className="contact__rightShapeWrapper">
                        {product && (
                            <>
                                <ContactShape
                                    label={'Total Bids'}
                                    content={product.totalBidsCount}
                                >
                                    <MegaphoneIcon size={24} />
                                </ContactShape>
                                <ContactShape
                                    label={'Highest Bid'}
                                    content={product.highestBid}
                                    isPrice={true}
                                >
                                    <GraphIcon size={24} />
                                </ContactShape>
                                <ContactShape
                                    label={'Accepted Bids'}
                                    content={
                                        product.bids.filter(
                                            (bid) => bid.status === 'ACCEPTED'
                                        ).length
                                    }
                                >
                                    <CheckCircleIcon size={24} />
                                </ContactShape>
                            </>
                        )}
                    </div>
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
