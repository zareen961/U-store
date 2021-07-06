import React from 'react'

import Loader from '../Loader'
import './BidInputLoader.scss'

const BidInputLoader = ({ isLoading }) => {
    return (
        <div className={isLoading ? 'bidInputLoader active' : 'bidInputLoader'}>
            <div className="loaderWrapper">
                <Loader />
            </div>
        </div>
    )
}

export default BidInputLoader
