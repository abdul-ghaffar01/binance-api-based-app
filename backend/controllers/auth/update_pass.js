import jwt from "jsonwebtoken"
import { isTokenBlacklisted, addToBlacklist } from "./tokenBlacklist.js";
import User from "../../models/User.model.js";
import bcrypt from "bcrypt"


export default async function updatePassController(req, res) {

    /*
        Payload :
        {
            password: {clients new password},    
        }

        Response:
        {
            success: 0/1,
            msg: "Password updated"
        }
    */

    // Extracting new password
    const { password } = req.body;

    // Extracting token from headers
    const token = req.headers.authorization?.split(" ")[1]; // Extracts 'Bearer <token>'


    try {
        // Extracting the email from the token
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        console.log("email from jwt: ", email);

        // now checking if the token has been already used or not
        const tokenBlacklisted = await isTokenBlacklisted(token);

        if (tokenBlacklisted) {
            return res.status(404).json({
                success: 0,
                msg: "Link can be used only once"
            })
        }

        // if token is valid then blacklisting it to prohibit next use
        await addToBlacklist(token, 15 * 60); // adding time of 15m so it will be automatically removed

        // checking if user exists with this email
        const user = await User.findOne({ email });

        // this will be executed once the secret has been revieled or becuase of some hacking stuff
        if (!user) {
            return res.status(404).json({
                success: 0,
                msg: "Account doesn't exists with this email",
            })
        }

        // Generating the new hash password
        const hashPass = await bcrypt.hash(password, 10);

        // if user exists updating the new password
        user.password = hashPass;

        // Saving the user
        await user.save();

        // Sending the success response 
        return res.json({
            success: 1,
            msg: "Password updated successfully"
        })
    } catch (error) {
        console.log(error); null
        return res.status(500).json({
            success: 0,
            msg: "Internal server error try again later"
        })
    }
}