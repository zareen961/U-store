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

        case actionTypes.USER_POPULATE_PRODUCTS:
            return {
                ...state,
                user: {
                    ...state.user,
                    userInfo: { ...state.user.userInfo, products: action.payload },
                },
            }

        case actionTypes.USER_POPULATE_BIDS:
            return {
                ...state,
                user: {
                    ...state.user,
                    userInfo: { ...state.user.userInfo, bids: action.payload },
                },
            }

        case actionTypes.USER_POPULATE_FOLLOWING:
            return {
                ...state,
                user: {
                    ...state.user,
                    userInfo: { ...state.user.userInfo, following: action.payload },
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
            if (
                state.user.userInfo.products.length > 0 &&
                typeof state.user.userInfo.products[0] !== 'object'
            ) {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        userInfo: {
                            ...state.user.userInfo,
                            products: state.user.userInfo.products.filter(
                                (productID) => productID !== action.payload
                            ),
                        },
                    },
                }
            } else {
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
            }

        case actionTypes.USER_PRODUCT_UPDATE_EDITED:
            if (
                state.user.userInfo.products.length > 0 &&
                typeof state.user.userInfo.products[0] !== 'object'
            ) {
                return state
            } else {
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
            if (
                state.user.userInfo.bids.length > 0 &&
                typeof state.user.userInfo.bids[0] !== 'object'
            ) {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        userInfo: {
                            ...state.user.userInfo,
                            bids: state.user.userInfo.bids.filter(
                                (bidID) => bidID !== action.payload
                            ),
                        },
                    },
                }
            } else {
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
            }

        case actionTypes.USER_BID_UPDATE_UPDATED_STATUS:
            if (
                state.user.userInfo.products.length > 0 &&
                typeof state.user.userInfo.products[0] !== 'object'
            ) {
                return state
            } else {
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
                                            ? {
                                                  ...bid,
                                                  status: action.payload.newBidStatus,
                                              }
                                            : bid
                                    )
                                }
                                return product
                            }),
                        },
                    },
                }
            }

        case actionTypes.USER_BID_UPDATE_UPDATED_PRICE:
            if (
                state.user.userInfo.bids.length > 0 &&
                typeof state.user.userInfo.bids[0] !== 'object'
            ) {
                return state
            } else {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        userInfo: {
                            ...state.user.userInfo,
                            bids: state.user.userInfo.bids.map((bid) => {
                                if (bid._id === action.payload.bidID) {
                                    return {
                                        ...bid,
                                        price: action.payload.newBidPrice,
                                        product: {
                                            ...bid.product,
                                            bids: bid.product.bids.map((innerBid) => {
                                                if (
                                                    innerBid._id === action.payload.bidID
                                                ) {
                                                    return {
                                                        ...innerBid,
                                                        price: action.payload.newBidPrice,
                                                    }
                                                } else {
                                                    return innerBid
                                                }
                                            }),
                                        },
                                    }
                                } else {
                                    return bid
                                }
                            }),
                        },
                    },
                }
            }

        case actionTypes.USER_FOLLOWING_UPDATE:
            if (
                state.user.userInfo.following.length > 0 &&
                typeof state.user.userInfo.following[0] !== 'object'
            ) {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        userInfo: {
                            ...state.user.userInfo,
                            following: state.user.userInfo.following.includes(
                                action.payload._id
                            )
                                ? state.user.userInfo.following.filter(
                                      (productID) => productID !== action.payload._id
                                  )
                                : [action.payload._id, ...state.user.userInfo.following],
                        },
                    },
                }
            } else {
                let isAlreadyFollowed = false
                let updatedFollowingArray = []

                for (let i = 0; i < state.user.userInfo.following.length; i++) {
                    if (
                        state.user.userInfo.following[i]._id ===
                        String(action.payload._id)
                    ) {
                        isAlreadyFollowed = true
                    } else {
                        updatedFollowingArray.push(state.user.userInfo.following[i])
                    }
                }

                if (!isAlreadyFollowed) {
                    updatedFollowingArray.unshift(action.payload)
                }

                return {
                    ...state,
                    user: {
                        ...state.user,
                        userInfo: {
                            ...state.user.userInfo,
                            following: updatedFollowingArray,
                        },
                    },
                }
            }

        case actionTypes.USER_FOLLOWING_UPDATE_ON_BID_PLACE:
            if (
                state.user.userInfo.following.length > 0 &&
                typeof state.user.userInfo.following[0] !== 'object'
            ) {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        userInfo: {
                            ...state.user.userInfo,
                            following: state.user.userInfo.following.filter(
                                (productID) => productID !== action.payload.productID
                            ),
                        },
                    },
                }
            } else {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        userInfo: {
                            ...state.user.userInfo,
                            following: state.user.userInfo.following.filter(
                                (product) => product._id !== action.payload.productID
                            ),
                        },
                    },
                }
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

export const userContactDetailsReducer = (
    state = { loading: false, contactDetails: {}, error: null, success: false },
    action
) => {
    switch (action.type) {
        case actionTypes.USER_FETCH_CONTACT_REQUEST:
            return {
                ...state,
                contactDetails: {},
                loading: true,
                error: null,
                success: false,
            }

        case actionTypes.USER_FETCH_CONTACT_SUCCESS:
            return {
                ...state,
                loading: false,
                contactDetails: action.payload,
                error: null,
                success: true,
            }

        case actionTypes.USER_FETCH_CONTACT_FAIL:
            return {
                ...state,
                loading: false,
                contactDetails: {},
                error: action.payload,
                success: false,
            }

        default:
            return state
    }
}

export const userProductsReducer = (
    state = { loading: false, error: null, success: false, lastFetch: null },
    action
) => {
    switch (action.type) {
        case actionTypes.USER_FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
                lastFetch: null,
            }

        case actionTypes.USER_FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true,
                lastFetch: Date.now(),
            }

        case actionTypes.USER_FETCH_PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
                lastFetch: null,
            }

        case actionTypes.USER_PRODUCTS_CLEANUP:
            return {
                ...state,
                loading: false,
                error: null,
                success: false,
                lastFetch: null,
            }

        default:
            return state
    }
}

export const userBidsReducer = (
    state = { loading: false, error: null, success: false, lastFetch: null },
    action
) => {
    switch (action.type) {
        case actionTypes.USER_FETCH_BIDS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
                lastFetch: null,
            }

        case actionTypes.USER_FETCH_BIDS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true,
                lastFetch: Date.now(),
            }

        case actionTypes.USER_FETCH_BIDS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
                lastFetch: null,
            }

        case actionTypes.USER_BIDS_CLEANUP:
            return {
                ...state,
                loading: false,
                error: null,
                success: false,
                lastFetch: null,
            }

        default:
            return state
    }
}

export const userFollowingReducer = (
    state = { loading: false, error: null, success: false, lastFetch: null },
    action
) => {
    switch (action.type) {
        case actionTypes.USER_FETCH_FOLLOWING_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
                lastFetch: null,
            }

        case actionTypes.USER_FETCH_FOLLOWING_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true,
                lastFetch: Date.now(),
            }

        case actionTypes.USER_FETCH_FOLLOWING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
                lastFetch: null,
            }

        case actionTypes.USER_FOLLOWING_CLEANUP:
            return {
                ...state,
                loading: false,
                error: null,
                success: false,
                lastFetch: null,
            }

        default:
            return state
    }
}
