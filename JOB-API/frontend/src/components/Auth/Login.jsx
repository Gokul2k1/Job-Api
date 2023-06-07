import React, {useState} from "react";
import {toast} from 'react-toastify'
import axios from 'axios'
import { useNavigate, NavLink } from 'react-router-dom'

function Login(props){
    const [user, setUser] = useState({

        email: '',
        password: ''
    })
    const navigate = useNavigate()
    // ^ read logic
    const readValue = (e) => {
        const { name, value} = e.target 
        setUser({ ...user, [name]:value })
    }
    // & register handler
    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            console.log('new user =', user)
            await axios.post(`/api/v1/auth/login`, user)
                .then(res => {
                    // console.log(res);
                    toast.success(res.data.msg)
                    localStorage.setItem('loginToken',res.data.authToken)
                    navigate(`/`)
                    window.location.reload()
                }).catch(err => toast.error(err.response.data.msg))
        } catch(err) {
            toast.error(err.msg)
        }
    }
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3 text-success">Login</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={submitHandler}>

                                <div className="form-group mt-2">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" name="email" value={user.email} onChange={readValue} id="email" className="form-control" required />
                                </div>
                                <div className="form-group mt-2">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" name="password" value={user.password} onChange={readValue} id="password" className="form-control" required />
                                </div>
                                <div className="from-group mt-2">
                                    <input type="submit" value="Login" className="btn btn-outline-success" />
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <p><strong>Forgot password? <NavLink to={`/forgotPassword`} className="btn btn-link">Reset Password</NavLink></strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login
