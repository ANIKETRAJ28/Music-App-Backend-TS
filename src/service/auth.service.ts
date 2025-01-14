import { IUserRequest } from '@interface/user.interface';
import { AuthRepository } from '@repository/auth.repository';

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async signup(user: IUserRequest): Promise<string> {
    try {
      const token = await this.authRepository.signup(user);
      return token;
    } catch (error) {
      console.log('error occured in signup in service');
      throw error;
    }
  }

  async login(email: string, password: string): Promise<string> {
    try {
      const token = await this.authRepository.login(email, password);
      return token;
    } catch (error) {
      console.log('error occured in login in service');
      throw error;
    }
  }
}
