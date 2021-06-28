import { combineReducers } from 'redux'

import { alertReducer, themeReducer } from './ui'
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
    productFollowToggleReducer,
    productSearchReducer,
    productSingleFetchReducer,
} from './product'
import {
    bidPlaceReducer,
    bidDeleteReducer,
    bidStatusUpdateReducer,
    bidPriceUpdateReducer,
} from './bid'
import { contactMailReducer } from './contact'
import {
    notificationLoginAndLogoutActionReducer,
    notificationGetSavedReducer,
    notificationDeleteReducer,
} from './notification'

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
    productFollowToggle: productFollowToggleReducer,
    productSearch: productSearchReducer,
    productSingle: productSingleFetchReducer,
    bidPlace: bidPlaceReducer,
    bidDelete: bidDeleteReducer,
    bidStatusUpdate: bidStatusUpdateReducer,
    bidPriceUpdate: bidPriceUpdateReducer,
    notificationLoginAndLogoutAction: notificationLoginAndLogoutActionReducer,
    notificationGetSaved: notificationGetSavedReducer,
    notificationDelete: notificationDeleteReducer,
})
