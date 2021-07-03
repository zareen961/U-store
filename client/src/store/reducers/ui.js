import * as actionTypes from '../actionTypes'
import themeData from '../../constants/themeData'

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

export const themeReducer = (state = themeData.purple, action) => {
    switch (action.type) {
        case actionTypes.THEME_SET_PURPLE:
            localStorage.setItem('ustore__theme', JSON.stringify(themeData.purple))
            return {
                ...themeData.purple,
            }

        case actionTypes.THEME_SET_RED:
            localStorage.setItem('ustore__theme', JSON.stringify(themeData.red))
            return {
                ...themeData.red,
            }

        case actionTypes.THEME_SET_BLUE:
            localStorage.setItem('ustore__theme', JSON.stringify(themeData.blue))
            return {
                ...themeData.blue,
            }

        default:
            return state
    }
}
