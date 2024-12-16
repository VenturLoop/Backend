import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


export const transporter = nodemailer.createTransport({
    host: process.env.host,
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.user,
        pass: process.env.pass,
    },
});
