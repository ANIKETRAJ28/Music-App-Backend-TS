import { prisma } from '@config/db.config';
import { authToken } from '@util/jwt.util';
import bcrypt from 'bcrypt';
import { PlaylistRepository } from './playlist.repository';
import { IUserRequest } from '@interface/user.interface';
import { SALT } from '@config/dotenv.config';

export class AuthRepository {
  private playlistRepository: PlaylistRepository;

  constructor() {
    this.playlistRepository = new PlaylistRepository();
  }

  async login(email: string, password: string): Promise<string> {
    try {
      const user = await prisma.user.findFirst({
        where: { email },
      });
      if (!user) throw new Error('Invalid email');
      if (!bcrypt.compare(password, user.password)) throw new Error('Invalid username or password');
      const token = authToken(user);
      return token;
    } catch (error) {
      console.log('error occured in login in repository');
      throw error;
    }
  }

  async signup(user: IUserRequest): Promise<string> {
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
      const token = authToken(createdUser);
      return token;
    } catch (error) {
      console.log('error occured in signup in repository');
      throw error;
    }
  }
}
