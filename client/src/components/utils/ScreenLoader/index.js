import React from 'react'

import Loader from '../../utils/Loader'
import './ScreenLoader.css'

const ScreenLoader = () => {
    return (
        <div className="screenLoader">
            <Loader sizeClass={'large'} />
        </div>
    )
}

export default ScreenLoader
