import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { adminLogout } from './store/actions'
import setAuthHeader from './utils/setAuthHeader'
import './App.css'

//Screens
import Login from './screens/Login'

//Components
import Sidebar from './components/Sidebar'
import Alerts from './components/utils/Alerts'

const App = () => {
    const dispatch = useDispatch()
    const { admin } = useSelector((state) => state.adminLogin)

    if (localStorage.getItem('ustore__admin')) {
        const token = JSON.parse(localStorage.getItem('ustore__admin')).token

        // checking if the already present auth token is expired or not
        const decodedToken = jwtDecode(token)
        if (decodedToken.exp * 1000 < Date.now()) {
            dispatch(adminLogout())
        }

        // if a valid auth token is present then set the auth headers to all axios requests
        setAuthHeader(token)
    }

    return (
        <div className="app">
            <Router>
                <Alerts />
                {admin ? <Route component={Sidebar} /> : <Route component={Login} />}
            </Router>
        </div>
    )
}

export default App
