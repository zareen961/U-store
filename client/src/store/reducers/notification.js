import * as actionTypes from '../actionTypes'

export const notificationLoginAndLogoutActionReducer = (
    state = { loading: false, success: false, error: null },
    action
) => {
    switch (action.type) {
        case actionTypes.NOTIFICATION_LOGIN_AND_LOGOUT_ACTION_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            }

        case actionTypes.NOTIFICATION_LOGIN_AND_LOGOUT_ACTION_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
            }

        case actionTypes.NOTIFICATION_LOGIN_AND_LOGOUT_ACTION_FAIL:
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
