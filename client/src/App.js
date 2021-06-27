import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom'

import './App.css'
import { userLogout, userFetch } from './store/actions/user'
import { setAuthHeader } from './utils/setAxiosHeaders'
import Main from './screens/Main'
import Landing from './screens/Landing'
import Alerts from './components/utils/Alerts'
import ThemeSwitch from './components/utils/ThemeSwitch'
import ScrollToTop from './components/utils/ScrollToTop'

const App = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { user } = useSelector((state) => state.userLogin)
    const { name } = useSelector((state) => state.theme)

    // applying the selected theme class to the body tag
    useEffect(() => {
        document.body.className = ''
        document.body.classList.add(name)
    }, [name])

    useEffect(() => {
        if (localStorage.getItem('ustore__user')) {
            const token = JSON.parse(localStorage.getItem('ustore__user')).token

            // checking if the already present auth token is expired or not
            const decodedToken = jwtDecode(token)
            if (decodedToken.exp * 1000 < Date.now()) {
                dispatch(userLogout(history))
            } else {
                // if a valid auth token is present then set the auth headers to all axios requests
                setAuthHeader(token)
                dispatch(userFetch())
            }
        }
    }, [dispatch, history])

    return (
        <div className="app">
            <Router>
                <ThemeSwitch />
                <ScrollToTop />
                <Alerts isRounded={user ? true : false} />
                {user ? <Route component={Main} /> : <Route component={Landing} />}
            </Router>
        </div>
    )
}

export default App
