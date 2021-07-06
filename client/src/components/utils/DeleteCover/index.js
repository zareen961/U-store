import React from 'react'
import { TrashIcon, PinIcon } from '@primer/octicons-react'

import ButtonComp from '../ButtonComp'
import './DeleteCover.scss'

const DeleteCover = ({ message, buttonText, handleOnClick, isLoading }) => {
    return (
        <div className="deleteCover">
            <div className="deleteCover__centerWrapper">
                <p className="deleteCover__message">{message}</p>
                {handleOnClick && (
                    <ButtonComp
                        typeClass={'secondary'}
                        text={buttonText}
                        handleOnClick={handleOnClick}
                        modifyClass={isLoading && 'disabled'}
                    >
                        {buttonText.toLowerCase().includes('delete') ? (
                            <TrashIcon size={18} />
                        ) : (
                            <PinIcon size={18} />
                        )}
                    </ButtonComp>
                )}
            </div>
        </div>
    )
}

export default DeleteCover
