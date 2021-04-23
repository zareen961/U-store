import { combineReducers } from 'redux'

import { alertReducer } from './alert'
import {
    collegeReducer,
    userRegisterReducer,
    userLoginReducer,
    userDeleteReducer,
    userUpdateReducer,
} from './user'
import {
    productFetchAllReducer,
    productDeleteReducer,
    productEditReducer,
    productUploadReducer,
} from './product'
import { bidPlaceReducer, bidDeleteReducer, bidUpdateReducer } from './bid'

export default combineReducers({
    alerts: alertReducer,
    college: collegeReducer,
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    productFetchAll: productFetchAllReducer,
    productDelete: productDeleteReducer,
    productEdit: productEditReducer,
    productUpload: productUploadReducer,
    bidPlace: bidPlaceReducer,
    bidDelete: bidDeleteReducer,
    bidUpdate: bidUpdateReducer,
})
