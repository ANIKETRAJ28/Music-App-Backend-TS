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
      if (!email || typeof email !== 'string') throw new BadRequest('Email is required for registration.');
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
      sendResponse(res, new Success('User registered successfully.'));
    } catch (error) {
      console.log('An error occurred during registration in the controller.');
      next(error);
    }
  };

  verifyOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const email = req.email;
      const otp = req.params.otp;
      if (!email) throw new Unauthorized('Email is not registered.');
      if (!otp) throw new Unauthorized('OTP is required for verification.');
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
      sendResponse(res, new Success('User verified successfully.'));
    } catch (error) {
      console.log('An error occurred during OTP verification in the controller.');
      next(error);
    }
  };

  completeRegister = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.id;
      const user: Omit<IUserRegister, 'id'> = req.body.user;
      if (!id) throw new Unauthorized('Email is not registered.');
      if (!user) throw new BadRequest('User data is required.');
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
      sendResponse(res, new Success('Registration completed successfully.'));
    } catch (error) {
      console.log('An error occurred during registration completion in the controller.');
      next(error);
    }
  };

  loginByEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user: IUserAuthRequest = req.body.user;
      if (!user || !user.email) throw new BadRequest('Email and password are required for login.');
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
      sendResponse(res, new Success('Login successful.'));
    } catch (error) {
      console.log('An error occurred during email login in the controller.');
      next(error);
    }
  };

  loginByUsername = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user: IUserAuthRequest = req.body.user;
      if (!user || !user.username) throw new BadRequest('Username and password are required for login.');
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
      sendResponse(res, new Success('Login successful.'));
    } catch (error) {
      console.log('An error occurred during username login in the controller.');
      next(error);
    }
  };

  logout = (req: Request, res: Response): void => {
    res.clearCookie('jwtToken');
    sendResponse(res, new Success('Logout successful.'));
  };
}
