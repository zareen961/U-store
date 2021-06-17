import React from 'react'

import './AvatarComp.css'

const AvatarComp = ({ avatarNumber }) => {
    return (
        <img
            src={`avatars/avatar${avatarNumber}.png`}
            alt={`avatar-${avatarNumber}`}
            className="avatarComp"
        />
    )
}

export default AvatarComp
