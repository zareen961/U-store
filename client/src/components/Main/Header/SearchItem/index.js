import React from 'react'
import NumberFormat from 'react-number-format'
import { TagIcon } from '@primer/octicons-react'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { productSingleFetch } from '../../../../store/actions/product'
import { getViewportWidth } from '../../../../utils/getViewport'
import './SearchItem.scss'

const SearchItem = ({ product, setQuery }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const productSlug = product.name.toLowerCase().split(' ').join('-')

    const handleSearchResultOnClick = () => {
        dispatch(productSingleFetch(product._id))
        history.push(`/products/${productSlug}`)

        // to auto scroll to main screen when a search result is clicked
        if (getViewportWidth() < 1000) {
            const mainBodyElement = document.querySelector('.main__bodyWrapper')
            const fullWidth = mainBodyElement.scrollWidth - mainBodyElement.clientWidth
            const currentScrollPos = mainBodyElement.scrollLeft

            if (
                currentScrollPos > fullWidth / 3 &&
                currentScrollPos < (fullWidth / 3) * 2
            ) {
                // don't scroll ---> already on the main screen
            } else {
                if (currentScrollPos < fullWidth / 3 + 50) {
                    // currently on sidebar left panel
                    mainBodyElement.scrollLeft = currentScrollPos + getViewportWidth()
                } else if (currentScrollPos > (fullWidth / 3) * 2 - 50) {
                    // currently on notification panel
                    mainBodyElement.scrollLeft = currentScrollPos - getViewportWidth()
                }
            }

            //  close the results panel
            setQuery('')
        }
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
