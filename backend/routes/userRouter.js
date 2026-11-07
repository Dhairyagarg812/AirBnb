import getCurrentUser from "../controller/getCurrentUser.js";
import isAuth from "../middleware/isAuth.js";
import express from "express"
const userRouter=express.Router()
userRouter.get("/currentuser",isAuth,getCurrentUser)
export default userRouter