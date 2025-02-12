export default function isAuthenticated(req, res, next) {

    // Request headers
    const headers = req.headers;

    // Raw jwt in format "Bearer {token}"
    const { jwtRaw } = headers;

    // Exact jwt token
    const jwtToken = jwtRaw.split(" ")[1];

    // verifying if the jwt results in the user detials or null 
    const jwtResult = verifyJwt(jwtToken);

    if (jwtResult) {
        // if the jwt is valid
        req.body.userDetails = jwtResult;
        // Calling the controller if the user is authenticated
        next();
    } else {
        res.status(401).json({
            msg: "Invalid token"
        })
    }
}