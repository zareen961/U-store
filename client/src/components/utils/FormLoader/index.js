import React from 'react'

import Loader from '../Loader'
import './FormLoader.scss'

const FormLoader = ({ size = 50, loading, modifyClass = '', loaderSizeClass }) => {
    return (
        <div
            className={
                loading ? `formLoader ${modifyClass} show` : `formLoader  ${modifyClass}`
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
