import { IUserRequest, IUserResponse } from '@interface/user.interface';
import { UserRepository } from '@repository/user.repository';

export class UserService {
  private userReposiotry: UserRepository;

  constructor() {
    this.userReposiotry = new UserRepository();
  }

  async createUser(user: IUserRequest): Promise<IUserResponse> {
    try {
      const createdUser = await this.userReposiotry.createUser(user);
      return createdUser;
    } catch (error) {
      console.log('error occured in createUser in service');
      throw error;
    }
  }

  async findUserById(id: string): Promise<IUserResponse> {
    try {
      const user = await this.userReposiotry.findUserById(id);
      return user;
    } catch (error) {
      console.log('error occured in findUserById in service');
      throw error;
    }
  }

  async findUserByEmail(email: string): Promise<IUserResponse> {
    try {
      const user = await this.userReposiotry.findUserByEmail(email);
      return user;
    } catch (error) {
      console.log('error occured in findUserByEmail in service');
      throw error;
    }
  }

  async findByUsername(username: string): Promise<IUserResponse> {
    try {
      const user = await this.userReposiotry.findUserByUsername(username);
      return user;
    } catch (error) {
      console.log('error occured in findUserByUsername in service');
      throw error;
    }
  }
}
