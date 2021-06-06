import React, { useState } from 'react'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import {
    TagIcon,
    MegaphoneIcon,
    XIcon,
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
import ModalComp from '../../utils/ModalComp'
import BidCard from '../Home/ProductCard/BidCard'
import './ProductCardBid.css'

const ProductCardBid = ({ bid }) => {
    const history = useHistory()

    const [isImageOpen, setIsImageOpen] = useState(false)
    const [isBidMoreOpen, setIsBidMoreOpen] = useState(false)
    const [isReadMoreOpen, setIsReadMoreOpen] = useState(false)
    const [isBidEditOpen, setIsBidEditOpen] = useState(false)

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
                            {bid.product.productOwner.username}
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
                <div
                    className={
                        isBidEditOpen
                            ? 'productCardBid__bidEditWrapper open'
                            : 'productCardBid__bidEditWrapper'
                    }
                >
                    <div className="productCard__bidEdit">
                        <MegaphoneIcon size={20} />
                        <input type="number" placeholder="Adjust your bid" />
                        <ButtonComp
                            typeClass={'primary'}
                            handleOnClick={() => {}}
                            modifyClass={'insideInputButton'}
                            text={'Update'}
                        />
                    </div>
                    <ButtonComp
                        typeClass={'secondary'}
                        handleOnClick={() => setIsBidEditOpen(false)}
                        modifyClass={'iconButton'}
                    >
                        <XIcon size={18} />
                    </ButtonComp>
                </div>
            </div>

            {/* Image Modal */}
            <ModalComp
                isOpen={isImageOpen}
                handleOnClose={() => setIsImageOpen(false)}
                maxWidth={'lg'}
            >
                <div className="productCard__imageModal">
                    <img src={bid.product.image.url} alt={bid.product.name} />
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
                    {_.orderBy(bid.product.bids, ['price'], ['desc']).map((bid) => (
                        <BidCard key={bid._id} bid={bid} />
                    ))}
                </div>
            </ModalComp>
        </>
    )
}

export default ProductCardBid
