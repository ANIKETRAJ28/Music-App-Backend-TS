import { IUserRequest } from '@interface/user.interface';
import { AuthService } from '@service/auth.service';
import { BadRequest, sendResponse, Success } from '@util/ApiResponse.util';
import { CookieOptions, NextFunction, Request, Response } from 'express';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user: Omit<Omit<IUserRequest, 'username'>, 'name'> = req.body.user;
      if (!user) sendResponse(res, new BadRequest('Credentials required'));
      const token = await this.authService.login(user.email, user.password);
      sendResponse(res, new Success('Login successful', token));
      const cookieOptions = {
        domain: 'localhost', // Can be changed for a production domain
        maxAge: 1000 * 60 * 60 * 24, // 1 day in ms
        httpOnly: true, // For security, use true if not needed in JS
        secure: false, // Use true only for production (HTTPS)
        sameSite: 'lax', // Change to 'None' for production with HTTPS
        path: '/',
      } as CookieOptions;
      res.cookie('JWT', token, cookieOptions);
      sendResponse(res, new Success('Login successful'));
    } catch (error) {
      next(error);
    }
  };

  signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user: IUserRequest = req.body.user;
      if (!user) sendResponse(res, new BadRequest('User data required'));
      const token = await this.authService.signup(user);
      sendResponse(res, new Success('Signup successful', token));
      const cookieOptions = {
        domain: 'localhost', // Can be changed for a production domain
        maxAge: 1000 * 60 * 60 * 24, // 1 day in ms
        httpOnly: true, // For security, use true if not needed in JS
        secure: false, // Use true only for production (HTTPS)
        sameSite: 'lax', // Change to 'None' for production with HTTPS
        path: '/',
      } as CookieOptions;
      res.cookie('JWT', token, cookieOptions);
      sendResponse(res, new Success('Signup successful'));
    } catch (error) {
      next(error);
    }
  };

  logout = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.clearCookie('JWT');
      sendResponse(res, new Success('Logout successful'));
    } catch (error) {
      next(error);
    }
  };
}
