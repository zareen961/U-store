export const checkIfUserFollow = (following, productID) => {
    if (following.length > 0) {
        for (let i = 0; i < following.length; i++) {
            if (typeof following[0] === 'object') {
                if (String(following[i]._id) === String(productID)) {
                    return true
                }
            } else {
                if (String(following[i]) === String(productID)) {
                    return true
                }
            }
        }
        return false
    } else {
        return false
    }
}
