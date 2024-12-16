// Models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    name: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
    },
});

// Avoid overwriting the model if it already exists
const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

export default UserModel;


