const PRICE_MAX = 50000
const PRICE_MIN = 0
const DESCRIPTION_MAX = 200
const EMAIL_LEN_MAX = 64
const PASSWORD_LEN_MIN = 6
const EMAIL_REGEX = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
const USERNAME_REGEX = /^(?=[a-zA-Z0-9._]{6,17}$)(?!.*[_.]{2})[^_.].*[^_.]$/
const NAME_REGEX = /^[a-zA-Z\s]{3,20}$/
const PHONE_REGEX = /^[6-9]\d{9}$/
const PRODUCT_NAME_REGEX = /^[a-zA-Z0-9]{3,30}$/

module.exports = {
    PRICE_MAX,
    PRICE_MIN,
    DESCRIPTION_MAX,
    EMAIL_LEN_MAX,
    PASSWORD_LEN_MIN,
    EMAIL_REGEX,
    USERNAME_REGEX,
    NAME_REGEX,
    PHONE_REGEX,
    PRODUCT_NAME_REGEX,
}
