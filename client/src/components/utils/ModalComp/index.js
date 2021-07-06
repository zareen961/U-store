import React from 'react'
import Dialog from '@material-ui/core/Dialog'

import './ModalComp.scss'

const ModalComp = ({
    isOpen,
    handleOnClose,
    children,
    maxWidth = 'sm',
    isLoading = false,
}) => {
    return (
        <Dialog
            disableBackdropClick={isLoading}
            disableScrollLock
            fullWidth
            maxWidth={maxWidth}
            open={isOpen}
            onClose={handleOnClose}
            className="modalComp"
        >
            {children}
        </Dialog>
    )
}

export default ModalComp
