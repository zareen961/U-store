import React from 'react'

import ContactForm from './ContactForm'
import FAQ from './FAQ'
import SectionHeader from '../../utils/SectionHeader'
import { CONTACT_HEADING } from '../../../constants/contactUsData'
import './ContactUs.scss'

const ContactUs = () => {
    return (
        <div className="contactUs" id="contactID">
            <SectionHeader
                title={'Contact Us'}
                content={CONTACT_HEADING}
                paddingTop={80}
            />
            <div className="contactUs__bodyWrapper">
                <FAQ />
                <ContactForm />
            </div>
        </div>
    )
}

export default ContactUs
