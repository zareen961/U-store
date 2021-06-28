// USER *******************************************************************************
export const USER_FETCH = '/api/user'
export const USER_REGISTER = '/api/user'
export const USER_LOGIN = '/api/user/login'
export const USER_UPDATE = '/api/user'
export const USER_DELETE = '/api/user'
export const USER_FETCH_CONTACT = (username) => `/api/user/contact/${username}`
export const USER_FETCH_PRODUCTS = '/api/user/products'
export const USER_FETCH_BIDS = '/api/user/bids'
export const USER_FETCH_FOLLOWING = '/api/user/following'

// BID **********************************************************************************
export const BID_PLACE = (productID) => `/api/bid/${productID}`
export const BID_STATUS_UPDATE = (bidID) => `/api/bid/${bidID}/status`
export const BID_PRICE_UPDATE = (bidID) => `/api/bid/${bidID}/price`
export const BID_DELETE = (bidID) => `/api/bid/${bidID}`

// PRODUCT ****************************************************************************
export const PRODUCT_FETCH_ALL = '/api/product'
export const PRODUCT_UPLOAD = '/api/product'
export const PRODUCT_EDIT = (productID) => `/api/product/${productID}`
export const PRODUCT_DELETE = (productID) => `/api/product/${productID}`
export const PRODUCT_FOLLOW_TOGGLE = (productID) => `/api/product/follow/${productID}`
export const PRODUCT_SEARCH = (query) => `/api/product/search/${query}`
export const PRODUCT_FETCH_SINGLE = (productID) => `/api/product/${productID}`

// CONTACT *****************************************************************************
export const CONTACT_MAIL_SEND = `api/contact`

// COLLEGE ******************************************************************************
export const COLLEGE_FETCH = '/api/college'

// NOTIFICATION ************************************************************************
export const NOTIFICATION_LOGIN_AND_LOGOUT_ACTION = (action) =>
    `/api/notification/batch/${action}`
export const NOTIFICATION_GET_SAVED = '/api/notification'
export const NOTIFICATION_DELETE = (notificationID) =>
    `/api/notification/${notificationID}`
export const NOTIFICATION_READ = (notificationID) => `/api/notification/${notificationID}`
