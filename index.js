// app.mjs or app.js (with "type": "module" in package.json)
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userProfileRoutes from './routes/userProfile.routes.js'; // Adjust the path as necessary
import AuthRoutes from "./routes/Auth.routes.js"; // Assuming you have this set up for authentication
import ProfileRoutes from "./routes/Profile.routes.js";
import UserProfileDetails from "./routes/GetUserDetails.routes.js";

import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 9080;


// Middleware to parse JSON requests and handle CORS
app.use(express.json());
app.use(cors());


// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
// mongoose.connect('mongodb+srv://suraj:Og63m5YlQaO1cCSs@cluster0.6hqfg9t.mongodb.net/ventureLoopDB?retryWrites=true&w=majorit')
mongoose.connect('mongodb+srv://weventurloop:jLEQ0JSRod26GK2P@cluster0.67kcb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')    
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

    app.use('/auth', AuthRoutes); // Authentication routes
    app.use('/', ProfileRoutes); // Profile routes
    app.use('/', UserProfileDetails); // Profile routes


// Use routes
app.use('/api/user-profiles', userProfileRoutes);

app.get('/', (req, res) => {
    res.send("ExpressJS is running....");
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// // app.js
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const userProfileRoutes = require('./routes/userProfile.routes'); // Adjust the path as necessary

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/user_profiles')
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // Use routes
// app.use('/api/user-profiles', userProfileRoutes);

// app.get('/', (req, res)=>{
//     res.send("ExpressJS Is running....")
// })

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
