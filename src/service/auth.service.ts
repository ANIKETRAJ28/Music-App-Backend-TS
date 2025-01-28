import { IUserRegister } from '../interface/user.interface';
import { AuthRepository } from '../repository/auth.repository';
import { authToken, registerToken } from '../util/jwt.util';

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async register(email: string): Promise<string> {
    const registeredEmail = await this.authRepository.register(email);
    return registerToken(registeredEmail);
  }

  async verifyOtp(email: string, otp: string): Promise<string> {
    const userId = await this.authRepository.verifyOtp(email, otp);
    return registerToken(userId);
  }

  async completeRegister(userPayload: IUserRegister): Promise<string> {
    const user = await this.authRepository.completeRegister(userPayload);
    return authToken(user);
  }

  async loginByEmail(email: string, password: string): Promise<string> {
    const user = await this.authRepository.loginByEmail(email, password);
    return authToken(user);
  }

  async loginByUsername(username: string, password: string): Promise<string> {
    const user = await this.authRepository.loginByUsername(username, password);
    return authToken(user);
  }
}
