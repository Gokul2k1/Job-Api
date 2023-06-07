import React,{useContext} from "react";
import {NavLink, useNavigate} from 'react-router-dom'
import {AuthContext} from '../AuthContext'
import axios from "axios";
import {toast} from 'react-toastify'

function Menu() {
    const context = useContext(AuthContext)
    const [isLogin] = context.authApi.isLogin
    const [isUser] = context.authApi.isUser
    const[isHr] = context.authApi.isHr
    const[isAdmin] = context.authApi.isAdmin

    const navigate = useNavigate()

    const logoutHandler = async () => {
        try {
            if(window.confirm(`Are you confirm to logout`)) {
                await axios.get(`/api/v1/auth/logout`)
                .then(res => {
                    localStorage.clear();
                    navigate(`/`)
                    toast.success(res.data.msg)
                    window.location.reload()
                }) .catch(err => toast.error(err.response.data.msg))
            }
        } catch (err) {
            toast.error(err.msg)
        }
    }

    //? useRoute
    const userRoute = () => (
        <>
           <li className="nav-item dropdown me-3 mt-sm-3">
                <NavLink className="nav-link dropdown-toggle text-warning" data-bs-toggle="dropdown" to={`/`}>Accounts</NavLink>
                <ul className="dropdown-menu">
                    <li><NavLink to={`/user/dashboard`} className="dropdown-item">Dashboard</NavLink></li>
                    <li><NavLink to={`/user/job/applied`} className="dropdown-item">Applied jobs</NavLink></li>
                   
                </ul>
            </li>
        </>
    )

    //* Admin route
    const adminRoute = () => (
        <>
            <li className="nav-item dropdown me-3 mt-sm-3">
                <NavLink className="nav-link dropdown-toggle text-warning" data-bs-toggle="dropdown" to={`/`}>Accounts</NavLink>
                <ul className="dropdown-menu">
                    <li><NavLink to={`/admin/dashboard`} className="dropdown-item">Dashboard</NavLink></li>
                    <li><NavLink to={`/admin/users/all`} className="dropdown-item">All Users</NavLink></li>
                </ul>
            </li>
        </>
    )

    //^ hr route
    const hrRoute = () => (
        <>
           <li className="nav-item dropdown me-3 mt-sm-3">
                <NavLink className="nav-link dropdown-toggle text-warning" data-bs-toggle="dropdown" to={`/`}>Accounts</NavLink>
                <ul className="dropdown-menu">
                    <li><NavLink to={`/hr/dashboard`} className="dropdown-item">Dashboard</NavLink></li>
                    <li><NavLink to={`/job/applied/all`} className="dropdown-item">All Applied jobs</NavLink></li>
                </ul>
            </li>
        </>
    )

    return(
        <nav className="navbar navbar-expand-md navbar-dark bg-primary">
            <div className="container-fluid">
                <NavLink to={'/'} className="navbar-brand text-light">JOB API</NavLink>

                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse  justify-content-between" id="menu">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to={'/'} className="nav-link text-light ">Home</NavLink>
                        </li>
                    </ul>
                    {
                        isLogin ? (
                            <ul className="navbar-nav">
                                {isAdmin ? adminRoute(): null}
                                {isUser? userRoute(): null}
                                {isHr? hrRoute(): null}
                                <li className="nav-item">
                                    <NavLink onClick={logoutHandler} to={`/logout`} className="nav-link btn btn-danger mt-2">
                                        Logout <i className="bi bi-box-arrow-right"></i>
                                    </NavLink>
                                </li>
                            </ul>
                        ) : (
                            <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to={'/login'} className="nav-link">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/register'} className="nav-link">Register</NavLink>
                            </li>
                        </ul>
                        )
                    }
                   
                </div>
            </div>
        </nav>
    )

}
export default Menu