import React from 'react'

import ProductCard from '../../../components/Main/Home/ProductCard'
import ProductUploadForm from '../../../components/Main/Home/ProductUploadForm'
import './Home.css'

const Home = () => {
    return (
        <div className="home">
            <ProductUploadForm />
            <ProductCard />
            <ProductCard />
        </div>
    )
}

export default Home
