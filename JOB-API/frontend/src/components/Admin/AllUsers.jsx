import React, {useState, useCallback, useEffect, useContext} from "react";
import {AuthContext} from '../../AuthContext'
import axios from "axios";
import {toast} from 'react-toastify'

function AllUsers() {
    const context = useContext(AuthContext)
    const [token] = context.token

    const [users, setUsers] = useState([])
    
    const [role, setRole] = useState([])
    const [isActive, setIsActive] = useState([])
    const [id, setId] = useState('')

    const initUser = useCallback(() => {
        const getUser = async () => {
            const res = await axios.get(`/api/v1/auth/users/all`, {
                headers: {
                    Authorization: token
                }
            })
            setUsers(res.data.users)
        }
        getUser()
    },[])
    useEffect(() => {
        initUser()
    },[])

    const exitHandler =  (id) => {
        let extUser =  users.find((item) => item._id === id)
       setId(extUser._id)
       setRole(extUser.role)
       setIsActive(extUser.isActive)
    }

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            let data = {
                role,
                isActive
            }
            await axios.patch(`/api/v1/auth/update/user/${id}`, data, {
                headers: {
                    Authorization: token
                }
            }).then(res => {
                toast.success(res.data.msg)
                window.location.reload()
            }).catch(err => toast.error(err.response.data.msg))

        } catch (err) {
            toast.error(err.message)
        }
    }

    const deleteHandler = async (id) => {
        if(window.confirm(`Are you sure want to delete user id ${id}`)) {
            await axios.delete(`/api/v1/auth/delete/user/${id}`, {
                headers: {
                    Authorization: token
                }
            }).then(res => {
                toast.success(res.data.msg)
                window.location.reload()
            }).catch(err => toast.error(err.response.data.msg))
        } else {
            toast.warning('delete terminated')
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="table table-responsive mt-4">
                        <table className="table table-bordered table-striped table-hovered text-center">
                            <thead>
                                <tr>
                                    <th colSpan={6}>
                                        <h4 className="text-success  ">Users</h4>
                                    </th>
                                </tr>
                                <tr >
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users && users.map((item, index) => {
                                        return(
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.mobile}</td>
                                                <td>{item.role}</td>
                                                <td>{item.isActive ?<span className="text-success">Active</span>:
                                                <span className="text-danger">Disabled</span>}</td>
                                                <td>
                                                <button onClick={()=> exitHandler(item._id)} data-bs-toggle="modal" data-bs-target="#editUser" className="btn btn-sm btn-info me-2">
                                                    <i className="bi bi-pencil"></i>
                                                </button>
                                                <button onClick={()=> deleteHandler(item._id)} className="btn btn-sm btn-danger">
                                                    <i className="bi bi-trash"></i>
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
                     <React.Fragment>
                                 {/* model */}
                                    <div className="modal fade" id="editUser">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="text-success ">Edit User</h5>
                                                    <button className="btn-close" data-bs-dismiss="modal"></button>
                                                </div>
                                                <div className="modal-body text-start">
                                                    
                                                        <div className="from-group mt-2">
                                                            <label htmlFor="role">Role</label>
                                                            <select name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)} className="form-select">
                                                                <option value="hr">HR</option>
                                                                <option value="user">User</option>
                                                            </select>
                                                        </div>
                                                   
                                                    <div className="from-group mt-2"> 
                                                            <label htmlFor="isActive">Enable/ Disable user</label> <br />
                                                            <input type="checkbox" name="isActive" id="isActive" value={isActive} checked={isActive} onChange={(e) => setIsActive( e.target.checked)} className="from-checked" />
                                                            <strong>
                                                                {
                                                                    isActive ? <span className="text-success">Active</span> :
                                                                    <span className="text-danger">Disabled</span>
                                                                }
                                                            </strong>
                                                        </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <div className="from-group mt-2">
                                                        <input type="button" onClick={updateUser} value="Update User" className="btn btn-outline-success" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                    </React.Fragment>
        </div>
    )
}
export default AllUsers