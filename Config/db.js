// db.js
import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();
const MongoDB_URI = process.env.MongoDB_URI || 5000;

const connectDB = async () => {
    try {
        await mongoose.connect(MongoDB_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

export default connectDB;