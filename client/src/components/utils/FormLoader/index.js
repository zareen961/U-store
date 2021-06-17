import React from 'react'

import Loader from '../Loader'
import './FormLoader.css'

const FormLoader = ({ size = 50, loading, modifyClass = '', loaderSizeClass }) => {
    return (
        <div
            className={
                loading
                    ? `formLoader__overlay ${modifyClass} show`
                    : `formLoader__overlay  ${modifyClass}`
            }
        >
            {modifyClass !== '' ? (
                <Loader sizeClass={loaderSizeClass} />
            ) : (
                <div
                    className="spinner"
                    style={{ height: `${size}px`, width: `${size}px` }}
                ></div>
            )}
        </div>
    )
}

export default FormLoader
