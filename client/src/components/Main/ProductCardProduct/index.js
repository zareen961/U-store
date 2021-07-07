import React, { useState, useEffect } from 'react'
import { MegaphoneIcon } from '@primer/octicons-react'
import ButtonComp from '../../utils/ButtonComp'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'

import BidsAllModal from '../Home/ProductCard/BidsAllModal'
import DotsMenu from '../Home/ProductCard/DotsMenu'
import ProductDetails from '../../utils/ProductDetails'
import { productDelete } from '../../../store/actions/product'
import { alertAdd } from '../../../store/actions/ui'
import ConfirmModal from '../../utils/ConfirmModal'
import PriceBox from '../../utils/PriceBox'
import ProductImage from '../../utils/ProductImage'
import { storage } from '../../../utils/firebase'
import './ProductCardProduct.scss'

const ProductCardProduct = ({ product }) => {
    const dispatch = useDispatch()

    const [isBidMoreOpen, setIsBidMoreOpen] = useState(false)
    const [isProductDeleteOpen, setIsProductDeleteOpen] = useState(false)

    const { loading: loadingProductDelete, success: successProductDelete } = useSelector(
        (state) => state.productDelete
    )

    // product delete function
    const handleProductDelete = () => {
        // deleting the image of the product if there are no bids and following on it
        if (product.bids.length === 0 && product.following.length === 0) {
            storage
                .ref('images')
                .child(product.image.fileName)
                .delete()
                .then(() => {
                    dispatch(
                        alertAdd('Your product will be deleted permanently!', 'success')
                    )
                })
                .catch((error) => {
                    dispatch(alertAdd(error.message, 'error'))
                })
        }
        dispatch(productDelete(product._id))
    }

    // to close the confirm modal on product delete success
    useEffect(() => {
        if (successProductDelete) {
            setIsProductDeleteOpen(false)
        }
    }, [successProductDelete])

    return (
        <>
            <div className="productCardProduct">
                {/* Header */}
                <div className="productCardProduct__header">
                    <div className="productCardProduct__nameTime">
                        <h2>{product.name}</h2>
                        <span>{moment(product.createdAt).fromNow()}</span>
                    </div>

                    <DotsMenu setIsProductDeleteOpen={setIsProductDeleteOpen} />
                </div>

                {/* Image */}
                <ProductImage image={product.image.url} name={product.name} />

                {/* Details */}
                <ProductDetails
                    name={product.name}
                    description={product.description}
                    isProductsScreen={true}
                />

                {/* Price */}
                <PriceBox productPrice={product.price} bids={product.bids} />

                {/* Footer */}
                <div className="productCardProduct__bids">
                    <div className="productCardProduct__bidsCount">
                        <MegaphoneIcon size={18} />
                        <h3>Total Bids:</h3>
                        <span className="bidsCount">{product.bids.length}</span>
                    </div>
                    <ButtonComp
                        typeClass={'secondary'}
                        handleOnClick={() => setIsBidMoreOpen(true)}
                        text={'View Bids'}
                    />
                </div>
            </div>

            {/* All Bids Modal */}
            <BidsAllModal
                bids={product.bids}
                isOpen={isBidMoreOpen}
                setIsOpen={setIsBidMoreOpen}
                productOwnerID={
                    product.productOwner._id
                        ? product.productOwner._id
                        : product.productOwner
                }
            />

            {/* Confirm Product Delete Modal */}
            <ConfirmModal
                isOpen={isProductDeleteOpen}
                setIsOpen={setIsProductDeleteOpen}
                handleOnConfirm={handleProductDelete}
                isSecure={false}
                isLoading={loadingProductDelete}
            />
        </>
    )
}

export default ProductCardProduct
