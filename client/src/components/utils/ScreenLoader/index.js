import React from 'react'

import Loader from '../../utils/Loader'
import './ScreenLoader.scss'

const ScreenLoader = () => {
    return (
        <div className="screenLoader">
            <Loader sizeClass={'large'} />
        </div>
    )
}

export default ScreenLoader
