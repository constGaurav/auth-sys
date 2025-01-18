import { Request, Response } from "express";
import { UserSignUpSchema } from "../types";
import { AuthService } from "../services/AuthService";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

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
      const isUserAlreadyExists = await this.authService.userExists(email);
      if (isUserAlreadyExists) {
        res.status(400).json({ error: "User already exists" });
        return;
      }

      // TODO: send email to user with verification code

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
