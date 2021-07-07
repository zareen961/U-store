import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment'
import { MailIcon, DeviceMobileIcon } from '@primer/octicons-react'

import ButtonComp from '../../../utils/ButtonComp'
import './ContactCard.scss'

const ContactCard = ({ contact }) => {
    const [toShow, setToShow] = useState('EMAIL')

    const contactDescription = `${
        contact.firstName
    } has been a U-store user for past ${moment(contact.createdAt).fromNow(true)}${
        contact.productCount > 0
            ? ` and has ${contact.productCount} active ${
                  contact.productCount === 1 ? `product` : `products`
              } in your college.`
            : `.`
    }`

    return (
        <div className="contactCard">
            {/* Avatar */}
            <div className="contactCard__avatarWrapper">
                <Avatar
                    src={`/avatars/avatar${contact.avatar}.png`}
                    className="contactCard__avatar"
                />
            </div>

            {/* Name & Description */}
            <h3 className="contactCard__fullName">{`${contact.firstName} ${
                contact.lastName && contact.lastName
            }`}</h3>
            <p className="contactCard__username">@{contact.username}</p>
            <p className="contactCard__description">{contactDescription}</p>

            {/* Buttons */}
            <div className="contactCard__buttonsWrapper">
                <ButtonComp
                    typeClass={toShow === 'EMAIL' ? 'primary' : 'secondary'}
                    text={'Email'}
                    handleOnClick={() => setToShow('EMAIL')}
                >
                    <MailIcon size={18} />
                </ButtonComp>
                <ButtonComp
                    typeClass={toShow === 'CALL' ? 'primary' : 'secondary'}
                    text={'Phone'}
                    handleOnClick={() => setToShow('CALL')}
                >
                    <DeviceMobileIcon size={18} />
                </ButtonComp>
            </div>

            <div className="contactCard__footerWrapper">
                <div
                    className={
                        toShow === 'CALL'
                            ? 'contactCard__footerItem show'
                            : 'contactCard__footerItem'
                    }
                >
                    <div className="footerItemHeader">
                        <h3>Phone</h3>
                        <DeviceMobileIcon size={24} />
                    </div>
                    <div className="phoneWrapper">
                        <a href={`tel:${contact.primaryPhone}`} title="dialer">
                            {contact.primaryPhone}
                        </a>
                        {contact.secondaryPhone && (
                            <a href={`tel:${contact.secondaryPhone}`} title="dialer">
                                {contact.secondaryPhone}
                            </a>
                        )}
                    </div>
                </div>

                <div
                    className={
                        toShow === 'EMAIL'
                            ? 'contactCard__footerItem show'
                            : 'contactCard__footerItem'
                    }
                >
                    <div className="footerItemHeader">
                        <h3>Email</h3>
                        <MailIcon size={24} />
                    </div>
                    <a href={`mailto:${contact.email}`} title="mailbox">
                        {contact.email}
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ContactCard
