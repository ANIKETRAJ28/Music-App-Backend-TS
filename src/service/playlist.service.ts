import { IPlaylistRequest, IPlaylistResponse } from '../interface/playlist.interface';
import { ISong } from '../interface/song.interface';
import { PlaylistRepository } from '../repository/playlist.repository';
import { SongRepository } from '../repository/song.repository';

export class PlaylistService {
  private playlistRepository: PlaylistRepository;
  private songRepository: SongRepository;

  constructor() {
    this.playlistRepository = new PlaylistRepository();
    this.songRepository = new SongRepository();
  }

  async createPlaylist(playlist: IPlaylistRequest): Promise<IPlaylistResponse> {
    const createdPlaylist = await this.playlistRepository.createPlaylist(playlist);
    return createdPlaylist;
  }

  async findPlaylistById(id: string): Promise<IPlaylistResponse> {
    const playlist = await this.playlistRepository.findPlaylistById(id);
    return playlist;
  }

  async findUserPlaylists(userId: string): Promise<IPlaylistResponse[]> {
    const playlists = await this.playlistRepository.findUserPlaylists(userId);
    return playlists;
  }

  async deletePlaylist(id: string): Promise<IPlaylistResponse> {
    const deletedPlaylist = await this.playlistRepository.deletePlaylist(id);
    return deletedPlaylist;
  }

  async addSongToPlaylist(playlistId: string, songId: string): Promise<IPlaylistResponse> {
    const updatedPlaylist = await this.playlistRepository.addSongToPlaylist(playlistId, songId);
    return updatedPlaylist;
  }

  async addSongToPlaylistByUrl(songUrl: string, playlistId: string): Promise<ISong> {
    const createdSong = await this.songRepository.createSong(songUrl);
    await this.playlistRepository.addSongToPlaylist(playlistId, createdSong.id);
    return createdSong;
  }

  async removeSongFromPlaylist(playlistId: string, songId: string): Promise<IPlaylistResponse> {
    const updatedPlaylist = await this.playlistRepository.removeSongFromPlaylist(playlistId, songId);
    return updatedPlaylist;
  }
}
