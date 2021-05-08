import React from 'react'
import Dialog from '@material-ui/core/Dialog'

import './ModalComp.css'

const ModalComp = ({ isOpen, setIsOpen, children, maxWidth = 'sm' }) => {
    return (
        <Dialog
            disableScrollLock
            fullWidth
            maxWidth={maxWidth}
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="modalComp"
        >
            {children}
        </Dialog>
    )
}

export default ModalComp
