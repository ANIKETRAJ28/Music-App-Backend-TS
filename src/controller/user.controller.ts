import { UserService } from '../service/user.service';
import { NextFunction, Request, Response } from 'express';
import { BadRequest, sendResponse, Success } from '../util/ApiResponse.util';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  findUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      if (!id) throw new BadRequest('User ID is required to fetch the user.');
      const user = await this.userService.findUserById(id);
      sendResponse(res, new Success('User found successfully by ID.', user));
    } catch (error) {
      console.error('Error occurred in findUserById method:', error);
      next(error);
    }
  };

  findUserByEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const email = req.params.email;
      if (!email) throw new BadRequest('Email is required to fetch the user.');
      const user = await this.userService.findUserByEmail(email);
      sendResponse(res, new Success('User found successfully by email.', user));
    } catch (error) {
      console.error('Error occurred in findUserByEmail method:', error);
      next(error);
    }
  };

  findUserByUsername = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const username = req.params.username;
      if (!username) throw new BadRequest('Username is required to fetch the user.');
      const user = await this.userService.findByUsername(username);
      sendResponse(res, new Success('User found successfully by username.', user));
    } catch (error) {
      console.error('Error occurred in findUserByUsername method:', error);
      next(error);
    }
  };
}
