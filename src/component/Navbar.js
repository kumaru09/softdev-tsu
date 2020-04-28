import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../slices/login'
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core'

const Navbar = () => {
    const isAuth = useSelector(state => state.login.isAuth)
    const user = useSelector(state => state.login.user)
    const dispatch = useDispatch()

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography><Link exact to="/">Pi-theiyw</Link></Typography>
                    { !isAuth && <Button color="inherit"><Link to="/register" className="nav-link">Signup</Link></Button>}
                    { !isAuth ? <Button color="inherit"><Link to="/login" className="nav-link">Login</Link></Button>
                        : <Button color="inherit"><Link to="/" className="nav-link" onClick={() =>{dispatch(logout())}}>
                        Logout</Link></Button>}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar