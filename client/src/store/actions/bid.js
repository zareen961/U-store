import * as actionTypes from "../actionTypes"
import axiosInstance from "../../utils/axiosInstance"
import { alertAdd } from "./alert"

// to place a new Bid
export const bidPlace = (bidData) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.BID_PLACE_REQUEST,
        })

        const { data } = await axiosInstance.post("/api/bid", bidData)

        dispatch({
            type: actionTypes.BID_PLACE_SUCCESS,
        })

        dispatch({
            type: actionTypes.BID_PUSH_NEW,
            payload: data,
        })
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.BID_PLACE_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, "error"))
    }
}

// to update a Bid status
export const bidStatusUpdate = (bidID, newStatus) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.BID_STATUS_UPDATE_REQUEST,
        })

        await axiosInstance.put(`/api/bid/${bidID}`, newStatus)

        dispatch({
            type: actionTypes.BID_STATUS_UPDATE_SUCCESS,
        })

        dispatch({
            type: actionTypes.BID_UPDATE_UPDATED,
            payload: newStatus,
        })

        dispatch(alertAdd("Bid Status Updated!", "success"))
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.BID_STATUS_UPDATE_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, "error"))
    }
}

// to delete a Bid
export const bidDelete = (bidID) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.BID_DELETE_REQUEST,
        })

        await axiosInstance.delete(`/api/bid/${bidID}`)

        dispatch({
            type: actionTypes.BID_DELETE_SUCCESS,
        })

        dispatch({
            type: actionTypes.BID_REMOVE_DELETED,
            payload: bidID,
        })

        dispatch(alertAdd("Bid Deleted!", "success"))
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.BID_DELETE_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, "error"))
    }
}
