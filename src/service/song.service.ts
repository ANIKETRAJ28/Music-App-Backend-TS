import { IPlaylistResponse } from '../interface/playlist.interface';
import { ISong } from '../interface/song.interface';
import { PlaylistRepository } from '../repository/playlist.repository';
import { SongRepository } from '../repository/song.repository';
import { getSongDetails } from '../util/songDetails';

export class SongService {
  private songRepository: SongRepository;
  private playlistRepository: PlaylistRepository;

  constructor() {
    this.songRepository = new SongRepository();
    this.playlistRepository = new PlaylistRepository();
  }

  async createSong(url: string): Promise<ISong> {
    const { title, thumbnail, description } = await getSongDetails(url);
    const createdSong = await this.songRepository.createSong(url, title, thumbnail, description);
    return createdSong;
  }

  async createSongForDefaultPlaylist(url: string, defaultPlaylistId: string): Promise<IPlaylistResponse> {
    const createdSong = await this.createSong(url);
    const updatedDefaultPlaylist = await this.playlistRepository.updateDefaultPlaylist(
      defaultPlaylistId,
      createdSong.id,
    );
    return updatedDefaultPlaylist;
  }

  async findSongById(id: string): Promise<ISong> {
    const song = await this.songRepository.findSongById(id);
    return song;
  }
}
