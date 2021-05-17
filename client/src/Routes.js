import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './screens/Main/Home'
import Products from './screens/Main/Products'
import Bids from './screens/Main/Bids'
import Following from './screens/Main/Following'
import Account from './screens/Main/Account'

const Routes = () => {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/products" component={Products} />
                <Route exact path="/bids" component={Bids} />
                <Route exact path="/following" component={Following} />
                <Route exact path="/account" component={Account} />
            </Switch>
        </>
    )
}

export default Routes
