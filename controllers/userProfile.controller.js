// userProfileController.mjs or userProfileController.js (with "type": "module" in package.json)
import UserProfile from '../models/UserProfile.model.js'; // Adjust the path as necessary

// Create a new user profile
export const createUserProfile = async (req, res) => {
    try {
        const userProfile = new UserProfile(req.body);
        await userProfile.save();
        res.status(201).json(userProfile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all user profiles
export const getAllUserProfiles = async (req, res) => {
    try {
        const userProfiles = await UserProfile.find();
        res.status(200).json(userProfiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single user profile by ID
export const getUserProfileById = async (req, res) => {
    try {
        const userProfile = await UserProfile.findById(req.params.id);
        if (!userProfile) return res.status(404).json({ message: 'User profile not found' });
        res.status(200).json(userProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a user profile by ID
export const updateUserProfile = async (req, res) => {
    try {
        const userProfile = await UserProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!userProfile) return res.status(404).json({ message: 'User profile not found' });
        res.status(200).json(userProfile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a user profile by ID
export const deleteUserProfile = async (req, res) => {
    try {
        const userProfile = await UserProfile.findByIdAndDelete(req.params.id);
        if (!userProfile) return res.status(404).json({ message: 'User profile not found' });
        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

