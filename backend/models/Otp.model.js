import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: false, // A user might request multiple OTPs
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 1200, // OTP expires after 20 minutes (1200 seconds)
    }
});

const Otp = mongoose.models.Otp || mongoose.model("OTP", otpSchema);
export default Otp;
