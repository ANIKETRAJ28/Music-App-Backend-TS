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
    try {
      const createdPlaylist = await this.playlistRepository.createPlaylist(playlist);
      return createdPlaylist;
    } catch (error) {
      console.log('error occured in createPlaylist in service');
      throw error;
    }
  }

  async findPlaylistById(id: string): Promise<IPlaylistResponse> {
    try {
      const playlist = await this.playlistRepository.findPlaylistById(id);
      return playlist;
    } catch (error) {
      console.log('error occured in findPlaylistById in service');
      throw error;
    }
  }

  async findUserPlaylists(userId: string): Promise<IPlaylistResponse[]> {
    try {
      const playlists = await this.playlistRepository.findUserPlaylists(userId);
      return playlists;
    } catch (error) {
      console.log('error occured in findPlaylistByUserId in service');
      throw error;
    }
  }

  async deletePlaylist(id: string): Promise<IPlaylistResponse> {
    try {
      const deletedPlaylist = await this.playlistRepository.deletePlaylist(id);
      return deletedPlaylist;
    } catch (error) {
      console.log('error occured in deletePlaylist in service');
      throw error;
    }
  }

  async addSongToPlaylist(playlistId: string, songId: string): Promise<IPlaylistResponse> {
    try {
      const updatedPlaylist = await this.playlistRepository.addSongToPlaylist(playlistId, songId);
      return updatedPlaylist;
    } catch (error) {
      console.log('error occured in addSongToPlaylist in service');
      throw error;
    }
  }

  async addSongToPlaylistByUrl(songUrl: string, playlistId: string): Promise<ISong> {
    try {
      const createdSong = await this.songRepository.createSong(songUrl);
      await this.playlistRepository.addSongToPlaylist(playlistId, createdSong.id);
      return createdSong;
    } catch (error) {
      console.log('error occured in addSongToPlaylistByUrl in service');
      throw error;
    }
  }

  async removeSongFromPlaylist(playlistId: string, songId: string): Promise<IPlaylistResponse> {
    try {
      const updatedPlaylist = await this.playlistRepository.removeSongFromPlaylist(playlistId, songId);
      return updatedPlaylist;
    } catch (error) {
      console.log('error occured in removeSongFromPlaylist in service');
      throw error;
    }
  }
}
