import * as actionTypes from '../actionTypes'
import axiosInstance from '../../utils/axiosInstance'
import { alertAdd } from './ui'
import * as api from '../../utils/constants/api'

export const notificationLoginAndLogoutAction = (action) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.NOTIFICATION_LOGIN_AND_LOGOUT_ACTION_REQUEST,
        })

        await axiosInstance.post(api.NOTIFICATION_LOGIN_AND_LOGOUT_ACTION(action))

        dispatch({
            type: actionTypes.NOTIFICATION_LOGIN_AND_LOGOUT_ACTION_SUCCESS,
        })
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.NOTIFICATION_LOGIN_AND_LOGOUT_ACTION_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, 'error'))
    }
}
