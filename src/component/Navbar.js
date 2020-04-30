import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../slices/login'
import { AppBar, Toolbar, Button, Typography, makeStyles, Container } from '@material-ui/core'

const useStyle = makeStyles((theme) => ({
    toolbar: {
        textDecoration: 'none',
    },
    logo: {
        flex: 1
    }
}))

const Navbar = () => {
    const classes = useStyle()
    const isAuth = useSelector(state => state.login.isAuth)
    const dispatch = useDispatch()

    return (
        <AppBar position="static"> 
        <Container maxWidth="md">
            <Toolbar className={classes.toolbar}>
                    <Typography className={classes.logo}><Link exact to="/">Pi-theiyw</Link></Typography>
                    <Button variant="contained" component={Link} to={"/create"} color="secondary">Create</Button>
                        { !isAuth && <Button component={Link} to={"/register"}>Signup</Button>}
                        { !isAuth ? <Button component={Link} to={"/login"}>Login</Button>
                            : <Button><Link to="/" onClick={() =>{dispatch(logout())}}>
                            Logout</Link></Button>}
            </Toolbar>
        </Container>
        </AppBar>
    )
}

export default Navbar