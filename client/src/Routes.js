import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './screens/Main/Home'
import Products from './screens/Main/Products'
import Bids from './screens/Main/Bids'
import Following from './screens/Main/Following'
import Account from './screens/Main/Account'
import Settings from './screens/Main/Settings'

const Routes = ({ isUploadFormOpen, setIsUploadFormOpen }) => {
    return (
        <>
            <Switch>
                <Route exact path="/">
                    <Home
                        isUploadFormOpen={isUploadFormOpen}
                        setIsUploadFormOpen={setIsUploadFormOpen}
                    />
                </Route>
                <Route exact path="/products" component={Products} />
                <Route exact path="/bids" component={Bids} />
                <Route exact path="/following" component={Following} />
                <Route exact path="/account" component={Account} />
                <Route exact path="/settings" component={Settings} />
            </Switch>
        </>
    )
}

export default Routes
