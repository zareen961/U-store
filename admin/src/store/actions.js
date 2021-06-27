import { v4 } from 'uuid'

import axiosInstance from '../utils/axiosInstance'
import * as actionTypes from './actionTypes'
import setAuthHeader from '../utils/setAuthHeader'

// to add an Alert
export const alertAdd =
    (msg, alertType, timeout = 5000) =>
    (dispatch) => {
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
export const adminRegister = (adminData, adminPassword) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.ADMIN_REGISTER_REQUEST,
        })

        const { data } = await axiosInstance.post('/api/admin', {
            ...adminData,
            adminPassword,
        })

        dispatch({
            type: actionTypes.ADMIN_REGISTER_SUCCESS,
        })

        dispatch({
            type: actionTypes.ADMIN_PUSH_NEW,
            payload: data,
        })

        dispatch(alertAdd('New Admin Registered!', 'success'))
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

        localStorage.setItem('ustore__admin', JSON.stringify(data))

        if (localStorage.getItem('ustore__admin')) {
            const token = JSON.parse(localStorage.getItem('ustore__admin')).token
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
    localStorage.removeItem('ustore__admin')
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

        dispatch(alertAdd('Admin Removed!', 'success'))
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

export const collegeAdd = (collegeData, password) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.COLLEGE_ADD_REQUEST,
        })

        await axiosInstance.post('/api/college', { ...collegeData, password })

        dispatch(collegeFetchData()) // te get updated collegeData

        dispatch({
            type: actionTypes.COLLEGE_ADD_SUCCESS,
        })

        dispatch(alertAdd('New College Added!', 'success'))
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

export const collegeDelete =
    ({ state, city, college }, password) =>
    async (dispatch) => {
        try {
            dispatch({
                type: actionTypes.COLLEGE_DELETE_REQUEST,
            })

            await axiosInstance.delete('/api/college', {
                data: { state, city, college, password },
            })

            dispatch(collegeFetchData()) // te get updated collegeData

            dispatch({
                type: actionTypes.COLLEGE_DELETE_SUCCESS,
            })

            if (college) {
                dispatch(alertAdd('College Removed!', 'success'))
            } else if (city) {
                dispatch(
                    alertAdd("City and it's corresponding colleges removed!", 'success')
                )
            } else if (state) {
                dispatch(
                    alertAdd(
                        "State and it's corresponding cities and colleges removed!",
                        'success'
                    )
                )
            }
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
