import express from "express";


import { Signup, Login } from "../controllers/Auth.controller.js";

import { signupValidation, loginValidation } from "../Middlewares/AuthValidation.middleware.js"
import { VerifyEmail } from "../controllers/Auth.controller.js";


const AuthRoutes = express.Router();


AuthRoutes.post('/signup',signupValidation, Signup);
AuthRoutes.post('/login', loginValidation, Login);
AuthRoutes.post("/verify-email", VerifyEmail)

AuthRoutes.get('/', (req, res) => {
    res.send("ExpressJS Server is running...")
})

export default AuthRoutes;