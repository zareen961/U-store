import moment from 'moment'

import { CACHE_TIME_IN_MINUTES } from '../constants/vars'

export const handleCache = (lastFetch) => {
    const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')
    if (diffInMinutes < CACHE_TIME_IN_MINUTES) {
        return true
    } else {
        return false
    }
}
