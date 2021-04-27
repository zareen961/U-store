import React from 'react'

import './FormLoader.css'

const FormLoader = ({ size = 50, loading }) => {
    return (
        <div className={loading ? 'formLoader__overlay show' : 'formLoader__overlay'}>
            <div
                className="spinner"
                style={{ height: `${size}px`, width: `${size}px` }}
            ></div>
        </div>
    )
}

export default FormLoader
