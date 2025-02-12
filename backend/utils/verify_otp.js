import connectToDatabase from "../db";
import Otp from "../models/Otp.model";

export async function verifyOTP(email, otp) {
    // Creating connection with database
    await connectToDatabase();

    // Fetch the latest OTP for the email
    const storedOTP = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!storedOTP) {
        return false;
    }

    // Check if the provided OTP matches
    if (storedOTP.otp !== otp) {
        return false;
    }

    // OTP is correct, delete it from database
    await Otp.deleteOne({ _id: storedOTP._id });

    return true;
}
