import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import rootReducer from './reducers'
import themeData from '../utils/constants/themeData'

// persisting the last theme of the browser
const themeFromLocalStorage = localStorage.getItem('theme')
    ? JSON.parse(localStorage.getItem('theme'))
    : { ...themeData.purple }

// persisting the already logged in state of a user
const userFromStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null

const initialState = {
    userLogin: { user: userFromStorage },
    theme: themeFromLocalStorage,
}

const middleware = [thunk]

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
