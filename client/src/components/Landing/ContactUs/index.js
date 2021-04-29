import React from 'react'

import ContactForm from './ContactForm'
import FAQ from './FAQ'
import SectionHeader from '../../utils/SectionHeader'
import './ContactUs.css'

const ContactUs = () => {
    return (
        <div className="contactUs" id="contactID">
            <SectionHeader
                title={'Contact Us'}
                content={
                    'Loremc ipsum dolor sit amet consectetur adipisicing elit. Quod, placeat recusandae dolore sit vel temporibus illo debitis eaque molestiae? Mollitia molestias quo nulla neque error.'
                }
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
