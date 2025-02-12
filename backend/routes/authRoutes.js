import express from "express"
import loginController from "../controllers/auth/login.js";
import registerController from "../controllers/auth/register.js";
import verifyJwtController from "../controllers/auth/verify_jwt.js";
import forgetPassController from "../controllers/auth/forget_pass.js";
import verifyEmailController from "../controllers/auth/verify_email.js";
import upload from "../middlewares/uploadImage.js";

const router = express.Router();

//Route to login the user using credentials
router.post("/login", loginController);

// Route to register a new user
router.post("/register", upload.single("profilePicture"), registerController);

// Route to verify the jwt token
router.get("/verify-jwt", verifyJwtController)

// Route to forget pass
router.post("/forget-pass", forgetPassController)

// Route to verify the email
router.post("verify-email", verifyEmailController)

export default router