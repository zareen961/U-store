import React, { useState } from 'react'
import { PinIcon } from '@primer/octicons-react'
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import ButtonComp from '../../utils/ButtonComp'
import ProductImage from '../../utils/ProductImage'
import PriceBox from '../../utils/PriceBox'
import ConfirmModal from '../../utils/ConfirmModal'
import BidsAllModal from '../Home/ProductCard/BidsAllModal'
import BidPlaceInput from '../Home/ProductCard/BidPlaceInput'
import { productFollowToggle } from '../../../store/actions/product'
import './ProductCardFollow.css'

const ProductCardFollow = ({ product }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const { loading: loadingProductFollowToggle } = useSelector(
        (state) => state.productFollowToggle
    )

    const [isBidMoreOpen, setIsBidMoreOpen] = useState(false)
    const [isReadMoreOpen, setIsReadMoreOpen] = useState(false)
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
                    <Avatar
                        src={`avatars/avatar${product.productOwner.avatar}.png`}
                        className="productCardFollow__avatar"
                        onClick={() =>
                            history.push(`/contact/${product.productOwner.username}`)
                        }
                    />
                    <div className="productCardFollow__nameTime">
                        <p
                            className="username"
                            onClick={() =>
                                history.push(`/contact/${product.productOwner.username}`)
                            }
                        >
                            @{product.productOwner.username}
                        </p>
                        <span>{moment(product.createdAt).fromNow()}</span>
                    </div>

                    <div className="contact">
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
                    </div>
                </div>

                {/* Image */}
                <ProductImage image={product.image.url} name={product.name} />

                {/* Details */}
                <div className="productCardFollow__productDetails">
                    <h2 className="name">{product.name}</h2>
                    {product.description.length > 90 ? (
                        <p
                            className={
                                isReadMoreOpen ? 'description open' : 'description'
                            }
                        >
                            {product.description.substring(0, 80)}
                            <span>
                                {isReadMoreOpen
                                    ? product.description.substring(80)
                                    : '...'}
                            </span>
                            <button
                                className="readMoreButton"
                                onClick={() => setIsReadMoreOpen(!isReadMoreOpen)}
                            >
                                {isReadMoreOpen ? 'Show Less' : 'Read More'}
                            </button>
                        </p>
                    ) : (
                        <p className="description">{product.description}</p>
                    )}
                </div>

                {/* Price */}
                <PriceBox productPrice={product.price} bids={product.bids} />

                {/* Footer */}
                <div className="productCardFollow__bids">
                    <BidPlaceInput
                        bidVal={bidVal}
                        setBidVal={setBidVal}
                        product={product}
                        isFollowingScreen={true}
                    />

                    <ButtonComp
                        typeClass={'secondary'}
                        handleOnClick={() => setIsBidMoreOpen(true)}
                        text={`View Bids(${product.bids.length})`}
                    />
                </div>
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
