import mongoose from "mongoose";
import dotenv from  "dotenv";

dotenv.config()

const connectDB=()=>{
     mongoose.set('strictQuery',true)
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/volunteer-system';
    mongoose.connect(MONGO_URI).then(()=>console.log('Database connected')).catch((error)=>console.error('Database connection error',error));
}

export default connectDB;