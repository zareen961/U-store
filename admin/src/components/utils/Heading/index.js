import React from 'react'
import { Typography } from '@material-ui/core'

const Heading = ({ children }) => {
    return (
        <Typography variant="h5" color="textSecondary" style={{ marginBottom: '20px' }}>
            {children}
        </Typography>
    )
}

export default Heading
