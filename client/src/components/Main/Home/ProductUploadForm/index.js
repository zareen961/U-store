import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { TagIcon } from '@primer/octicons-react'

import sampleProduct from '../../../../assets/images/sample-product.jpg'
import ButtonComp from '../../../utils/ButtonComp'
import './ProductUploadForm.css'

const ProductUploadForm = () => {
    return (
        <form className="productUploadForm">
            <Avatar src="avatars/avatar10.png" className="productUploadForm__avatar" />
            <input
                type="text"
                placeholder="What do you want to sell?"
                className="productUploadForm__name"
            />
            <input
                type="number"
                placeholder="Set your price."
                className="productUploadForm__price"
            />
            <textarea
                placeholder="Tell something about your product!"
                className="productUploadForm__description"
            ></textarea>
            <div className="productUploadForm__imageWrapper">
                <img src={sampleProduct} alt="sample-product" onClick={() => {}} />
            </div>

            <ButtonComp
                typeClass={'primary'}
                modifyClass={'iconButton uploadButton'}
                handleOnClick={() => {}}
                text={'Upload'}
            >
                <TagIcon size={18} />
            </ButtonComp>
        </form>
    )
}

export default ProductUploadForm
