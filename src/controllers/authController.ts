import { Request, Response } from "express";
import { config, cookieKeys } from "../config";
import { AuthService } from "../services/AuthService";
import { UserSignUpSchema, VerifyOtpRequestSchema } from "../types";

const authService: AuthService = new AuthService();

export class AuthController {
  async signup(req: Request, res: Response) {
    try {
      const result = UserSignUpSchema.safeParse(req.body);

      if (!result.success) {
        res.status(400).json({
          error: "Validation failed",
          details: result.error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
        return;
      }

      const { name, email } = result.data;

      // check if user already exists
      const isUserAlreadyExists = await authService.userExists(email);
      if (isUserAlreadyExists) {
        res.status(400).json({ error: "User already exists" });
        return;
      }

      // generate verification code
      const otp = authService.generateOtp();

      // send email to user with verification code
      await authService.sendVerificationCodeEmail(name, email, otp.toString());

      res.status(201).json({
        message: `Hi ${name}, we have sent you a verification code to your email ${email}.
      Please check your email.`,
        user: result.data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async verifyOtp(req: Request, res: Response) {
    try {
      const request = VerifyOtpRequestSchema.safeParse(req.body);

      if (!request.success) {
        res.status(400).json({
          error: "Validation failed, invalid request format",
          details: request.error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
        return;
      }

      const { name, email, otp } = request.data;
      if (!otp) {
        res.status(401).json({ error: "Invalid OTP" });
        return;
      }

      const isValid = authService.verifyOtp(otp);
      if (!isValid) {
        res.status(400).json({ error: "Invalid OTP, Please try again" });
        return;
      }

      // Create account
      const user = await authService.createAccount(name, email);

      // User verification successful
      const jwtToken = authService.generateJwtToken({
        id: user.id,
        name: user.name,
        email: user.email,
      });

      res.cookie(cookieKeys.AUTH_COOKIE_NAME, jwtToken, {
        httpOnly: true,
        secure: config.environment === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(200).json({ message: "Verification successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
