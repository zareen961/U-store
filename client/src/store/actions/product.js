import * as actionTypes from '../actionTypes'
import axiosInstance from '../../utils/axiosInstance'
import { alertAdd } from './ui'
import { handleCache } from '../../utils/handleCache'
import * as api from '../../constants/api'

// to fetch all the Products of the logged in user's college
export const productFetchAll = () => async (dispatch, getState) => {
    const { lastFetch } = getState().productFetchAll

    if (!handleCache(lastFetch)) {
        try {
            dispatch({
                type: actionTypes.PRODUCT_FETCH_ALL_REQUEST,
            })

            const { data } = await axiosInstance.get(api.PRODUCT_FETCH_ALL)

            dispatch({
                type: actionTypes.PRODUCT_FETCH_ALL_SUCCESS,
                payload: data,
            })
        } catch (err) {
            const errorMsg =
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message

            dispatch({
                type: actionTypes.PRODUCT_FETCH_ALL_FAIL,
                payload: errorMsg,
            })

            dispatch(alertAdd(errorMsg, 'error'))
        }
    }
}

// to upload a new Product
export const productUpload = (productData) => async (dispatch, getState) => {
    const {
        user: { userInfo },
    } = getState().userLogin

    const productOwner = {
        _id: userInfo._id,
        username: userInfo.username,
        avatar: userInfo.avatar,
    }

    try {
        dispatch({
            type: actionTypes.PRODUCT_UPLOAD_REQUEST,
        })

        const { data } = await axiosInstance.post(api.PRODUCT_UPLOAD, productData)

        dispatch({
            type: actionTypes.USER_PRODUCT_PUSH_NEW,
            payload: { ...data, productOwner },
        })

        dispatch({
            type: actionTypes.PRODUCT_PUSH_NEW,
            payload: { ...data, productOwner },
        })

        dispatch({
            type: actionTypes.PRODUCT_UPLOAD_SUCCESS,
        })

        dispatch(alertAdd('Product Uploaded!', 'success'))
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.PRODUCT_UPLOAD_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, 'error'))
    }
}

// to edit a Product
export const productEdit = (productID, productData) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.PRODUCT_EDIT_REQUEST,
        })

        await axiosInstance.patch(api.PRODUCT_EDIT(productID), productData)

        dispatch({
            type: actionTypes.USER_PRODUCT_UPDATE_EDITED,
            payload: { productID, updatedProductData: productData },
        })

        dispatch({
            type: actionTypes.PRODUCT_UPDATE_EDITED,
            payload: { productID, updatedProductData: productData },
        })

        dispatch({
            type: actionTypes.PRODUCT_EDIT_SUCCESS,
        })

        dispatch(alertAdd('Product Edited!', 'success'))
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.PRODUCT_EDIT_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, 'error'))
    }
}

// to delete a Product
export const productDelete = (productID, history) => async (dispatch, getState) => {
    const { product: productSingle } = getState().productSingle

    try {
        dispatch({
            type: actionTypes.PRODUCT_DELETE_REQUEST,
        })

        await axiosInstance.delete(api.PRODUCT_DELETE(productID))

        dispatch({
            type: actionTypes.USER_PRODUCT_REMOVE_DELETED,
            payload: { productID },
        })

        dispatch({
            type: actionTypes.PRODUCT_REMOVE_DELETED,
            payload: { productID },
        })

        // if product is deleted from single product screen
        if (productSingle && productSingle._id) {
            dispatch({
                type: actionTypes.PRODUCT_SINGLE_REMOVE_DELETED,
            })

            if (history) {
                history.goBack()
            }
        }

        dispatch({
            type: actionTypes.PRODUCT_DELETE_SUCCESS,
        })

        dispatch(alertAdd('Product Deleted!', 'success'))
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.PRODUCT_DELETE_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, 'error'))
    }
}

// to follow/unfollow a product
export const productFollowToggle = (product) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.PRODUCT_FOLLOW_TOGGLE_REQUEST,
        })

        await axiosInstance.patch(api.PRODUCT_FOLLOW_TOGGLE(product._id))

        dispatch({
            type: actionTypes.USER_FOLLOWING_UPDATE,
            payload: { product },
        })

        dispatch({
            type: actionTypes.PRODUCT_FOLLOW_TOGGLE_SUCCESS,
        })
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.PRODUCT_FOLLOW_TOGGLE_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, 'error'))
    }
}

// to search product among logged in user's college products
export const productSearch = (query) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.PRODUCT_SEARCH_REQUEST,
        })

        const { data } = await axiosInstance.get(api.PRODUCT_SEARCH(query))

        dispatch({
            type: actionTypes.PRODUCT_SEARCH_SUCCESS,
            payload: data,
        })
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.PRODUCT_SEARCH_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, 'error'))
    }
}

// to search product among logged in user's college products
export const productSingleFetch = (productID) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.PRODUCT_SINGLE_FETCH_REQUEST,
        })

        const { data } = await axiosInstance.get(api.PRODUCT_FETCH_SINGLE(productID))

        dispatch({
            type: actionTypes.PRODUCT_NOTIFICATION_PRODUCT_UPDATE,
            payload: data,
        })

        dispatch({
            type: actionTypes.USER_NOTIFICATION_PRODUCT_UPDATE,
            payload: data,
        })

        dispatch({
            type: actionTypes.PRODUCT_SINGLE_FETCH_SUCCESS,
            payload: data,
        })
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.PRODUCT_SINGLE_FETCH_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, 'error'))
    }
}
