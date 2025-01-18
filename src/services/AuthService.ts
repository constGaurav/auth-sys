import { AuthRepository } from "../repositories/AuthRepository";
import { EmailService } from "./EmailService";
import { OTP_EMAIL_TEMPLATE } from "../static/templates";

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
