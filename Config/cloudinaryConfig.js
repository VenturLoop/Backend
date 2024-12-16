// config/cloudinaryConfig.js
import { v2 as cloudinary } from 'cloudinary'; // Import Cloudinary with ESM syntax
import dotenv from 'dotenv'; // Import dotenv for environment variables

// Load environment variables from .env file
dotenv.config();

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Export the configured Cloudinary instance
export { cloudinary };