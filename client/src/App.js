import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'

import './App.css'
import { userLogout } from './store/actions/user'
import setAuthHeader from './utils/setAuthHeader'

const App = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.userLogin)

    if (localStorage.getItem('user')) {
        const token = JSON.parse(localStorage.getItem('user')).token

        // checking if the already present auth token is expired or not
        const decodedToken = jwtDecode(token)
        if (decodedToken.exp * 1000 < Date.now()) {
            dispatch(userLogout())
        }

        // if a valid auth token is present then set the auth headers to all axios requests
        setAuthHeader(token)
    }

    return (
        <div>
            <h1>Batook 💖 Bubble</h1>
        </div>
    )
}

export default App
