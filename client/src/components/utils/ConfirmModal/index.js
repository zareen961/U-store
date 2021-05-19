import React from 'react'
import { KeyIcon } from '@primer/octicons-react'

import ModalComp from '../ModalComp'
import ButtonComp from '../ButtonComp'
import './ConfirmModal.css'

const ConfirmModal = ({
    isOpen,
    setIsOpen,
    currentPassword,
    setCurrentPassword,
    handleOnConfirm,
}) => {
    const handleOnCancel = () => {
        setIsOpen(false)
        setCurrentPassword('')
    }

    return (
        <ModalComp isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="confirmModal">
                <h1>Are you sure?</h1>
                <p>Enter your current password to proceed.</p>
                <div className="confirmModal__input">
                    <span className="icon">
                        <KeyIcon size={18} />
                    </span>
                    <input
                        required
                        type="password"
                        placeholder="Enter Password"
                        autoComplete="new-password"
                        name="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>

                <div className="confirmModal__buttonsWrapper">
                    <ButtonComp
                        typeClass={'primary'}
                        text={'Confirm'}
                        handleOnClick={handleOnConfirm}
                    />
                    <ButtonComp
                        typeClass={'secondary'}
                        text={'Cancel'}
                        handleOnClick={handleOnCancel}
                    />
                </div>
            </div>
        </ModalComp>
    )
}

export default ConfirmModal
