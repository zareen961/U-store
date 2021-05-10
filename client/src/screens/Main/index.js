import React from 'react'

import Sidebar from '../../components/Main/Sidebar'
import Header from '../../components/Main/Header'
import Routes from '../../Routes'
import './Main.css'

const Main = () => {
    return (
        <div className="main">
            <div className="main__sidebar">
                <Sidebar />
            </div>
            <div className="main__wrapper">
                <div className="main__header">
                    <Header />
                </div>
                <div className="main__screen">
                    <Routes />
                </div>
            </div>
        </div>
    )
}

export default Main
