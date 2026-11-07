import { FaEye } from "react-icons/fa"
import { useContext, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { userContext } from "../Context/authContext";
import axios from "axios";
import toast from "react-hot-toast";
import { usersContext } from "../Context/usersContext";
function Login(){
    const[showPassword,setShowPassword]=useState(false);
    const navigate=useNavigate()
    const[password,setPassword]=useState("")
    const[email,setEmail]=useState("")
    let {serverUrl}=useContext(userContext)
    let [loading,setLoading]=useState(false)
    let {userData,setUserData}=useContext(usersContext)
    const handleSubmit=async(e)=>{
        e.preventDefault()
        setLoading(true)
        try{
           let result=await axios.post(`${serverUrl}/api/auth/login`,{
            email,password
           },
           { withCredentials: true })
           setUserData(result.data)
           console.log(result)
           console.log(result.data)
           setLoading(false)

           console.log(userData)
           toast.success(result.data.message || "Login successful!");
           navigate('/')
           setUserData(result.data)
        }
        catch(err){
            console.log("error in submit")
            setLoading(false)

            toast.error(
                err.response?.data?.message || "Problem in submitting"
            );
        }
    }

    return(<div className="w-[100vw] relative h-[100vh] flex justify-center items-center " >
        <div className="flex items-center justify-center absolute text-3xl top-[40px] left-[40px] bg-red-500 p-2 rounded-full">
        <FaArrowLeft className=" text-white cursor-pointer" onClick={()=>navigate('/')}/>
        </div>
        <form onSubmit={handleSubmit} className="max-w-[900px] w-[90%] h-[600px] flex items-center justify-center">
            
            <div className="flex flex-col  gap-[10px] justify-center">
            <h1 className=" text-4xl font-light  ">Welcome To Airbnb</h1>
           
            
        <label className="mt-[30px] text-[18px]">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" className="border-[2px] focus:outline-none text-[18px] border-gray-500 rounded-lg h-[40px]  min-w-[50vw] w-[90%] p-[10px]"></input>
            <label className=" text-[18px]">Password</label>
            <div className="border-[2px] flex items-center  border-gray-500 rounded-lg h-[40px] min-w-[50vw] w-[90%] ">
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type={showPassword?"text":"password"} className="text-[18px] focus:outline-none border-none p-[10px] w-[95%] " ></input>
               { showPassword?<FaEye onClick={()=>setShowPassword(!showPassword)} className="w-5 h-3 mr-2 cursor-pointer" />:
                <FaEyeSlash onClick={()=>setShowPassword(!showPassword)} className="w-5 h-3 mr-2 cursor-pointer" />}
                </div> 
            <button  type="submit" className="cursor-pointer bg-red-500 w-[200px] mt-4 mb-2 text-lg text-white rounded-2xl h-[70px]">{!loading?"Login":"Logging in..."}</button>
            <p className="text-sm ">Don't have an account? <span className="cursor-pointer text-red-500" onClick={()=>navigate('/signup')}>Signup</span></p>
            </div>
        </form>
        </div>)
}
export default Login