import React from 'react'
import { useSelector } from 'react-redux'
import {
    CheckIcon,
    TagIcon,
    GraphIcon,
    GiftIcon,
    MegaphoneIcon,
    DeviceCameraIcon,
    ReplyIcon,
} from '@primer/octicons-react'
import { useHistory } from 'react-router-dom'

import ScreenLoader from '../../../components/utils/ScreenLoader'
import ButtonComp from '../../../components/utils/ButtonComp'
import NoItemMessage from '../../../components/utils/NoItemMessage'
import ContactCard from '../../../components/Main/Contact/ContactCard'
import ContactShape from '../../../components/Main/Contact/ContactShape'
import BlockHeader from '../../../components/utils/BlockHeader'
import './Contact.scss'

const Contact = () => {
    const history = useHistory()

    const {
        loading,
        contactData: { contact, product },
        success,
        error,
    } = useSelector((state) => state.userContactDetails)

    return (
        <div className="contact">
            <div className="contact__headerWrapper">
                <BlockHeader title={'Contact Details'}>
                    <ButtonComp
                        typeClass={'secondary'}
                        text={'Go Back'}
                        handleOnClick={history.goBack}
                    >
                        <ReplyIcon size={18} />
                    </ButtonComp>
                </BlockHeader>
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
                                    <GiftIcon size={24} />
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
                                    content={product.totalAcceptedBids}
                                >
                                    <CheckIcon size={24} />
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
