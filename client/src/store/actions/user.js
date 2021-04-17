import * as actionTypes from '../actionTypes'
import axiosInstance from '../../utils/axiosInstance'
import { alertAdd } from './alert'
import { handleCache } from '../../utils/handleCache'
import setAuthHeader from '../../utils/setAuthHeader'

// to fetch all the colleges data
export const collegeFetchData = () => async (dispatch, getState) => {
    const { lastFetch } = getState().college

    if (!handleCache(lastFetch)) {
        try {
            dispatch({
                type: actionTypes.COLLEGE_FETCH_ALL_REQUEST,
            })

            const { data } = await axiosInstance.get('/api/college')

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

// to register a new User
export const userRegister = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.USER_REGISTER_REQUEST,
        })

        await axiosInstance.post('/api/user', userData)

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

        const { data } = await axiosInstance.post('/api/user/login', userData)

        dispatch({
            type: actionTypes.USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('user', JSON.stringify(data))

        if (localStorage.getItem('user')) {
            const token = JSON.parse(localStorage.getItem('user')).token
            setAuthHeader(token)
        }

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

        const { data } = await axiosInstance.patch('/api/user', {
            ...userData,
            currentPassword,
        })

        dispatch({
            type: actionTypes.USER_UPDATE_SUCCESS,
        })

        dispatch({
            type: actionTypes.USER_UPDATE_UPDATED,
            payload: data,
        })

        if (localStorage.getItem('user')) {
            const token = JSON.parse(localStorage.getItem('user')).token
            localStorage.setItem('user', JSON.stringify({ ...data, token }))
        }

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
export const userLogout = () => (dispatch) => {
    localStorage.removeItem('user')
    dispatch({ type: actionTypes.USER_LOGOUT })
    dispatch({ type: actionTypes.PRODUCT_CLEANUP })
    dispatch(alertAdd('User Logged out!', 'success'))
}

// to delete an User
export const userDelete = (password) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.USER_DELETE_REQUEST,
        })

        await axiosInstance.delete('/api/user', { data: { password } })

        dispatch({
            type: actionTypes.USER_DELETE_SUCCESS,
        })

        dispatch(userLogout())

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
