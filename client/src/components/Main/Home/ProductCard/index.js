import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import {
    TagIcon,
    MegaphoneIcon,
    PinIcon,
    PencilIcon,
    TrashIcon,
} from '@primer/octicons-react'
import Avatar from '@material-ui/core/Avatar'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import IconButton from '@material-ui/core/IconButton'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import _ from 'lodash'
import { useHistory } from 'react-router-dom'

import ButtonComp from '../../../utils/ButtonComp'
import BidCard from './BidCard'
import { bidPlace, bidDelete } from '../../../../store/actions/bid'
import { productFollowToggle, productDelete } from '../../../../store/actions/product'
import { alertAdd } from '../../../../store/actions/alert'
import ConfirmModal from '../../../utils/ConfirmModal'
import BidInputLoader from '../../../utils/BidInputLoader'
import BidsAllModal from './BidsAllModal'
import ImageModal from './ImageModal'
import BidEditInput from './BidEditInput'
import './ProductCard.css'

const ProductCard = ({ product }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { user } = useSelector((state) => state.userLogin)
    const { loading: loadingProductDelete, success: successProductDelete } = useSelector(
        (state) => state.productDelete
    )
    const { loading: loadingProductFollowToggle } = useSelector(
        (state) => state.productFollowToggle
    )
    const { loading: loadingBidPlace, success: successBidPlace } = useSelector(
        (state) => state.bidPlace
    )
    const { loading: loadingBidDelete, success: successBidDelete } = useSelector(
        (state) => state.bidDelete
    )

    const [isImageOpen, setIsImageOpen] = useState(false)
    const [isMenuTrayOpen, setIsMenuTrayOpen] = useState(false)
    const [isBidMoreOpen, setIsBidMoreOpen] = useState(false)
    const [isBidEditOpen, setIsBidEditOpen] = useState(false)
    const [bidVal, setBidVal] = useState('')
    const [isUserEligibleToBid, setIsUserEligibleToBid] = useState({ canPlaceBid: true })
    const [isProductDeleteOpen, setIsProductDeleteOpen] = useState(false)
    const [isUserFollow, setIsUserFollow] = useState(false)
    const [isBidDeleteOpen, setIsBidDeleteOpen] = useState(false)

    // function to place a new bid
    const handleBidPlace = () => {
        if (Number(bidVal) >= 0 && bidVal !== '') {
            dispatch(bidPlace(product, Number(bidVal)))
        } else {
            dispatch(alertAdd('Raise a suitable amount!', 'error'))
        }
    }

    // function to check if the logged in user can place a bid on the current product
    const checkUserCanPlaceBid = useCallback(() => {
        for (let i = 0; i < product.bids.length; i++) {
            if (
                String(product.bids[i].bidOwner._id) === String(user.userInfo._id) &&
                product.bids[i].status !== 'REJECTED'
            ) {
                return {
                    canPlaceBid: false,
                    bidID: product.bids[i]._id,
                    bidPrice: product.bids[i].price,
                }
            }
        }
        return { canPlaceBid: true }
    }, [product.bids, user])

    // to update the logged in user's eligibility to place a new bid
    useEffect(() => {
        if ((user && user.userInfo) || successBidPlace) {
            setIsUserEligibleToBid(checkUserCanPlaceBid())
        }
    }, [user, user.userInfo, checkUserCanPlaceBid, successBidPlace])

    // to set the current bidVal based on eligibility criteria
    useEffect(() => {
        if (!isUserEligibleToBid.canPlaceBid) {
            setBidVal(isUserEligibleToBid.bidPrice)
        }
    }, [isUserEligibleToBid])

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

    // checking if the user is follows the current product
    const checkIfUserAlreadyFollow = useCallback(() => {
        if (user.userInfo.following.length > 0) {
            for (let i = 0; i < user.userInfo.following.length; i++) {
                if (typeof user.userInfo.following[0] === 'object') {
                    if (String(user.userInfo.following[i]._id) === String(product._id)) {
                        return true
                    }
                } else {
                    if (String(user.userInfo.following[i]) === String(product._id)) {
                        return true
                    }
                }
            }
            return false
        } else {
            return false
        }
    }, [product._id, user.userInfo.following])

    // to update the logged in user's following status on the current product
    useEffect(() => {
        if (user && user.userInfo) {
            setIsUserFollow(checkIfUserAlreadyFollow())
        }
    }, [user, user.userInfo, checkIfUserAlreadyFollow])

    // function to delete a bid
    const handleBidDelete = () => {
        dispatch(bidDelete(product._id, isUserEligibleToBid.bidID))
    }

    // to clear the bid input field after the bid is deleted
    useEffect(() => {
        if (successBidDelete) {
            setBidVal('')
        }
    }, [successBidDelete])

    return (
        <>
            <div className="productCard">
                {/* Header */}
                <div className="productCard__header">
                    <Avatar
                        src={`avatars/avatar${product.productOwner.avatar}.png`}
                        className="productCard__avatar"
                        onClick={() =>
                            history.push(`/contact/${product.productOwner.username}`)
                        }
                    />
                    <div className="productCard__nameTime">
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
                    {String(user.userInfo._id) === String(product.productOwner._id) && (
                        <>
                            <ClickAwayListener
                                onClickAway={() => setIsMenuTrayOpen(false)}
                            >
                                <IconButton
                                    className="icon"
                                    onClick={() => setIsMenuTrayOpen(!isMenuTrayOpen)}
                                >
                                    <MoreHorizIcon fontSize="large" />
                                </IconButton>
                            </ClickAwayListener>
                            <ul className={isMenuTrayOpen ? 'menuTray open' : 'menuTray'}>
                                <li>Edit</li>
                                <li className="line"></li>
                                <li onClick={() => setIsProductDeleteOpen(true)}>
                                    Delete
                                </li>
                            </ul>
                        </>
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
                        <div
                            className="productCard__bidMore"
                            onClick={() => setIsBidMoreOpen(true)}
                        >
                            <AvatarGroup max={3}>
                                {_.orderBy(product.bids, ['price'], ['desc'])
                                    .slice(2)
                                    .map((bid) => (
                                        <Avatar
                                            key={bid._id}
                                            alt={bid.bidOwner.username}
                                            src={`avatars/avatar${bid.bidOwner.avatar}.png`}
                                            className="avatar"
                                        />
                                    ))}
                            </AvatarGroup>
                        </div>
                    )}
                </div>

                {/* Action */}
                {String(user.userInfo._id) !== String(product.productOwner._id) &&
                    (isUserEligibleToBid.canPlaceBid ? (
                        <div className="productCard__action">
                            <div className="productCard__bidPlace">
                                <MegaphoneIcon size={20} />
                                <input
                                    type="number"
                                    placeholder="Place a bid"
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
                                        value={isUserEligibleToBid.bidPrice}
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
                                bidID={isUserEligibleToBid.bidID}
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

            {/* All Bids Modal */}
            <BidsAllModal
                bids={product.bids}
                isOpen={isBidMoreOpen}
                setIsOpen={setIsBidMoreOpen}
                productOwnerID={product.productOwner._id}
                setIsBidEditOpen={setIsBidEditOpen}
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
