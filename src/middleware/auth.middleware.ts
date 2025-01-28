import { JWT_SECRET } from '../config/dotenv.config';
import { sendResponse, Success, Unauthorized } from '../util/ApiResponse.util';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function verifyJwtToken(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies.jwtToken;
  if (!token) throw new Unauthorized('User not authenticated.');
  const decodedToken = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
  if (decodedToken && typeof decodedToken !== 'string') {
    req.id = decodedToken.id;
    req.defaultPlaylistId = decodedToken.defaultPlaylist.id;
    next();
  } else {
    throw new Unauthorized('User not authenticated.');
  }
}

export function verifyOtpToken(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies.otpToken;
  if (!token) throw new Unauthorized('User not authenticated.');
  const decodedToken = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
  if (decodedToken && typeof decodedToken === 'string') {
    req.id = decodedToken;
    next();
  } else {
    throw new Unauthorized('User not authenticated.');
  }
}

export function verifyAuthToken(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies.authToken;
  if (!token) {
    throw new Unauthorized('User not authenticated.');
  }
  const decodedToken = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
  if (decodedToken && typeof decodedToken === 'string') {
    req.email = decodedToken;
    next();
  } else {
    throw new Unauthorized('User not authenticated.');
  }
}

export function getUser(req: Request, res: Response): void {
  const token = req.cookies.jwtToken;
  if (!token) {
    throw new Unauthorized('User not authenticated.');
  }
  const decodedToken = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
  if (decodedToken && typeof decodedToken !== 'string') {
    sendResponse(res, new Success('User data.', decodedToken));
  } else {
    throw new Unauthorized('User not authenticated.');
  }
}
