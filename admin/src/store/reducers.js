import * as actionTypes from './actionTypes'

// ALERT *****************************************************************************************
export const alertReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.ALERT_ADD:
            return [...state, action.payload]

        case actionTypes.ALERT_REMOVE:
            return state.filter((alert) => alert._id !== action.payload)

        default:
            return state
    }
}

// ADMIN *********************************************************************************************
export const adminFetchAllReducer = (
    state = { loading: false, error: null, success: false, admins: [] },
    action
) => {
    switch (action.type) {
        case actionTypes.ADMIN_FETCH_ALL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
            }

        case actionTypes.ADMIN_FETCH_ALL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                admins: action.payload,
                success: true,
            }

        case actionTypes.ADMIN_FETCH_ALL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            }

        case actionTypes.ADMIN_PUSH_NEW:
            return {
                ...state,
                admins: [action.payload, ...state.admins],
            }

        case actionTypes.ADMIN_REMOVE_DELETED:
            return {
                ...state,
                admins: state.admins.filter((admin) => admin._id !== action.payload),
            }

        default:
            return state
    }
}

export const adminRegisterReducer = (
    state = { loading: false, error: null, success: false },
    action
) => {
    switch (action.type) {
        case actionTypes.ADMIN_REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
            }

        case actionTypes.ADMIN_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true,
            }

        case actionTypes.ADMIN_REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            }

        default:
            return state
    }
}

export const adminLoginReducer = (
    state = { loading: false, error: null, success: false, admin: null },
    action
) => {
    switch (action.type) {
        case actionTypes.ADMIN_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                admin: null,
                success: false,
            }

        case actionTypes.ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                admin: action.payload,
                success: true,
            }

        case actionTypes.ADMIN_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                admin: null,
                success: false,
            }

        case actionTypes.ADMIN_LOGOUT:
            return {
                ...state,
                admin: null,
            }

        default:
            return state
    }
}

export const adminDeleteReducer = (
    state = { loading: false, error: null, success: false },
    action
) => {
    switch (action.type) {
        case actionTypes.ADMIN_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
            }

        case actionTypes.ADMIN_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true,
            }

        case actionTypes.ADMIN_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            }

        default:
            return state
    }
}

// COLLEGE ******************************************************************************************
export const collegeFetchAllReducer = (
    state = { loading: false, error: null, success: false, data: [] },
    action
) => {
    switch (action.type) {
        case actionTypes.COLLEGE_FETCH_ALL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
            }

        case actionTypes.COLLEGE_FETCH_ALL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true,
                data: action.payload,
            }

        case actionTypes.COLLEGE_FETCH_ALL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            }

        default:
            return state
    }
}

export const collegeAddReducer = (
    state = { loading: false, error: null, success: false },
    action
) => {
    switch (action.type) {
        case actionTypes.COLLEGE_ADD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
            }

        case actionTypes.COLLEGE_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true,
            }

        case actionTypes.COLLEGE_ADD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            }

        default:
            return state
    }
}

export const collegeDeleteReducer = (
    state = { loading: false, error: null, success: false },
    action
) => {
    switch (action.type) {
        case actionTypes.COLLEGE_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
            }

        case actionTypes.COLLEGE_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true,
            }

        case actionTypes.COLLEGE_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            }

        default:
            return state
    }
}
