// Models/UserProfile.js or Models/UserProfile.mjs
import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
    collegeName: { type: String, required: true },
    courseName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalDuration: { type: String, required: true } // e.g., "4 years"
});

const experienceSchema = new mongoose.Schema({
    jobRole: { type: String, required: true },
    companyName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalDuration: { type: String, required: true }, // e.g., "2 years"
    summary: { type: String }
});

const userProfileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tag: { type: String, required: true },
    bio: { type: String },
    dob: { type: Date },
    location: { type: String },
    lookingFor: {
        type: [String],
        enum: [
            'Looking for a co-founder',
            'Looking for team Mates',
            'Looking for startups',
            'Looking for Investors'
        ]
    },
    skillset: [{ type: String }],
    commitmentLevel: {
        type: [String],
        enum: [
            'Already full time in a startup',
            'Ready to go full-time with right co-founder',
            'Ready to go full time next year',
            'No specific startup plan',
            'No Preference'
        ]
    },
    interests: [{ type: String }],
    priorStartupExperience: { type: Boolean, default: false },
    equityExpectation: { type: String }, // e.g., "10%", "No expectation"
    myEducation: [educationSchema],
    myExperience: [experienceSchema],
    myProjects: [{ type: String }] // Can be an array of project names or descriptions
});

// Avoid overwriting the model if it already exists
const UserProfileModel = mongoose.models.UserProfile || mongoose.model('UserProfile', userProfileSchema);

export default UserProfileModel;

