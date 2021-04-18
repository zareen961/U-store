import * as actionTypes from '../actionTypes'

export const collegeReducer = (
    state = { loading: false, error: null, success: false, data: [], lastFetch: null },
    action
) => {
    switch (action.type) {
        case actionTypes.COLLEGE_FETCH_ALL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
                lastFetch: null,
            }

        case actionTypes.COLLEGE_FETCH_ALL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true,
                data: action.payload,
                lastFetch: Date.now(),
            }

        case actionTypes.COLLEGE_FETCH_ALL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
                lastFetch: null,
            }

        default:
            return state
    }
}

export const userRegisterReducer = (
    state = { loading: false, error: null, success: false },
    action
) => {
    switch (action.type) {
        case actionTypes.USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
            }

        case actionTypes.USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true,
            }

        case actionTypes.USER_REGISTER_FAIL:
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

export const userLoginReducer = (
    state = { loading: false, user: null, error: null, success: false },
    action
) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_REQUEST:
        case actionTypes.USER_FETCH_REQUEST:
            return {
                ...state,
                loading: true,
                user: null,
                error: null,
                success: false,
            }

        case actionTypes.USER_LOGIN_SUCCESS:
        case actionTypes.USER_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: null,
                success: true,
            }

        case actionTypes.USER_LOGIN_FAIL:
        case actionTypes.USER_FETCH_FAIL:
            return {
                ...state,
                loading: false,
                user: null,
                error: action.payload,
                success: false,
            }

        case actionTypes.USER_LOGOUT:
            return {
                ...state,
                loading: false,
                user: null,
                error: null,
                success: false,
            }

        case actionTypes.USER_UPDATE_UPDATED:
            return {
                ...state,
                user: {
                    ...state.user,
                    userInfo: { ...state.user.userInfo, ...action.payload },
                },
            }

        case actionTypes.USER_PRODUCT_PUSH_NEW:
            return {
                ...state,
                user: {
                    ...state.user,
                    userInfo: {
                        ...state.user.userInfo,
                        products: [action.payload, ...state.user.userInfo.products],
                    },
                },
            }

        case actionTypes.USER_PRODUCT_REMOVE_DELETED:
            return {
                ...state,
                user: {
                    ...state.user,
                    userInfo: {
                        ...state.user.userInfo,
                        products: state.user.userInfo.products.filter(
                            (product) => product._id !== action.payload
                        ),
                    },
                },
            }

        case actionTypes.USER_PRODUCT_UPDATE_EDITED:
            return {
                ...state,
                user: {
                    ...state.user,
                    userInfo: {
                        ...state.user.userInfo,
                        products: state.user.userInfo.products.map((product) =>
                            product._id === action.payload._id
                                ? { ...product, ...action.payload }
                                : product
                        ),
                    },
                },
            }

        case actionTypes.USER_BID_PUSH_NEW:
            return {
                ...state,
                user: {
                    ...state.user,
                    userInfo: {
                        ...state.user.userInfo,
                        bids: [action.payload, ...state.user.userInfo.bids],
                    },
                },
            }

        case actionTypes.USER_BID_REMOVE_DELETED:
            return {
                ...state,
                user: {
                    ...state.user,
                    userInfo: {
                        ...state.user.userInfo,
                        bids: state.user.userInfo.bids.filter(
                            (bid) => bid._id !== action.payload
                        ),
                    },
                },
            }

        case actionTypes.USER_BID_UPDATE_UPDATED:
            return {
                ...state,
                user: {
                    ...state.user,
                    userInfo: {
                        ...state.user.userInfo,
                        products: state.user.userInfo.products.map((product) => {
                            if (product._id === action.payload.productID) {
                                product.bids = product.bids.map((bid) =>
                                    bid._id === action.payload.bidID
                                        ? { ...bid, status: action.payload.newBidStatus }
                                        : bid
                                )
                            }
                            return product
                        }),
                    },
                },
            }

        default:
            return state
    }
}

export const userUpdateReducer = (
    state = { loading: false, error: null, success: false },
    action
) => {
    switch (action.type) {
        case actionTypes.USER_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
            }

        case actionTypes.USER_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true,
            }

        case actionTypes.USER_UPDATE_FAIL:
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

export const userDeleteReducer = (
    state = { loading: false, error: null, success: false },
    action
) => {
    switch (action.type) {
        case actionTypes.USER_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
            }

        case actionTypes.USER_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true,
            }

        case actionTypes.USER_DELETE_FAIL:
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
