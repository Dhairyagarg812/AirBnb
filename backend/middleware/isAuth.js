import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: "User token not found!!!" })
        }
        let verifiedToken = jwt.verify(token, process.env.JWT_SECRETKEY)
        if (!verifiedToken) {
            return res.status(403).json({ message: "User doesn't have valid token!!!" })
        }
        req.userId = verifiedToken.userId;
        next();
    }
    catch (err) {
        console.log(err);

       return res.status(401).json({ message: "Some error occured!!!" })

    }
}
export default isAuth