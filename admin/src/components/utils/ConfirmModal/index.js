import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import Loader from '../Loader'

const ConfirmModal = ({
    isOpen,
    setIsOpen,
    password,
    setPassword,
    handleOnConfirm,
    loading,
}) => {
    const handleClose = () => {
        setIsOpen(false)
        setPassword('')
    }

    // to submit the form functionality on pressing enter
    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleOnConfirm()
        }
    }

    return (
        <>
            <Dialog open={isOpen} onClose={handleClose}>
                {loading && <Loader isModal />}
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To complete this action, please enter your password
                    </DialogContentText>
                    <TextField
                        fullWidth
                        autoFocus
                        autoComplete="new-password"
                        required
                        label="Admin Password"
                        type="password"
                        color="secondary"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleOnKeyPress}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="outlined">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleOnConfirm}
                        color="secondary"
                        variant="contained"
                        disabled={loading}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ConfirmModal
