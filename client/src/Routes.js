import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { AnimatedSwitch, spring } from 'react-router-transition'

import ScreenLoader from './components/utils/ScreenLoader'

const HomePage = React.lazy(() => import('./screens/Main/Home'))
const ProductsPage = React.lazy(() => import('./screens/Main/Products'))
const ProductSinglePage = React.lazy(() => import('./screens/Main/ProductSingle'))
const BidsPage = React.lazy(() => import('./screens/Main/Bids'))
const FollowingPage = React.lazy(() => import('./screens/Main/Following'))
const AccountPage = React.lazy(() => import('./screens/Main/Account'))
const SettingsPage = React.lazy(() => import('./screens/Main/Settings'))
const ContactPage = React.lazy(() => import('./screens/Main/Contact'))

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
        <Suspense fallback={<ScreenLoader />}>
            <Switch>
                <AnimatedSwitch
                    atEnter={bounceTransition.atEnter}
                    atLeave={bounceTransition.atLeave}
                    atActive={bounceTransition.atActive}
                    mapStyles={mapStyles}
                >
                    <Route exact path="/">
                        <HomePage
                            isUploadFormOpen={isUploadFormOpen}
                            setIsUploadFormOpen={setIsUploadFormOpen}
                        />
                    </Route>
                    <Route exact path="/products" component={ProductsPage} />
                    <Route path="/products/:productSlug" component={ProductSinglePage} />
                    <Route exact path="/bids" component={BidsPage} />
                    <Route exact path="/following" component={FollowingPage} />
                    <Route exact path="/account" component={AccountPage} />
                    <Route exact path="/settings" component={SettingsPage} />
                    <Route path="/contact/:username" component={ContactPage} />
                </AnimatedSwitch>
            </Switch>
        </Suspense>
    )
}

export default Routes
