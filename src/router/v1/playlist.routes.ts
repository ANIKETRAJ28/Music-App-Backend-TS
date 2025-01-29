import { Router } from 'express';
import { PlaylistController } from '../../controller/playlist.controller';

const playlistController = new PlaylistController();

export const playlistRouter = Router();

playlistRouter.post('/:id', playlistController.createSongForPlaylist);
playlistRouter.post('/', playlistController.createPlaylist);
playlistRouter.get('/', playlistController.findUserPlaylists);
playlistRouter.get('/:id', playlistController.findPlaylistById);
playlistRouter.delete('/:id', playlistController.deletePlaylist);
playlistRouter.put('/:id/:song_id', playlistController.addSongToPlaylist);
playlistRouter.delete('/:id/:song_id', playlistController.removeSongFromPlaylist);
