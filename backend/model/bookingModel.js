import mongoose from "mongoose";

const bookingSchema=new mongoose.Schema({
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    guest:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    listing:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing"
    },
    status:{
        type:String,
        enum:["booked","cancel"],
        default:"booked"
    },
    checkIn:{
        type:String,
        required:true
    },
    checkOut:{
        type:String,
        required:true
    },
    totalRent:{
        type:String,
        required:true
    },

})
const Booking=mongoose.model("Booking",bookingSchema)
export default Booking;