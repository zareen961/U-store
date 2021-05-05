import React, { useState } from 'react'
import AddBoxIcon from '@material-ui/icons/AddBox'
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox'
import IconButton from '@material-ui/core/IconButton'

import './Accordion.css'

const Accordion = ({ query, handleShow, index }) => {
    return (
        <div className="accordion">
            <div className="accordion__header">
                <h3>{query.title}</h3>
                <IconButton
                    className="accordion__showButton"
                    onClick={() => handleShow(index)}
                    disableRipple="true"
                    disableFocusRipple="true"
                >
                    {query.show ? <IndeterminateCheckBoxIcon /> : <AddBoxIcon />}
                </IconButton>
            </div>

            <p className={query.show ? 'accordion__answer show' : 'accordion__answer'}>
                {query.answer}
            </p>
        </div>
    )
}

export default Accordion
