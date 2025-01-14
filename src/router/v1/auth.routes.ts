import { AuthController } from '@controller/auth.controller';
import { getUser } from '@middleware/auth.middleware';
import { Router } from 'express';

const authController = new AuthController();
export const authRouter = Router();

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/', getUser);
