import jwt from "jsonwebtoken";

export function verifyJwt(token) {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    try {

        const result = jwt.verify(token, jwtSecret);
        console.log("Token Verified:", result);
        return result;

    } catch (error) {
        console.error("JWT Verification Failed:", error.message);
        return null;
    }
}
