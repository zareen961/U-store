import React from 'react'
import NumberFormat from 'react-number-format'
import _ from 'lodash'
import { TagIcon, ArrowUpIcon } from '@primer/octicons-react'

import './PriceBox.scss'

const PriceBox = ({ productPrice, bids }) => {
    return (
        <div className="priceBox">
            <div>
                <div className="priceBox__priceWrapper">
                    <TagIcon size={18} />
                    <h3>Price</h3>
                </div>
                <span className="priceBox__price">
                    {productPrice === 0 ? (
                        'Free'
                    ) : (
                        <NumberFormat
                            value={productPrice}
                            prefix={'Rs '}
                            thousandSeparator={true}
                            displayType={'text'}
                        />
                    )}
                </span>
            </div>
            <div>
                <div className="priceBox__priceWrapper">
                    <ArrowUpIcon size={18} />
                    <h3>Highest Bid</h3>
                </div>
                <span className="priceBox__price">
                    {_.orderBy(bids, ['price'], ['desc'])[0] ? (
                        <NumberFormat
                            value={_.orderBy(bids, ['price'], ['desc'])[0].price}
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
    )
}

export default PriceBox
