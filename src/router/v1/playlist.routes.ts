import { Router } from 'express';
import { PlaylistController } from '@controller/playlist.controller';

const playlistController = new PlaylistController();

export const playlistRouter = Router();

playlistRouter.post('/', playlistController.createPlaylist);
playlistRouter.get('/:id', playlistController.findPlaylistById);
playlistRouter.get('/user', playlistController.findPlaylistByUserId);
playlistRouter.delete('/:id', playlistController.deletePlaylist);
playlistRouter.put('/:id/:song_id', playlistController.addSongToPlaylist);
playlistRouter.delete('/:id/:song_id', playlistController.removeSongFromPlaylist);
