import React, { useState } from 'react'
import AddBoxIcon from '@material-ui/icons/AddBox'
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox'
import IconButton from '@material-ui/core/IconButton'

import './Accordion.css'

const Accordion = ({ query }) => {
    const [show, setShow] = useState(false)

    const handleShow = () => {
        setShow(!show)
    }

    return (
        <div className="accordion">
            <div className="accordion__header">
                <h3>{query.title}</h3>
                <IconButton className="accordion__showButton" onClick={handleShow}>
                    {show ? <IndeterminateCheckBoxIcon /> : <AddBoxIcon />}
                </IconButton>
            </div>

            <p className={show ? 'show' : ''}>{query.answer}</p>
        </div>
    )
}

export default Accordion
