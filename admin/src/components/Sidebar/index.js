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
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'

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
            <AppBar position="fixed" className={classes.appBar} color="secondary">
                <Toolbar className="toolbar">
                    <Typography variant="h6" noWrap>
                        U-store | Admin
                    </Typography>
                    <div className="logoutBtnWrapper">
                        <Typography variant="subtitle1">
                            Hello {admin?.username} !
                        </Typography>
                        <IconButton onClick={handleLogout}>
                            <PowerSettingsNewIcon className="sidebar__logoutButton" />
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
                            <ListItem button key={'Admins'}>
                                <ListItemIcon>
                                    <PeopleAltIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Admins'} />
                            </ListItem>
                        </Link>

                        <Link to="/college">
                            <ListItem button key={'Colleges'}>
                                <ListItemIcon>
                                    <AccountBalanceIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Colleges'} />
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
