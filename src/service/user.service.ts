import { IUserResponse } from '../interface/user.interface';
import { UserRepository } from '../repository/user.repository';

export class UserService {
  private userReposiotry: UserRepository;

  constructor() {
    this.userReposiotry = new UserRepository();
  }

  async createUser(email: string): Promise<Omit<IUserResponse, 'avatar'>> {
    const createdUser = await this.userReposiotry.createUser(email);
    return createdUser;
  }

  async findUserById(id: string): Promise<IUserResponse> {
    const user = await this.userReposiotry.findUserById(id);
    return user;
  }

  async findUserByEmail(email: string): Promise<IUserResponse> {
    const user = await this.userReposiotry.findUserByEmail(email);
    return user;
  }

  async findByUsername(username: string): Promise<IUserResponse> {
    const user = await this.userReposiotry.findUserByUsername(username);
    return user;
  }
}
