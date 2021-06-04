import React from 'react'

import './Loader.css'

const Loader = ({ sizeClass = 'small' }) => {
    return <div className={`loader ${sizeClass}`}></div>
}

export default Loader
