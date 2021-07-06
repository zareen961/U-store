import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ProductCard from '../../../components/Main/Home/ProductCard'
import ProductUploadForm from '../../../components/Main/Home/ProductUploadForm'
import BlockHeader from '../../../components/utils/BlockHeader'
import { productFetchAll } from '../../../store/actions/product'
import ScreenLoader from '../../../components/utils/ScreenLoader'
import NoItemMessage from '../../../components/utils/NoItemMessage'
import './Home.scss'

const Home = ({ isUploadFormOpen, setIsUploadFormOpen }) => {
    const dispatch = useDispatch()

    const { loading, products } = useSelector((state) => state.productFetchAll)
    const { user } = useSelector((state) => state.userLogin)

    useEffect(() => {
        if (user && user.userInfo) {
            dispatch(productFetchAll())
        }
    }, [dispatch, user])

    return (
        <div className="home">
            <ProductUploadForm
                isUploadFormOpen={isUploadFormOpen}
                setIsUploadFormOpen={setIsUploadFormOpen}
            />

            <BlockHeader title={'All Products'} />

            {loading ? (
                <ScreenLoader />
            ) : products.length === 0 ? (
                <NoItemMessage
                    title={'Your college is offline!'}
                    text={
                        'Share with college mates to see what they have to sell to you.'
                    }
                />
            ) : (
                products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))
            )}
        </div>
    )
}

export default Home
