import Listing from "../model/listingModel.js";
import Booking from "../model/bookingModel.js"
import User from "../model/userModel.js";
export const createBooking=async(req,res)=>{
    try{
        let id=req.params.id;
        console.log("Request body:", req.body);
    let{checkIn,checkOut,totalRent}=req.body
    let listing=await Listing.findById(id);
        if(!listing){
            return res.status(404).json({message:"Listing Doesn't exists"})
        }

    if(new Date(checkIn)>=new Date(checkOut)){
        return res.status(400).json({message:"check-in time should be less than check out time"})
    }
    if(listing.isBooked==true){
        return res.status(400).json({message:"Listing Already Booked"})

    }

    let booking=await Booking.create({
        checkIn,
        checkOut,
        totalRent,
        host:listing.host,
        guest:req.userId,
        listing:listing._id
    })
    let user=await User.findByIdAndUpdate(req.userId,{
        $push:{booking:listing}
    },{new:true})
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    listing.guest=req.userId
    listing.isBooked=true
    await listing.save()
    return res.status(200).json(booking)

    }

    catch(err){
        console.log("Error in Booking Creation"+err)
        return res.status(401).json({message:"Booking Creation Error"})

    }

}