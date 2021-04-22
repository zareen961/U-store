import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import LinearProgress from '@material-ui/core/LinearProgress'

import './Loader.css'

const Loader = ({ isModal, size, thickness }) => {
    return (
        <div className={isModal ? 'loader__linear' : 'loader__spinner'}>
            {isModal ? (
                <LinearProgress color="secondary" />
            ) : (
                <CircularProgress color="secondary" size={size} thickness={thickness} />
            )}
        </div>
    )
}

export default Loader
