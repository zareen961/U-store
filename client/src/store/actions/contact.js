import * as actionTypes from '../actionTypes'
import axiosInstance from '../../utils/axiosInstance'
import { alertAdd } from './ui'
import * as api from '../../constants/api'

export const contactMailSend = (contactInfo) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.CONTACT_MAIL_REQUEST,
        })

        const { data } = await axiosInstance.post(api.CONTACT_MAIL_SEND, contactInfo)

        dispatch({
            type: actionTypes.CONTACT_MAIL_SUCCESS,
        })

        dispatch(alertAdd(data?.message, 'success'))
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.CONTACT_MAIL_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, 'error'))
    }
}
