import { SongService } from '../service/song.service';
import { NextFunction, Request, Response } from 'express';
import { BadRequest, Created, sendResponse, Success } from '../util/ApiResponse.util';

export class SongController {
  private songService: SongService;

  constructor() {
    this.songService = new SongService();
  }

  createSong = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const url = req.body.url;
      const defaultPlaylistId = req.defaultPlaylistId;
      if (!url) throw new BadRequest('Song URL is required to create a new song.');
      if (!defaultPlaylistId) throw new BadRequest('Default playlist ID is not found.');
      const song = await this.songService.createSongForDefaultPlaylist(url, defaultPlaylistId);
      sendResponse(res, new Created('Song created successfully.', song));
    } catch (error) {
      console.error('Error occurred in createSong method:', error);
      next(error);
    }
  };

  findSongById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      if (!id) throw new BadRequest('Song ID is required to fetch the song.');
      const song = await this.songService.findSongById(id);
      sendResponse(res, new Success('Song fetched successfully.', song));
    } catch (error) {
      console.error('Error occurred in findSongById method:', error);
      next(error);
    }
  };
}
