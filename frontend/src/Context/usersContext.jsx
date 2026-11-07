import { createContext, useContext, useEffect,useState } from "react";
import { userContext } from "./authContext";
import axios from "axios";
export const usersContext=createContext();


function UsersContextProvider({children}){
    const [userData,setUserData]=useState(null)
    let {serverUrl}=useContext(userContext)

    const getCurrentUser=async()=>{
        try{
        const result=await axios.get(`${serverUrl}/api/user/currentuser`,{withCredentials:true})
        setUserData(result.data)
    }
    catch(err){
        console.log("error in usercontext->"+err)
    }
}
    useEffect(()=>{
        getCurrentUser()
    },[])
    let value={userData,setUserData,getCurrentUser}
    return(
    <usersContext.Provider value={value}>
        {children}
    </usersContext.Provider>)
}
export default UsersContextProvider