import express from "express"
import { createBooking } from "../controller/bookingController.js";
import isAuth from "../middleware/isAuth.js";
const bookingRouter=express.Router();
bookingRouter.post("/create/:id",isAuth,createBooking)
export default bookingRouter