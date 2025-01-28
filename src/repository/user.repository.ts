import { prisma } from '../config/db.config';
import bcrypt from 'bcrypt';
import { IUserRegister, IUserResponse } from '../interface/user.interface';
import { SALT } from '../config/dotenv.config';
import { getAvatar } from '../util/avatar.util';
import { PlaylistRepository } from './playlist.repository';
import { NotFound } from '../util/ApiResponse.util';

export class UserRepository {
  private playlistRepository: PlaylistRepository;

  constructor() {
    this.playlistRepository = new PlaylistRepository();
  }

  async createUser(email: string): Promise<Omit<IUserResponse, 'avatar'>> {
    try {
      const createdUser = await prisma.user.create({ data: { email } });
      const defaultPlaylist = await this.playlistRepository.createPlaylist({
        name: 'default playlist',
        userId: createdUser.id,
      });

      const createdUserWithDetails = await prisma.user.update({
        where: { id: createdUser.id },
        data: { defaultPlaylistId: defaultPlaylist.id },
        include: { defaultPlaylist: true },
      });

      return {
        id: createdUserWithDetails.id,
        email: createdUserWithDetails.email,
        name: createdUserWithDetails.name,
        username: createdUserWithDetails.username,
        defaultPlaylist: createdUserWithDetails.defaultPlaylist,
      };
    } catch (error) {
      console.error('Error occurred in createUser method in UserRepository:', error);
      throw error;
    }
  }

  async findUserByEmail(email: string): Promise<IUserResponse> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        include: { defaultPlaylist: true },
      });
      if (!user || !user.username) throw new NotFound('User not found.');
      const avatar = getAvatar(user.username);
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        defaultPlaylist: user.defaultPlaylist,
        avatar,
      };
    } catch (error) {
      console.error('Error occurred in findUserByEmail method in UserRepository:', error);
      throw error;
    }
  }

  async findUserById(id: string): Promise<IUserResponse> {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        include: { defaultPlaylist: true },
      });
      if (!user || !user.username) throw new NotFound('User not found.');
      const avatar = getAvatar(user.username);
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        defaultPlaylist: user.defaultPlaylist,
        avatar,
      };
    } catch (error) {
      console.error('Error occurred in findUserById method in UserRepository:', error);
      throw error;
    }
  }

  async findUserByUsername(username: string): Promise<IUserResponse> {
    try {
      const user = await prisma.user.findUnique({
        where: { username },
        include: { defaultPlaylist: true },
      });
      if (!user || !user.username) throw new NotFound('User not found.');
      const avatar = getAvatar(user.username);
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        defaultPlaylist: user.defaultPlaylist,
        avatar,
      };
    } catch (error) {
      console.error('Error occurred in findUserByUsername method in UserRepository:', error);
      throw error;
    }
  }

  async updateUserById(userPayload: IUserRegister): Promise<IUserResponse> {
    try {
      const salt = await bcrypt.genSalt(+SALT);
      userPayload.password = await bcrypt.hash(userPayload.password, salt);
      const user = await prisma.user.update({
        where: { id: userPayload.id },
        data: {
          name: userPayload.name,
          username: userPayload.username,
          password: userPayload.password,
        },
        include: { defaultPlaylist: true },
      });
      if (!user || !user.username) throw new NotFound('User not found.');
      const avatar = getAvatar(user.username);
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        defaultPlaylist: user.defaultPlaylist,
        avatar,
      };
    } catch (error) {
      console.error('Error occurred in updateUserById method in UserRepository:', error);
      throw error;
    }
  }
}
