import { JWT_SECRET } from '@config/dotenv.config';
import { sendResponse, Success, Unauthorized } from '@util/ApiResponse.util';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function verifyJWT(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies.JWT;
  if (!token) {
    sendResponse(res, new Unauthorized('User not authenticated'));
  }
  const decodedToken = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
  if (decodedToken && typeof decodedToken !== 'string') {
    req.id = decodedToken.id;
    next();
  } else {
    sendResponse(res, new Unauthorized('User not authenticated'));
  }
}

export function getUser(req: Request, res: Response): void {
  const token = req.cookies.JWT;
  if (!token) {
    sendResponse(res, new Unauthorized('User not authenticated'));
  }
  const decodedToken = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
  if (decodedToken && typeof decodedToken !== 'string') {
    sendResponse(res, new Success('User data', decodedToken));
  } else {
    sendResponse(res, new Unauthorized('User not authenticated'));
  }
}
