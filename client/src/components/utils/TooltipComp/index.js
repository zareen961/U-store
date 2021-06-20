import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'

const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
        fontSize: 13,
        letterSpacing: 0.5,
        fontFamily: 'Poppins',
    },
}))

function BootstrapTooltip(props) {
    const classes = useStylesBootstrap()

    return <Tooltip arrow classes={classes} {...props} />
}

const TooltipComp = ({ children, title, placement }) => {
    return (
        <BootstrapTooltip
            title={title}
            placement={placement}
            TransitionComponent={Zoom}
            arrow
        >
            <div>{children}</div>
        </BootstrapTooltip>
    )
}

export default TooltipComp
