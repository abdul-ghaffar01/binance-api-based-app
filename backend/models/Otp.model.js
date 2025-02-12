import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true, index: { expires: "20m" } }, // Auto-delete after 20 min
});


const Otp = mongoose.models.Otp || mongoose.model("OTP", OTPSchema);
export default Otp;
