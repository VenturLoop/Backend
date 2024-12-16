import {
    Verification_Email_Template,
    Welcome_Email_Template,
} from "../Libs/EmailTemplate.js";

import { transporter } from "./Email.config.js";


export const SendVerificationCode = async (email, verificationCode) => {
    try {
        const response = await transporter.sendMail({
            from: '"venturloop.com" <zahidtime313@gmail.com>',
            to: email, // list of receivers
            subject: "Verify your Email", // Subject line
            text: "Verify your Email", // plain text body
            html: Verification_Email_Template.replace("{verificationCode}", verificationCode)
        })
        console.log('Email send Successfully', response)
    } catch (error) {
        console.log('Email error', error)
    }
}
export const WelcomeEmail = async (email, name) => {
    try {
        const response = await transporter.sendMail({
            from: '"venturloop.com" <zahidtime313@gmail.com>',

            to: email, // list of receivers
            subject: "Welcome Email", // Subject line
            text: "Welcome Email", // plain text body
            html: Welcome_Email_Template.replace("{name}", name)
        })
        console.log('Email send Successfully', response)
    } catch (error) {
        console.log('Email error', error)
    }
}



// export const SendVerificationCode = async (email, verificationCode) => {
//   try {
//     const response = await transporter.sendMail({
//       from: '"Email Verification from Tripy.com" <maddison53@ethereal.email>', // sender address
//       to: email, // list of receivers
//       subject: "Verify You Email.", // Subject line
//       text: "Verify You Email.", // plain text body
//       html: Verification_Email_Template.replace(
//         "{verificationCode}",
//         verificationCode
//       ), // html body
//     });
//     console.log(response);
//     console.log("Email Send Successfully..");
//   } catch (error) {
//     console.log("Email Error :", error);
//   }
// };

// export const WelcomeEmail = async (email, name) => {
//   try {
//     const response = await transporter.sendMail({
//       from: '"Email Verification from Tripy.com" <maddison53@ethereal.email>', // sender address
//       to: email, // list of receivers
//       subject: "Welcome to Tripy.com!", // Subject line
//       text: `Welcome, ${name}!`, // plain text body
//       html: Welcome_Email_Template.replace("{name}", name), // html body
//     });
//     console.log("Sending welcome email to:", email);
//     console.log(response);
//     console.log("Email Send Successfully..");
//   } catch (error) {
//     console.log("Email Error :", error);
//   }
// };
