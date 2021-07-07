import React from 'react'

import './BurgerMenuButton.scss'

const BurgerMenuButton = ({ isOpen }) => {
    return (
        <ul className={isOpen ? 'burgerMenuButton active' : 'burgerMenuButton'}>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    )
}

export default BurgerMenuButton
