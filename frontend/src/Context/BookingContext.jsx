import axios from "axios";
import { createContext, useState } from "react";
import { userContext } from "./authContext";
import { useContext } from "react";
import { usersContext } from "./usersContext";
import { Listingdata } from "./listingContext";
export const bookingContext=createContext()
const BookingContextProvider=({children})=>{
    let  [checkin,setCheckin]=useState("")
    let  [checkout,setCheckout]=useState("")
    let [total,setTotal]=useState(0)
    let [night,setNight]=useState(0)
    let {serverUrl}=useContext(userContext)
    let{getCurrentUser}=useContext(usersContext)
    let {handleGetListing}=useContext(Listingdata)
    let[bookingData,setBookingData]=useState("")
    const handleBooking=async(id)=>{
        
        try{
            const result=await axios.post(`${serverUrl}/api/booking/create/${id}`,{
                checkIn:checkin,checkOut:checkout
               , totalRent:total,
                
            },{withCredentials:true})
            setCheckin(null)
            setCheckout(null)

            console.log(result.data)
            setBookingData(result.data)
            console.log("Booking Created Successfully")
        }
        catch(err){
            console.log("Error in Booking Handler"+err)
            setBookingData(null)
        }
    }

    let value={checkin,setCheckin,
        handleBooking,checkout,setCheckout
        ,night,setNight,total,setTotal,bookingData,setBookingData}
return(
    <bookingContext.Provider value={value}>
        {children}
    </bookingContext.Provider>)
}
export default BookingContextProvider