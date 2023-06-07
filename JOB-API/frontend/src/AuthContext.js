import React,{useState, useEffect, createContext} from "react";
import useAuth from "./API/AuthAPI";
import axios from "axios";
import { toast } from "react-toastify";
import { useCallback } from "react";

export const AuthContext = createContext();

function AuthProvider(props) {
    const [token, setToken] = useState(null)

    const initToken = useCallback(() => {
        let loginToken = localStorage.getItem('loginToken')

        const getToken = async () => {
            if(loginToken) {
                let res = await axios.get(`/api/v1/auth/token/validate`)
                setToken(res.data.authToken)
            }  
        }
        getToken()
    }, [])

    useEffect(() => {
        initToken()
    }, [])

    let data = {
        token: [token, setToken],
        authApi: useAuth()
    }
    return (
        <AuthContext.Provider value={ data}>
                {props.children}
        </AuthContext.Provider>
    )
}
export default AuthProvider