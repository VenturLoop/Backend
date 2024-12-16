import User from '../Models/User.js'; // Import User model
import { UserProfileImage } from '../Models/UserProfileImage.js'; // Import UserProfileImage model

// Function to get user details including username, bio, name, email, and profileImage
export const getUserDetails = async (req, res) => {
    try {
        const userId = req.params.id; // Get userId from request parameters

        // Fetch user data from User model
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch profile image data from UserProfileImage model
        const userProfileImage = await UserProfileImage.findOne({ userId: user._id });
        if (!userProfileImage) {
            console.log('No profile image found, setting default image');
        }

        // Combine data to send back
        const userDetails = {
            name: user.name,
            email: user.email,
            bio: user.bio || 'No bio available', // Assuming bio is in the User model
            profileImage: userProfileImage ? userProfileImage.profileImage : 'https://images.pexels.com/photos/4307869/pexels-photo-4307869.jpeg?auto=compress&cs=tinysrgb&w=600',  // Default if no profile image found
        };

        res.json(userDetails); // Send combined data as response
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
