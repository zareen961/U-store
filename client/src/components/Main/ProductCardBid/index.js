import React, { useState } from 'react'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import {
    TagIcon,
    MegaphoneIcon,
    PencilIcon,
    TrashIcon,
    PersonAddIcon,
    ArrowUpIcon,
} from '@primer/octicons-react'
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import _ from 'lodash'
import { useHistory } from 'react-router-dom'

import ButtonComp from '../../utils/ButtonComp'
import ImageModal from '../Home/ProductCard/ImageModal'
import BidsAllModal from '../Home/ProductCard/BidsAllModal'
import BidEditInput from '../Home/ProductCard/BidEditInput'
import './ProductCardBid.css'

const ProductCardBid = ({ bid }) => {
    const history = useHistory()

    const [isImageOpen, setIsImageOpen] = useState(false)
    const [isBidMoreOpen, setIsBidMoreOpen] = useState(false)
    const [isReadMoreOpen, setIsReadMoreOpen] = useState(false)
    const [isBidEditOpen, setIsBidEditOpen] = useState(false)
    const [bidVal, setBidVal] = useState(bid.price)

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
                            handleOnClick={() => {}}
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
                <div className="productCardBid__price">
                    <div className="sellerPrice">
                        <div className="priceWrapper">
                            <TagIcon size={18} />
                            <h3>Price</h3>
                        </div>
                        <span className="price">
                            {bid.product.price === 0 ? (
                                'Free'
                            ) : (
                                <NumberFormat
                                    value={bid.product.price}
                                    prefix={'Rs '}
                                    thousandSeparator={true}
                                    displayType={'text'}
                                />
                            )}
                        </span>
                    </div>
                    <div className="highestBid">
                        <div className="priceWrapper">
                            <ArrowUpIcon size={18} />
                            <h3>Highest Bid</h3>
                        </div>
                        <span className="price">
                            {_.orderBy(bid.product.bids, ['price'], ['desc'])[0] ? (
                                <NumberFormat
                                    value={
                                        _.orderBy(
                                            bid.product.bids,
                                            ['price'],
                                            ['desc']
                                        )[0].price
                                    }
                                    prefix={'Rs '}
                                    thousandSeparator={true}
                                    displayType={'text'}
                                />
                            ) : (
                                <small>No bids yet!</small>
                            )}
                        </span>
                    </div>
                </div>

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
                        handleOnClick={() => {}}
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
            />
        </>
    )
}

export default ProductCardBid
