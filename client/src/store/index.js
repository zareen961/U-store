import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import rootReducer from './reducers'
import themeData from '../constants/themeData'
import { NODE_ENV } from '../constants/vars'

// persisting the last theme of the browser
const themeFromLocalStorage = localStorage.getItem('ustore__theme')
    ? JSON.parse(localStorage.getItem('ustore__theme'))
    : { ...themeData.purple }

// persisting the already logged in state of a user
const userFromStorage = localStorage.getItem('ustore__user')
    ? JSON.parse(localStorage.getItem('ustore__user'))
    : null

const initialState = {
    userLogin: { user: userFromStorage, loading: false, error: null, success: false },
    theme: themeFromLocalStorage,
}

const middleware = [thunk]

let middlewareWrapper

if (NODE_ENV === 'DEV') {
    middlewareWrapper = composeWithDevTools(applyMiddleware(...middleware))
} else {
    middlewareWrapper = applyMiddleware(...middleware)
}

const store = createStore(rootReducer, initialState, middlewareWrapper)

export default store
