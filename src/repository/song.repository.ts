import { prisma } from '../config/db.config';
import { ISong } from '../interface/song.interface';
import { NotFound } from '../util/ApiResponse.util';

export class SongRepository {
  async createSong(url: string): Promise<ISong> {
    try {
      const createdSong = await prisma.song.create({ data: { url } });
      return createdSong;
    } catch (error) {
      console.error('Error occurred in createSong method in SongRepository:', error);
      throw error;
    }
  }

  async findSongById(id: string): Promise<ISong> {
    try {
      const song = await prisma.song.findUnique({
        where: { id },
      });
      if (!song) throw new NotFound('Song not found.');
      return song;
    } catch (error) {
      console.error('Error occurred in findSongById method in SongRepository:', error);
      throw error;
    }
  }
}
