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
    handleOnChange,
    handleOnConfirm,
    isLoading,
}) => {
    const handleOnCancel = () => {
        setIsOpen(false)
        setCurrentPassword('')
    }

    // to submit the form functionality on pressing enter
    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter' && currentPassword) {
            handleOnConfirm()
        }
    }

    return (
        <ModalComp isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="confirmModal">
                <h1>Are you sure?</h1>
                <p>
                    Enter your current password to proceed. Once confirmed then it can't
                    be reverted. Proceed cautiously!
                </p>
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
                        onChange={handleOnChange}
                        onKeyPress={handleOnKeyPress}
                    />
                </div>

                <div className="confirmModal__buttonsWrapper">
                    <ButtonComp
                        typeClass={'primary'}
                        modifyClass={(isLoading || !currentPassword) && 'disabled'}
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
