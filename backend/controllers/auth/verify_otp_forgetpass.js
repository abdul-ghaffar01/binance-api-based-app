import jwt from "jsonwebtoken";
import { verifyOTP } from "../../utils/verify_otp.js";
import User from "../../models/User.model.js";

export default async function forgetPassOtpVerifyController(req, res) {
    try {
        // Extract email and OTP from request body
        const { email, otp } = req.body;

        // Validate input
        if (!email || !otp) {
            return res.status(400).json({
                success: 0,
                msg: "Email and OTP are required",
            });
        }

        // Verify the OTP
        const isOtpValid = await verifyOTP(email, otp);
        if (!isOtpValid) {
            return res.status(400).json({
                success: 0,
                msg: "Invalid or expired OTP",
            });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: 0,
                msg: "User not found",
            });
        }

        // Generate a temporary JWT token with email (valid for 15 minutes)
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "15m" });

        return res.status(200).json({
            success: 1,
            msg: "OTP verified successfully",
            resetToken: token, // Send token to frontend
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: 0,
            msg: "Internal server error",
        });
    }
}
