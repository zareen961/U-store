import React, { useState } from 'react'

import ImageModal from '../../Main/Home/ProductCard/ImageModal'
import './ProductImage.scss'

const ProductImage = ({ image, name }) => {
    const [isImageOpen, setIsImageOpen] = useState(false)

    return (
        <>
            <div className="productImage">
                <img src={image} alt={name} onClick={() => setIsImageOpen(true)} />
            </div>

            {/* Image Modal */}
            <ImageModal
                isOpen={isImageOpen}
                setIsOpen={setIsImageOpen}
                productImage={image}
                productName={name}
            />
        </>
    )
}

export default ProductImage
