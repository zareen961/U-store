import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    TagIcon,
    MegaphoneIcon,
    PinIcon,
    PencilIcon,
    TrashIcon,
} from '@primer/octicons-react'
import NumberFormat from 'react-number-format'
import _ from 'lodash'

import ButtonComp from '../../../utils/ButtonComp'
import BidCard from './BidCard'
import { bidDelete } from '../../../../store/actions/bid'
import { productFollowToggle, productDelete } from '../../../../store/actions/product'
import ConfirmModal from '../../../utils/ConfirmModal'
import ImageModal from './ImageModal'
import BidEditInput from './BidEditInput'
import BidPlaceInput from './BidPlaceInput'
import DotsMenu from './DotsMenu'
import AvatarHeader from './AvatarHeader'
import BidMoreAvatars from './BidMoreAvatars'
import { getUserLatestBid } from '../../../../utils/getUserLatestBid'
import { checkIfUserFollow } from '../../../../utils/checkIfUserFollow'
import './ProductCard.css'

const ProductCard = ({ product }) => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.userLogin)
    const { loading: loadingProductDelete, success: successProductDelete } = useSelector(
        (state) => state.productDelete
    )
    const { loading: loadingProductFollowToggle } = useSelector(
        (state) => state.productFollowToggle
    )
    const { success: successBidPlace } = useSelector((state) => state.bidPlace)
    const { loading: loadingBidDelete, success: successBidDelete } = useSelector(
        (state) => state.bidDelete
    )

    const [isImageOpen, setIsImageOpen] = useState(false)
    const [isBidMoreOpen, setIsBidMoreOpen] = useState(false)
    const [isBidEditOpen, setIsBidEditOpen] = useState(false)
    const [bidVal, setBidVal] = useState('')
    const [userLatestBid, setUserLatestBid] = useState({ canPlaceBid: true, price: '' })
    const [isProductDeleteOpen, setIsProductDeleteOpen] = useState(false)
    const [isUserFollow, setIsUserFollow] = useState(false)
    const [isBidDeleteOpen, setIsBidDeleteOpen] = useState(false)

    // getting/updating the latest bid (if any) of the logged in user on the current product
    useEffect(() => {
        if ((user && user.userInfo) || successBidPlace) {
            setUserLatestBid(getUserLatestBid(product.bids, user.userInfo._id))
        }
    }, [user, user.userInfo, successBidPlace, product.bids])

    // to set the current bidVal based on the user's latest bid
    useEffect(() => {
        if (!userLatestBid.canPlaceBid) {
            setBidVal(userLatestBid.price)
        }
    }, [userLatestBid])

    // product delete function
    const handleProductDelete = () => {
        dispatch(productDelete(product._id))
    }

    // to close the confirm modal on product delete success
    useEffect(() => {
        if (successProductDelete) {
            setIsProductDeleteOpen(false)
        }
    }, [successProductDelete])

    // to update the logged in user's following status on the current product
    useEffect(() => {
        if (user && user.userInfo) {
            setIsUserFollow(checkIfUserFollow(user.userInfo.following, product._id))
        }
    }, [user, user.userInfo, product._id])

    // function to delete a bid
    const handleBidDelete = () => {
        dispatch(bidDelete(product._id, userLatestBid._id))
    }

    // to clear the bid input field after the bid is deleted
    useEffect(() => {
        if (successBidDelete) {
            setBidVal('')
            setIsBidDeleteOpen(false)
        }
    }, [successBidDelete])

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

                {/* Action */}
                {String(user.userInfo._id) !== String(product.productOwner._id) &&
                    (userLatestBid.canPlaceBid ? (
                        <div className="productCard__action">
                            <BidPlaceInput
                                bidVal={bidVal}
                                setBidVal={setBidVal}
                                product={product}
                            />

                            <ButtonComp
                                typeClass={isUserFollow ? 'primary' : 'secondary'}
                                handleOnClick={() =>
                                    dispatch(productFollowToggle(product))
                                }
                                text={isUserFollow ? 'Unfollow' : 'Follow'}
                                modifyClass={loadingProductFollowToggle ? 'disabled' : ''}
                            >
                                <PinIcon size={18} />
                            </ButtonComp>
                        </div>
                    ) : (
                        <div className="productCard__action">
                            <div className="productCard__myBid">
                                <MegaphoneIcon size={18} />
                                <h3>My Bid:</h3>
                                <span className="myBidPrice">
                                    <NumberFormat
                                        value={userLatestBid.price}
                                        prefix={'Rs '}
                                        thousandSeparator={true}
                                        displayType={'text'}
                                    />
                                </span>
                            </div>
                            <ButtonComp
                                typeClass={'primary'}
                                modifyClass={'iconButton'}
                                handleOnClick={() => setIsBidEditOpen(true)}
                            >
                                <PencilIcon size={18} />
                            </ButtonComp>
                            <ButtonComp
                                typeClass={'secondary'}
                                modifyClass={'iconButton'}
                                handleOnClick={() => setIsBidDeleteOpen(true)}
                            >
                                <TrashIcon size={18} />
                            </ButtonComp>

                            {/* Bid Edit Input */}
                            <BidEditInput
                                isOpen={isBidEditOpen}
                                setIsOpen={setIsBidEditOpen}
                                bidVal={bidVal}
                                setBidVal={setBidVal}
                                productID={product._id}
                                bidID={userLatestBid._id}
                            />
                        </div>
                    ))}
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

            {/* Confirm Bid Delete Modal */}
            <ConfirmModal
                isOpen={isBidDeleteOpen}
                setIsOpen={setIsBidDeleteOpen}
                handleOnConfirm={handleBidDelete}
                isSecure={false}
                isLoading={loadingBidDelete}
            />
        </>
    )
}

export default ProductCard
