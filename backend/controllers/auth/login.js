import connectToDatabase from "../../db.js";
import User from "../../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function loginController(req, res) {
    // Extracting data from request body 
    const { email, password } = req.body;

    // Checking if the email and password is provided
    if (!email || !password) {
        res.status(200).json({
            success: 0,
            msg: "Required fields are missing"
        })
    }

    // Connecting with the database
    connectToDatabase();

    // Fetching the user
    const user = await User.findOne({ email });

    // If user not found
    if (!user) {
        res.json({
            success: 0,
            msg: "Wrong credentials",
        })
    }

    // Comparing the passwords
    const isMatch = await bcrypt.compare(password, user.password);

    // if the password is correct 
    if (isMatch) {
        // if the user details are correct signing the jwt
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        res.json({
            token,
            success: 1,
            msg: "Loggedin successfully"
        })
    } else {
        res.json({
            success: 0,
            msg: "Wrong credentials",
        })
    }
}