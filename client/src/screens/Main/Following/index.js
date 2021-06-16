import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ProductCardFollow from '../../../components/Main/ProductCardFollow'
import BlockHeader from '../../../components/utils/BlockHeader'
import { userFetchFollowing } from '../../../store/actions/user'
import './Following.css'

const Following = () => {
    const dispatch = useDispatch()

    const { loading, success } = useSelector((state) => state.userFollowing)
    const { user } = useSelector((state) => state.userLogin)

    useEffect(() => {
        dispatch(userFetchFollowing())
    }, [dispatch])

    return (
        <div className="following">
            <div className="following__headerWrapper">
                <BlockHeader title={'My Following'} />
            </div>

            <div className="following__followingWrapper">
                {!loading && success && user && user.userInfo ? (
                    user.userInfo.following.length === 0 ? (
                        <h1>No Following!</h1>
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
                    <h1>Loading</h1>
                )}
            </div>
        </div>
    )
}

export default Following
