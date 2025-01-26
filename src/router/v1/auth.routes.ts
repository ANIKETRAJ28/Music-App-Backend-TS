import { AuthController } from '../../controller/auth.controller';
import { getUser, verifyAuthToken, verifyOtpToken } from '../../middleware/auth.middleware';
import { Router } from 'express';

const authController = new AuthController();
export const authRouter = Router();

authRouter.post('/register/:email', authController.register);
authRouter.post('/verifyOtp/:otp', verifyAuthToken, authController.verifyOtp);
authRouter.post('/complete-profile', verifyOtpToken, authController.completeRegister);
authRouter.post('/login', authController.loginByEmail);
authRouter.post('/logout', authController.logout);
authRouter.get('/', getUser);
