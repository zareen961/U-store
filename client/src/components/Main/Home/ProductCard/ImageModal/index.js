import React from 'react'
import { XIcon } from '@primer/octicons-react'

import ModalComp from '../../../../utils/ModalComp'
import ButtonComp from '../../../../utils/ButtonComp'
import './ImageModal.scss'

const ImageModal = ({ isOpen, setIsOpen, productImage, productName }) => {
    return (
        <ModalComp isOpen={isOpen} handleOnClose={() => setIsOpen(false)} maxWidth={'lg'}>
            <div className="imageModal">
                <img src={productImage} alt={productName} />
                <div className="imageModal__closeButtonWrapper">
                    <ButtonComp
                        typeClass={'secondary'}
                        modifyClass={'iconButton'}
                        handleOnClick={() => setIsOpen(false)}
                    >
                        <XIcon size={18} />
                    </ButtonComp>
                </div>
            </div>
        </ModalComp>
    )
}

export default ImageModal
