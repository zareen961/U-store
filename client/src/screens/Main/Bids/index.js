import React from 'react'

import ProductCardBid from '../../../components/Main/ProductCardBid'
import './Bids.css'

const Bids = () => {
    return (
        <div className="bids">
            <div className="bids__left">
                <ProductCardBid />
                <ProductCardBid />
            </div>
            <div className="bids__right">
                <ProductCardBid />
                <ProductCardBid />
            </div>
        </div>
    )
}

export default Bids
