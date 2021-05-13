import React from 'react'

import SidebarLeft from '../../components/Main/SidebarLeft'
import SidebarRight from '../../components/Main/SidebarRight'
import Header from '../../components/Main/Header'
import Routes from '../../Routes'
import './Main.css'

const Main = () => {
    return (
        <div className="main">
            <div className="main__header">
                <Header />
            </div>
            <div className="main__wrapper">
                <div className="main__sidebarLeft">
                    <SidebarLeft />
                </div>
                <div className="main__screen">
                    <Routes />
                </div>
                <div className="main__sidebarRight">
                    <SidebarRight />
                </div>
            </div>
        </div>
    )
}

export default Main
