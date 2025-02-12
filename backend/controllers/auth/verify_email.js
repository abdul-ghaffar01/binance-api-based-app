import connectToDatabase from "../../db.js";
import User from "../../models/User.model.js";
import { verifyOTP } from "../../utils/verify_otp.js";

export default async function verifyEmailController(req, res) {
    // Extracting required fields
    const { email, otp } = req.body;

    // Checking if all fields are provided
    if (!email || !otp) {
        return res.status(400).json({
            success: 0,
            msg: "Required fields are missing"
        });
    }

    try {
        // Connecting to the database
        await connectToDatabase();

        // Verifying OTP
        const otpResult = await verifyOTP(email, otp);
        if (!otpResult) {
            return res.status(400).json({
                success: 0,
                msg: "OTP is incorrect or expired"
            });
        }

        // Fetching the user
        const user = await User.findOne({ email });

        // If user doesn't exist
        if (!user) {
            return res.status(404).json({
                success: 0,
                msg: "User does not exist."
            });
        }

        // Updating user verification status
        if (!user.isVerified) {
            user.isVerified = true;
            await user.save();
        }

        // Sending success response
        return res.status(200).json({
            success: 1,
            msg: "Email verified successfully"
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: 0,
            msg: "Unknown error occured try again later."
        });
    }
}
