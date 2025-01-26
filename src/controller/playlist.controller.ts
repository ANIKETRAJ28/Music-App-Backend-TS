import { PlaylistService } from '../service/playlist.service';
import { NextFunction, Request, Response } from 'express';
import { BadRequest, Created, sendResponse, Success } from '../util/ApiResponse.util';

export class PlaylistController {
  private playlistService: PlaylistService;

  constructor() {
    this.playlistService = new PlaylistService();
  }

  createPlaylist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.id;
      const name = req.body.name;
      if (!userId) sendResponse(res, new BadRequest('UserId required'));
      if (!name) sendResponse(res, new BadRequest('Name required'));
      const playlist = await this.playlistService.createPlaylist(req.body);
      sendResponse(res, new Created('Playlist created successfully', playlist));
    } catch (error) {
      next(error);
    }
  };

  findPlaylistById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      if (!id) sendResponse(res, new BadRequest('Id required'));
      const playlist = await this.playlistService.findPlaylistById(id);
      sendResponse(res, new Success('Playlist found successfully', playlist));
    } catch (error) {
      next(error);
    }
  };

  findUserPlaylists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.id;
      if (!userId) throw new Error('UserId required');
      const playlists = await this.playlistService.findUserPlaylists(userId);
      sendResponse(res, new Success('Playlists found successfully', playlists));
    } catch (error) {
      next(error);
    }
  };

  deletePlaylist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const playlistId = req.params.id;
      const playlist = await this.playlistService.deletePlaylist(playlistId);
      res.status(200).json(playlist);
    } catch (error) {
      next(error);
    }
  };

  addSongToPlaylist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const playlistId = req.params.id;
      const songId = req.body.song_id;
      if (!playlistId) {
        sendResponse(res, new BadRequest('playlistId required'));
        return;
      }
      if (!songId) {
        sendResponse(res, new BadRequest('SongId required'));
        return;
      }
      const updatedPlaylist = await this.playlistService.addSongToPlaylist(playlistId, songId);
      sendResponse(res, new Success('Song added to playlist successfully', updatedPlaylist));
    } catch (error) {
      next(error);
    }
  };

  removeSongFromPlaylist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const playlistId = req.params.id;
      const songId = req.body.song_id;
      if (!playlistId) sendResponse(res, new BadRequest('playlistId required'));
      if (!songId) sendResponse(res, new BadRequest('SongId required'));
      const updatedPlaylist = await this.playlistService.removeSongFromPlaylist(playlistId, songId);
      sendResponse(res, new Success('Song removed from playlist successfully', updatedPlaylist));
    } catch (error) {
      next(error);
    }
  };
}
