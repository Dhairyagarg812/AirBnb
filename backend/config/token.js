import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();
const genToken=(userId)=>{
    try{
        let token =jwt.sign({userId},process.env.JWT_SECRETKEY,{expiresIn:"7d"});
        return token;

    }
    catch(err){
        console.log("token error");
    }
}
export default genToken