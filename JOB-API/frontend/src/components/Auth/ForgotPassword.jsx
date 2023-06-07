import React, {useState} from "react";
import {toast} from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ForgotPassword(props){
    const [email, setEmail] = useState('')

    const navigate = useNavigate()

    // & login handler
    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            console.log(' user =', email)
            await axios.post(`/api/v1/auth/password/generate`,{email})
            .then(res => {
                toast.success(res.data.msg)
                navigate('/login')
            }).catch(err => toast.error(err.response.data.msg))
        } catch(err) {
            toast.error(err.msg)
        }
    }
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3 text-success">Forgot password</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={submitHandler}>

                                <div className="form-group mt-2">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="form-control" required />
                                </div>
                                <div className="from-group mt-2">
                                    <input type="submit" value="Generate Password" className="btn btn-outline-success" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ForgotPassword
