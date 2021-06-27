import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import {
    alertReducer,
    adminFetchAllReducer,
    adminLoginReducer,
    adminDeleteReducer,
    adminRegisterReducer,
    collegeFetchAllReducer,
    collegeAddReducer,
    collegeDeleteReducer,
} from './reducers'

const reducers = combineReducers({
    alerts: alertReducer,
    adminFetchAll: adminFetchAllReducer,
    adminRegister: adminRegisterReducer,
    adminLogin: adminLoginReducer,
    adminDelete: adminDeleteReducer,
    collegeFetchAll: collegeFetchAllReducer,
    collegeAdd: collegeAddReducer,
    collegeDelete: collegeDeleteReducer,
})

// persisting the already logged in state of an admin
const adminFromStorage = localStorage.getItem('ustore__admin')
    ? JSON.parse(localStorage.getItem('ustore__admin'))
    : null

const initialState = {
    adminLogin: { admin: adminFromStorage },
}

const middleware = [thunk]

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
