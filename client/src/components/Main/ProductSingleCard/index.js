import React, { useState, useEffect } from 'react'
import { CheckCircleIcon, TagIcon, GraphIcon } from '@primer/octicons-react'
import NumberFormat from 'react-number-format'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import ProductDetails from '../../utils/ProductDetails'
import ConfirmModal from '../../utils/ConfirmModal'
import TooltipComp from '../../utils/TooltipComp'
import DeleteCover from '../../utils/DeleteCover'
import ImageModal from '../Home/ProductCard/ImageModal'
import AvatarHeader from '../Home/ProductCard/AvatarHeader'
import ActionFooter from '../Home/ProductCard/ActionFooter'
import DotsMenu from '../Home/ProductCard/DotsMenu'
import { productDelete } from '../../../store/actions/product'
import { alertAdd } from '../../../store/actions/ui'
import { storage } from '../../../utils/firebase'
import { getViewportWidth } from '../../../utils/getViewport'

import './ProductSingleCard.scss'

const ProductSingleCard = ({ product, isBidEditOpen, setIsBidEditOpen }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { user } = useSelector((state) => state.userLogin)
    const { loading: loadingProductDelete, success: successProductDelete } = useSelector(
        (state) => state.productDelete
    )

    const [isImageOpen, setIsImageOpen] = useState(false)
    const [isProductDeleteOpen, setIsProductDeleteOpen] = useState(false)

    const highestBid =
        product.bids.length > 0
            ? _.orderBy(product.bids, ['price'], ['desc'])[0].price
            : 0

    const acceptedBids = product.bids.filter((bid) => bid.status === 'ACCEPTED').length

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
        dispatch(productDelete(product._id, history))
    }

    // to close the confirm modal on product delete success
    useEffect(() => {
        if (successProductDelete) {
            setIsProductDeleteOpen(false)
        }
    }, [successProductDelete])

    return (
        <>
            <div className="productSingleCard">
                {getViewportWidth() <= 1000 && (
                    <div className="productSingleCard__headerWrapper responsive">
                        <AvatarHeader product={product} />

                        {String(user.userInfo._id) ===
                            String(product.productOwner._id) && (
                            <DotsMenu setIsProductDeleteOpen={setIsProductDeleteOpen} />
                        )}
                    </div>
                )}

                <div className="productSingleCard__imageWrapper">
                    <img
                        src={product.image.url}
                        alt={product.name}
                        onClick={() => setIsImageOpen(true)}
                        style={{
                            borderRadius:
                                String(user.userInfo._id) ===
                                String(product.productOwner._id)
                                    ? '15px 0 0 15px'
                                    : '15px 0 0 0',
                        }}
                    />

                    <div className="productSingleCard__totalBidsCount">
                        <TooltipComp placement={'right'} title={'Total Bids'}>
                            <h3>{product.bids.length}</h3>
                        </TooltipComp>
                    </div>
                </div>

                <div className="productSingleCard__detailsWrapper">
                    {getViewportWidth() > 1000 && (
                        <div className="productSingleCard__headerWrapper">
                            <AvatarHeader product={product} />

                            {String(user.userInfo._id) ===
                                String(product.productOwner._id) && (
                                <DotsMenu
                                    setIsProductDeleteOpen={setIsProductDeleteOpen}
                                />
                            )}
                        </div>
                    )}

                    <ProductDetails
                        name={product.name}
                        description={product.description}
                    />
                    <div className="productSingleCard__statsWrapper">
                        <TooltipComp placement={'top'} title={'Product Price'}>
                            <div className="price">
                                <TagIcon size={22} />
                                <span>
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
                        </TooltipComp>

                        <TooltipComp placement={'top'} title={'Highest Bid'}>
                            <div className="highestBid">
                                <GraphIcon size={22} />
                                <span>
                                    <NumberFormat
                                        value={highestBid}
                                        prefix={'Rs '}
                                        thousandSeparator={true}
                                        displayType={'text'}
                                    />
                                </span>
                            </div>
                        </TooltipComp>

                        <TooltipComp placement={'top'} title={'Accepted Bids'}>
                            <div className="acceptedBids">
                                <CheckCircleIcon size={22} />
                                <span>
                                    {acceptedBids} {acceptedBids > 1 ? 'Bids' : 'Bid'}
                                </span>
                            </div>
                        </TooltipComp>
                    </div>
                </div>

                {product.isActive &&
                    String(user.userInfo._id) !== String(product.productOwner._id) && (
                        <div className="productSingleCard__footerWrapper">
                            <ActionFooter
                                product={product}
                                isBidEditOpen={isBidEditOpen}
                                setIsBidEditOpen={setIsBidEditOpen}
                            />
                        </div>
                    )}

                {/* Delete Cover */}
                {!product.isActive && <DeleteCover message={'Product deleted!'} />}
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

export default ProductSingleCard
