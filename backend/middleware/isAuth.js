import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const isAuth = async (req, res, next) => {
    try {
        console.log("1. Middleware started");

        const token = req.cookies?.token;
        console.log("2. Token exists:", !!token);

        if (!token) {
            return res.status(401).json({
                message: "User token not found!!!"
            });
        }

        let verifiedToken = jwt.verify(
            token,
            process.env.JWT_SECRETKEY
        );

        console.log("3. JWT verified:", verifiedToken);

        req.userId = verifiedToken.userId;

        console.log("4. User ID:", req.userId);
        console.log("5. Calling next()");

        next();
    }
    catch (err) {
        console.log("JWT ERROR:", err.name, err.message);

        return res.status(401).json({
            message: "Some error occurred!!!"
        });
    }
};
export default isAuth