import React from 'react'
import moment from 'moment'
import { CheckCircleIcon, TagIcon, GraphIcon } from '@primer/octicons-react'
import NumberFormat from 'react-number-format'

import ProductDetails from '../../../utils/ProductDetails'
import TooltipComp from '../../../utils/TooltipComp'
import './ContactProductCard.css'

const ContactProductCard = ({ product }) => {
    const acceptedBids = product.bids.filter((bid) => bid.status === 'ACCEPTED').length
    return (
        <div className="contactProductCard">
            <div className="contactProductCard__imageWrapper">
                <img src={product.image.url} alt={product.name} />

                <TooltipComp placement={'right'} title={'Total Bids'}>
                    <div className="contactCard__totalBidsCount">
                        {/* <h3>{product.totalBids}</h3> */}
                        <h3>{5}</h3>
                    </div>
                </TooltipComp>
            </div>

            <div className="contactProductCard__detailsWrapper">
                <span className="timestamp">{moment(product.createdAt).fromNow()}</span>
                <ProductDetails name={product.name} description={product.description} />
                <div className="contactProductCard__footer">
                    <TooltipComp placement={'top'} title={'Product Price'}>
                        <div className="price">
                            <TagIcon size={18} />
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
                            <GraphIcon size={18} />
                            <span>
                                <NumberFormat
                                    value={product.highestBid}
                                    prefix={'Rs '}
                                    thousandSeparator={true}
                                    displayType={'text'}
                                />
                            </span>
                        </div>
                    </TooltipComp>

                    <TooltipComp placement={'top'} title={'Accepted Bids'}>
                        <div className="acceptedBids">
                            <CheckCircleIcon size={18} />
                            <span>
                                {acceptedBids} {acceptedBids > 1 ? 'Bids' : 'Bid'}
                            </span>
                        </div>
                    </TooltipComp>
                </div>
            </div>
        </div>
    )
}

export default ContactProductCard
