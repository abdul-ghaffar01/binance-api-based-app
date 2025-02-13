import connectToDatabase from "../../db.js";
import User from "../../models/User.model.js";
import bcrypt from "bcrypt";
import generateOTP from "../../utils/generate_otp.js";


export default async function registerController(req, res) {

    /*
        will extract these things from request body

        fullName: ""
        email: ""
        password: ""
        profilePicture: ""
        apiKey: ""

        everything is required except profile picture

        Reponse type -> 201:
        {
            user: { all user details }
            success: 0/1
            msg: "Account created successfully"
        }
    */

    // Extracting all the fields
    const { fullName, email, password, apiKey } = req.body;
    const profilePicture = req.file;

    console.log(req.body)

    // Validating if all the required fields are provided
    if (!fullName || !email || !password || !apiKey) {
        return res.status(200).json({
            success: 0,
            msg: "Missing required fields",
        })
    }

    // Creating the hash of the password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    // Creating the user
    const newUser = new User({
        fullName,
        email,
        password: hashPass,
        apiKey,
        profilePicture: profilePicture ? `/${profilePicture.filename}` : null
    })

    try {
        // Connecting with database to perform crud operations
        await connectToDatabase();

        // First checking if there is already an account with the same email
        const alreadyHaveAnAccount = await User.findOne({ email })
        if (alreadyHaveAnAccount) {
            return res.status(409).json({
                success: 0,
                msg: "Already have an account with this email"
            })
        }

        // Saving the user in the database
        await newUser.save();

        // Sending the otp for email verification
        generateOTP(email); // this will generate otp and will automatically send to this email

        // Sending the response on successfull saving
        res.status(201).json({
            user: newUser,
            success: 1,
            msg: "Account created successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: 0,
            msg: "Couldn't create account unkown error occured"
        })
    }
}