import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css'
import { userLogout, userFetch } from './store/actions/user'
import setAuthHeader from './utils/setAuthHeader'
import Home from './screens/Home'
import Landing from './screens/Landing'
import Alerts from './components/utils/Alerts'
import ThemeSwitch from './components/utils/ThemeSwitch'

const App = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.userLogin)
    const { name } = useSelector((state) => state.theme)

    // applying the selected theme class to the body tag
    useEffect(() => {
        document.body.className = ''
        document.body.classList.add(name)
    }, [name])

    useEffect(() => {
        if (localStorage.getItem('user')) {
            const token = JSON.parse(localStorage.getItem('user')).token

            // checking if the already present auth token is expired or not
            const decodedToken = jwtDecode(token)
            if (decodedToken.exp * 1000 < Date.now()) {
                dispatch(userLogout())
            } else {
                // if a valid auth token is present then set the auth headers to all axios requests
                setAuthHeader(token)

                dispatch(userFetch())
            }
        }
    }, [dispatch])

    return (
        <div className="app">
            <Router>
                <ThemeSwitch />
                <Alerts />
                {user ? <Route component={Home} /> : <Route component={Landing} />}
            </Router>
        </div>
    )
}

export default App
