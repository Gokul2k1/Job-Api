import React,{useState} from 'react'
import {toast} from 'react-toastify'
import {useParams,useNavigate} from "react-router-dom"
import axios from 'axios'

function Password(props) {
    const [user,setUser]=useState({
        password:'',
        conPassword:''
    })

    const params=useParams()
    const navigate=useNavigate()

    const readValue=(e) =>{
        const {name,value}=e.target;
        setUser({...user,[name]:value})
    }

    const submitHandler = async (e) =>{
        e.preventDefault();
        try{
            if(user.password !== user.conPassword){
                toast.warning("Password's Are Not Matched...")
            }else{
                let data={
                    password:user.password
                }
                await axios.patch(`/api/v1/auth/password/update/${params.token}`,data)
                .then(res=>{
                    toast.success(res.data.msg)
                    navigate(`/login`)
                }).catch(err => toast.error(err.response.data.msg))
            }
        }
            catch(err) {
                toast.error(err.msg)
            }
        }

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">Create New Password</h3>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6 offset-3">
                <div className="card">
                    <div className="card-body">
                        <form autoComplete='off' onSubmit={submitHandler}>
                            <div className="form-group mt-2">
                                <label htmlFor="password">Password</label>
                                <input type="password" name='password' value={user.password} onChange={readValue} id="password" className="form-control" />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="conPassword">Confirm Password</label>
                                <input type="password" name='conPassword' value={user.conPassword} onChange={readValue} id="conPassword" className="form-control" />
                            </div>
                            <div className="form-group mt-2">
                                <input type="submit" value="Update Password" className="btn btn-outline-success" />
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Password
