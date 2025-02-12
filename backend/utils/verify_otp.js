import connectToDatabase from "../db.js";
import Otp from "../models/Otp.model.js";

export async function verifyOTP(email, otp) {
    try {

        // Creating connection with database
        await connectToDatabase();

        // Fetch the latest OTP for the email
        const storedOTP = await Otp.findOne({ email }).sort({ createdAt: -1 });

        if (!storedOTP) {
            return false;
        }

        // Check if the provided OTP matches
        if (storedOTP.otp !== otp.toString()) {
            return false;
        }

        // OTP is correct, delete it from database
        await Otp.deleteOne({ _id: storedOTP._id });
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}
