import { IPlaylistResponse } from '../interface/playlist.interface';
import { ISong } from '../interface/song.interface';
import { PlaylistRepository } from '../repository/playlist.repository';
import { SongRepository } from '../repository/song.repository';

export class SongService {
  private songRepository: SongRepository;
  private playlistRepository: PlaylistRepository;

  constructor() {
    this.songRepository = new SongRepository();
    this.playlistRepository = new PlaylistRepository();
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

  async createSongForDefaultPlaylist(url: string, defaultPlaylistId: string): Promise<IPlaylistResponse> {
    try {
      const createdSong = await this.songRepository.createSong(url);
      const updatedDefaultPlaylist = await this.playlistRepository.updateDefaultPlaylist(
        defaultPlaylistId,
        createdSong.id,
      );
      return updatedDefaultPlaylist;
    } catch (error) {
      console.log('error occured in createSongForDefaultPlaylist in service');
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
