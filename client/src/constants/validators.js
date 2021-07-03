export const PRICE_MAX = 50000
export const PRICE_MIN = 0
export const DESCRIPTION_LEN_MAX = 200
export const EMAIL_LEN_MAX = 64
export const PASSWORD_LEN_MIN = 6
export const EMAIL_REGEX =
    /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
export const USERNAME_REGEX = /^(?=[a-zA-Z0-9._]{3,13}$)(?!.*[_.]{2})[^_.].*[^_.]$/
export const NAME_REGEX = /^[a-zA-Z\s]{3,20}$/
export const PHONE_REGEX = /^[6-9]\d{9}$/
export const PRODUCT_LEN_MIN = 3
export const PRODUCT_LEN_MAX = 31
export const CONTACT_SUBJECT_LENGTH = 5
export const CONTACT_MESSAGE_LENGTH = 10
