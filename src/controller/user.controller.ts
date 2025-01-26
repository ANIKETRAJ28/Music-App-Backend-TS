import { UserService } from '../service/user.service';
import { NextFunction, Request, Response } from 'express';
import { BadRequest, sendResponse, Success } from '../util/ApiResponse.util';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   try {
  //     const userPayload: IUserRequest = req.body.user;
  //     if (!userPayload || !userPayload.email || !userPayload.name || !userPayload.password || !userPayload.username)
  //       sendResponse(res, new BadRequest('Required parameters not given'));
  //     const createdUser = await this.userService.createUser(userPayload);
  //     sendResponse(res, new Created('Successfully created the user', createdUser));
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  findUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      if (!id) throw new Error('Id required');
      sendResponse(res, new BadRequest('Id required'));
      const user = await this.userService.findUserById(id);
      sendResponse(res, new Success('User found successfully', user));
    } catch (error) {
      next(error);
    }
  };

  findUserByEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const email = req.params.email;
      if (!email) sendResponse(res, new BadRequest('Email required'));
      const user = await this.userService.findUserByEmail(email);
      sendResponse(res, new Success('User found successfully', user));
    } catch (error) {
      next(error);
    }
  };

  findUserByUsername = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const username = req.params.username;
      if (!username) sendResponse(res, new BadRequest('Username required'));
      const user = await this.userService.findByUsername(username);
      sendResponse(res, new Success('User found successfully', user));
    } catch (error) {
      next(error);
    }
  };
}
