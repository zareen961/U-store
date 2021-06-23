import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './screens/Main/Home'
import Products from './screens/Main/Products'
import ProductSingle from './screens/Main/ProductSingle'
import Bids from './screens/Main/Bids'
import Following from './screens/Main/Following'
import Account from './screens/Main/Account'
import Settings from './screens/Main/Settings'
import Contact from './screens/Main/Contact'

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
                <Route path="/products/:productSlug" component={ProductSingle} />
                <Route exact path="/bids" component={Bids} />
                <Route exact path="/following" component={Following} />
                <Route exact path="/account" component={Account} />
                <Route exact path="/settings" component={Settings} />
                <Route path="/contact/:username" component={Contact} />
            </Switch>
        </>
    )
}

export default Routes
