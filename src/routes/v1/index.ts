import { Router } from "express";
import { AuthController } from "../../controllers/AuthController";

const router = Router();

// Instantiate the AuthController
const authController = new AuthController();

router.post("/signup", authController.signup);
router.post("/verify-otp", authController.verifyOtp);

export default router;
