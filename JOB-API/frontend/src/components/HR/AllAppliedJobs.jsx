import React, { useContext, useState, useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'
import { AuthContext } from '../../AuthContext'
import { useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'

function AllAppliedJobs() {
    const [applied,setApplied] = useState([])

    const [user,setUser] = useState(false)
    const [job,setJob] = useState(false)
    const [single,setSingle] = useState(false)

    const [status,setStatus] = useState("")

    const context = useContext(AuthContext)
    const [token] = context.token

    const initData = useCallback(() => {
        const getData = async () => {
          const res = await axios.get(`/api/v1/applied/readAll`, {
            headers: {
                Authorization: token
            }
        })
          setApplied(res.data.appliedJobs)
        }
        getData()
    },[applied])
    
    
      useEffect(() => {
          initData()
      },[initData])

    //   update logic
    const editHandler = async (id,jCode,userId,status) => {
        try {
            const res1 = await axios.get(`/api/v1/applied/single/${id}`, {
                headers: {
                    Authorization: token
                }
            })
            setSingle(res1.data.appliedJob)
            setStatus(res1.data.appliedJob.status)

            const res2 = await axios.get(`/api/v1/job/code/${jCode}`, {
                headers: {
                    Authorization: token
                }
            })
            setJob(res2.data.job)

            const res3 = await axios.get(`/api/v1/auth/user/${userId}`, {
                headers: {
                    Authorization: token
                }
            })
            setUser(res3.data.user)

        } catch (err) {
            toast.error(err.msg)
        }
    }
    
    // clear handler
    const clear = () => {
        setSingle(false)
        setUser(false)
        setJob(false)
    }

    // update applied job status
    const updateAppliedStatus = async (id) => {
        if(window.confirm(`Do you wish to update job status?`)) {
            try {
                await axios.patch(`/api/v1/applied/update/${id}`, { status }, {
                    headers: {
                        Authorization: token
                    }
                }).then(res => {
                    toast.success(res.data.msg)
                }).catch(err => toast.error(err.response.data.msg))
            } catch (err) {
                toast.error(err.msg)
            }
        }
    }
    
    //^ delete handler
    const deleteHandler = async (id) => {
        if(window.confirm(`Do you want to delete applied job ${id}`)){
            try {
                await axios.delete(`/api/v1/applied/delete/${id}`, {
                    headers: {
                        Authorization: token
                    }
                }).then(res => {
                    toast.success(res.data.msg)
                }).catch(err => toast.error(err.response.data.msg))
            } catch (err) {
                toast.error(err.msg)
            }
        }
    }

  return (
    <div className='container'>
       <div className="row">
        <div className="col-md-12 text-center">
            <h3 className="display-3 text-success">All Applied Jobs</h3>
        </div>
       </div>
       <div className="row">
           <div className="col-md-12">
                <div className="table table-responsive">
                    <table className="table table-bordered table-striped table-hovered text-center">
                        <thead>
                        <tr>
                            <th>JobCode</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            applied && applied.map((item,index) => {
                                return (
                                    <tr key={index} className='text-center'>
                                        <td> {item.jCode} </td>
                                        <td> {item.status} </td>
                                        <td>
                                            <button onClick={() => editHandler(item._id,item.jCode,item.userId,item.status)} data-bs-toggle="modal" data-bs-target="#appliedJob" className="btn btn-sm btn-outline-info me-3">
                                                <i className="bi bi-pencil-fill"></i>
                                            </button>
                                            <button onClick={() => deleteHandler(item._id)} className="btn btn-sm btn-outline-danger">
                                                <i className="bi bi-trash-fill"></i>
                                            </button>
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

       {/* modal window */}
       <div className="modal fade" id="appliedJob" tabIndex="-1" >
           <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="text-succes modal-title">Applied Job Details</h4>
                        <button onClick={clear} className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <div className="accordion" id='details'>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button" data-bs-toggle="collapse" data-bs-target="#user">
                                        Candidate Details
                                    </button>
                                </h2>
                                <div className="collapse accordion-collapse" data-bs-parent="#details" id="user">
                                    <div className="accordion-body">
                                        <h3 className='text-center text-success'> { user ? user.name : null } </h3>
                                        <hr />
                                        <p>
                                            <strong>Email</strong>
                                            <span className="float-end text-warning"> {user ? user.email : null } </span>
                                        </p>
                                        <p>
                                            <strong>Mobile</strong>
                                            <span className="float-end text-warning"> {user ? user.mobile : null } </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                        <button className="accordion-button" data-bs-toggle="collapse" data-bs-target="#job">
                                            Job Details
                                        </button>
                                    </h2>
                                    <div className="collapse accordion-collapse" data-bs-parent="#details" id="job">
                                        <div className="accordion-body">
                                            <h3 className="text-success text-center"> { job ? job.title : null } </h3>
                                            <hr />
                                            <p>
                                                <strong>Designation</strong>
                                                <span className="float-end text-warning"> {job ? job.designation: null } </span>
                                            </p>
                                            <p>
                                                <strong>Salary</strong>
                                                <span className="float-end text-warning"> &#8377; {job ? job.salary: null } </span>
                                            </p>
                                            <p>
                                                <strong>Skills Required</strong>
                                                <span className="float-end text-warning">  {job ? job.skills.join(','): null } </span>
                                            </p>
                                        </div>
                                    </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                        <button type='button' className="accordion-button" data-bs-toggle="collapse" data-bs-target="#app">
                                            Application Status
                                        </button>
                                    </h2>
                                    <div className="collapse accordion-collapse" data-bs-parent="#details" id="app">
                                        <div className="accordion-body">
                                            <div className="form-group mt-2">
                                                <h5 className="text-success"> Applied Time: 
                                                    <span className="float-end"> { single ? new Date(single.createdAt).toLocaleString() : null } </span>
                                                 </h5>
                                            </div>
                                            <div className="form-group mt-2">
                                                <label htmlFor="status">Status</label>
                                                <select name="status" value={status} onChange={(e)=> setStatus(e.target.value)} id="status" className="form-select">
                                                    <option value="null">Choose Job Status</option>
                                                    <option value="In Process">In Process</option>
                                                    <option value="Selected">Selected</option>
                                                    <option value="Rejected">Rejected</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={() => updateAppliedStatus(single?single._id:null)} className="btn btn-outline-info">Update Status</button>
                    </div>
                </div>
            </div>             
       </div>
    </div>
  )
}

export default AllAppliedJobs
