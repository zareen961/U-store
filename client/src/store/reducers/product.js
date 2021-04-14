import * as actionTypes from "../actionTypes"

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
                products: [],
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
                products: [],
                lastFetch: null,
            }

        case actionTypes.PRODUCT_REMOVE_DELETED:
            return {
                ...state,
                products: state.products.filter(
                    (product) => product._id !== action.payload
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
                    product._id === action.payload._id ? action.payload : product
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

        case action.Types.BID_PUSH_NEW:
            return {
                ...state,
                products: state.product.map((product) => {
                    if (product._id === action.payload.productID) {
                        product.bids = [action.payload.bid, ...product.bids]
                    }
                    return product
                }),
            }

        case action.Types.BID_UPDATE_UPDATED:
            return {
                ...state,
                products: state.product.map((product) => {
                    if (product._id === action.payload.productID) {
                        product.bids = product.bids.map((bid) => {
                            bid.status =
                                bid._id === action.payload.bidID
                                    ? action.payload.newBidStatus
                                    : bid.status
                            return bid
                        })
                    }
                    return product
                }),
            }

        case actionTypes.PRODUCT_CLEANUP:
            return {
                ...state,
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
