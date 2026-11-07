import React from 'react'
import User from "../model/userModel.js"
const getCurrentUser = async(req,res) => {
    try{
        const user=await User.findById(req.userId).select("-password")
        if(!user){
            return res.status(400).send({message:"user not found"})
        }
        return res.status(200).send(user)
        
    }
    catch(err){
        console.log("error in getting current user"+err)
        return res.status(400).send({message:"error in getting current user"})
    }
}

export default getCurrentUser