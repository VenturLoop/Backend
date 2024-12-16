import { UserProfile } from '../Models/UserProfile.js';
import { cloudinary } from '../Config/cloudinaryConfig.js';

// Function to create or update user profile
export const createOrUpdateUserProfile = async (req, res) => {
    try {
        const { userId } = req.params; // Get userId from URL parameters

        let profileData = {};
        
        if (req.file) {
            // Upload image to Cloudinary and get the secure URL
            const result = await cloudinary.uploader.upload(req.file.path);
            profileData.profileImage = result.secure_url; // Store secure URL
        }
        
        if (req.body.bio) profileData.bio = req.body.bio;

        // Check if the profile already exists
        let profileUser = await UserProfile.findOne({ userId });

        if (profileUser) {
            // Update existing profile
            profileUser = await UserProfile.findByIdAndUpdate(profileUser._id, profileData, { new: true });
            return res.json(profileUser);
        } else {
            // Create new profile
            profileData.userId = userId; // Link to the authenticated user
            profileUser = await UserProfile.create(profileData);
            return res.status(201).json(profileUser);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Function to get user profile by user ID
export const getUserProfileById = async (req, res) => {
    try {
        const profileUser = await UserProfile.findOne({ userId: req.params.userId });
        if (!profileUser) return res.status(404).send('Profile not found');
        res.json(profileUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to delete user profile by user ID
export const deleteUserProfile = async (req, res) => {
    try {
        const deletedProfile = await UserProfile.findOneAndDelete({ userId: req.params.userId });
        
        if (!deletedProfile) return res.status(404).send('Profile not found');
        
        res.status(204).send(); // No content response for successful deletion
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};