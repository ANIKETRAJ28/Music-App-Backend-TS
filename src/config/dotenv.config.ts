import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DB_URL = process.env.DB_URL;
export const SALT = process.env.SALT || 10;
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const JWT_EXPIRY = process.env.JWT_EXPIRY || '1d';
