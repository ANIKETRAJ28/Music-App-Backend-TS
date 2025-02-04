// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      id?: string;
      email?: string;
      defaultPlaylistId: string;
    }
  }
}
