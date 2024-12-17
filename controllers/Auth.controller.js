import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../Models/User.js";
import { SendVerificationCode, WelcomeEmail } from "../Middlewares/Email.js";
import dotenv from 'dotenv';
dotenv.config();
export const Signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Initial logging for request data
        // console.log("Signup request data:", req.body);

        // // Validate all required fields are present
        // if (!name || !email || !password) {
        //     console.log("Validation error: Missing fields");
        //     return res.status(400).json({
        //         success: false,
        //         message: "All fields are required.",
        //     });
        // }

        // Check if user already exists
        const ExistsUser = await UserModel.findOne({ email });
        if (ExistsUser) {
            console.log("User already exists with email:", email);
            return res.status(400).json({
                success: false,
                message: "User already exists. Please login.",
            });
        }

        // Attempt to hash the password
        let hashPassword;
        try {
            hashPassword = await bcrypt.hash(password, 10);
        } catch (hashError) {
            console.error("Error hashing password:", hashError);
            return res.status(500).json({
                success: false,
                message: "Error processing password.",
            });
        }

        // Generate a random verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        console.log("Generated verification code:", verificationCode);

        // Create and save the new user
        const user = new UserModel({
            email,
            password: hashPassword,
            name,
            verificationCode,
        });

        try {
            await user.save();
            console.log("New user saved to database:", user);
        } catch (saveError) {
            console.error("Error saving user to database:", saveError);
            return res.status(500).json({
                success: false,
                message: "Error saving user to database.",
            });
        }

        // Send the verification code via email
        try {
            await SendVerificationCode(user.email, verificationCode);
            console.log("Verification code sent to:", user.email);
        } catch (emailError) {
            console.error("Error sending verification email:", emailError);
            return res.status(500).json({
                success: false,
                message: "Error sending verification email.",
            });
        }

        // Respond with success if all steps complete
        return res.status(201).json({
            success: true,
            message: "User registered successfully. Please check your email for verification.",
            user: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Unexpected error in Signup function:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};



export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if both email and password are provided
        if (!email || !password) {
            console.log("Login error: Email or password missing from request.");
            return res.status(400).json({
                message: "Email and password are required.",
                success: false
            });
        }

        // Find the user by email
        const user = await UserModel.findOne({ email });
        const errorMsg = "Auth failed: email or password is incorrect";

        // Check if user exists
        if (!user) {
            console.log("Login error: User not found for email:", email);
            return res.status(403).json({ message: errorMsg, success: false });
        }

        // Verify the password
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            console.log("Login error: Password mismatch for email:", email);
            return res.status(403).json({ message: errorMsg, success: false });
        }

        // Check if user's email is verified
        if (!user.isVerified) {
            console.log("Login error: Email not verified for user:", email);
            return res.status(403).json({
                message: "Error: Your email is not verified. Please verify your email to continue.",
                success: false
            });
        }

        // Check if JWT_SECRET is loaded
        if (!process.env.JWT_SECRET) {
            console.error("Login error: JWT_SECRET environment variable not set.");
            return res.status(500).json({
                message: "Server configuration error. Please try again later.",
                success: false
            });
        }

        // Generate JWT token
        try {
            const jwtToken = jwt.sign(
                { email: user.email, _id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
            );

            // Send success response
            return res.status(200).json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                name: user.name
            });
        } catch (tokenError) {
            console.error("JWT generation error:", tokenError);
            return res.status(500).json({
                message: "Error generating authentication token.",
                success: false
            });
        }
    } catch (err) {
        console.error("Login error:", err); // Log the error for debugging
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


export const VerifyEmail = async (req, res) => {
    try {
        const { code } = req.body;

        // Check if code is provided
        if (!code) {
            console.log("Verification error: No code provided");
            return res.status(400).json({
                success: false,
                message: "Verification code is required.",
            });
        }

        // Find user by verification code
        const user = await UserModel.findOne({ verificationCode: code });
        
        if (!user) {
            console.log("Verification error: No user found or code expired");
            return res.status(400).json({
                success: false,
                message: "Invalid or OTP expired.",
            });
        }

        // Update user verification status
        user.isVerified = true;
        user.verificationCode = undefined; // Clear the verification code

        try {
            await user.save();
            console.log("User verified and saved:", user.email);
        } catch (saveError) {
            console.error("Error saving user verification status:", saveError);
            return res.status(500).json({
                success: false,
                message: "Error updating user verification status.",
            });
        }

        // Send welcome email
        try {
            await WelcomeEmail(user.email, user.name);
            console.log("Welcome email sent to:", user.email);
        } catch (emailError) {
            console.error("Error sending welcome email:", emailError);
            return res.status(500).json({
                success: false,
                message: "Verification succeeded, but error sending welcome email.",
            });
        }

        // If everything succeeds, return a success response
        return res.status(200).json({
            success: true,
            message: "Email verified successfully.",
        });
    } catch (error) {
        console.error("Verification error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};
