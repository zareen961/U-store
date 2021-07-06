import React from 'react'

import './Loader.scss'

const Loader = ({ sizeClass = 'small' }) => {
    return <div className={`loader ${sizeClass}`}></div>
}

export default Loader
