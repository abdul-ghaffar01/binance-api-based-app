import connectToDatabase from "../../db.js";
import User from "../../models/User.model.js";
import generateOTP from "../../utils/generate_otp.js";

export default async function forgetPassController(req, res) {
    /*
    Response 
    {
        success: 0/1,
        msg: "Otp sent successfully"
    }
    */
    // Extracting the email from the body 
    const { email } = req.body;

    try {
        // Making connection with the database 
        await connectToDatabase();

        // checking if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(409).json({
                success: 0,
                msg: "Account does not exists with this email"
            })
        }

        // if email is valid and there is account with corresponding email sending otp
        let otpSent = await generateOTP(email);  // will automatically send otp in email

        if (otpSent) {
            return res.status(200).json({
                success: 1,
                msg: "Otp sent to email"
            })
        } else {
            return res.status(200).json({
                success: 0,
                msg: "Couldn't send otp error occured"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: 0,
            msg: "Internal server error"
        })
    }
}