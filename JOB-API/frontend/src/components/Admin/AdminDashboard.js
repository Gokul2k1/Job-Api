import React,{useState, useCallback, useEffect, useContext} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {AuthContext} from '../../AuthContext'


function AdminDashboard () {
    const [users,setUsers] = useState([])
    const [jobs, setJobs] = useState([])
    const[ applied, setApplied] = useState()
    const context = useContext(AuthContext)
    const [token] = context.token

    const initUser = useCallback(() => {
        const getUsers = async () => {
            const res = await axios.get(`/api/v1/auth/users/all`, {
                headers: {
                    Authorization: token
                }
            })
            setUsers(res.data.users)
        }
        getUsers()
    },[])

    useEffect(() => {
        initUser()
    },[])

    const initJob = useCallback(() => {
        const getJob = async () => {
            const res = await axios.get(`/api/v1/job/all`, {
                headers: {
                    Authorization: token
                }
            })
            setJobs(res.data.jobs)
        }
        getJob()
    },[])

    useEffect(() => {
        initUser()
        initJob()
    },[])

    const initApplied = useCallback(() => {
        const getApplied = async () => {
            const res = await axios.get(`/api/v1/applied/readAll`, {
                headers: {
                    Authorization: token
                }
            })
            setApplied(res.data.appliedJobs)
        }
        getApplied()
    },[])

    useEffect(() => {
        initUser()
        initJob()
        initApplied()
    },[])


    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className="display-3 text-center text-info">Admin Dashboard</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 col-lg-4 col-sm-12 mt-2 mb-2">
                    <div className="card bg-warning">
                        <div className="card-body">
                            <h1 className="text-light">Users</h1>
                            <h4 className="text-light display-4 float-end"> {users ? users.length : 0}</h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-lg-4 col-sm-12 mt-2 mb-2">
                    <div className="card bg-danger">
                        <div className="card-body">
                            <h1 className="text-light">Jobs</h1>
                            <h4 className="text-light display-4 float-end"> {jobs ? jobs.length : 0}</h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-lg-4 col-sm-12 mt-2 mb-2">
                    <div className="card bg-dark">
                        <div className="card-body">
                            <h1 className="text-light"> Applied Jobs</h1>
                            <h4 className="text-light display-4 float-end"> {applied ? applied.length : 0}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdminDashboard