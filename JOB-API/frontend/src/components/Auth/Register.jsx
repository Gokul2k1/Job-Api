import React, {useState} from "react";
import {toast} from 'react-toastify'
import axios from 'axios'

function Register(props){
    const [user, setUser] = useState({
        name: '',
        email: '',
        mobile: '',
        password: ''
    })

    // read logic
    const readValue = (e) => {
        const { name, value} = e.target 
        setUser({ ...user, [name]:value })
    }
    // register handler
    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            console.log('new user =', user)
            await axios.post(`/api/v1/auth/register`, user)
                .then(res => {
                    // console.log(res);
                    toast.success(res.data.msg)
                }).catch(err => toast.error(err.response.data.msg))
        } catch(err) {
            toast.error(err.msg)
        }
    }
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3 text-success">Register</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={submitHandler}>
                                <div className="form-group mt-2">
                                            <label htmlFor="name">Name</label>
                                            <input type="text" name="name" value={user.name} onChange={readValue} id="name" className="form-control" required />
                                </div>
                                <div className="form-group mt-2">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" name="email" value={user.email} onChange={readValue} id="email" className="form-control" required />
                                </div>
                                <div className="form-group mt-2">
                                            <label htmlFor="mobile">Mobile</label>
                                            <input type="mobile" name="mobile" value={user.mobile} onChange={readValue} id="mobile" className="form-control" required />
                                </div>
                                <div className="form-group mt-2">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" name="password" value={user.password} onChange={readValue} id="password" className="form-control" required />
                                </div>
                                <div className="from-group mt-2">
                                    <input type="submit" value="Register" className="btn btn-outline-success" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register