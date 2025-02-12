import express from "express"
import { verifyJwt } from "../utils/verify_jwt.js";

const router = express.Router();

//Route to login the user using credentials
router.post("login", login);

// Route to verify the jwt token
router.get("/verify-jwt", (req, res) => {
    /* 
        takes the jwt in headers and verifies it
        Method GET
        -H : `Bearer ${token}`

        Response type
        {
            isValid: true,
            msg: "Jwt is valid"
        }
    */
    const jwtResult = verifyJwt();

    const isValid = jwtResult ? true : false;

    // Sending the resposne
    res.json({
        isValid,
        msg: "Jwt is valid"
    })
})

export default router