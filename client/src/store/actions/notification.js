import * as actionTypes from '../actionTypes'
import axiosInstance from '../../utils/axiosInstance'
import { alertAdd } from './ui'

export const notificationClientAdd = (token) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.NOTIFICATION_CLIENT_ADD_REQUEST,
        })

        await axiosInstance.post('/api/notification', { notificationClientToken: token })

        dispatch({
            type: actionTypes.NOTIFICATION_CLIENT_ADD_SUCCESS,
        })

        dispatch(alertAdd('Wohoo..! Notifications enabled!', 'success'))
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.NOTIFICATION_CLIENT_ADD_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, 'error'))
    }
}
