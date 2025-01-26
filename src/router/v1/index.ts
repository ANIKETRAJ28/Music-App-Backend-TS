import { Router } from 'express';
import { authRouter } from './auth.routes';
import { playlistRouter } from './playlist.routes';
import { songRouter } from './song.routes';
import { verifyJwtToken } from '../../middleware/auth.middleware';

export const v1Router = Router();

v1Router.use('/auth', authRouter);
v1Router.use('/playlist', verifyJwtToken, playlistRouter);
v1Router.use('/song', verifyJwtToken, songRouter);
