import * as actionTypes from '../actionTypes'

export const productFetchAllReducer = (
    state = {
        loading: false,
        error: null,
        success: false,
        products: [],
        lastFetch: null,
    },
    action
) => {
    switch (action.type) {
        case actionTypes.PRODUCT_FETCH_ALL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
                lastFetch: null,
            }

        case actionTypes.PRODUCT_FETCH_ALL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true,
                products: action.payload,
                lastFetch: Date.now(),
            }

        case actionTypes.PRODUCT_FETCH_ALL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
                lastFetch: null,
            }

        case actionTypes.PRODUCT_REMOVE_DELETED:
            return {
                ...state,
                products: state.products.filter(
                    (product) => product._id !== action.payload.productID
                ),
            }

        case actionTypes.PRODUCT_PUSH_NEW:
            return {
                ...state,
                products: [action.payload, ...state.products],
            }

        case actionTypes.PRODUCT_UPDATE_EDITED:
            return {
                ...state,
                products: state.products.map((product) =>
                    product._id === action.payload.productID
                        ? { ...product, ...action.payload.updatedProductData }
                        : product
                ),
            }

        case actionTypes.BID_REMOVE_DELETED:
            return {
                ...state,
                products: state.products.map((product) => {
                    if (product._id === action.payload.productID) {
                        product.bids = product.bids.filter(
                            (bid) => bid._id !== action.payload.bidID
                        )
                    }
                    return product
                }),
            }

        case actionTypes.BID_PUSH_NEW:
            return {
                ...state,
                products: state.products.map((product) => {
                    if (product._id === action.payload.productID) {
                        product.bids = [action.payload.bid, ...product.bids]
                    }
                    return product
                }),
            }

        case actionTypes.BID_UPDATE_UPDATED_STATUS:
            return {
                ...state,
                products: state.products.map((product) => {
                    if (product._id === action.payload.productID) {
                        product.bids = product.bids.map((bid) =>
                            bid._id === action.payload.bidID
                                ? { ...bid, status: action.payload.newBidStatus }
                                : bid
                        )
                    }
                    return product
                }),
            }

        case actionTypes.BID_UPDATE_UPDATED_PRICE:
            return {
                ...state,
                products: state.products.map((product) => {
                    if (product._id === action.payload.productID) {
                        product.bids = product.bids.map((bid) =>
                            bid._id === action.payload.bidID
                                ? { ...bid, price: action.payload.newBidPrice }
                                : bid
                        )
                    }
                    return product
                }),
            }

        case actionTypes.PRODUCT_NOTIFICATION_PRODUCT_UPDATE:
            let updatedProducts = state.products
                .map((product) =>
                    product._id === action.payload._id ? action.payload : product
                )
                .filter((product) => product.isActive)

            return {
                ...state,
                products: updatedProducts,
            }

        case actionTypes.PRODUCT_CLEANUP:
            return {
                ...state,
                loading: false,
                error: null,
                success: false,
                products: [],
                lastFetch: null,
            }

        default:
            return state
    }
}

export const productUploadReducer = (
    state = { loading: false, error: null, success: false },
    action
) => {
    switch (action.type) {
        case actionTypes.PRODUCT_UPLOAD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
            }

        case actionTypes.PRODUCT_UPLOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true,
            }

        case actionTypes.PRODUCT_UPLOAD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            }

        default:
            return state
    }
}

export const productEditReducer = (
    state = { loading: false, error: null, success: false },
    action
) => {
    switch (action.type) {
        case actionTypes.PRODUCT_EDIT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
            }

        case actionTypes.PRODUCT_EDIT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true,
            }

        case actionTypes.PRODUCT_EDIT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            }

        default:
            return state
    }
}

export const productDeleteReducer = (
    state = { loading: false, error: null, success: false },
    action
) => {
    switch (action.type) {
        case actionTypes.PRODUCT_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
            }

        case actionTypes.PRODUCT_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true,
            }

        case actionTypes.PRODUCT_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            }

        default:
            return state
    }
}

export const productFollowToggleReducer = (
    state = { loading: false, error: null, success: false },
    action
) => {
    switch (action.type) {
        case actionTypes.PRODUCT_FOLLOW_TOGGLE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
            }

        case actionTypes.PRODUCT_FOLLOW_TOGGLE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true,
            }

        case actionTypes.PRODUCT_FOLLOW_TOGGLE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            }
        default:
            return state
    }
}

export const productSearchReducer = (
    state = { loading: false, result: null, error: null, success: false },
    action
) => {
    switch (action.type) {
        case actionTypes.PRODUCT_SEARCH_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                result: null,
                success: false,
            }

        case actionTypes.PRODUCT_SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                result: action.payload,
                success: true,
            }

        case actionTypes.PRODUCT_SEARCH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                result: null,
                success: false,
            }

        case actionTypes.PRODUCT_SEARCH_CLEANUP:
            return {
                ...state,
                loading: false,
                error: null,
                result: null,
                success: false,
            }

        default:
            return state
    }
}

export const productSingleFetchReducer = (
    state = { loading: false, product: { bids: [] }, error: null, success: false },
    action
) => {
    switch (action.type) {
        case actionTypes.PRODUCT_SINGLE_FETCH_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                product: { bids: [] },
                success: false,
            }

        case actionTypes.PRODUCT_SINGLE_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                product: action.payload,
                success: true,
            }

        case actionTypes.PRODUCT_SINGLE_FETCH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                product: { bids: [] },
                success: false,
            }

        case actionTypes.PRODUCT_SINGLE_REMOVE_DELETED:
            return {
                ...state,
                product: { bids: [] },
            }

        case actionTypes.PRODUCT_SINGLE_BID_PUSH_NEW:
            return {
                ...state,
                product: {
                    ...state.product,
                    bids: [action.payload.bid, ...state.product.bids],
                },
            }

        case actionTypes.PRODUCT_SINGLE_BID_UPDATE_UPDATED_PRICE: {
            return {
                ...state,
                product: {
                    ...state.product,
                    bids: state.product.bids.map((bid) =>
                        bid._id === action.payload.bidID
                            ? { ...bid, price: action.payload.newBidPrice }
                            : bid
                    ),
                },
            }
        }

        case actionTypes.PRODUCT_SINGLE_BID_UPDATE_UPDATED_STATUS: {
            return {
                ...state,
                product: {
                    ...state.product,
                    bids: state.product.bids.map((bid) =>
                        bid._id === action.payload.bidID
                            ? { ...bid, status: action.payload.newBidStatus }
                            : bid
                    ),
                },
            }
        }

        case actionTypes.PRODUCT_SINGLE_BID_REMOVE_DELETED: {
            return {
                ...state,
                product: {
                    ...state.product,
                    bids: state.product.bids.filter(
                        (bid) => bid._id !== action.payload.bidID
                    ),
                },
            }
        }

        case actionTypes.PRODUCT_SINGLE_CLEANUP:
            return {
                ...state,
                loading: false,
                error: null,
                product: { bids: [] },
                success: false,
            }

        default:
            return state
    }
}
