import * as actionTypes from '../actionTypes'
import axiosInstance from '../../utils/axiosInstance'
import { alertAdd } from './alert'

// to place a new Bid
export const bidPlace = (productID, bidPrice) => async (dispatch, getState) => {
    const {
        user: { userInfo },
    } = getState().userLogin
    const bidOwnerDetails = {
        _id: userInfo._id,
        username: userInfo.username,
        avatar: userInfo.avatar,
    }

    try {
        dispatch({
            type: actionTypes.BID_PLACE_REQUEST,
        })

        const { data } = await axiosInstance.post(`/api/bid/${productID}`, {
            price: bidPrice,
        })

        dispatch({
            type: actionTypes.BID_PUSH_NEW,
            payload: { productID, bid: { ...data, bidOwner: bidOwnerDetails } },
        })

        dispatch({
            type: actionTypes.USER_BID_PUSH_NEW,
            payload: data,
        })

        dispatch({
            type: actionTypes.BID_PLACE_SUCCESS,
        })
        dispatch(
            alertAdd(
                'Sit and bid on the next product while this gets responded',
                'success'
            )
        )
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.BID_PLACE_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, 'error'))
    }
}

// to update a Bid status
export const bidStatusUpdate = (productID, bidID, newBidStatus) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.BID_STATUS_UPDATE_REQUEST,
        })

        await axiosInstance.patch(`/api/bid/${bidID}`, { newBidStatus })

        dispatch({
            type: actionTypes.BID_UPDATE_UPDATED,
            payload: { productID, bidID, newBidStatus },
        })

        dispatch({
            type: actionTypes.USER_BID_UPDATE_UPDATED,
            payload: { productID, bidID, newBidStatus },
        })

        dispatch({
            type: actionTypes.BID_STATUS_UPDATE_SUCCESS,
        })

        dispatch(alertAdd('Bid Status Updated!', 'success'))
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.BID_STATUS_UPDATE_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, 'error'))
    }
}

// to delete a Bid
export const bidDelete = (productID, bidID) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.BID_DELETE_REQUEST,
        })

        await axiosInstance.delete(`/api/bid/${bidID}`)

        dispatch({
            type: actionTypes.BID_REMOVE_DELETED,
            payload: { productID, bidID },
        })

        dispatch({
            type: actionTypes.USER_BID_REMOVE_DELETED,
            payload: bidID,
        })

        dispatch({
            type: actionTypes.BID_DELETE_SUCCESS,
        })

        dispatch(alertAdd('Bid Deleted!', 'success'))
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.BID_DELETE_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, 'error'))
    }
}
