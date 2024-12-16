import express from "express";

const Profile = express.Router();

import { getUserDetails } from "../controllers/GetUserDetails.Controller.js";

Profile.get('/user/:id', getUserDetails); // Add this route

export default Profile;
