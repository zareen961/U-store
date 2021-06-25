import { v4 } from 'uuid'

import * as actionTypes from '../actionTypes'

export const alertAdd =
    (msg, alertType, timeout = 5000) =>
    (dispatch) => {
        const _id = v4()
        dispatch({
            type: actionTypes.ALERT_ADD,
            payload: { _id, msg, alertType },
        })

        setTimeout(
            () =>
                dispatch({
                    type: actionTypes.ALERT_REMOVE,
                    payload: _id,
                }),
            timeout
        )
    }

export const themeSwitch = (theme) => (dispatch) => {
    switch (theme) {
        case 'PURPLE':
            dispatch({ type: actionTypes.THEME_SET_PURPLE })
            break

        case 'BLUE':
            dispatch({ type: actionTypes.THEME_SET_BLUE })
            break

        case 'RED':
            dispatch({ type: actionTypes.THEME_SET_RED })
            break

        default:
            dispatch(alertAdd('No such theme exists!', 'error'))
    }
}
