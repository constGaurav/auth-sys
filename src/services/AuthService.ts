import jwt from "jsonwebtoken";
import { config } from "../config";
import { AuthRepository } from "../repositories/AuthRepository";
import { OTP_EMAIL_TEMPLATE } from "../static/templates";
import { EmailService } from "./EmailService";
import { TUserBasicData } from "../types";
import { totp } from "otplib";

totp.options = { step: 30, digits: 6 };

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

  generateOtp() {
    const otp = totp.generate(config.OTP_SECRET_KEY);
    return otp;
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

  verifyOtp(otp: string) {
    try {
      const isValid = totp.check(otp, config.OTP_SECRET_KEY);
      return isValid;
    } catch (error) {
      console.error("Error verifying OTP: ", error);
      return false;
    }
  }

  generateJwtToken(user: TUserBasicData) {
    const token = jwt.sign(user, config.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    return token;
  }

  async createAccount(name: string, email: string) {
    const randomPassword = Math.random().toString(36).slice(-11);
    const user = await this.authRepository.createUser(
      name,
      email,
      randomPassword
    );

    return user;
  }
}
