import React, { useState } from 'react'
import { PinIcon } from '@primer/octicons-react'
import { useDispatch, useSelector } from 'react-redux'

import ButtonComp from '../../utils/ButtonComp'
import TooltipComp from '../../utils/TooltipComp'
import DeleteCover from '../../utils/DeleteCover'
import ProductImage from '../../utils/ProductImage'
import PriceBox from '../../utils/PriceBox'
import ConfirmModal from '../../utils/ConfirmModal'
import BidsAllModal from '../Home/ProductCard/BidsAllModal'
import ProductDetails from '../../utils/ProductDetails'
import AvatarHeader from '../Home/ProductCard/AvatarHeader'
import BidPlaceInput from '../Home/ProductCard/BidPlaceInput'
import { productFollowToggle } from '../../../store/actions/product'
import './ProductCardFollow.scss'

const ProductCardFollow = ({ product }) => {
    const dispatch = useDispatch()

    const { loading: loadingProductFollowToggle } = useSelector(
        (state) => state.productFollowToggle
    )

    const [isBidMoreOpen, setIsBidMoreOpen] = useState(false)
    const [bidVal, setBidVal] = useState('')
    const [isProductUnfollowOpen, setIsProductUnfollowOpen] = useState(false)

    // function to unfollow the product
    const handleProductUnfollow = () => {
        dispatch(productFollowToggle(product))
    }

    return (
        <>
            <div className="productCardFollow">
                {/* Header */}
                <div className="productCardFollow__header">
                    <AvatarHeader product={product} />

                    {product.isActive && (
                        <div className="follow">
                            <TooltipComp placement={'top'} title={'Unfollow'}>
                                <ButtonComp
                                    typeClass={'primary'}
                                    modifyClass={
                                        loadingProductFollowToggle
                                            ? 'iconButton disabled'
                                            : 'iconButton'
                                    }
                                    handleOnClick={() => setIsProductUnfollowOpen(true)}
                                >
                                    <PinIcon size={18} />
                                </ButtonComp>
                            </TooltipComp>
                        </div>
                    )}
                </div>

                {/* Image */}
                <ProductImage image={product.image.url} name={product.name} />

                {/* Details */}
                <ProductDetails name={product.name} description={product.description} />

                {/* Price */}
                <PriceBox productPrice={product.price} bids={product.bids} />

                {/* Footer */}
                {product.isActive && (
                    <div className="productCardFollow__footer">
                        <BidPlaceInput
                            bidVal={bidVal}
                            setBidVal={setBidVal}
                            product={product}
                            isFollowingScreen={true}
                        />

                        <div style={{ marginLeft: '10px' }}>
                            <ButtonComp
                                typeClass={'secondary'}
                                handleOnClick={() => setIsBidMoreOpen(true)}
                                text={`View Bids(${product.bids.length})`}
                            />
                        </div>
                    </div>
                )}

                {/* Delete Cover */}
                {!product.isActive && (
                    <DeleteCover
                        message={'Product deleted!'}
                        buttonText={'Unfollow Product'}
                        handleOnClick={() => setIsProductUnfollowOpen(true)}
                    />
                )}
            </div>

            {/* All Bids Modal */}
            <BidsAllModal
                bids={product.bids}
                isOpen={isBidMoreOpen}
                setIsOpen={setIsBidMoreOpen}
            />

            {/* Confirm Product Unfollow Modal */}
            <ConfirmModal
                isOpen={isProductUnfollowOpen}
                setIsOpen={setIsProductUnfollowOpen}
                handleOnConfirm={handleProductUnfollow}
                isSecure={false}
                isLoading={loadingProductFollowToggle}
            />
        </>
    )
}

export default ProductCardFollow
