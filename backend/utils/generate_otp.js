import Otp from "../models/Otp.model.js";
import crypto from "crypto";
import sendMail from "./send_mail.js";

export default async function generateOTP(email) {
    try {
        // Generate a 6-digit OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const expiresAt = new Date(Date.now() + 20 * 60 * 1000); // OTP valid for 20 minutes

        // Delete any old OTP for this email
        await Otp.deleteMany({ email });

        // Save the new OTP in the database
        const newOTP = new Otp({ email, otp, expiresAt });
        await newOTP.save();

        await sendMail("Otp for verification", "Your verification otp is " + otp, email);
        return true;
    } catch (error) {
        console.error("Error generating OTP:", error);
        return false;
    }
}
