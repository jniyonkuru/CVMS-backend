import mongoose from "mongoose";
import dotenv from  "dotenv";

dotenv.config()

const  connectDB= async():Promise<void>=>{
    try {
        mongoose.set('strictQuery', false);
        const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/volunteer-system';
        await mongoose.connect(MONGO_URI);

        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
}

export default connectDB;