import { prisma } from '@config/db.config';
import { ISong } from '@interface/song.interface';

export class SongRepository {
  async createSong(url: string): Promise<ISong> {
    try {
      const createdSong = await prisma.song.create({
        data: { url },
      });
      return createdSong;
    } catch (error) {
      console.log('error occured in createSong in repository');
      throw error;
    }
  }

  async findSongById(id: string): Promise<ISong> {
    try {
      const song = await prisma.song.findUnique({
        where: { id },
      });
      if (!song) throw new Error('Song not found');
      return song;
    } catch (error) {
      console.log('error occured in findSongById in repository');
      throw error;
    }
  }
}
