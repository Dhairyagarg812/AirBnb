import genToken from "../config/token.js";
import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv"
dotenv.config();
export const signUp=async(req,res)=>{
    try{
        let {email,password,name}=req.body;
        let userExists=await User.findOne({email:email});
        if(userExists){
            return res.status(400).json({message:"User already exists!!!"})
        }
        password=await bcrypt.hash(password,10)
        let user=await User.create({name,email,password})
        const token=await genToken(user._id);
        res.cookie("token",token,{
            httpOnly:process.env.httpOnly,
            secure:false,
            sameSite:process.env.SAME_SITE,
            maxAge:7*24*60*60*1000
        });
        return res.status(201).json(user);

    }
    catch(err){
        return res.status(401).json({message:`Signup error ->${err.message}`});
    }
}


export const login=async(req,res)=>{
    try{
        let {email,password}=req.body;
        let userExists=await User.findOne({email:email});
        if(!userExists){
            return res.status(400).json({message:"Please Signup first!!!"})
        }
        const isMatch=await bcrypt.compare(password,userExists.password)
        if(!isMatch){
            return res.status(400).json({message:"Please Enter Correct Passwprd!!!"})

        }
        
        const token=await genToken(userExists._id);
        res.cookie("token",token,{
            httpOnly:process.env.httpOnly,
            secure:false,
            sameSite:process.env.SAME_SITE,
            maxAge:7*24*60*60*1000
        });
        return res.status(201).json(userExists);

    }
    catch(err){
        return res.status(401).json({message:`Signin error ->${err.message}`});
    }
}

export const logout=async(req,res)=>{
    try{
        res.clearCookie("token")
        res.status(200).json({message:"Logout Successfull"})
    }
    catch(err){
        return res.status(401).json({message:`Logout error ->${err.message}`});
    }
}