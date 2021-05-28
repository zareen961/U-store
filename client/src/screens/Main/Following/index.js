import React from 'react'

import ProductCardFollow from '../../../components/Main/ProductCardFollow'
import './Following.css'

const Following = () => {
    return (
        <div className="following">
            <div className="following__left">
                <ProductCardFollow />
                <ProductCardFollow />
            </div>
            <div className="following__right">
                <ProductCardFollow />
                <ProductCardFollow />
            </div>
        </div>
    )
}

export default Following
