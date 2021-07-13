import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SearchIcon, XIcon } from '@primer/octicons-react'
import IconButton from '@material-ui/core/IconButton'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

import { productSearch } from '../../../../store/actions/product'
import { PRODUCT_SEARCH_CLEANUP } from '../../../../store/actionTypes'
import SearchItem from '../SearchItem'
import Loader from '../../../utils/Loader'
import { debounce } from '../../../../utils/debounce'
import { DEBOUNCE_TIME_IN_MILLISECONDS } from '../../../../constants/vars'
import { getViewportWidth } from '../../../../utils/getViewport'
import UnderlineButtonComp from '../../../utils/UnderlineButtonComp'
import './SearchBar.scss'

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
        debounce(handleSearchCall, DEBOUNCE_TIME_IN_MILLISECONDS)
    }, [handleSearchCall])

    // to clean earlier results once the query is cleared
    useEffect(() => {
        if (query === '') {
            dispatch({ type: PRODUCT_SEARCH_CLEANUP })
        }
    }, [query, dispatch])

    // to auto close the search results panel when clicked outside
    const handleClickAway = () => {
        if (getViewportWidth() > 1000) {
            setQuery('')
        }
    }

    return (
        <div className="searchBar">
            <ClickAwayListener onClickAway={handleClickAway}>
                <div className="searchBar__inputWrapper">
                    <SearchIcon size={18} />
                    <input
                        id="searchInputID"
                        type="text"
                        placeholder="Search"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value)
                        }}
                        autoComplete="new-password"
                    />
                    {query && (
                        <IconButton
                            onClick={() => setQuery('')}
                            className="searchBar__clearIcon"
                        >
                            <XIcon size={18} />
                        </IconButton>
                    )}
                </div>
            </ClickAwayListener>

            {(loading || result) && (
                <div className="searchBar__resultWrapper">
                    {loading ? (
                        <div className="searchBar__loaderWrapper">
                            <Loader />
                        </div>
                    ) : result && result.length === 0 ? (
                        <p className="searchBar__message">No results found!</p>
                    ) : (
                        result &&
                        result.map((product) => (
                            <SearchItem
                                product={product}
                                key={product._id}
                                setQuery={setQuery}
                            />
                        ))
                    )}

                    {getViewportWidth() < 1000 && (
                        <div className="searchBar__closeButtonWrapper">
                            <UnderlineButtonComp
                                text={'Close'}
                                handleOnClick={() => setQuery('')}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchBar
