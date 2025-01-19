import jwt from "jsonwebtoken";
import { config } from "../config";
import { AuthRepository } from "../repositories/AuthRepository";
import { OTP_EMAIL_TEMPLATE } from "../static/templates";
import { EmailService } from "./EmailService";

export class AuthService {
  private authRepository: AuthRepository;
  private emailService: EmailService;

  constructor() {
    this.authRepository = new AuthRepository();
    this.emailService = new EmailService();
  }

  async userExists(email: string) {
    const user = await this.authRepository.findUserByEmail(email);
    return user !== null;
  }

  generateOtpToken(email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000);

    const payload = {
      email,
      otp,
      timestamp: Date.now(),
    };

    const token = jwt.sign(payload, config.JWT_SECRET_KEY, {
      expiresIn: "3m",
    });

    return { otp, token };
  }

  async sendVerificationCodeEmail(name: string, email: string, otp: string) {
    const subject = `Verification code for ${name}`;
    const altText = `Your verification code is: ${otp}`;
    await this.emailService.sendEmail(
      email,
      subject,
      altText,
      OTP_EMAIL_TEMPLATE,
      {
        name,
        otp,
      }
    );
  }

  async createAccount() {}

  async verifyOtp() {}
}
