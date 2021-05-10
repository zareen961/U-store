import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './screens/Main/Home'
import Products from './screens/Main/Products'
import Bids from './screens/Main/Bids'

const Routes = () => {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/products" component={Products} />
                <Route exact path="/bids" component={Bids} />
            </Switch>
        </>
    )
}

export default Routes
