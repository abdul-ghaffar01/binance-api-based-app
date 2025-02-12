import connectToDatabase from "../../db.js";
import User from "../../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function loginController(req, res) {
    try {
        // Extracting data from request body 
        const { email, password } = req.body;

        // Checking if the email and password is provided
        if (!email || !password) {
            return res.status(400).json({
                success: 0,
                msg: "Required fields are missing",
            });
        }

        // Connecting with the database
        await connectToDatabase();

        // Fetching the user
        const user = await User.findOne({ email });

        // If user not found
        if (!user) {
            return res.status(401).json({
                success: 0,
                msg: "Wrong credentials",
            });
        }

        // Comparing the passwords
        const isMatch = await bcrypt.compare(password, user.password);

        // If password is incorrect
        if (!isMatch) {
            return res.status(401).json({
                success: 0,
                msg: "Wrong credentials",
            });
        }

        // If credentials are correct, sign the JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "5h" } // Token expires in 1 hour
        );

        return res.status(200).json({
            token,
            success: 1,
            msg: "Logged in successfully",
        });

    } catch (error) {
        console.error("Login Error:", error.message);

        return res.status(500).json({
            success: 0,
            msg: "Server error, please try again later.",
        });
    }
}
