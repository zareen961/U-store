import React from 'react'
import Dialog from '@material-ui/core/Dialog'

import './ModalComp.css'

const ModalComp = ({ isOpen, handleOnClose, children, maxWidth = 'sm' }) => {
    return (
        <Dialog
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
