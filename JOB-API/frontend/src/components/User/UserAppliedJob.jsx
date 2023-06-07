import React,{useEffect,useCallback,useContext, useState} from 'react'
import {AuthContext} from "../../AuthContext"
import {useNavigate,useParams} from "react-router-dom"
import axios from 'axios'
import { toast } from 'react-toastify'

function UserAppliedJob(props) {
    const [applied,setApplied]=useState([])


    const context=useContext(AuthContext)
    const [token]=context.token


    const initData=useCallback(() =>{
        const getData=async () =>{
        const res=await axios.get(`/api/v1/applied/all`,{
          headers:{
            Authorization:token
          }
        })
        setApplied(res.data.appliedJobs)
      }
      getData()
      },[])

      useEffect(()=>{
        initData()
      })


  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">User Applied Jobs</h3>
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
                            </tr>
                        </thead>
                        <tbody>
                            {
                                applied && applied.map((item,index)=>{
                                    return(
                                        <tr key={index} className="text-center">
                                            <td>{item.jCode}</td>
                                            <td>{item.status}</td>
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

export default UserAppliedJob
