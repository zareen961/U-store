import React, { useState } from 'react'
import { MegaphoneIcon, PinIcon } from '@primer/octicons-react'
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import ButtonComp from '../../utils/ButtonComp'
import ProductImage from '../../utils/ProductImage'
import PriceBox from '../../utils/PriceBox'
import ConfirmModal from '../../utils/ConfirmModal'
import BidInputLoader from '../../utils/BidInputLoader'
import BidsAllModal from '../Home/ProductCard/BidsAllModal'
import { bidPlace } from '../../../store/actions/bid'
import { alertAdd } from '../../../store/actions/alert'
import { productFollowToggle } from '../../../store/actions/product'
import './ProductCardFollow.css'

const ProductCardFollow = ({ product }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const { loading: loadingBidPlace } = useSelector((state) => state.bidPlace)
    const { loading: loadingProductFollowToggle } = useSelector(
        (state) => state.productFollowToggle
    )

    const [isBidMoreOpen, setIsBidMoreOpen] = useState(false)
    const [isReadMoreOpen, setIsReadMoreOpen] = useState(false)
    const [bidVal, setBidVal] = useState('')
    const [isProductUnfollowOpen, setIsProductUnfollowOpen] = useState(false)

    // function to place a new bid
    const handleBidPlace = () => {
        if (Number(bidVal) >= 0 && bidVal !== '') {
            dispatch(bidPlace(product, Number(bidVal), history))
        } else {
            dispatch(alertAdd('Raise a suitable amount!', 'error'))
        }
    }

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
                    <div className="productCardFollow__bidPlace">
                        <MegaphoneIcon size={20} />
                        <input
                            type="number"
                            placeholder="Place"
                            value={bidVal}
                            onChange={(e) => setBidVal(e.target.value)}
                        />
                        <ButtonComp
                            typeClass={'primary'}
                            handleOnClick={handleBidPlace}
                            modifyClass="insideInputButton"
                            text={'Place'}
                        />

                        <BidInputLoader isLoading={loadingBidPlace} />
                    </div>

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
