import express from "express"
import { askGemini } from "../config/gemini.js"
import isAuth from "../middleware/isAuth.js"
const geminiRouter=express.Router()
geminiRouter.post("/askAi",isAuth,askGemini)
export default geminiRouter