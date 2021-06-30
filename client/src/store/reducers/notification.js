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

export const notificationGetSavedReducer = (
    state = {
        loading: false,
        notifications: [],
        success: false,
        error: null,
    },
    action
) => {
    switch (action.type) {
        case actionTypes.NOTIFICATION_GET_SAVED_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            }

        case actionTypes.NOTIFICATION_GET_SAVED_SUCCESS:
            return {
                ...state,
                loading: false,
                notifications: action.payload,
                success: true,
                error: null,
            }

        case actionTypes.NOTIFICATION_GET_SAVED_FAIL:
            return {
                ...state,
                loading: false,
                notifications: [],
                success: false,
                error: action.payload,
            }

        case actionTypes.NOTIFICATION_CLEANUP:
            return {
                ...state,
                loading: false,
                notifications: [],
                success: false,
                error: null,
            }

        case actionTypes.NOTIFICATION_PUSH_NEW:
            return {
                ...state,
                notifications: [action.payload, ...state.notifications],
            }

        case actionTypes.NOTIFICATION_UPDATE_READ:
            return {
                ...state,
                notifications: state.notifications.map((notification) =>
                    notification._id === action.payload.notificationID
                        ? {
                              ...notification,
                              isRead: 'true',
                          }
                        : notification
                ),
            }

        case actionTypes.NOTIFICATION_REMOVE_DELETED:
            return {
                ...state,
                notifications: state.notifications.filter(
                    (notification) => notification._id !== action.payload
                ),
            }

        default:
            return state
    }
}

export const notificationDeleteReducer = (
    state = { loading: false, success: false, error: null },
    action
) => {
    switch (action.type) {
        case actionTypes.NOTIFICATION_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            }

        case actionTypes.NOTIFICATION_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
            }

        case actionTypes.NOTIFICATION_DELETE_FAIL:
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
