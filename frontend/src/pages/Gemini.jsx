import React, { useContext, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { IoSend } from "react-icons/io5";
import { userContext } from '../Context/authContext.jsx';
import { Listingdata } from '../Context/listingContext.jsx';
import toast from 'react-hot-toast';
import axios from "axios"
import { useNavigate } from 'react-router';
const Gemini = () => {
    let [input, setInput] = useState('')
    let { serverUrl } = useContext(userContext)
    let { listingData ,ai,setAi} = useContext(Listingdata)
    let navigate=useNavigate()
    let [unsignedUserChatArray, setUnsignedUserChatArray] = useState([]) 
       const handlePrompt = async () => {
        if (input.trim() == "") {
            return ;
        }
        if(unsignedUserChatArray.length>3){
            toast.error("User must sign in to continue")
            navigate('/signup')
            return;
        }
        const userPrompt = input;

        try {
            const result = await axios.post(`${serverUrl}/api/askAi`, {
                prompt: input,
                listingSummary: listingData
            }, { withCredentials: true })
           
            console.log(result.data)
            
            setUnsignedUserChatArray(prev => [
                ...prev,
                {
                    role: "user",
                    chat: userPrompt
                },
                {
                    role: "bot",
                    chat: result.data.response
                }
            ]);
            setInput('')

        }
        catch (err) {
            if (err.response?.status === 401 || err.response?.status === 403) {
            toast.error("User must sign in to continue");
            navigate('/signup');
            return;
        }
    
            console.log("Status:", err.response?.status);
            console.log("Backend error:", err.response?.data);
            console.log("Error:", err.message);
        }
    }

    

    return (
        <div className=" w-[400px] z-[9999] h-[500px] bg-gray-300 shadow-gray-400 shadow-lg fixed bottom-5 flex items-center justify-center flex-col  text-white  right-10">
            <RxCross2 onClick={()=>setAi(!ai)}

                className="cursor-pointer absolute text-3xl top-4 left-4 "
            />
            <div className='w-[400px] overflow-y-auto h-[400px] p-10 p'>

                {unsignedUserChatArray.map((item)=>{
                    return         <div  className={`w-full flex mt-2 ${item.role === "user" ? "justify-end" : "justify-start"}`}>
{item.role=="user"?
                        <div className='flex p-2 mt-2 text-blue-400 max-w-[80%] justify-start w-fit rounded-b-lg rounded-tr-lg h-auto bg-white'>{item.chat}</div>:
                        <div className='flex max-w-[80%]  p-2 mt-2 bg-red-500 text-white justify-end rounded-b-lg rounded-tl-lg'><h2>{item.chat}</h2></div>}</div>
                })}
            </div>
            <div className='w-[400px] h-[100px]  flex items-center justify-center  bg-red-500'>
                <div className='p-3  flex items-center w-[90%] justify-between  bg-white text-black placeholder:text-gray-700 rounded-xl w-[300px] h-[50px]'>
                    <input onKeyDown={(e) => {
        if (e.key === "Enter") {
            handlePrompt();
        }
    }} value={input} onChange={(e) => setInput(e.target.value)} className='outline-none w-full' type="text" placeholder='Enter Your Query Here...' />
                    <IoSend onClick={handlePrompt} className='cursor-pointer' />
                </div>
            </div>

        </div>
    )
}

export default Gemini