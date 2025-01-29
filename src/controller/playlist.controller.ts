import { PlaylistService } from '../service/playlist.service';
import { NextFunction, Request, Response } from 'express';
import { BadRequest, Created, NotFound, sendResponse, Success } from '../util/ApiResponse.util';

export class PlaylistController {
  private playlistService: PlaylistService;

  constructor() {
    this.playlistService = new PlaylistService();
  }

  createPlaylist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.id;
      const name = req.body.name;
      if (!userId) throw new BadRequest('User ID is required to create a playlist.');
      if (!name) throw new BadRequest('Playlist name is required.');
      const playlist = await this.playlistService.createPlaylist({ userId, name });
      sendResponse(res, new Created('Playlist created successfully.', playlist));
    } catch (error) {
      console.error('Error occurred in createPlaylist method:', error);
      next(error);
    }
  };

  findPlaylistById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      if (!id) throw new BadRequest('Playlist ID is required to fetch the playlist.');
      const playlist = await this.playlistService.findPlaylistById(id);
      sendResponse(res, new Success('Playlist found successfully.', playlist));
    } catch (error) {
      console.error('Error occurred in findPlaylistById method:', error);
      next(error);
    }
  };

  findUserPlaylists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.id;
      const defaultPlaylistId = req.defaultPlaylistId;
      if (!userId) throw new BadRequest('User ID is required to fetch playlists.');
      if (!defaultPlaylistId) throw new NotFound('DefaultPlaylist ID is not found.');
      const playlists = await this.playlistService.findUserPlaylists(userId, defaultPlaylistId);
      sendResponse(res, new Success('Playlists found successfully.', playlists));
    } catch (error) {
      console.error('Error occurred in findUserPlaylists method:', error);
      next(error);
    }
  };

  deletePlaylist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const playlistId = req.params.id;
      const defaultPlaylistId = req.defaultPlaylistId;
      if (!defaultPlaylistId) throw new BadRequest('Default playlist ID is not found.');
      if (!playlistId) throw new BadRequest('Playlist ID is required to delete the playlist.');
      if (playlistId === defaultPlaylistId) throw new BadRequest('Cannot delete the default playlist.');
      const playlist = await this.playlistService.deletePlaylist(playlistId);
      sendResponse(res, new Success('Playlist deleted successfully.', playlist));
    } catch (error) {
      console.error('Error occurred in deletePlaylist method:', error);
      next(error);
    }
  };

  addSongToPlaylist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const playlistId = req.params.id;
      const songId = req.params.song_id;
      if (!playlistId) throw new BadRequest('Playlist ID is required to add a song.');
      if (!songId) throw new BadRequest('Song ID is required to add to the playlist.');
      const updatedPlaylist = await this.playlistService.addSongToPlaylist(playlistId, songId);
      sendResponse(res, new Success('Song added to playlist successfully.', updatedPlaylist));
    } catch (error) {
      console.error('Error occurred in addSongToPlaylist method:', error);
      next(error);
    }
  };

  createSongForPlaylist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const playlistId = req.params.id;
      const songUrl = req.body.url;
      if (!playlistId) throw new BadRequest('Playlist ID is required to add a song');
      if (!songUrl) throw new BadRequest('Song URL is required to add to the playlist');
      const song = await this.playlistService.addSongToPlaylistByUrl(songUrl, playlistId);
      sendResponse(res, new Created('Song added to playlist successfully', song));
    } catch (error) {
      console.error('Error occurred in createSongForPlaylist method:', error);
      next(error);
    }
  };

  removeSongFromPlaylist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const playlistId = req.params.id;
      const songId = req.params.song_id;
      if (!playlistId) throw new BadRequest('Playlist ID is required to remove a song.');
      if (!songId) throw new BadRequest('Song ID is required to remove from the playlist.');
      const updatedPlaylist = await this.playlistService.removeSongFromPlaylist(playlistId, songId);
      sendResponse(res, new Success('Song removed from playlist successfully.', updatedPlaylist));
    } catch (error) {
      console.error('Error occurred in removeSongFromPlaylist method:', error);
      next(error);
    }
  };
}
