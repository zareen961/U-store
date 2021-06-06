import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ProductCardBid from '../../../components/Main/ProductCardBid'
import { userFetchBids } from '../../../store/actions/user'
import './Bids.css'

const Bids = () => {
    const dispatch = useDispatch()

    const { loading, success } = useSelector((state) => state.userBids)
    const { user } = useSelector((state) => state.userLogin)

    useEffect(() => {
        dispatch(userFetchBids())
    }, [dispatch])

    return (
        <div className="bids">
            {!loading && success && user && user.userInfo ? (
                user.userInfo.bids.length === 0 ? (
                    <h1>No Bids!</h1>
                ) : (
                    <>
                        <div className="bids__left">
                            {user.userInfo.bids.map((bid, index) =>
                                index % 2 === 0 ? (
                                    <ProductCardBid key={bid._id} bid={bid} />
                                ) : null
                            )}
                        </div>
                        <div className="bids__right">
                            {user.userInfo.bids.map((bid, index) =>
                                index % 2 !== 0 ? (
                                    <ProductCardBid key={bid._id} bid={bid} />
                                ) : null
                            )}
                        </div>
                    </>
                )
            ) : (
                <h1>Loading</h1>
            )}
        </div>
    )
}

export default Bids
