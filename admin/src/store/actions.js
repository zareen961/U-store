import { v4 } from 'uuid'

import axiosInstance from '../utils/axiosInstance'
import * as actionTypes from './actionTypes'
import setAuthHeader from '../utils/setAuthHeader'

// to add an Alert
export const alertAdd = (msg, alertType, timeout = 5000) => (dispatch) => {
    const _id = v4()
    dispatch({
        type: actionTypes.ALERT_ADD,
        payload: { _id, msg, alertType },
    })

    setTimeout(
        () =>
            dispatch({
                type: actionTypes.ALERT_REMOVE,
                payload: _id,
            }),
        timeout
    )
}

// to fetch all the Admins
export const adminFetchAll = () => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.ADMIN_FETCH_ALL_REQUEST,
        })

        const { data } = await axiosInstance.get('/api/admin')

        dispatch({
            type: actionTypes.ADMIN_FETCH_ALL_SUCCESS,
            payload: data,
        })
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.ADMIN_FETCH_ALL_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, 'error'))
    }
}

// to register a new Admin
export const adminRegister = (adminData) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.ADMIN_REGISTER_REQUEST,
        })

        const { data } = await axiosInstance.post('/api/admin', adminData)

        dispatch({
            type: actionTypes.ADMIN_REGISTER_SUCCESS,
        })

        dispatch({
            type: actionTypes.ADMIN_PUSH_NEW,
            payload: data,
        })

        dispatch(alertAdd('New Admin Registered!', 'error'))
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.ADMIN_REGISTER_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, 'error'))
    }
}

// to log in an existing Admin
export const adminLogin = (adminData) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.ADMIN_LOGIN_REQUEST,
        })

        const { data } = await axiosInstance.post('/api/admin/login', adminData)

        dispatch({
            type: actionTypes.ADMIN_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('admin', JSON.stringify(data))

        if (localStorage.getItem('admin')) {
            const token = JSON.parse(localStorage.getItem('admin')).token
            setAuthHeader(token)
        }

        dispatch(alertAdd('Admin Logged In!', 'success'))
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.ADMIN_LOGIN_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, 'error'))
    }
}

// to logout an Admin
export const adminLogout = () => (dispatch) => {
    localStorage.removeItem('admin')
    dispatch({ type: actionTypes.ADMIN_LOGOUT })
    dispatch(alertAdd('Admin Logged out!', 'success'))
}

// to delete an Admin
export const adminDelete = (adminID, password) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.ADMIN_DELETE_REQUEST,
        })

        await axiosInstance.delete(`/api/admin/${adminID}`, { data: { password } })

        dispatch({
            type: actionTypes.ADMIN_DELETE_SUCCESS,
        })

        dispatch({
            type: actionTypes.ADMIN_REMOVE_DELETED,
            payload: adminID,
        })

        dispatch(alertAdd('Admin Removed!', 'error'))
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.ADMIN_DELETE_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, 'error'))
    }
}

// to fetch all the colleges data
export const collegeFetchData = () => async (dispatch) => {
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

export const collegeAdd = (collegeData) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.COLLEGE_ADD_REQUEST,
        })

        await axiosInstance.post('/api/college', collegeData)

        dispatch({
            type: actionTypes.COLLEGE_ADD_SUCCESS,
        })
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.COLLEGE_ADD_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, 'error'))
    }
}

export const collegeDelete = ({ state, city, college, password }) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.COLLEGE_DELETE_REQUEST,
        })

        await axiosInstance.delete('/api/college', {
            data: { state, city, college, password },
        })

        dispatch({
            type: actionTypes.COLLEGE_DELETE_SUCCESS,
        })
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.COLLEGE_DELETE_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, 'error'))
    }
}
