import { SongService } from '@service/song.service';
import { NextFunction, Request, Response } from 'express';
import { BadRequest, Created, sendResponse, Success } from '@util/ApiResponse.util';

export class SongController {
  private songService: SongService;

  constructor() {
    this.songService = new SongService();
  }

  createSong = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const url = req.body.url;
      if (!url) sendResponse(res, new BadRequest('Song url required'));
      const song = await this.songService.createSong(url);
      sendResponse(res, new Created('Song created successfully', song));
    } catch (error) {
      next(error);
    }
  };

  findSongById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      sendResponse(res, new BadRequest('SongId required'));
      const song = await this.songService.findSongById(id);
      sendResponse(res, new Success('Song fetched successfully', song));
    } catch (error) {
      next(error);
    }
  };
}
