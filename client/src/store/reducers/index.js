import { combineReducers } from 'redux'

import { themeReducer } from './theme'
import { alertReducer } from './alert'
import {
    collegeReducer,
    userRegisterReducer,
    userLoginReducer,
    userDeleteReducer,
    userUpdateReducer,
    userContactDetailsReducer,
    userProductsReducer,
    userBidsReducer,
    userFollowingReducer,
} from './user'
import {
    productFetchAllReducer,
    productDeleteReducer,
    productEditReducer,
    productUploadReducer,
} from './product'
import {
    bidPlaceReducer,
    bidDeleteReducer,
    bidStatusUpdateReducer,
    bidPriceUpdateReducer,
} from './bid'
import { contactMailReducer } from './contact'

export default combineReducers({
    theme: themeReducer,
    alerts: alertReducer,
    contactMail: contactMailReducer,
    college: collegeReducer,
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userContactDetails: userContactDetailsReducer,
    userProducts: userProductsReducer,
    userBids: userBidsReducer,
    userFollowing: userFollowingReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    productFetchAll: productFetchAllReducer,
    productDelete: productDeleteReducer,
    productEdit: productEditReducer,
    productUpload: productUploadReducer,
    bidPlace: bidPlaceReducer,
    bidDelete: bidDeleteReducer,
    bidStatusUpdate: bidStatusUpdateReducer,
    bidPriceUpdate: bidPriceUpdateReducer,
})
