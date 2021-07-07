import React from 'react'
import NumberFormat from 'react-number-format'
import { TagIcon } from '@primer/octicons-react'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { productSingleFetch } from '../../../../store/actions/product'
import './SearchItem.scss'

const SearchItem = ({ product }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const productSlug = product.name.toLowerCase().split(' ').join('-')

    const handleSearchResultOnClick = () => {
        dispatch(productSingleFetch(product._id))
        history.push(`/products/${productSlug}`)
    }

    return (
        <div className="searchItem" onClick={handleSearchResultOnClick}>
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
