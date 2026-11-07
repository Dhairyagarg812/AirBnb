import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL;
const connectDb = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("db done");
    }
    catch (err) {
        console.log(err);
    }
}
export default connectDb; 