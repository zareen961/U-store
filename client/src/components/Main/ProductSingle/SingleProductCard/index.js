import React, { useState } from 'react'
import moment from 'moment'
import { CheckCircleIcon, TagIcon, GraphIcon } from '@primer/octicons-react'
import NumberFormat from 'react-number-format'
import _ from 'lodash'

import ProductDetails from '../../../utils/ProductDetails'
import TooltipComp from '../../../utils/TooltipComp'
import ImageModal from '../../Home/ProductCard/ImageModal'
import './SingleProductCard.css'

const SingleProductCard = ({ product }) => {
    const [isImageOpen, setIsImageOpen] = useState(false)

    const highestBid =
        product.bids.length > 0
            ? _.orderBy(product.bids, ['price'], ['desc'])[0].price
            : 0

    const acceptedBids = product.bids.filter((bid) => bid.status === 'ACCEPTED').length

    return (
        <>
            <div className="singleProductCard">
                <div className="singleProductCard__imageWrapper">
                    <img
                        src={product.image.url}
                        alt={product.name}
                        onClick={() => setIsImageOpen(true)}
                    />

                    <div className="singleProductCard__totalBidsCount">
                        <TooltipComp placement={'right'} title={'Total Bids'}>
                            <h3>{product.bids.length}</h3>
                        </TooltipComp>
                    </div>
                </div>

                <div className="singleProductCard__detailsWrapper">
                    <span className="timestamp">
                        {moment(product.createdAt).fromNow()}
                    </span>
                    <ProductDetails
                        name={product.name}
                        description={product.description}
                    />
                    <div className="singleProductCard__footer">
                        <TooltipComp placement={'top'} title={'Product Price'}>
                            <div className="price">
                                <TagIcon size={22} />
                                <span>
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
                        </TooltipComp>

                        <TooltipComp placement={'top'} title={'Highest Bid'}>
                            <div className="highestBid">
                                <GraphIcon size={22} />
                                <span>
                                    <NumberFormat
                                        value={highestBid}
                                        prefix={'Rs '}
                                        thousandSeparator={true}
                                        displayType={'text'}
                                    />
                                </span>
                            </div>
                        </TooltipComp>

                        <TooltipComp placement={'top'} title={'Accepted Bids'}>
                            <div className="acceptedBids">
                                <CheckCircleIcon size={22} />
                                <span>
                                    {acceptedBids} {acceptedBids > 1 ? 'Bids' : 'Bid'}
                                </span>
                            </div>
                        </TooltipComp>
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            <ImageModal
                isOpen={isImageOpen}
                setIsOpen={setIsImageOpen}
                productImage={product.image.url}
                productName={product.name}
            />
        </>
    )
}

export default SingleProductCard
