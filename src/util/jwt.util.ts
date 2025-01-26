import { JWT_EXPIRY, JWT_SECRET } from '../config/dotenv.config';
import { IUserResponse } from '../interface/user.interface';
import jwt from 'jsonwebtoken';

export function authToken(data: IUserResponse): string {
  const token = jwt.sign(data, JWT_SECRET, { expiresIn: JWT_EXPIRY });
  return token;
}

export function registerToken(data: string): string {
  const token = jwt.sign(data, JWT_SECRET);
  return token;
}
