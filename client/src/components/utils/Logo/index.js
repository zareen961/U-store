import React from 'react'

import './Logo.scss'

const Logo = ({ isAnimate, sizeClass = 'medium' }) => {
    return (
        <div className={isAnimate ? `logo animate ${sizeClass}` : `logo ${sizeClass}`}>
            <div className="logo__icon">
                <div className="logo__leftLines">
                    <div className="logo__iconLine behind"></div>
                    <div className="logo__iconLine behind"></div>
                    <div className="logo__iconLine"></div>
                    <div className="logo__iconLine"></div>
                </div>
                <div className="logo__rightLines">
                    <div className="logo__iconLine"></div>
                    <div className="logo__iconLine"></div>
                    <div className="logo__iconLine behind"></div>
                    <div className="logo__iconLine behind"></div>
                </div>
            </div>
            <div className="logo__text">
                <h1>U-Store</h1>
            </div>
        </div>
    )
}

export default Logo
