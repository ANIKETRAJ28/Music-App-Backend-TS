import { Router } from 'express';
import { SongController } from '../../controller/song.controller';

const songController = new SongController();
export const songRouter = Router();

songRouter.post('/', songController.createSong);
songRouter.get('/:id', songController.findSongById);
