import axios from 'axios'

import { SERVER_URL } from '../constants/urls'

const axiosInstance = axios.create({
    baseURL: SERVER_URL,
})

export default axiosInstance
