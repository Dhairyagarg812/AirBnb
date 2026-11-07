import React, { useState } from 'react'
import { GiConfirmed } from "react-icons/gi";
import { useContext } from 'react';
import { bookingContext } from '../Context/BookingContext.jsx';
import { Listingdata } from '../Context/listingContext';
import { useNavigate } from 'react-router';
import { FaStar } from "react-icons/fa";
import { userContext } from '../Context/authContext';
import { usersContext } from '../Context/usersContext';
import axios from 'axios';
const Booked = () => {
    let{bookingData}=useContext(bookingContext)
    let {getCurrentUser}=useContext (usersContext)
    let {getListing,cardDetail}=useContext(Listingdata)
    let naviagte=useNavigate()
    let[hover,setHover]=useState(false)
    let[rating,setRating]=useState(0)
    let { serverUrl } = useContext(userContext);


    const handleRating = async (id,e) => {
        e.preventDefault()
        try {
            console.log("Selected rating:", rating);
            let result = await axios.post(
                `${serverUrl}/api/listing/ratings/${id}`,
                {
                    ratings: rating
                },{withCredentials:true})
                
                console.log(result.data)
                naviagte('/')
            }
            catch(err){
                console.log(err)
            }
      


        }
  return (
    <div className='flex items-center  relative flex-col gap-4 justify-center bg-slate-200 w-full h-[100vh]'>
<div onClick={()=>naviagte('/')} className='cursor-pointer absolute md:right-4 right-0 top-4 bg-red-600  text-white p-4 rounded-2xl'>Back To Home</div>
        <div   className='w-[600px] gap-5 flex flex-col items-center justify-center max-sm:w-[300px] max-sm:h-[350px] bg-white h-[450px] '>
        <GiConfirmed className='text-green-600 text-8xl' />
        <h1 className='sm:text-3xl text-md'>BOOKING CONFIRMED</h1>
        <div className='flex sm:text-xl text-md w-[80%] items-center justify-between'>
            <h2 className=" ">Booking Id:</h2>
            <h2 className='sm:text-xl text-sm truncate w-[60%]'>{bookingData._id}</h2>
        </div>
        <div className='flex sm:text-xl text-md  w-[80%] justify-between'>
            <h2 className="">Host Id:</h2>
            <h2 className='sm:text-xl text-md truncate w-[60%]'>{bookingData.host}</h2>
        </div>
        <div className='flex w-[80%] justify-between'>
            <h2 className="sm:text-xl text-md">Total Rent:</h2>
            <h2 className='sm:text-xl text-md truncate w-[60%]'>{bookingData.totalRent}</h2>
        </div>
</div>
<div className='w-[700px] gap-5 flex flex-col items-center justify-center max-sm:w-[350px] max-sm:h-[200px] bg-white h-[250px] '>
    <h1 className=' text-2xl'>{rating} out of 5 Rating</h1> 
    <div className='flex flex-row gap-4'>
        {[1,2,3,4,5].map((star)=>(
    < FaStar key={star} 
            onMouseEnter={()=>setHover(star)}
            onMouseLeave={()=>setHover(false)}
            onClick={()=>setRating(star)}
            className={`cursor-pointer text-2xl ${
                star <= (hover || rating)
                  ? "text-yellow-400"
                  : "text-black"
              }`}/>

        ))}
    
    </div>
    <div onClick={(e)=>handleRating(cardDetail._id,e)} className='cursor-pointer  bg-red-600  text-white p-4 rounded-2xl'>Submit</div>

</div>
        </div>
  )
}

export default Booked