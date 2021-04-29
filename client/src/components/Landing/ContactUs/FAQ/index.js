import React from 'react'

import Accordion from './Accordion'
import faqData from '../../../../utils/faqData'
import './FAQ.css'

const FAQ = () => {
    return (
        <div className="faq">
            <h3>FAQ 's</h3>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quasi in
                nesciunt placeat sint consequatur, consequuntur commodi dolore vitae
                error.
            </p>
            {faqData.map((query) => (
                <Accordion key={query.title} query={query} />
            ))}
        </div>
    )
}

export default FAQ
