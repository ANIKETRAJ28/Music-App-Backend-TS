import { IUserRegister } from '../interface/user.interface';
import { AuthRepository } from '../repository/auth.repository';
import { authToken, registerToken } from '../util/jwt.util';

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async register(email: string): Promise<string> {
    try {
      const registeredEmail = await this.authRepository.register(email);
      return registerToken(registeredEmail);
    } catch (error) {
      console.log('error occured in register in service');
      throw error;
    }
  }

  async verifyOtp(email: string, otp: string): Promise<string> {
    try {
      const userId = await this.authRepository.verifyOtp(email, otp);
      return registerToken(userId);
    } catch (error) {
      console.log('error occured in verifyOtp in service');
      throw error;
    }
  }

  async completeRegister(userPayload: IUserRegister): Promise<string> {
    try {
      const user = await this.authRepository.completeRegister(userPayload);
      return authToken(user);
    } catch (error) {
      console.log('error occured in signup in service');
      throw error;
    }
  }

  async loginByEmail(email: string, password: string): Promise<string> {
    try {
      const user = await this.authRepository.loginByEmail(email, password);
      return authToken(user);
    } catch (error) {
      console.log('error occured in loginByEmail in service');
      throw error;
    }
  }

  async loginByUsername(username: string, password: string): Promise<string> {
    try {
      const user = await this.authRepository.loginByUsername(username, password);
      return authToken(user);
    } catch (error) {
      console.log('error occured in loginByUsername in service');
      throw error;
    }
  }
}
