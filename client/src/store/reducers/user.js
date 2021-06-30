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

        case actionTypes.USER_PRODUCT_REMOVE_DELETED: {
            let updatedProductsArray = []

            if (
                state.user.userInfo.products.length > 0 &&
                typeof state.user.userInfo.products[0] !== 'object'
            ) {
                updatedProductsArray = state.user.userInfo.products.filter(
                    (productID) => productID !== action.payload.productID
                )
            } else {
                updatedProductsArray = state.user.userInfo.products.filter(
                    (product) => product._id !== action.payload.productID
                )
            }

            return {
                ...state,
                user: {
                    ...state.user,
                    userInfo: {
                        ...state.user.userInfo,
                        products: updatedProductsArray,
                    },
                },
            }
        }

        case actionTypes.USER_PRODUCT_UPDATE_EDITED: {
            let updatedProductsArray = []

            if (
                state.user.userInfo.products.length > 0 &&
                typeof state.user.userInfo.products[0] !== 'object'
            ) {
                updatedProductsArray = state.user.userInfo.products
            } else {
                updatedProductsArray = state.user.userInfo.products.map((product) =>
                    product._id === action.payload.productID
                        ? { ...product, ...action.payload.updatedProductData }
                        : product
                )
            }

            return {
                ...state,
                user: {
                    ...state.user,
                    userInfo: {
                        ...state.user.userInfo,
                        products: updatedProductsArray,
                    },
                },
            }
        }

        case actionTypes.USER_BID_PUSH_NEW: {
            let updatedBidsArray = []

            if (
                state.user.userInfo.bids.length > 0 &&
                Object.keys(state.user.userInfo.bids[0]).length <= 2
            ) {
                updatedBidsArray = state.user.userInfo.bids

                // checking if there is already a bid on the same product
                const indexOfBid = state.user.userInfo.bids.findIndex(
                    (bid) => bid.product === action.payload.product._id
                )

                // if no bid is found on the same product
                if (indexOfBid === -1) {
                    updatedBidsArray.unshift({
                        _id: action.payload.newBid._id,
                        product: action.payload.product._id,
                    })
                }
            } else {
                updatedBidsArray = state.user.userInfo.bids.filter(
                    (product) => product._id !== action.payload.product._id
                )
                updatedBidsArray.unshift({
                    ...action.payload.product,
                    bids: [action.payload.newBid, ...action.payload.product.bids],
                })
            }

            return {
                ...state,
                user: {
                    ...state.user,
                    userInfo: {
                        ...state.user.userInfo,
                        bids: updatedBidsArray,
                    },
                },
            }
        }

        case actionTypes.USER_BID_REMOVE_DELETED: {
            let updatedBidsArray = []

            if (
                state.user.userInfo.bids.length > 0 &&
                Object.keys(state.user.userInfo.bids[0]).length <= 2
            ) {
                updatedBidsArray = state.user.userInfo.bids.filter(
                    (bid) => bid._id !== action.payload.bidID
                )
            } else {
                state.user.userInfo.bids.forEach((product) => {
                    if (product._id === action.payload.productID) {
                        product.bids = product.bids.filter(
                            (bid) => bid._id !== action.payload.bidID
                        )
                    }

                    // check if there is at least one bid of the logged in user on the current product
                    if (
                        product.bids.filter(
                            (bid) => bid.bidOwner._id === state.user.userInfo._id
                        ).length > 0
                    ) {
                        updatedBidsArray.push(product)
                    }
                })
            }

            return {
                ...state,
                user: {
                    ...state.user,
                    userInfo: {
                        ...state.user.userInfo,
                        bids: updatedBidsArray,
                    },
                },
            }
        }

        case actionTypes.USER_BID_UPDATE_UPDATED_STATUS: {
            let updatedProductsArray = []

            if (
                state.user.userInfo.products.length > 0 &&
                typeof state.user.userInfo.products[0] !== 'object'
            ) {
                updatedProductsArray = state.user.userInfo.products
            } else {
                updatedProductsArray = state.user.userInfo.products.map((product) => {
                    if (product._id === action.payload.productID) {
                        product.bids = product.bids.map((bid) =>
                            bid._id === action.payload.bidID
                                ? { ...bid, status: action.payload.newBidStatus }
                                : bid
                        )
                    }
                    return product
                })
            }

            return {
                ...state,
                user: {
                    ...state.user,
                    userInfo: {
                        ...state.user.userInfo,
                        products: updatedProductsArray,
                    },
                },
            }
        }

        case actionTypes.USER_BID_UPDATE_UPDATED_PRICE: {
            let updatedBidsArray = []

            if (
                state.user.userInfo.bids.length > 0 &&
                Object.keys(state.user.userInfo.bids[0]).length <= 2
            ) {
                updatedBidsArray = state.user.userInfo.bids
            } else {
                updatedBidsArray = state.user.userInfo.bids.map((product) => {
                    if (product._id === action.payload.productID) {
                        product.bids = product.bids.map((bid) =>
                            bid._id === action.payload.bidID
                                ? { ...bid, price: action.payload.newBidPrice }
                                : bid
                        )
                    }
                    return product
                })
            }

            return {
                ...state,
                user: {
                    ...state.user,
                    userInfo: {
                        ...state.user.userInfo,
                        bids: updatedBidsArray,
                    },
                },
            }
        }

        case actionTypes.USER_FOLLOWING_UPDATE: {
            let updatedFollowingArray = []

            if (
                state.user.userInfo.following.length > 0 &&
                typeof state.user.userInfo.following[0] !== 'object'
            ) {
                updatedFollowingArray = state.user.userInfo.following.includes(
                    action.payload.product._id
                )
                    ? state.user.userInfo.following.filter(
                          (productID) => productID !== action.payload.product._id
                      )
                    : [action.payload.product._id, ...state.user.userInfo.following]
            } else {
                let isAlreadyFollowed = false

                for (let i = 0; i < state.user.userInfo.following.length; i++) {
                    if (
                        state.user.userInfo.following[i]._id ===
                        String(action.payload.product._id)
                    ) {
                        isAlreadyFollowed = true
                    } else {
                        updatedFollowingArray.push(state.user.userInfo.following[i])
                    }
                }

                if (!isAlreadyFollowed) {
                    updatedFollowingArray.unshift(action.payload.product)
                }
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

        case actionTypes.USER_FOLLOWING_UPDATE_ON_BID_PLACE: {
            let updatedFollowingArray = []

            if (
                state.user.userInfo.following.length > 0 &&
                typeof state.user.userInfo.following[0] !== 'object'
            ) {
                updatedFollowingArray = state.user.userInfo.following.filter(
                    (productID) => productID !== action.payload.productID
                )
            } else {
                updatedFollowingArray = state.user.userInfo.following.filter(
                    (product) => product._id !== action.payload.productID
                )
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

        case actionTypes.USER_NOTIFICATION_PRODUCT_UPDATE:
            let updatedUserProducts = state.user.userInfo.products
            let updatedUserBids = state.user.userInfo.bids
            let updatedUserFollowing = state.user.userInfo.following
            let isFound = false

            if (
                state.user.userInfo.products.length > 0 &&
                typeof state.user.userInfo.products[0] === 'object' &&
                !isFound
            ) {
                updatedUserProducts = state.user.userInfo.products.map((product) => {
                    if (product._id === action.payload._id) {
                        isFound = true
                        return action.payload
                    }
                    return product
                })
            }

            if (
                state.user.userInfo.bids.length > 0 &&
                Object.keys(state.user.userInfo.bids[0]).length > 2 &&
                !isFound
            ) {
                updatedUserBids = state.user.userInfo.bids.map((product) => {
                    if (product._id === action.payload._id) {
                        isFound = true
                        return action.payload
                    }
                    return product
                })
            }

            if (
                state.user.userInfo.following.length > 0 &&
                typeof state.user.userInfo.following[0] === 'object' &&
                !isFound
            ) {
                updatedUserFollowing = state.user.userInfo.following.map((product) => {
                    if (product._id === action.payload._id) {
                        isFound = true
                        return action.payload
                    }
                    return product
                })
            }

            return {
                ...state,
                user: {
                    ...state.user,
                    userInfo: {
                        ...state.user.userInfo,
                        products: updatedUserProducts,
                        bids: updatedUserBids,
                        following: updatedUserFollowing,
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

export const userContactDetailsReducer = (
    state = {
        loading: false,
        contactData: { contact: {}, product: {} },
        error: null,
        success: false,
    },
    action
) => {
    switch (action.type) {
        case actionTypes.USER_FETCH_CONTACT_REQUEST:
            return {
                ...state,
                contactData: { contact: {}, product: {} },
                loading: true,
                error: null,
                success: false,
            }

        case actionTypes.USER_FETCH_CONTACT_SUCCESS:
            return {
                ...state,
                loading: false,
                contactData: action.payload,
                error: null,
                success: true,
            }

        case actionTypes.USER_FETCH_CONTACT_FAIL:
            return {
                ...state,
                loading: false,
                contactData: { contact: {}, product: {} },
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
