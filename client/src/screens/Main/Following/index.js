import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ProductCardFollow from '../../../components/Main/ProductCardFollow'
import BlockHeader from '../../../components/utils/BlockHeader'
import { userFetchFollowing } from '../../../store/actions/user'
import ScreenLoader from '../../../components/utils/ScreenLoader'
import './Following.css'

const Following = () => {
    const dispatch = useDispatch()

    const { loading, success } = useSelector((state) => state.userFollowing)
    const { success: successUserLogin, user } = useSelector((state) => state.userLogin)

    useEffect(() => {
        if (successUserLogin) {
            dispatch(userFetchFollowing())
        }
    }, [dispatch, successUserLogin])

    return (
        <div className="following">
            <div className="following__headerWrapper">
                <BlockHeader title={'My Following'} />
            </div>

            <div className="following__followingWrapper">
                {!loading && success && user && user.userInfo ? (
                    user.userInfo.following.length === 0 ? (
                        <p>
                            Follow Products, get notified about bid trend and then place
                            your bid.
                        </p>
                    ) : (
                        <>
                            <div className="following__left">
                                {user.userInfo.following.map((product, index) =>
                                    index % 2 === 0 ? (
                                        <ProductCardFollow
                                            key={product._id}
                                            product={product}
                                        />
                                    ) : null
                                )}
                            </div>
                            <div className="following__right">
                                {user.userInfo.following.map((product, index) =>
                                    index % 2 !== 0 ? (
                                        <ProductCardFollow
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

export default Following
