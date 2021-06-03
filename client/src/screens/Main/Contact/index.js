import React from 'react'

import './Contact.css'

const Contact = ({ match }) => {
    const userID = match.params.userID

    return (
        <div>
            <h1>Contact Screen</h1>
            <h2>{userID}</h2>
        </div>
    )
}

export default Contact
