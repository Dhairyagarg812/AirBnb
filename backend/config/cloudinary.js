import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
import dotenv from "dotenv"
dotenv.config();
async function uploadOnCloudinary(filepath){
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUDINARY_APIKEY,
        api_secret:process.env.CLOUDINARY_SECRET
    });
    try{
        if(!filepath) return null;
        const uploadResult = await cloudinary.uploader
        .upload(
            filepath
        )
        fs.unlinkSync(filepath)
        return uploadResult.secure_url;
    }
    catch(err){
        fs.unlinkSync(filepath)
    }
}
export default uploadOnCloudinary;