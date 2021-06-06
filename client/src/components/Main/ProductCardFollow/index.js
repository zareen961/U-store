import React, { useState } from 'react'
import {
    TagIcon,
    MegaphoneIcon,
    XIcon,
    ArrowUpIcon,
    PinIcon,
} from '@primer/octicons-react'
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import _ from 'lodash'
import { useHistory } from 'react-router-dom'

import ButtonComp from '../../utils/ButtonComp'
import ModalComp from '../../utils/ModalComp'
import BidCard from '../Home/ProductCard/BidCard'
import './ProductCardFollow.css'

const ProductCardFollow = ({ product }) => {
    const history = useHistory()

    const [isImageOpen, setIsImageOpen] = useState(false)
    const [isBidMoreOpen, setIsBidMoreOpen] = useState(false)
    const [isReadMoreOpen, setIsReadMoreOpen] = useState(false)

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
                            {product.productOwner.username}
                        </p>
                        <span>{moment(product.createdAt).fromNow()}</span>
                    </div>

                    <div className="contact">
                        <ButtonComp
                            typeClass={'secondary'}
                            modifyClass={'iconButton'}
                            handleOnClick={() => {}}
                        >
                            <PinIcon size={18} />
                        </ButtonComp>
                    </div>
                </div>

                {/* Image */}
                <div className="productCardFollow__image">
                    <img
                        src={product.image.url}
                        alt="sample-product"
                        onClick={() => setIsImageOpen(true)}
                    />
                </div>

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
                <div className="productCardFollow__price">
                    <div className="sellerPrice">
                        <div className="priceWrapper">
                            <TagIcon size={18} />
                            <h3>Price</h3>
                        </div>
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
                    <div className="highestBid">
                        <div className="priceWrapper">
                            <ArrowUpIcon size={18} />
                            <h3>Highest Bid</h3>
                        </div>
                        <span className="price">
                            {_.orderBy(product.bids, ['price'], ['desc'])[0] ? (
                                <NumberFormat
                                    value={
                                        _.orderBy(product.bids, ['price'], ['desc'])[0]
                                            .price
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
                <div className="productCardFollow__bids">
                    <div className="productCardFollow__bidPlace">
                        <MegaphoneIcon size={20} />
                        <input type="number" placeholder="Place a bid" />
                        <ButtonComp
                            typeClass={'primary'}
                            handleOnClick={() => {}}
                            modifyClass={'insideInputButton'}
                            text={'Place'}
                        />
                    </div>

                    <ButtonComp
                        typeClass={'secondary'}
                        handleOnClick={() => setIsBidMoreOpen(true)}
                        text={'View Bids'}
                    />
                </div>
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
        </>
    )
}

export default ProductCardFollow
