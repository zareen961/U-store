import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TagIcon } from '@primer/octicons-react'
import NumberFormat from 'react-number-format'
import _ from 'lodash'

import BidCard from './BidCard'
import { productDelete } from '../../../../store/actions/product'
import { alertAdd } from '../../../../store/actions/ui'
import ConfirmModal from '../../../utils/ConfirmModal'
import ImageModal from './ImageModal'
import DotsMenu from './DotsMenu'
import AvatarHeader from './AvatarHeader'
import BidMoreAvatars from './BidMoreAvatars'
import ActionFooter from './ActionFooter'
import { storage } from '../../../../utils/firebase'
import './ProductCard.scss'

const ProductCard = ({ product }) => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.userLogin)
    const { loading: loadingProductDelete, success: successProductDelete } = useSelector(
        (state) => state.productDelete
    )

    const [isImageOpen, setIsImageOpen] = useState(false)
    const [isBidMoreOpen, setIsBidMoreOpen] = useState(false)
    const [isBidEditOpen, setIsBidEditOpen] = useState(false)
    const [isProductDeleteOpen, setIsProductDeleteOpen] = useState(false)

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
            <div className="productCard">
                {/* Header */}
                <div className="productCard__header">
                    <AvatarHeader product={product} />

                    {String(user.userInfo._id) === String(product.productOwner._id) && (
                        <DotsMenu setIsProductDeleteOpen={setIsProductDeleteOpen} />
                    )}
                </div>

                {/* Details */}
                <div className="productCard__productDetails">
                    <h2 className="name">{product.name}</h2>
                    <p className="description">{product.description}</p>
                </div>

                {/* Image */}
                <div className="productCard__image">
                    <img
                        src={product.image.url}
                        alt={product.name}
                        onClick={() => setIsImageOpen(true)}
                    />
                </div>

                {/* Price */}
                <div className="productCard__price">
                    <TagIcon size={18} />
                    <h3>Price</h3>
                    <span className="price">
                        {product.price === 0 ? (
                            'Free'
                        ) : (
                            <NumberFormat
                                value={product.price}
                                prefix={'Rs '}
                                thousandSeparator={true}
                                displayType={'text'}
                            />
                        )}
                    </span>
                </div>

                {/* Bids */}
                <div className="productCard__bids">
                    {product.bids.length > 0 ? (
                        _.orderBy(product.bids, ['price'], ['desc'])
                            .slice(0, 2)
                            .map((bid) => (
                                <BidCard
                                    key={bid._id}
                                    bid={bid}
                                    productOwnerID={product.productOwner._id}
                                    setIsBidEditOpen={setIsBidEditOpen}
                                    setIsBidMoreOpen={setIsBidMoreOpen}
                                />
                            ))
                    ) : (
                        <div className="productCard__noBid">
                            <h3>No attention seeked yet!</h3>
                        </div>
                    )}

                    {product.bids.length > 2 && (
                        <BidMoreAvatars
                            bids={product.bids}
                            sliceBy={2}
                            productOwnerID={product.productOwner._id}
                            isBidMoreOpen={isBidMoreOpen}
                            setIsBidMoreOpen={setIsBidMoreOpen}
                            setIsBidEditOpen={setIsBidEditOpen}
                            isHomeScreen={true}
                        />
                    )}
                </div>

                {/* Action Footer */}
                <ActionFooter
                    product={product}
                    isBidEditOpen={isBidEditOpen}
                    setIsBidEditOpen={setIsBidEditOpen}
                />
            </div>

            {/* Image Modal */}
            <ImageModal
                isOpen={isImageOpen}
                setIsOpen={setIsImageOpen}
                productImage={product.image.url}
                productName={product.name}
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

export default ProductCard
