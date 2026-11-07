import express from "express"
const app=express();

import connectDb from "./config/ConnectDb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import listingRouter from "./routes/listingRouter.js";
import bookingRouter from "./routes/bookingRouter.js";
import geminiRouter from "./routes/geminiRouter.js";
dotenv.config();
const port =process.env.port;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/listing",listingRouter)
app.use("/api/booking",bookingRouter)
app.use('/api',geminiRouter)
app.listen(port,()=>{
    console.log("server started listening");
    connectDb();
})