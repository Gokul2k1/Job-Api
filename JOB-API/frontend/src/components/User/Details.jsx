import React,{useEffect,useCallback,useContext, useState} from 'react'
import {AuthContext} from "../../AuthContext"
import {useNavigate,useParams} from "react-router-dom"
import axios from 'axios'
import { toast } from 'react-toastify'

function Details(props) {
    const context=useContext(AuthContext)
    const [token] =context.token
    const [isUser] = context.authApi.isUser
    const [currentUser] = context.authApi.currentUser

    const [job,setJob] =useState('')

    const params =useParams()
    const navigate = useNavigate()

    const initJob=useCallback(()=>{
        const getSingle =async () =>{
            const res=await axios.get(`/api/v1/job/${params.id}`,{
                headers:{
                    Authorization:token
                }
            })
            setJob(res.data.job)
        }
        getSingle()
    },[])

    useEffect(()=>{
        initJob()
    })

    const applyHandler = async() => {
       try {
        let data = {
            jCode: job.jCode,
            userId: currentUser._id
        }
        await axios.post(`/api/v1/applied/new`, data, {
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            toast.success(res.data.msg)
        }).catch(err => toast.error(err.response.data.msg))
       } catch (err) {
            toast.error(err.msg)
       }
    }

  return (
   <div className="container">
    <div className="row">
        <div className="col-md-12 text-center">
            <h3 className="display-3 text-success">Job Details</h3>
        </div>
    </div>
    <div className="row">
        <div className="col-md-8 col-lg-8 col-sm-12 mt-2">
            <div className="card">
                <div className="card-header">
                    <h6 className="display-6 text-success text-capitalize">{job.title}</h6>
                    <div>
                        <h6 className="text-info"><i className="bi bi-briefcase-fill">{job.designation}</i></h6>
                        {
                            isUser ? <button  onClick={() => applyHandler()} className="btn btn-outline-info float-end">Apply Now</button>: null
                        }
                    </div>
                </div>
                <div className="card-body">
                    <h4>Job Details</h4> <hr />
                    <p className='d-flex justify-content-evenly'>
                        <span><i className="bi bi-clock text-info"></i><b>Level</b>: {job.jobLevel}</span>
                        <span><i className="bi bi-credit-card 2-front text-info"></i> <b>salary</b>: &#8377;{job.salary}</span>
                        <span><i className="bi bi-person-vcard text-info"></i> <b>Dept</b>: {job.department}</span>
                        <span><i className="bi bi-person-vcard text-info"></i><b>isActive</b>: {job.isActive ? <i className='bi bi-check-circle-fill text-success'></i> : <i className='bi bi-x-circle-fill text-danger'> </i>}</span>
                    </p>
                    <p className='d-flex justify-content-evenly'>
                        <span><i className="bi bi-person text-info"></i> <b>Hire</b>: {job.position}</span>
                        <span><i className="bi bi-book text-info"></i> <b>Degree</b>: {job.jobDegree}</span>
                        <span><i className="bi bi-book text-info"></i> <b>Status</b>: {job.status}</span>
                    </p>

                    <h4>Job Description</h4> <hr />
                    <p>
                        {
                            job.description
                        }
                    </p>
                </div>
            </div>
            </div>
            <div className="col-md-4 col-lg-4 col-sm-12 mt-2">
            <div className="card">
                <div className="card-header">
                    <h5 className="text-success text-center">Skills</h5>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {
                            job && job.skills.map((item,index)=>{
                                return(
                                    <li className="list-group-item" key={index}>{item}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
        </div>

    </div>
  
  )
}

export default Details
