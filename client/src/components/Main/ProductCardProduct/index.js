import React, { useState } from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import IconButton from '@material-ui/core/IconButton'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { TagIcon, MegaphoneIcon, ArrowUpIcon } from '@primer/octicons-react'
import ButtonComp from '../../utils/ButtonComp'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import _ from 'lodash'

import ImageModal from '../Home/ProductCard/ImageModal'
import BidsAllModal from '../Home/ProductCard/BidsAllModal'
import './ProductCardProduct.css'

const ProductCardProduct = ({ product }) => {
    const [isImageOpen, setIsImageOpen] = useState(false)
    const [isMenuTrayOpen, setIsMenuTrayOpen] = useState(false)
    const [isBidMoreOpen, setIsBidMoreOpen] = useState(false)
    const [isReadMoreOpen, setIsReadMoreOpen] = useState(false)

    return (
        <>
            <div className="productCardProduct">
                {/* Header */}
                <div className="productCardProduct__header">
                    <div className="productCardProduct__nameTime">
                        <h2>{product.name}</h2>
                        <span>{moment(product.createdAt).fromNow()}</span>
                    </div>

                    <ClickAwayListener onClickAway={() => setIsMenuTrayOpen(false)}>
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
                        <li>Delete</li>
                    </ul>
                </div>

                {/* Image */}
                <div className="productCardProduct__image">
                    <img
                        src={product.image.url}
                        alt={product.name}
                        onClick={() => setIsImageOpen(true)}
                    />
                </div>

                {/* Details */}
                <div className="productCardProduct__productDetails">
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
                <div className="productCardProduct__price">
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
                <div className="productCardProduct__bids">
                    <div className="productCardProduct__bidsCount">
                        <MegaphoneIcon size={18} />
                        <h3>Total Bids:</h3>
                        <span className="bidsCount">{product.bids.length}</span>
                    </div>
                    <ButtonComp
                        typeClass={'secondary'}
                        handleOnClick={() => setIsBidMoreOpen(true)}
                        text={'View Bids'}
                    />
                </div>
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
            />
        </>
    )
}

export default ProductCardProduct
