import React, { useState } from 'react'
import { HubotIcon } from '@primer/octicons-react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import ModalComp from '../ModalComp'
import ButtonComp from '../ButtonComp'
import ConfirmModal from '../ConfirmModal'
import { useForm } from '../../../hooks/useForm'
import { alertAdd } from '../../../store/actions/ui'
import { userDelete } from '../../../store/actions/user'
import './DangerConfirmModal.scss'

const initialInputVals = {
    textToEnter: '',
    currentPassword: '',
}

const DangerConfirmModal = ({ isDangerOpen, setIsDangerOpen, title, textToEnter }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { loading: loadingUserDelete } = useSelector((state) => state.userDelete)

    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const { inputVals, handleOnChange, handleReset, customSetInputVals } =
        useForm(initialInputVals)

    const handleOnCancel = () => {
        handleReset()
        setIsDangerOpen(false)
    }

    // to submit the form functionality on pressing enter
    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleProceed()
        }
    }

    const handleProceed = () => {
        if (inputVals.textToEnter.trim() === textToEnter.trim()) {
            setIsConfirmOpen(true)
        } else {
            dispatch(alertAdd('Please type the given text as it is to proceed.', 'error'))
        }
    }

    const handleAccountDelete = () => {
        dispatch(userDelete(inputVals.currentPassword, history))
    }

    return (
        <>
            <ModalComp
                isOpen={isDangerOpen}
                handleOnClose={handleOnChange}
                maxWidth={'sm'}
                isLoading={false}
            >
                <div className="dangerConfirmModal">
                    <h1 className="dangerConfirmModal__title">{title}</h1>
                    <p className="dangerConfirmModal__text">Enter the text below:</p>
                    <h3 className="dangerConfirmModal__textToEnter">{textToEnter}</h3>

                    <div className="dangerConfirmModal__input">
                        <span className="icon">
                            <HubotIcon size={22} />
                        </span>
                        <input
                            autoFocus
                            type="text"
                            placeholder={textToEnter}
                            autoComplete="new-password"
                            name="textToEnter"
                            value={inputVals.textToEnter}
                            onChange={handleOnChange}
                            onKeyPress={handleOnKeyPress}
                        />
                    </div>

                    <div className="dangerConfirmModal__buttonsWrapper">
                        <ButtonComp
                            typeClass={'primary'}
                            text={'Proceed'}
                            modifyClass={
                                inputVals.textToEnter.trim() === textToEnter.trim()
                                    ? 'deleteAccount'
                                    : 'deleteAccount disabled'
                            }
                            handleOnClick={handleProceed}
                        />

                        <ButtonComp
                            typeClass={'primary'}
                            text={'Cancel'}
                            handleOnClick={handleOnCancel}
                        />
                    </div>
                </div>
            </ModalComp>

            {/* Confirm Account Delete Modal */}
            <ConfirmModal
                isOpen={isConfirmOpen}
                setIsOpen={setIsConfirmOpen}
                currentPassword={inputVals.currentPassword}
                setCurrentPassword={(newVal) =>
                    customSetInputVals('currentPassword', newVal)
                }
                handleOnChange={handleOnChange}
                handleOnConfirm={handleAccountDelete}
                isLoading={loadingUserDelete}
            />
        </>
    )
}

export default DangerConfirmModal
