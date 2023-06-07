import React,{useState,useContext} from 'react'
import {toast} from "react-toastify"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {AuthContext} from "../../../AuthContext"

const getRandom=()=>{
  return Math.floor(Math.random()*100000)
}

function CreateJob(props) {
  const context=useContext(AuthContext)
    const [job,setJob]=useState({
        title:'',
        subTitle:'',
        salary:0,
        designation:'',
        skills:'',
        exp:0,
        description:'',
        jobType: "",
        position: 0,
        department: "",
        jobLevel: "",
        jobDegree: ""
    })

    const [token] = context.token
    const navigate =useNavigate()


    const readValue=(e) =>{
      const {name,value}=e.target;
      setJob({...job,[name]:value})
    }

    const submitHandler=async (e) =>{
      e.preventDefault()
      try{
        let data={
          jCode: `dp1-a${getRandom()}`,
          ...job
        }
        console.log("New Job",data)

        await axios.post(`/api/v1/job/new`,data,{
          headers:{
            Authorization:token
          }
        })
        .then(res=>{
          toast.success(res.data.msg)
          navigate(`/hr/dashboard`)
        }).catch(err => toast.error(err.response.data.msg))
      }
      catch(err){
        toast.error(err.msg)
      }
    }

  return (
   <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 className="display-3 text-success">Create Jobs</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <form autoComplete='off' onSubmit={submitHandler}>
                  <div className="form-group mt-2">
                    <label htmlFor="title">Title</label>
                    <input type="text" name='title' id='title' value={job.title} onChange={readValue} className="form-control" required/>
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="subTitle">Sub Title</label>
                    <input type="text" name='subTitle' id='subTitle' value={job.subTitle} onChange={readValue} className="form-control" required />
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="designation">Designation</label>
                    <input type="text" name='designation' id='designation' value={job.designation} onChange={readValue} className="form-control" required/>
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="salary">Salary</label>
                    <input type="number" name='salary' id='salary' value={job.salary} onChange={readValue} className="form-control" required/>
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="skills">Skills</label>
                    <input type="text" name='skills' id='skills' value={job.skills} onChange={readValue} className="form-control" required/>
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="exp">Experience</label>
                    <input type="number" name='exp' id='exp' value={job.exp} onChange={readValue} className="form-control" required/>
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" cols="30" value={job.description} onChange={readValue} rows="10" className='form-control required'></textarea>
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="jobType">Job Type</label>
                    <select name='jobType' id='jobType' value={job.jobType} onChange={readValue} className="form-select">
                         <option value="null">Choose Job Type</option>
                         <option value="permanent">Permanent</option>
                         <option value="intern">Intern</option>
                         <option value="contract">Contract</option>
                    </select>
                   </div>
                  <div className="form-group mt-2">
                    <label htmlFor="position">Position</label>
                    <input type="number" name='position' id='position' value={job.position} onChange={readValue} className="form-control" required/>
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="department">department</label>
                    <select name='department' id='department' value={job.department} onChange={readValue} className="form-select">
                         <option value="null">Choose department</option>
                         <option value="account">Account</option>
                         <option value="finance">Finance</option>
                         <option value="engineering">Engineering</option>
                         <option value="sales">Sales</option>
                         <option value="development">Development</option>
                         <option value="quality">Quality</option>
                         <option value="marketing">Marketing</option>
                         <option value="hr">Hr</option>
                    </select>    
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="jobLevel">Job Level</label>
                    <select name='jobLevel' id='jobLevel' value={job.jobLevel} onChange={readValue} className="form-select">
                         <option value="null">Choose Job Level</option>
                         <option value="fulltime">FullTime</option>
                         <option value="parttime">PartTime</option>
                    </select> 
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="jobDegree">Job Degree</label>
                    <select name='jobDegree' id='jobDegree' value={job.jobDegree} onChange={readValue} className="form-select">
                         <option value="null"> Job qualification</option>
                         <option value="10th/SSLC">10/SSLC</option>
                         <option value="12th/PU">12th/PU</option>
                         <option value="degree">Degree</option>
                         <option value="master's">Master's</option>
                         <option value="PG">Development</option>
                    </select>    
                  </div>

                  <div className="form-group mt-2">
                    <input type="submit" value="Create New Job" className='btn btn-outline-success' />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
   </div>
  )
}

export default CreateJob
