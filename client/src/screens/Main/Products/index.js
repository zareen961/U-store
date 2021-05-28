import React from 'react'

import ProductCardProduct from '../../../components/Main/ProductCardProduct'
import './Products.css'

const Products = () => {
    return (
        <div className="products">
            <div className="products__left">
                <ProductCardProduct />
                <ProductCardProduct />
            </div>
            <div className="products__right">
                <ProductCardProduct />
                <ProductCardProduct />
            </div>
        </div>
    )
}

export default Products
