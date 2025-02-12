import { verifyJwt } from "../../utils/verify_jwt.js"

export default function verifyJwtController(req, res) {
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

    // Request headers
    const headers = req.headers;

    // Raw jwt in format "Bearer {token}"
    const { jwtRaw } = headers;

    // Exact jwt token
    const jwtToken = jwtRaw.split(" ")[1];

    // verifying if the jwt results in the user detials or null 
    const jwtResult = verifyJwt(jwtToken);

    // Tracking in boolean if jwt was ok or malformed
    const isValid = jwtResult ? true : false;

    // Sending the resposne
    res.json({
        isValid,
        msg: "Jwt is valid"
    })
}