// userProfileRoutes.mjs or userProfileRoutes.js (with "type": "module" in package.json)
import express from 'express';
import * as userProfileController from '../controllers/userProfile.controller.js'; // Adjust the path as necessary
const router = express.Router();

// Define routes
router.post('/', userProfileController.createUserProfile); // Create a new profile
router.get('/', userProfileController.getAllUserProfiles); // Get all profiles
router.get('/:id', userProfileController.getUserProfileById); // Get a single profile by ID
router.put('/:id', userProfileController.updateUserProfile); // Update a profile by ID
router.delete('/:id', userProfileController.deleteUserProfile); // Delete a profile by ID

// Export the router
export default router;


