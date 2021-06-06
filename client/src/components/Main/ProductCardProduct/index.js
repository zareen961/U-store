import React, { useState } from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import IconButton from '@material-ui/core/IconButton'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { TagIcon, MegaphoneIcon, XIcon, ArrowUpIcon } from '@primer/octicons-react'
import ButtonComp from '../../utils/ButtonComp'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import _ from 'lodash'

import ModalComp from '../../utils/ModalComp'
import BidCard from '../Home/ProductCard/BidCard'
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
                            <NumberFormat
                                value={
                                    _.orderBy(product.bids, ['price'], ['desc'])[0].price
                                }
                                prefix={'Rs '}
                                thousandSeparator={true}
                                displayType={'text'}
                            />
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

export default ProductCardProduct
