// routes/Profile.routes.js
import express from 'express';
import multer from 'multer';
import { cloudinary } from '../Config/cloudinaryConfig.js'; // Ensure you use .js extension
import { UserProfileImage } from '../Models/UserProfileImage.js'; // Updated import

const ProfileRoutes = express.Router();

// Multer setup for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

// Create User Profile with Image
ProfileRoutes.post('/profile', upload.single('profileImage'), async (req, res) => {
    try {
        if (!req.body.userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        const result = await cloudinary.uploader.upload(req.file.path);
        
        const newUserProfileImage = new UserProfileImage({ // Updated instance name
            userId: req.body.userId, // Ensure this is sent in the request body
            profileImage: result.secure_url,
            // bio: req.body.bio,
        });
        
        await newUserProfileImage.save(); // Updated instance name
        res.status(201).json(newUserProfileImage); // Updated instance name
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read User Profile Image
ProfileRoutes.get('/profile/:id', async (req, res) => {
    try {
        const userProfileImage = await UserProfileImage.findOne({ userId: req.params.id }); // Updated instance name
        
        if (!userProfileImage) return res.status(404).send('User profile not found');
        
        res.json(userProfileImage); // Updated instance name
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update User Profile Image
ProfileRoutes.put('/profile/:id', upload.single('profileImage'), async (req, res) => {
    try {
        const updatedData = {};
        
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            updatedData.profileImage = result.secure_url;
        }
        
        if (req.body.bio) updatedData.bio = req.body.bio;

        const updatedUserProfileImage = await UserProfileImage.findOneAndUpdate( // Updated instance name
            { userId: req.params.id },
            updatedData,
            { new: true }
        );
        
        if (!updatedUserProfileImage) return res.status(404).send('User profile not found'); // Updated instance name
        
        res.json(updatedUserProfileImage); // Updated instance name
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete User Profile Image
ProfileRoutes.delete('/profile/:id', async (req, res) => {
    try {
        const deletedProfileImage = await UserProfileImage.findOneAndDelete({ userId: req.params.id }); // Updated instance name
        
        if (!deletedProfileImage) return res.status(404).send('User profile not found');
        
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default ProfileRoutes;
