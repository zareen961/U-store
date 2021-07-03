import * as actionTypes from '../actionTypes'
import axiosInstance from '../../utils/axiosInstance'
import { alertAdd } from './ui'
import { handleCache } from '../../utils/handleCache'
import { setAuthHeader } from '../../utils/setAxiosHeaders'
import * as api from '../../constants/api'
import { notificationLoginAndLogoutAction } from './notification'

// to fetch all the colleges data
export const collegeFetchData = () => async (dispatch, getState) => {
    const { lastFetch } = getState().college

    if (!handleCache(lastFetch)) {
        try {
            dispatch({
                type: actionTypes.COLLEGE_FETCH_ALL_REQUEST,
            })

            const { data } = await axiosInstance.get(api.COLLEGE_FETCH)

            dispatch({
                type: actionTypes.COLLEGE_FETCH_ALL_SUCCESS,
                payload: data,
            })
        } catch (err) {
            const errorMsg =
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message

            dispatch({
                type: actionTypes.COLLEGE_FETCH_ALL_FAIL,
                payload: errorMsg,
            })

            dispatch(alertAdd(errorMsg, 'error'))
        }
    }
}

// to get all the details of logged in user
export const userFetch = () => async (dispatch) => {
    let token
    if (localStorage.getItem('ustore__user')) {
        token = JSON.parse(localStorage.getItem('ustore__user')).token
    }

    try {
        dispatch({
            type: actionTypes.USER_FETCH_REQUEST,
        })

        const { data } = await axiosInstance.get(api.USER_FETCH)

        dispatch({
            type: actionTypes.USER_FETCH_SUCCESS,
            payload: { userInfo: data, token },
        })
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.USER_FETCH_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, 'error'))
    }
}

// to register a new User
export const userRegister = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.USER_REGISTER_REQUEST,
        })

        await axiosInstance.post(api.USER_REGISTER, userData)

        dispatch({
            type: actionTypes.USER_REGISTER_SUCCESS,
        })

        dispatch(alertAdd('User Registered!', 'success'))
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.USER_REGISTER_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, 'error'))
    }
}

// to login an existing User
export const userLogin = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.USER_LOGIN_REQUEST,
        })

        const { data } = await axiosInstance.post(api.USER_LOGIN, userData)

        if (data && data.token) {
            localStorage.setItem('ustore__user', JSON.stringify({ token: data.token }))
        }

        if (localStorage.getItem('ustore__user')) {
            const token = JSON.parse(localStorage.getItem('ustore__user')).token
            setAuthHeader(token)
        }

        dispatch({
            type: actionTypes.USER_LOGIN_SUCCESS,
            payload: data,
        })

        dispatch(alertAdd('User Logged In!', 'success'))
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.USER_LOGIN_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, 'error'))
    }
}

// to update an User details
export const userUpdate = (userData, currentPassword) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.USER_UPDATE_REQUEST,
        })

        await axiosInstance.patch(api.USER_UPDATE, {
            ...userData,
            currentPassword,
        })

        dispatch({
            type: actionTypes.USER_UPDATE_UPDATED,
            payload: { ...userData, password: null },
        })

        dispatch({
            type: actionTypes.USER_UPDATE_SUCCESS,
        })

        dispatch(alertAdd('User Details Updated!', 'success'))
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.USER_UPDATE_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, 'error'))
    }
}

// to logout an User
export const userLogout = (history) => (dispatch) => {
    // unsubscribing the current logged in user from all the topics
    const notificationClientToken = localStorage.getItem(
        'ustore__notificationClientToken'
    )
    if (notificationClientToken) {
        dispatch(notificationLoginAndLogoutAction('UNSUBSCRIBE'))
    }

    // store cleanups
    dispatch({ type: actionTypes.USER_LOGOUT })
    dispatch({ type: actionTypes.PRODUCT_CLEANUP })
    dispatch({ type: actionTypes.USER_PRODUCTS_CLEANUP })
    dispatch({ type: actionTypes.USER_BIDS_CLEANUP })
    dispatch({ type: actionTypes.USER_FOLLOWING_CLEANUP })
    dispatch({ type: actionTypes.PRODUCT_SINGLE_CLEANUP })
    dispatch({ type: actionTypes.NOTIFICATION_CLEANUP })

    // redirecting to home route after user is logged out
    if (history) {
        history.replace('/')
    }

    // clearing the user from localStorage
    localStorage.removeItem('ustore__user')

    // removing the auth header
    setAuthHeader()

    dispatch(alertAdd('User Logged out!', 'success'))
}

// to delete an User
export const userDelete = (password, history) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.USER_DELETE_REQUEST,
        })

        await axiosInstance.delete(api.USER_DELETE, { data: { password } })

        dispatch(userLogout(history))

        dispatch({
            type: actionTypes.USER_DELETE_SUCCESS,
        })

        dispatch(alertAdd('User Deleted!', 'success'))
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.USER_DELETE_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, 'error'))
    }
}

// to get the contact details of any user
export const userFetchContact =
    ({ username, productID }) =>
    async (dispatch) => {
        try {
            dispatch({
                type: actionTypes.USER_FETCH_CONTACT_REQUEST,
            })

            const { data } = await axiosInstance.get(api.USER_FETCH_CONTACT(username), {
                headers: { productID },
            })

            dispatch({
                type: actionTypes.USER_FETCH_CONTACT_SUCCESS,
                payload: data,
            })
        } catch (err) {
            const errorMsg =
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message

            dispatch({
                type: actionTypes.USER_FETCH_CONTACT_FAIL,
                payload: errorMsg,
            })

            dispatch(alertAdd(errorMsg, 'error'))
        }
    }

// to fetch all the products of logged in user
export const userFetchProducts = () => async (dispatch, getState) => {
    const { lastFetch } = getState().userProducts

    if (!handleCache(lastFetch)) {
        try {
            dispatch({
                type: actionTypes.USER_FETCH_PRODUCTS_REQUEST,
            })

            const { data } = await axiosInstance.get(api.USER_FETCH_PRODUCTS)

            dispatch({
                type: actionTypes.USER_POPULATE_PRODUCTS,
                payload: data,
            })

            dispatch({
                type: actionTypes.USER_FETCH_PRODUCTS_SUCCESS,
            })
        } catch (err) {
            const errorMsg =
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message

            dispatch({
                type: actionTypes.USER_FETCH_PRODUCTS_FAIL,
                payload: errorMsg,
            })

            dispatch(alertAdd(errorMsg, 'error'))
        }
    }
}

// to fetch all the bids of logged in user
export const userFetchBids = () => async (dispatch, getState) => {
    const { lastFetch } = getState().userBids

    if (!handleCache(lastFetch)) {
        try {
            dispatch({
                type: actionTypes.USER_FETCH_BIDS_REQUEST,
            })

            const { data } = await axiosInstance.get(api.USER_FETCH_BIDS)

            dispatch({
                type: actionTypes.USER_POPULATE_BIDS,
                payload: data,
            })

            dispatch({
                type: actionTypes.USER_FETCH_BIDS_SUCCESS,
            })
        } catch (err) {
            const errorMsg =
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message

            dispatch({
                type: actionTypes.USER_FETCH_BIDS_FAIL,
                payload: errorMsg,
            })

            dispatch(alertAdd(errorMsg, 'error'))
        }
    }
}

// to fetch all the followed products of logged in user
export const userFetchFollowing = () => async (dispatch, getState) => {
    const { lastFetch } = getState().userFollowing

    if (!handleCache(lastFetch)) {
        try {
            dispatch({
                type: actionTypes.USER_FETCH_FOLLOWING_REQUEST,
            })

            const { data } = await axiosInstance.get(api.USER_FETCH_FOLLOWING)

            dispatch({
                type: actionTypes.USER_POPULATE_FOLLOWING,
                payload: data,
            })

            dispatch({
                type: actionTypes.USER_FETCH_FOLLOWING_SUCCESS,
            })
        } catch (err) {
            const errorMsg =
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message

            dispatch({
                type: actionTypes.USER_FETCH_FOLLOWING_FAIL,
                payload: errorMsg,
            })

            dispatch(alertAdd(errorMsg, 'error'))
        }
    }
}
