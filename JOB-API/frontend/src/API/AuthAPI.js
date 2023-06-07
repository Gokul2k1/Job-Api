import React,{useState, useCallback, useEffect} from "react";
import axios from "axios";

function useAuth(props) {
    const [currentUser, setCurrentUser] = useState(null)
    const [isLogin,setIsLogin] = useState(false)

    //? roles
    const [isUser, setIsUser] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isHr, setIsHr] = useState(false)

    const initData = useCallback(() => {
        let token = localStorage.getItem("loginToken")
        const getData = async() => {
            if(token) {
                const res  = await axios.get(`/api/v1/auth/currentuser`,{
                    headers: {
                     Authorization: token
                    }
                })
                setCurrentUser(res.data.user)
                setIsLogin(true)
                if(res.data.user.role === "admin") {
                    setIsAdmin(true)
                } else if(res.data.user.role === "hr"){
                    setIsHr(true)
                } else if(res.data.user.role === "user") {
                    setIsUser(true)
                }
            }
            
        }
        getData()
    }, [])

    useEffect(() => {
        initData()
    }, [])

    return {
        currentUser: [currentUser, setCurrentUser],
        isLogin:[isLogin, setIsLogin],
        isUser:[isUser, setIsUser],
        isAdmin: [isAdmin, setIsAdmin],
        isHr:[isHr, setIsHr]
    }
}
export default useAuth