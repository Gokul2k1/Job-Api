import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate,NavLink} from 'react-router-dom'
import { AuthContext } from "../../AuthContext";
import axios from "axios";
import { toast } from "react-toastify";


function UserDashboard(props){
    const context = useContext(AuthContext)
    const [token] = context.token
    const [isHr] =  context.authApi.isHr
    const [jobs,setJobs] = useState([])


    const [isActive, setIsActive] = useState(false)
    const navigate = useNavigate()


    const initJob = useCallback(() => {
        const getJob = async () => {
            const res = await axios.get(`/api/v1/job/all`, {
                headers:{
                    Authorization: token
                }
            })
            setJobs(res.data.jobs)
        }
        getJob()
    },[])
    useEffect(() => {
        initJob()
    },[])

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3 text-success">User Dashboard</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 ">
                    <div className="table table-responsive ">
                        <table className="table table-striped table-bordered table-hovered">
                            <thead>
                                <tr>
                                    <th colSpan={6}>
                                        <NavLink to={`/job/create`} className="btn btn-success float-end">New job</NavLink>
                                    </th>
                                </tr>
                                <tr className="text-center">
                                    <th>jobCode</th>
                                    <th>Title</th>
                                    <th>Designation</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   jobs && jobs.map((item,index) => {
                                    return (
                                        <tr className={ item.isActive ? 'text-center text-success' : 'text-danger text-center' } key={index}>
                                            <td> {item.jCode} </td>
                                            <td> {item.title} </td>
                                            <td> {item.designation} </td>
                                            <td> {item.status} </td>

                                            <td>
                                                <NavLink to={`/user/job/details/${item._id}`} className="btn btn-sm btn-info me-2">
                                                    <i className="bi bi-info"></i>
                                                </NavLink>
                                            </td>
                                        </tr>
                                    )
                                   })
                                }
                            </tbody>
                      </table>
                    </div>                
                </div>
            </div>
        </div>
    )
}
export default UserDashboard
