import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../slices/login'
import { AppBar, Toolbar, Button, Typography, makeStyles, Container, IconButton } from '@material-ui/core'
import MoreIcon from '@material-ui/icons/MoreVert'

const useStyle = makeStyles((theme) => ({
    logo: {
        flex: 1
    },
    button: {
        marginRight: theme.spacing(1),
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
      },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
      },
}))

const Navbar = () => {
    const classes = useStyle()
    const [anchorEl, setAnchorEl] = useState(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isAuth = useSelector(state => state.login.isAuth)
    const dispatch = useDispatch()

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const mobileMenuId = 'primary-search-account-menu-mobile';

    const renderButtonUser = () => {
        if (isAuth) {
            return <Button component={Link} className={classes.button} to="/" onClick={() =>{dispatch(logout())}}>Logout</Button>
        } else {
            return (
                <Fragment>
                    <Button component={Link} className={classes.button} to={"/register"}>Signup</Button>
                    <Button component={Link} className={classes.button} to={"/login"}>Login</Button>
                </Fragment>
            )
        }
    }

    return (
        <AppBar position="static"> 
            <Container maxWidth="md">
                <Toolbar>
                    <Typography className={classes.logo}><Link to="/">Pi-theiyw</Link></Typography>
                    <div className={classes.sectionDesktop}>
                    <Button variant="contained" className={classes.button} component={Link} to={"/create"} color="secondary">Create</Button>
                    {renderButtonUser()}
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar