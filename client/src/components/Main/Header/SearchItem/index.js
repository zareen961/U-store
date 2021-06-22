import React from 'react'
import NumberFormat from 'react-number-format'
import { TagIcon } from '@primer/octicons-react'
import moment from 'moment'

import './SearchItem.css'

const SearchItem = ({ product }) => {
    return (
        <div className="searchItem">
            <div className="searchItem__image">
                <img src={product.image} alt="product" />
            </div>
            <div className="searchItem__detailsWrapper">
                <h3>{`${
                    product.name.length > 13
                        ? `${product.name.substring(0, 13)}...`
                        : product.name
                }`}</h3>
                <p>{`@${product.productOwner}`}</p>
            </div>
            <div className="searchItem__priceWrapper">
                <TagIcon />
                <p>
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
                </p>
            </div>

            <span className="timestamp">{moment(product.createdAt).fromNow()}</span>
        </div>
    )
}

export default SearchItem
