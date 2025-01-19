import { Request, Response } from "express";
import { config } from "../config";
import { AuthService } from "../services/AuthService";
import { UserSignUpSchema } from "../types";

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
      const { otp, token } = authService.generateOtpToken(email);

      // send email to user with verification code
      await authService.sendVerificationCodeEmail(name, email, otp.toString());

      // add token to cookie
      res.cookie("otkn", token, {
        httpOnly: true,
        secure: config.environment === "production",
        maxAge: 5 * 60 * 1000, // 5 minutes,
      });

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

  verifyOtp(req: Request, res: Response) {}
}
