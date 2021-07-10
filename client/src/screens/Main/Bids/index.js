import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ProductCardBid from '../../../components/Main/ProductCardBid'
import BlockHeader from '../../../components/utils/BlockHeader'
import { userFetchBids } from '../../../store/actions/user'
import ScreenLoader from '../../../components/utils/ScreenLoader'
import NoItemMessage from '../../../components/utils/NoItemMessage'
import { getViewportWidth } from '../../../utils/getViewport'
import './Bids.scss'

const Bids = () => {
    const dispatch = useDispatch()

    const { loading, success } = useSelector((state) => state.userBids)
    const { success: successUserLogin, user } = useSelector((state) => state.userLogin)

    useEffect(() => {
        if (successUserLogin) {
            dispatch(userFetchBids())
        }
    }, [dispatch, successUserLogin])

    return (
        <div className="bids">
            <div className="bids__headerWrapper">
                <BlockHeader title={'My Bids'} />
            </div>
            <div className="bids__bidsWrapper">
                {!loading && success && user && user.userInfo ? (
                    user.userInfo.bids.length === 0 ? (
                        <NoItemMessage
                            title={"You didn't place any bid!"}
                            text={'Bid on products and get your requisites.'}
                        />
                    ) : (
                        <>
                            <div className="bids__left">
                                {user.userInfo.bids.map((product, index) => {
                                    if (getViewportWidth() > 1000) {
                                        return index % 2 === 0 ? (
                                            <ProductCardBid
                                                key={product._id}
                                                product={product}
                                            />
                                        ) : null
                                    } else {
                                        return (
                                            <ProductCardBid
                                                key={product._id}
                                                product={product}
                                            />
                                        )
                                    }
                                })}
                            </div>
                            <div className="bids__right">
                                {user.userInfo.bids.map((product, index) =>
                                    index % 2 !== 0 ? (
                                        <ProductCardBid
                                            key={product._id}
                                            product={product}
                                        />
                                    ) : null
                                )}
                            </div>
                        </>
                    )
                ) : (
                    <ScreenLoader />
                )}
            </div>
        </div>
    )
}

export default Bids
