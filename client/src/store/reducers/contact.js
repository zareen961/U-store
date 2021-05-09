import * as actionTypes from '../actionTypes'

export const contactMailReducer = (
    state = { loading: false, error: null, success: false },
    action
) => {
    switch (action.type) {
        case actionTypes.CONTACT_MAIL_REQUEST:
            return { ...state, loading: true, error: null, success: false }

        case actionTypes.CONTACT_MAIL_SUCCESS:
            return { ...state, loading: false, error: null, success: true }

        case actionTypes.CONTACT_MAIL_FAIL:
            return { ...state, loading: false, error: action.payload, success: false }

        default:
            return state
    }
}
