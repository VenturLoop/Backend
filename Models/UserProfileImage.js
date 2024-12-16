import mongoose from "mongoose";

// User Profile Schema
const userProfileSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Reference to User Authentication schema
        required: true,
        unique:true
    },
    profileImage: { 
        type: String, 
        default: 'https://images.pexels.com/photos/4307869/pexels-photo-4307869.jpeg?auto=compress&cs=tinysrgb&w=600' 
    }
});

export const UserProfileImage = mongoose.model('UserProfileImage', userProfileSchema);

