import { IUserAuthRequest, IUserRegister } from '../interface/user.interface';
import { AuthService } from '../service/auth.service';
import { BadRequest, sendResponse, Success, Unauthorized } from '../util/ApiResponse.util';
import { CookieOptions, NextFunction, Request, Response } from 'express';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const email = req.params.email;
      if (!email || typeof email !== 'string') throw new Error('Email required for registation');
      const token = await this.authService.register(email);
      const cookieOptions = {
        domain: 'localhost', // Can be changed for a production domain
        maxAge: 1000 * 60 * 60 * 24, // 1 day in ms
        httpOnly: true, // For security, use true if not needed in JS
        secure: false, // Use true only for production (HTTPS)
        sameSite: 'lax', // Change to 'None' for production with HTTPS
        path: '/',
      } as CookieOptions;
      res.cookie('authToken', token, cookieOptions);
      sendResponse(res, new Success('User registered successful'));
    } catch (error) {
      next(error);
    }
  };

  verifyOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const email = req.email;
      const otp = req.params.otp;
      if (!email) {
        throw new Unauthorized('Email not registered');
        return;
      }
      if (!otp) {
        throw new Unauthorized('Email not registered');
        return;
      }
      const token = await this.authService.verifyOtp(email, otp);
      const cookieOptions = {
        domain: 'localhost', // Can be changed for a production domain
        maxAge: 1000 * 60 * 60 * 24, // 1 day in ms
        httpOnly: true, // For security, use true if not needed in JS
        secure: false, // Use true only for production (HTTPS)
        sameSite: 'lax', // Change to 'None' for production with HTTPS
        path: '/',
      } as CookieOptions;
      res.clearCookie('authToken');
      res.cookie('otpToken', token, cookieOptions);
      sendResponse(res, new Success('User verified successful'));
    } catch (error) {
      next(error);
    }
  };

  completeRegister = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.id;
      const user: Omit<IUserRegister, 'id'> = req.body.user;
      if (!id) {
        sendResponse(res, new Unauthorized('Email not registered'));
        return;
      }
      if (!user) {
        sendResponse(res, new BadRequest('User data required'));
        return;
      }
      const token = await this.authService.completeRegister({ ...user, id });
      const cookieOptions = {
        domain: 'localhost', // Can be changed for a production domain
        maxAge: 1000 * 60 * 60 * 24, // 1 day in ms
        httpOnly: true, // For security, use true if not needed in JS
        secure: false, // Use true only for production (HTTPS)
        sameSite: 'lax', // Change to 'None' for production with HTTPS
        path: '/',
      } as CookieOptions;
      res.clearCookie('otpToken');
      res.cookie('jwtToken', token, cookieOptions);
      sendResponse(res, new Success('Completed registration successfully'));
    } catch (error) {
      next(error);
    }
  };

  loginByEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user: IUserAuthRequest = req.body.user;
      if (!user || !user.email) {
        sendResponse(res, new BadRequest('Credentials required'));
        return;
      }
      const token = await this.authService.loginByEmail(user.email, user.password);
      const cookieOptions = {
        domain: 'localhost', // Can be changed for a production domain
        maxAge: 1000 * 60 * 60 * 24, // 1 day in ms
        httpOnly: true, // For security, use true if not needed in JS
        secure: false, // Use true only for production (HTTPS)
        sameSite: 'lax', // Change to 'None' for production with HTTPS
        path: '/',
      } as CookieOptions;
      res.cookie('jwtToken', token, cookieOptions);
      sendResponse(res, new Success('Login successful'));
    } catch (error) {
      next(error);
    }
  };

  loginByUsername = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user: IUserAuthRequest = req.body.user;
      if (!user || !user.username) {
        sendResponse(res, new BadRequest('Credentials required'));
        return;
      }
      const token = await this.authService.loginByUsername(user.username, user.password);
      const cookieOptions = {
        domain: 'localhost', // Can be changed for a production domain
        maxAge: 1000 * 60 * 60 * 24, // 1 day in ms
        httpOnly: true, // For security, use true if not needed in JS
        secure: false, // Use true only for production (HTTPS)
        sameSite: 'lax', // Change to 'None' for production with HTTPS
        path: '/',
      } as CookieOptions;
      res.cookie('jwtToken', token, cookieOptions);
      sendResponse(res, new Success('Login successful'));
    } catch (error) {
      next(error);
    }
  };

  logout = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.clearCookie('jwtToken');
      sendResponse(res, new Success('Logout successful'));
    } catch (error) {
      next(error);
    }
  };
}
