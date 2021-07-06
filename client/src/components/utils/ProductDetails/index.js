import React, { useState } from 'react'

import './ProductDetails.scss'

const ProductDescription = ({ name, description, isProductsScreen = false }) => {
    const [isReadMoreOpen, setIsReadMoreOpen] = useState(false)

    return (
        <div className="productDetails">
            {!isProductsScreen && <h2 className="productDetails__name">{name}</h2>}

            {description.length > 90 ? (
                <p
                    className={
                        isReadMoreOpen
                            ? 'productDetails__description open'
                            : 'productDetails__description'
                    }
                >
                    {description.substring(0, 80)}
                    <span>{isReadMoreOpen ? description.substring(80) : '...'}</span>
                    <button
                        className="productDetails__readMoreButton"
                        onClick={() => setIsReadMoreOpen(!isReadMoreOpen)}
                    >
                        {isReadMoreOpen ? 'Show Less' : 'Read More'}
                    </button>
                </p>
            ) : (
                <p className="productDetails__description">{description}</p>
            )}
        </div>
    )
}

export default ProductDescription
