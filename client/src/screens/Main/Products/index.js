import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ProductCardProduct from '../../../components/Main/ProductCardProduct'
import { userFetchProducts } from '../../../store/actions/user'
import './Products.css'

const Products = () => {
    const dispatch = useDispatch()

    const { loading, success } = useSelector((state) => state.userProducts)
    const { user } = useSelector((state) => state.userLogin)

    useEffect(() => {
        dispatch(userFetchProducts())
    }, [dispatch])

    return (
        <div className="products">
            {!loading && success && user && user.userInfo ? (
                user.userInfo.products.length === 0 ? (
                    <h1>No Products!</h1>
                ) : (
                    <>
                        <div className="products__left">
                            {user.userInfo.products.map((product, index) =>
                                index % 2 === 0 ? (
                                    <ProductCardProduct
                                        key={product._id}
                                        product={product}
                                    />
                                ) : null
                            )}
                        </div>
                        <div className="products__right">
                            {user.userInfo.products.map((product, index) =>
                                index % 2 !== 0 ? (
                                    <ProductCardProduct
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
    )
}

export default Products
