import { AuthRepository } from "../repositories/AuthRepository";

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async userExists(email: string) {
    const user = await this.authRepository.findUserByEmail(email);
    return user !== null;
  }
  async createAccount() {}
  async verifyOtp() {}
}
