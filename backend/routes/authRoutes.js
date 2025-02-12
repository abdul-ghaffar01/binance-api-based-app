import express from "express"
import loginController from "../controllers/auth/login.js";
import registerController from "../controllers/auth/register.js";
import verifyJwtController from "../controllers/auth/verify_jwt.js";

const router = express.Router();

//Route to login the user using credentials
router.post("/login", loginController);

// Route to register a new user
router.post("/register", registerController);

// Route to verify the jwt token
router.get("/verify-jwt", verifyJwtController)

// Route to forget pass
router.post("/forget-pass", forgetPassController)

export default router