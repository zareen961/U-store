import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Admin from './screens/Admin'
import College from './screens/College'

const Routes = () => {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Admin} />
                <Route exact path="/college" component={College} />
            </Switch>
        </>
    )
}

export default Routes
