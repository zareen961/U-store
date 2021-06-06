import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { TagIcon, MegaphoneIcon, PinIcon, XIcon } from '@primer/octicons-react'
import Avatar from '@material-ui/core/Avatar'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import IconButton from '@material-ui/core/IconButton'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import _ from 'lodash'
import { useHistory } from 'react-router-dom'

import ButtonComp from '../../../utils/ButtonComp'
import ModalComp from '../../../utils/ModalComp'
import BidCard from './BidCard'
import { bidPlace } from '../../../../store/actions/bid'
import { productFollowToggle, productDelete } from '../../../../store/actions/product'
import { alertAdd } from '../../../../store/actions/alert'
import ConfirmModal from '../../../utils/ConfirmModal'
import BidInputLoader from '../../../utils/BidInputLoader'
import './ProductCard.css'

const ProductCard = ({ product }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { user } = useSelector((state) => state.userLogin)
    const { loading: loadingBidPlace, success: successBidPlace } = useSelector(
        (state) => state.bidPlace
    )
    const { loading: loadingProductDelete, success: successProductDelete } = useSelector(
        (state) => state.productDelete
    )

    const [isImageOpen, setIsImageOpen] = useState(false)
    const [isMenuTrayOpen, setIsMenuTrayOpen] = useState(false)
    const [isBidMoreOpen, setIsBidMoreOpen] = useState(false)
    const [bidVal, setBidVal] = useState('')
    const [isUserEligibleToBid, setIsUserEligibleToBid] = useState({ canPlaceBid: true })
    const [isProductDeleteOpen, setIsProductDeleteOpen] = useState(false)

    const handleBidPlace = () => {
        if (bidVal >= 0 && bidVal !== '') {
            dispatch(bidPlace(product._id, bidVal))
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
                return { canPlaceBid: false, bidPrice: product.bids[i].price }
            }
        }
        return { canPlaceBid: true }
    }, [product.bids, user])

    useEffect(() => {
        if (user && user.userInfo) {
            setIsUserEligibleToBid(checkUserCanPlaceBid())
        }
    }, [user, user.userInfo, checkUserCanPlaceBid])

    useEffect(() => {
        if (successBidPlace) {
            setBidVal('')
            setIsUserEligibleToBid(checkUserCanPlaceBid())
        }
    }, [successBidPlace, checkUserCanPlaceBid])

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
                            {product.productOwner.username}
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
                            .map((bid) => <BidCard key={bid._id} bid={bid} />)
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
                {String(user.userInfo._id) !== String(product.productOwner._id) && (
                    <div className="productCard__action">
                        <div className="productCard__bidPlace">
                            <MegaphoneIcon size={20} />
                            <input
                                type="number"
                                placeholder={
                                    isUserEligibleToBid.canPlaceBid
                                        ? 'Place a bid'
                                        : `Active: Rs ${isUserEligibleToBid?.bidPrice}`
                                }
                                value={bidVal}
                                disabled={!isUserEligibleToBid.canPlaceBid}
                                onChange={(e) => setBidVal(e.target.value)}
                            />
                            <ButtonComp
                                typeClass={'primary'}
                                handleOnClick={handleBidPlace}
                                modifyClass={
                                    isUserEligibleToBid.canPlaceBid
                                        ? 'insideInputButton'
                                        : 'insideInputButton disabled'
                                }
                                text={'Place'}
                            />

                            <BidInputLoader isLoading={loadingBidPlace} />
                        </div>
                        <ButtonComp
                            typeClass={'secondary'}
                            handleOnClick={() => {}}
                            text={'Follow'}
                        >
                            <PinIcon size={18} />
                        </ButtonComp>
                    </div>
                )}
            </div>

            {/* Image Modal */}
            <ModalComp
                isOpen={isImageOpen}
                handleOnClose={() => setIsImageOpen(false)}
                maxWidth={'lg'}
            >
                <div className="productCard__imageModal">
                    <img src={product.image.url} alt={product.name} />
                    <div className="closeButtonWrapper">
                        <ButtonComp
                            typeClass={'secondary'}
                            modifyClass={'iconButton'}
                            handleOnClick={() => setIsImageOpen(false)}
                        >
                            <XIcon size={18} />
                        </ButtonComp>
                    </div>
                </div>
            </ModalComp>

            {/* All Bids Modal */}
            <ModalComp
                isOpen={isBidMoreOpen}
                handleOnClose={() => setIsBidMoreOpen(false)}
            >
                <div className="productCard__moreBids">
                    <div className="productCard__moreBidsHeader">
                        <h1>All Bids</h1>
                        <ButtonComp
                            typeClass={'secondary'}
                            modifyClass={'iconButton'}
                            handleOnClick={() => setIsBidMoreOpen(false)}
                        >
                            <XIcon size={18} />
                        </ButtonComp>
                    </div>
                    {_.orderBy(product.bids, ['price'], ['desc']).map((bid) => (
                        <BidCard key={bid._id} bid={bid} />
                    ))}
                </div>
            </ModalComp>

            {/* Confirm Delete Modal */}
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
