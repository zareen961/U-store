import React, { useState } from 'react'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import {
    MegaphoneIcon,
    PencilIcon,
    TrashIcon,
    PersonAddIcon,
} from '@primer/octicons-react'
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import _ from 'lodash'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import ButtonComp from '../../utils/ButtonComp'
import PriceBox from '../../utils/PriceBox'
import ConfirmModal from '../../utils/ConfirmModal'
import ImageModal from '../Home/ProductCard/ImageModal'
import BidsAllModal from '../Home/ProductCard/BidsAllModal'
import BidEditInput from '../Home/ProductCard/BidEditInput'
import { bidDelete } from '../../../store/actions/bid'
import './ProductCardBid.css'

const ProductCardBid = ({ bid }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const { loading: loadingBidDelete } = useSelector((state) => state.bidDelete)

    const [isImageOpen, setIsImageOpen] = useState(false)
    const [isBidMoreOpen, setIsBidMoreOpen] = useState(false)
    const [isReadMoreOpen, setIsReadMoreOpen] = useState(false)
    const [isBidEditOpen, setIsBidEditOpen] = useState(false)
    const [bidVal, setBidVal] = useState(bid.price)
    const [isBidDeleteOpen, setIsBidDeleteOpen] = useState(false)

    // function to delete a bid
    const handleBidDelete = () => {
        dispatch(bidDelete(bid.product._id, bid._id))
    }

    return (
        <>
            <div className="productCardBid">
                {/* Header */}
                <div className="productCardBid__header">
                    <Avatar
                        src={`avatars/avatar${bid.product.productOwner.avatar}.png`}
                        className="productCardBid__avatar"
                        onClick={() =>
                            history.push(`/contact/${bid.product.productOwner.username}`)
                        }
                    />
                    <div className="productCardBid__nameTime">
                        <p
                            className="username"
                            onClick={() =>
                                history.push(
                                    `/contact/${bid.product.productOwner.username}`
                                )
                            }
                        >
                            @{bid.product.productOwner.username}
                        </p>
                        <span>{moment(bid.product.createdAt).fromNow()}</span>
                    </div>

                    <div className="contact">
                        <ButtonComp
                            typeClass={'secondary'}
                            modifyClass={'iconButton'}
                            handleOnClick={() =>
                                history.push(
                                    `/contact/${bid.product.productOwner.username}`
                                )
                            }
                        >
                            <PersonAddIcon size={18} />
                        </ButtonComp>
                    </div>
                </div>

                {/* Image */}
                <div className="productCardBid__image">
                    <img
                        src={bid.product.image.url}
                        alt="sample-product"
                        onClick={() => setIsImageOpen(true)}
                    />
                </div>

                {/* Details */}
                <div className="productCardBid__productDetails">
                    <h2 className="name">{bid.product.name}</h2>
                    {bid.product.description.length > 90 ? (
                        <p
                            className={
                                isReadMoreOpen ? 'description open' : 'description'
                            }
                        >
                            {bid.product.description.substring(0, 80)}
                            <span>
                                {isReadMoreOpen
                                    ? bid.product.description.substring(80)
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
                        <p className="description">{bid.product.description}</p>
                    )}
                </div>

                {/* Price */}
                <PriceBox productPrice={bid.product.price} bids={bid.product.bids} />

                {/* Footer */}
                <div className="productCardBid__bids">
                    <div className="productCardBid__myBid">
                        <MegaphoneIcon size={18} />
                        <h3>My Bid:</h3>
                        <span className="myBidPrice">
                            <NumberFormat
                                value={bid.price}
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
                    <div
                        className="productCardBid__bidMore"
                        onClick={() => setIsBidMoreOpen(true)}
                    >
                        <AvatarGroup max={3}>
                            {_.orderBy(bid.product.bids, ['price'], ['desc']).map(
                                (bid) => (
                                    <Avatar
                                        key={bid._id}
                                        alt={bid.bidOwner.username}
                                        src={`avatars/avatar${bid.bidOwner.avatar}.png`}
                                        className="avatar"
                                    />
                                )
                            )}
                        </AvatarGroup>
                    </div>
                </div>

                {/* Bid Edit Input */}
                <BidEditInput
                    isOpen={isBidEditOpen}
                    setIsOpen={setIsBidEditOpen}
                    bidVal={bidVal}
                    setBidVal={setBidVal}
                    productID={bid.product._id}
                    bidID={bid._id}
                />
            </div>

            {/* Image Modal */}
            <ImageModal
                isOpen={isImageOpen}
                setIsOpen={setIsImageOpen}
                productImage={bid.product.image.url}
                productName={bid.product.name}
            />

            {/* All Bids Modal */}
            <BidsAllModal
                bids={bid.product.bids}
                isOpen={isBidMoreOpen}
                setIsOpen={setIsBidMoreOpen}
                productOwnerID={bid.product.productOwner._id}
                setIsBidEditOpen={setIsBidEditOpen}
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

export default ProductCardBid
