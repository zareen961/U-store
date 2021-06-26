import * as actionTypes from '../actionTypes'

export const notificationClientReducer = (
    state = { loading: false, success: false, error: null },
    action
) => {
    switch (action.type) {
        case actionTypes.NOTIFICATION_CLIENT_ADD_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            }

        case actionTypes.NOTIFICATION_CLIENT_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
            }

        case actionTypes.NOTIFICATION_CLIENT_ADD_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            }

        default:
            return state
    }
}
