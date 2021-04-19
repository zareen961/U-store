import React from 'react'
import {
    Drawer,
    AppBar,
    CssBaseline,
    Toolbar,
    List,
    Typography,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Badge,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import MessageIcon from '@material-ui/icons/Message'

import useStyles from './styles'
import Routes from '../../Routes'
import './Sidebar.css'
import { adminLogout } from '../../store/actions'

const Sidebar = () => {
    const dispatch = useDispatch()
    const { admin } = useSelector((state) => state.adminLogin)

    const classes = useStyles()

    const handleLogout = () => {
        dispatch(adminLogout())
    }

    return (
        <div className={`sidebar ${classes.root}`}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className="toolbar">
                    <Typography variant="h6" noWrap>
                        U-store | Admin
                    </Typography>
                    <div className="logoutBtnWrapper">
                        <Typography variant="subtitle1">
                            Hello! {admin?.username}
                        </Typography>
                        <IconButton onClick={handleLogout}>
                            <PowerSettingsNewIcon color="secondary" />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        <Link to="/">
                            <ListItem button key={'Home'}>
                                <ListItemIcon>
                                    <Badge badgeContent={0} color="primary">
                                        <MessageIcon />
                                    </Badge>
                                </ListItemIcon>
                                <ListItemText primary={'Home'} />
                            </ListItem>
                        </Link>
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar />
                <Routes />
            </main>
        </div>
    )
}

export default Sidebar
