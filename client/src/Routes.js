import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { AnimatedSwitch, spring } from 'react-router-transition'

import Home from './screens/Main/Home'
import Products from './screens/Main/Products'
import ProductSingle from './screens/Main/ProductSingle'
import Bids from './screens/Main/Bids'
import Following from './screens/Main/Following'
import Account from './screens/Main/Account'
import Settings from './screens/Main/Settings'
import Contact from './screens/Main/Contact'

const mapStyles = (styles) => {
    return {
        opacity: styles.opacity,
        transform: `scale(${styles.scale})`,
    }
}

const bounce = (val) => {
    return spring(val, {
        stiffness: 330,
        damping: 22,
    })
}

const bounceTransition = {
    atEnter: {
        opacity: 0,
        scale: 1.2,
    },
    atLeave: {
        opacity: bounce(0),
        scale: bounce(0.8),
    },
    atActive: {
        opacity: bounce(1),
        scale: bounce(1),
    },
}

const Routes = ({ isUploadFormOpen, setIsUploadFormOpen }) => {
    return (
        <>
            <Switch>
                <AnimatedSwitch
                    atEnter={bounceTransition.atEnter}
                    atLeave={bounceTransition.atLeave}
                    atActive={bounceTransition.atActive}
                    mapStyles={mapStyles}
                >
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
                </AnimatedSwitch>
            </Switch>
        </>
    )
}

export default Routes
