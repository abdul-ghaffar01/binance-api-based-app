import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        profilePicture: {
            type: String, // URL of the profile image
            default: null
        },
        apiKey: {
            type: String, // Encrypted Binance API key
            default: null
        },
        isVerified: {
            type: Boolean, // Email verification flag
            default: false
        }
    },
    { timestamps: true } // Adds createdAt and updatedAt fields
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
