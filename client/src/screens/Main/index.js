import React, { useState } from 'react'

import SidebarLeft from '../../components/Main/SidebarLeft'
import SidebarRight from '../../components/Main/SidebarRight'
import Header from '../../components/Main/Header'
import Routes from '../../Routes'
import './Main.scss'

const Main = () => {
    const [isUploadFormOpen, setIsUploadFormOpen] = useState(false)

    return (
        <div className="main">
            <div className="main__header">
                <Header setIsUploadFormOpen={setIsUploadFormOpen} />
            </div>

            <div className="main__bodyWrapper">
                <div className="main__sidebarLeft">
                    <SidebarLeft />
                </div>
                <div className="main__screen">
                    <Routes
                        isUploadFormOpen={isUploadFormOpen}
                        setIsUploadFormOpen={setIsUploadFormOpen}
                    />
                </div>
                <div className="main__sidebarRight">
                    <SidebarRight />
                </div>
            </div>
        </div>
    )
}

export default Main
