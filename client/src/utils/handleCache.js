import moment from "moment"

const CACHE_TIME_IN_MINUTES = 10

export const handleCache = (lastFetch) => {
    const diffInMinutes = moment().diff(moment(lastFetch), "minutes")
    if (diffInMinutes < CACHE_TIME_IN_MINUTES) {
        return true
    } else {
        return false
    }
}
