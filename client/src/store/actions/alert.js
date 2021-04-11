import { v4 } from 'uuid'

import * as actionTypes from '../actionTypes'

export const alertAdd = (msg, alertType, timeout = 5000) => (dispatch) => {
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
