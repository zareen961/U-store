import React, { useState } from 'react'

import Accordion from './Accordion'
import faqData from '../../../../utils/faqData'
import './FAQ.css'

const FAQ = () => {
    const [show, setShow] = useState(faqData.map(() => false))

    const handleShow = (index) => {
        setShow(
            show.map((value, i) => {
                if (index === i) return !value
                return false
            })
        )
    }

    return (
        <div className="faq">
            <h3>FAQ's</h3>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quasi in
                nesciunt placeat sint.
            </p>
            {faqData.map((query, i) => (
                <Accordion
                    key={query.title}
                    index={i}
                    query={{ ...query, show: show[i] }}
                    handleShow={handleShow}
                />
            ))}
        </div>
    )
}

export default FAQ
