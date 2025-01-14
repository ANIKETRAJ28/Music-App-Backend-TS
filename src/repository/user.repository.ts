import { prisma } from '@config/db.config';
import bcrypt from 'bcrypt';
import { IUserRequest, IUserResponse } from '@interface/user.interface';
import { PlaylistRepository } from './playlist.repository';
import { SALT } from '@config/dotenv.config';

export class UserRepository {
  private playlistRepository: PlaylistRepository;

  constructor() {
    this.playlistRepository = new PlaylistRepository();
  }

  async createUser(user: IUserRequest): Promise<IUserResponse> {
    try {
      const randomId = Math.floor(Math.random() * 53) + 1;
      const avatar = `https://xsgames.co/randomusers/assets/avatars/pixel/${randomId}.jpg`;
      const salt = await bcrypt.genSalt(+SALT);
      user.password = await bcrypt.hash(user.password, salt);
      const createdUser = await prisma.user.create({
        data: { ...user, avatar },
      });
      const defaultPlaylist = await this.playlistRepository.createPlaylist({
        name: 'Current Played',
        userId: createdUser.id,
      });
      await prisma.user.update({
        where: { id: createdUser.id },
        data: { defaultPlaylistId: defaultPlaylist.id },
      });
      return {
        id: createdUser.id,
        name: createdUser.name,
        username: createdUser.username,
        email: createdUser.email,
        avatar: createdUser.avatar,
      };
    } catch (error) {
      console.log('error occured in createUser in repository');
      throw error;
    }
  }

  async findUserByEmail(email: string): Promise<IUserResponse> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      console.log('error occured in findUserByEmail in repository');
      throw error;
    }
  }

  async findUserById(id: string): Promise<IUserResponse> {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      console.log('error occured in findUserById in repository');
      throw error;
    }
  }

  async findUserByUsername(username: string): Promise<IUserResponse> {
    try {
      const user = await prisma.user.findUnique({
        where: { username },
      });
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      console.log('error occured in findUserByUsername in repository');
      throw error;
    }
  }
}
