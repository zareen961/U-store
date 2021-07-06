import React from 'react'

import './SectionHeader.scss'

const SectionHeader = ({ title, content, paddingTop }) => {
    return (
        <div className="sectionHeader" style={{ paddingTop }}>
            <h1>{title}</h1>
            <p>{content}</p>
        </div>
    )
}

export default SectionHeader
