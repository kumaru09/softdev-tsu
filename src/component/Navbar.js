import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../slices/login'

const Navbar = () => {
    const isAuth = useSelector(state => state.login.isAuth)
    const user = useSelector(state => state.login.user)
    const dispatch = useDispatch()

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container">
            <NavLink exact to="/" className="navbar-brand">Pi-theiyw</NavLink>
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav ml-auto">
                        { isAuth && <li className="nav-item"><Link to="/profile" className="nav-link"><i className="material-icons">face</i></Link></li> }
                        { isAuth && <li className="dropdown nav-item">
                            <a href="javasrcipt:;" className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false">
                                <i className="material-icons">settings</i><b className="caret"></b>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <h6 className="dropdown-header">{ user.name }</h6>
                            </div>
                        </li>}
                        { !isAuth && <li className="nav-item"><Link to="/register" className="nav-link">Signup</Link></li>}
                        { !isAuth ? <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
                        : <li className="nav-item"><Link to="/" className="nav-link" onClick={() =>{dispatch(logout())}}>
                        Logout</Link></li> }
                    </ul>
                </div>
                </div>
        </nav>
    )
}

export default Navbar