import { Router } from 'express';
import { authRouter } from './auth.routes';
import { playlistRouter } from './playlist.routes';
import { songRouter } from './song.routes';
import { verifyJWT } from '@middleware/auth.middleware';

export const v1Router = Router();

v1Router.use('/auth', authRouter);
v1Router.use('/playlist', verifyJWT, playlistRouter);
v1Router.use('/song', verifyJWT, songRouter);
