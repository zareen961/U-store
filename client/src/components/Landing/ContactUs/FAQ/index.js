import React, { useState } from 'react'

import Accordion from './Accordion'
import { FAQ_CONTENT, FAQ_HEADING } from '../../../../constants/faqData'
import './FAQ.scss'

const FAQ = () => {
    const [show, setShow] = useState(FAQ_CONTENT.map(() => false))

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
            <h3 className="faq__heading">FAQ's</h3>
            <p className="faq__description">{FAQ_HEADING}</p>
            {FAQ_CONTENT.map((query, i) => (
                <Accordion
                    key={query.question}
                    index={i}
                    query={{ ...query, show: show[i] }}
                    handleShow={handleShow}
                />
            ))}
        </div>
    )
}

export default FAQ
