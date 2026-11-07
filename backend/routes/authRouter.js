import express from "express"
import { signUp } from "../middleware/auth.js";
import { login } from "../middleware/auth.js";
import { logout } from "../middleware/auth.js";
const authRouter=express.Router();
authRouter.post("/signup",signUp);
authRouter.post("/login",login);
authRouter.post("/logout",logout);
export default authRouter