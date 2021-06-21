import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SearchIcon, XIcon } from '@primer/octicons-react'
import IconButton from '@material-ui/core/IconButton'

import { productSearch } from '../../../../store/actions/product'
import { PRODUCT_SEARCH_CLEANUP } from '../../../../store/actionTypes'
import './SearchBar.css'

const DEBOUNCE_TIME = 2000

let timeout
const debounce = (func, delay) => {
    clearTimeout(timeout)
    timeout = setTimeout(func, delay)
}

const SearchBar = () => {
    const dispatch = useDispatch()
    const { loading, result } = useSelector((state) => state.productSearch)

    const [query, setQuery] = useState('')

    const handleSearchCall = useCallback(() => {
        if (query) {
            dispatch(productSearch(query))
        }
    }, [query, dispatch])

    useEffect(() => {
        debounce(handleSearchCall, DEBOUNCE_TIME)
    }, [handleSearchCall])

    // to clean earlier results once the query is cleared
    useEffect(() => {
        if (query === '') {
            dispatch({ type: PRODUCT_SEARCH_CLEANUP })
        }
    }, [query, dispatch])

    return (
        <div className="searchBar">
            <SearchIcon size={18} />
            <input
                id="searchInputID"
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)
                }}
            />
            {query && (
                <IconButton onClick={() => setQuery('')} className="searchBar__clearIcon">
                    <XIcon size={18} />
                </IconButton>
            )}
        </div>
    )
}

export default SearchBar
