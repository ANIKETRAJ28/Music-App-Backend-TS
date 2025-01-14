import { ISong } from '@interface/song.interface';
import { SongRepository } from '@repository/song.repository';

export class SongService {
  private songRepository: SongRepository;

  constructor() {
    this.songRepository = new SongRepository();
  }

  async createSong(url: string): Promise<ISong> {
    try {
      const createdSong = await this.songRepository.createSong(url);
      return createdSong;
    } catch (error) {
      console.log('error occured in createSong in service');
      throw error;
    }
  }

  async findSongById(id: string): Promise<ISong> {
    try {
      const song = await this.songRepository.findSongById(id);
      return song;
    } catch (error) {
      console.log('error occured in findSongById in service');
      throw error;
    }
  }
}
