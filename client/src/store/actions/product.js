import * as actionTypes from "../actionTypes"
import axiosInstance from "../../utils/axiosInstance"
import { alertAdd } from "./alert"

// to fetch all the Products of the logged in user's college
export const productFetchAll = () => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.PRODUCT_FETCH_ALL_REQUEST,
        })

        const { data } = await axiosInstance.get("/api/product")

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

        dispatch(alertAdd(errorMsg, "error"))
    }
}

// to upload a new Product
export const productUpload = (productData) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.PRODUCT_UPLOAD_REQUEST,
        })

        const { data } = await axiosInstance.post("/api/product", productData)

        dispatch({
            type: actionTypes.PRODUCT_UPLOAD_SUCCESS,
            payload: data,
        })

        dispatch({
            type: actionTypes.PRODUCT_PUSH_NEW,
            payload: data,
        })

        dispatch(alertAdd("Product Uploaded!", "success"))
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.PRODUCT_UPLOAD_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, "error"))
    }
}

// to edit a Product
export const productEdit = (productID, productData) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.PRODUCT_EDIT_REQUEST,
        })

        await axiosInstance.put(`/api/product/${productID}`, productData)

        dispatch({
            type: actionTypes.PRODUCT_EDIT_SUCCESS,
        })

        dispatch({
            type: actionTypes.PRODUCT_UPDATE_EDITED,
            payload: productData,
        })

        dispatch(alertAdd("Product Edited!", "success"))
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.PRODUCT_EDIT_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, "error"))
    }
}

// to delete a Product
export const productDelete = (productID) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.PRODUCT_DELETE_REQUEST,
        })

        await axiosInstance.delete(`/api/product/${productID}`, productData)

        dispatch({
            type: actionTypes.PRODUCT_DELETE_SUCCESS,
        })

        dispatch({
            type: actionTypes.PRODUCT_REMOVE_DELETED,
            payload: productID,
        })

        dispatch(alertAdd("Product Deleted!", "success"))
    } catch (err) {
        const errorMsg =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message

        dispatch({
            type: actionTypes.PRODUCT_DELETE_FAIL,
            payload: errorMsg,
        })

        dispatch(alertAdd(errorMsg, "error"))
    }
}
