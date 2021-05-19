import React from 'react'

import ButtonComp from '../ButtonComp'
import './ScreenHeader.css'

const ScreenHeader = ({ title, handleButtonPress, buttonText, children }) => {
    return (
        <div className="screenHeader">
            <h1>{title}</h1>
            {handleButtonPress && (
                <ButtonComp
                    typeClass={'secondary'}
                    text={buttonText}
                    handleOnClick={handleButtonPress}
                >
                    {children}
                </ButtonComp>
            )}
        </div>
    )
}

export default ScreenHeader
