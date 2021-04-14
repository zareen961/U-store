import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'
import setAuthHeader from './utils/setAuthHeader'

import { adminLogin, adminLogout, adminFetchAll } from './store/actions'

const App = () => {
    const dispatch = useDispatch()
    const { admin } = useSelector((state) => state.adminLogin)

    if (localStorage.getItem('admin')) {
        const token = JSON.parse(localStorage.getItem('admin')).token

        // checking if the already present auth token is expired or not
        const decodedToken = jwtDecode(token)
        if (decodedToken.exp * 1000 < Date.now()) {
            dispatch(adminLogout())
        }

        // if a valid auth token is present then set the auth headers to all axios requests
        setAuthHeader(token)
    }

    useEffect(() => {
        dispatch(adminFetchAll())
    }, [dispatch])

    return <div>U-store | Bubble ❤ Batook</div>
}

export default App
